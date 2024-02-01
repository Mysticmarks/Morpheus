/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../common";
import type {
  GsnEip712Library,
  GsnEip712LibraryInterface,
} from "../../../../../@opengsn/contracts/src/utils/GsnEip712Library";

const _abi = [
  {
    inputs: [],
    name: "EIP712DOMAIN_TYPEHASH",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "GENERIC_PARAMS",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "RELAYDATA_TYPE",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "RELAYDATA_TYPEHASH",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "RELAY_REQUEST_NAME",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "RELAY_REQUEST_SUFFIX",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "RELAY_REQUEST_TYPE",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "RELAY_REQUEST_TYPEHASH",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x61084c610053600b82828239805160001a607314610046577f4e487b7100000000000000000000000000000000000000000000000000000000600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600436106100925760003560e01c8063abf0d3f411610065578063abf0d3f41461010f578063c46cf83f1461012d578063c49f91d31461014b578063cc0c62b21461016957610092565b8063066a310c146100975780636225e61b146100b5578063931cd38f146100d3578063987673f7146100f1575b600080fd5b61009f610187565b6040516100ac9190610467565b60405180910390f35b6100bd6101a3565b6040516100ca91906104de565b60405180910390f35b6100db61024e565b6040516100e89190610467565b60405180910390f35b6100f9610289565b6040516101069190610467565b60405180910390f35b6101176102c2565b6040516101249190610519565b60405180910390f35b610135610374565b60405161014291906104de565b60405180910390f35b610153610390565b6040516101609190610519565b60405180910390f35b6101716103b4565b60405161017e9190610519565b60405180910390f35b6040518060a00160405280606181526020016106fa6061913981565b6040518060400160405280600c81526020017f52656c61795265717565737400000000000000000000000000000000000000008152506040518060a00160405280606181526020016106fa606191396040518060e0016040528060bc815260200161075b60bc913960405160200161021b91906105c7565b60405160208183030381529060405260405160200161023c939291906106b2565b60405160208183030381529060405281565b6040518060e0016040528060bc815260200161075b60bc913960405160200161027791906105c7565b60405160208183030381529060405281565b6040518060400160405280600c81526020017f52656c617952657175657374000000000000000000000000000000000000000081525081565b6040518060400160405280600c81526020017f52656c61795265717565737400000000000000000000000000000000000000008152506040518060a00160405280606181526020016106fa606191396040518060e0016040528060bc815260200161075b60bc913960405160200161033a91906105c7565b60405160208183030381529060405260405160200161035b939291906106b2565b6040516020818303038152906040528051906020012081565b6040518060e0016040528060bc815260200161075b60bc913981565b7f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f81565b6040518060e0016040528060bc815260200161075b60bc91398051906020012081565b600081519050919050565b600082825260208201905092915050565b60005b838110156104115780820151818401526020810190506103f6565b60008484015250505050565b6000601f19601f8301169050919050565b6000610439826103d7565b61044381856103e2565b93506104538185602086016103f3565b61045c8161041d565b840191505092915050565b60006020820190508181036000830152610481818461042e565b905092915050565b600081519050919050565b600082825260208201905092915050565b60006104b082610489565b6104ba8185610494565b93506104ca8185602086016103f3565b6104d38161041d565b840191505092915050565b600060208201905081810360008301526104f881846104a5565b905092915050565b6000819050919050565b61051381610500565b82525050565b600060208201905061052e600083018461050a565b92915050565b600081905092915050565b7f52656c6179446174612072656c61794461746129000000000000000000000000600082015250565b6000610575601483610534565b91506105808261053f565b601482019050919050565b600081905092915050565b60006105a182610489565b6105ab818561058b565b93506105bb8185602086016103f3565b80840191505092915050565b60006105d282610568565b91506105de8284610596565b915081905092915050565b60006105f4826103d7565b6105fe8185610534565b935061060e8185602086016103f3565b80840191505092915050565b7f2800000000000000000000000000000000000000000000000000000000000000600082015250565b6000610650600183610534565b915061065b8261061a565b600182019050919050565b7f2c00000000000000000000000000000000000000000000000000000000000000600082015250565b600061069c600183610534565b91506106a782610666565b600182019050919050565b60006106be82866105e9565b91506106c982610643565b91506106d582856105e9565b91506106e08261068f565b91506106ec82846105e9565b915081905094935050505056fe616464726573732066726f6d2c6164647265737320746f2c75696e743235362076616c75652c75696e74323536206761732c75696e74323536206e6f6e63652c627974657320646174612c75696e743235362076616c6964556e74696c54696d6552656c6179446174612875696e74323536206d61784665655065724761732c75696e74323536206d61785072696f726974794665655065724761732c75696e74323536207472616e73616374696f6e43616c6c64617461476173557365642c616464726573732072656c6179576f726b65722c61646472657373207061796d61737465722c6164647265737320666f727761726465722c6279746573207061796d6173746572446174612c75696e7432353620636c69656e74496429a264697066735822122087d246b96a0155b25b3fea3df4f93d2049d91601258670e3e2357f44e4c5d8b064736f6c63430008120033";

type GsnEip712LibraryConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: GsnEip712LibraryConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class GsnEip712Library__factory extends ContractFactory {
  constructor(...args: GsnEip712LibraryConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<GsnEip712Library> {
    return super.deploy(overrides || {}) as Promise<GsnEip712Library>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): GsnEip712Library {
    return super.attach(address) as GsnEip712Library;
  }
  override connect(signer: Signer): GsnEip712Library__factory {
    return super.connect(signer) as GsnEip712Library__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): GsnEip712LibraryInterface {
    return new utils.Interface(_abi) as GsnEip712LibraryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): GsnEip712Library {
    return new Contract(address, _abi, signerOrProvider) as GsnEip712Library;
  }
}
