const { openFile } = require("./service/document/reader.js");
const { embed } = require("./service/embedding.js");
const {
  store,
  search,
  load,
  clearVectorStore,
  vectorStoreSize,
} = require("./service/vector.js");
const {
  abort,
  run,
  generate,
  stop,
  serve,
} = require("./service/ollama/ollama.js");

const { Document, VectorIndexRetriever } = require("llamaindex");
const { DirectoryLoader, RunnablePassthrough, RunnableParallel, StrOutputParser, ChatPromptTemplate, ChatOllama } = require("@langchainjs");
const { FAISS } = requite("faiss-node");
const LangChainOllamaEmbeddings = require('llamaindex');
const LlamaIndexOllamaEmbeddings = require('llamaindex');
const ServiceContext = require('llamaindex');
const VectorStoreIndex = require('llamaindex');

let model = "llama2:latest";

// Smart Contracts Directory with ABI to make initial function call
const CONTRACTS_DIR = "public/data";

let contracts = []; // Array to hold contracts data

// Contract Filenames
const contractFilenames = ["1inch.json", "curve.json", "lido.json", "pancakeswap.json", "router.json", "sushiswap.json", "uniswap.json", "usdc.json", "usdt.json"];

// Function to extract metadata and abi from a contract object
function extractMetadataAbi(contract) {
  const subsetKeys = new Set(["metadata", "abi"]);
  let result = {};
  for (let key in contract) {
    if (subsetKeys.has(key)) {
      result[key] = contract[key];
    }
  }
  return result;
}

// Function to extract metadata and abi from a contract object
contractFilenames.forEach(contractFilename => {
  let filePath = path.join(CONTRACTS_DIR, contractFilename);
  let rawData = fs.readFileSync(filePath, 'utf8');
  let payload = JSON.parse(rawData);

  if (payload.contracts) {
    payload.contracts.forEach(contract => {
      contracts.push([contractFilename, extractMetadataAbi(contract)]);
    });
  } else {
    contracts.push([contractFilename, extractMetadataAbi(payload)]);
  }
});

// Function to create LangChain Ollama Embeddings
function langchainEmbeddingsFactory() {
  return new LangChainOllamaEmbeddings(); // Assumes llama2 model is default
}

// Function to create LlamaIndex Ollama Embeddings
function llamaindexEmbeddingsFactory() {
  return new LlamaIndexOllamaEmbeddings({ modelName: "llama2" });
}

// Function to build a LlamaIndex Index
function buildLlamaIndexIndex({ embedModel, documents }) {
  const serviceContext = ServiceContext.fromDefaults({ embedModel: embedModel, llm: null, chunkSize: 4096 });
  // TODO: Implement local persistence if necessary
  const index = VectorStoreIndex.fromDocuments({
    documents: documents,
    serviceContext: serviceContext
  });
  return index;
}

// Debug Log
function debugLog(msg) {
  if (global.debug) {
    console.log(msg);
  }
}

// Sets the model to use for the Ollama AI
async function setModel(event, msg) {
  model = msg;
}

// Gets the model to use for the Ollama AI
async function getModel(event) {
  event.reply("model:get", { success: true, content: model });
}


// Runs the Ollama AI
async function runOllamaModel(event, msg) {
  try {

    // load the embeddings into memory
    await load();

    // send an empty message to the model to load it into memory

    await run(model, (json) => {
      // status will be set if the model is downloading
      if (json.status) {
        if (json.status.includes("downloading")) {
          const percent = Math.round((json.completed / json.total) * 100);
          const content = isNaN(percent)
            ? "Downloading AI model..."
            : `Downloading AI model... ${percent}%`;
          event.reply("ollama:run", { success: true, content: content });
          return;
        }
        if (json.status.includes("verifying")) {
          const content = `Verifying AI model...`;
          event.reply("ollama:run", { success: true, content: content });
          return;
        }
      }
      if (json.done) {
        event.reply("ollama:run", { success: true, content: json });
        return;
      }
      event.reply("ollama:run", { success: true, content: "Initializing..." });
    });
  } catch (err) {
    console.log(err);
    event.reply("ollama:run", { success: false, content: err.message });
  }
}

// For Smart Contract ABI Metadata Retrieval, Examples Retrieval, and Chat
const TOP_K_METADATA = 2;
const TOP_K_ABIS = 5;
const TOP_K_EXAMPLES = 1;

// For Smart Contract ABI Metadata
const numContracts = contracts.length;
const documentsContractsMetadata = contracts.map(contract => {
  return new Document({
    text: contract[1].metadata.toString(),
    metadata: {
      fname: contract[0],
      abis: contract[1].abi
    },
    excludedEmbedMetadataKeys: ["abis", "fname"],
    excludedLlmMetadataKeys: ["abis", "fname"]
  });
});

// For Smart Contract ABI Metadata
const documentsContractsMetadataIndex = buildLlamaIndexIndex({
  embedModel: llamaindexEmbeddingsFactory(),
  documents: documentsContractsMetadata
});

// For Smart Contracts
const documentsContractsRetriever = new VectorIndexRetriever({
  index: documentsContractsMetadataIndex,
  similarityTopK: TOP_K_METADATA
});

// Asynchronously sends a chat message and processes the response
async function sendChat(event, msg) {

  try {

    // The users query
    const NLQ = msg;

    // The prompt template
    const retrievedContractsMetadataWithAbis = documentsContractsRetriever.retrieve(NLQ).map(contract => {
      return `The Contract: ${contract.node.text}\n The Contract's ABI:\n${contract.node.metadata.abis}`;
    });

    // In Memory Vector Store
    const abiInMemoryVectorStore = FAISS.fromTexts(retrievedContractsMetadataWithAbis, {
      embedding: langchainEmbeddingsFactory()
    });

    // ABI Retrieval Engine
    const abiRetriever = abiInMemoryVectorStore.asRetriever({ k: TOP_K_ABIS });

    // Examples Loader
    const metamaskExamplesLoader = new DirectoryLoader("Morpheus/data/metamask_eth_examples", "*.txt");

    // Load the examples from the directory using the DirectoryLoader In Memory Vector Store
    const metamaskExamples = metamaskExamplesLoader.load();

    // FAISS 
    const metamaskExamplesInMemoryVectorStore = FAISS.fromDocuments(metamaskExamples, {
      embedding: langchainEmbeddingsFactory()
    });

    // Retrieval Engine
    const metamaskExamplesRetriever = metamaskExamplesInMemoryVectorStore.asRetriever({ k: TOP_K_EXAMPLES });

    // Model
    const model = new ChatOllama({ model: "llama2:7b" });

    // Prompt
    const prompt = new ChatPromptTemplate.fromTemplate(promptTemplate);

    // Setup And Retrieval
    const setupAndRetrieval = new RunnableParallel({
      nlq: new RunnablePassthrough(),
      context: abiRetriever,
      metamaskExamples: metamaskExamplesRetriever
    });

    // Chain
    const chain = setupAndRetrieval.pipe(prompt).pipe(model).pipe(new StrOutputParser());

    // Invoke
    const result = chain.invoke(NLQ);

    console.log(result);

    // Parser the Result and Send Ethereum Transaction
    sendTransaction(result);

    // Send the response to the user
    event.reply("chat:reply", { success: true, content: result });

  } catch (err) {
    console.error(err);
    event.reply("chat:reply", { success: false, content: err.message });
  }
}

// SendTransaction
function sendTransaction(txn) {

  // Data
  const data = {}

  // The transaction object
  const txn = {
    from: "0x00000000",
    to: "0x00000000",
    value: "0x00000000",
    gas: "0x00000000",
    gasPrice: "0x00000000",
    data: "0x00000000",
    nonce: "0x00000000",
    chainId: "0x00000000"
  };

  // Send the transaction
/*   web3.eth.sendTransaction(txn, function (err, transactionHash) {
    if (!err) {
      console.log(transactionHash);
    } else {
      console.error(err);
    }
  }); */

}


function stopChat() {
  abort();
}

async function loadDocument(event) {
  try {
    clearVectorStore();

    // read the document
    const doc = await openFile();
    if (doc.data.length === 0) {
      return;
    }

    // get the embeddings for the document content
    if (doc && doc.data) {
      debugLog("Parsed content...");
      for (const section of doc.data) {
        debugLog(section.section);
        debugLog(section.content);
      }
    }
    const embeddings = await embed(doc);

    // store the embeddings
    store(embeddings);

    event.reply("doc:load", { success: true, content: doc.fileName });
  } catch (err) {
    console.log(err);
    event.reply("doc:load", { success: false, content: err.message });
  }
}

async function serveOllama(event) {
  try {
    const serveType = await serve();
    event.reply("ollama:serve", { success: true, content: serveType });
  } catch (err) {
    event.reply("ollama:serve", { success: false, content: err.message });
  }
}

function stopOllama(event) {
  stop();
}

module.exports = {
  setModel,
  getModel,
  stopChat,
  sendChat,
  sendTransaction,
  loadDocument,
  serveOllama,
  runOllamaModel,
  stopOllama,
};
