/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  GasPassRecipient,
  GasPassRecipientInterface,
} from "../../../contracts/Recepient.sol/GasPassRecipient";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "forwarder",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "gas",
        type: "uint256",
      },
    ],
    name: "RelayedCallReceived",
    type: "event",
  },
  {
    inputs: [],
    name: "getTrustedForwarder",
    outputs: [
      {
        internalType: "address",
        name: "forwarder",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "forwarder",
        type: "address",
      },
    ],
    name: "isTrustedForwarder",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "gas",
        type: "uint256",
      },
    ],
    name: "onERC2771Received",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "versionRecipient",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b506040516107ce3803806107ce833981810160405281019061003291906100ed565b6100418161004760201b60201c565b5061011a565b806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006100ba8261008f565b9050919050565b6100ca816100af565b81146100d557600080fd5b50565b6000815190506100e7816100c1565b92915050565b6000602082840312156101035761010261008a565b5b6000610111848285016100d8565b91505092915050565b6106a5806101296000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c8063486ff0cd14610051578063572b6c051461006f578063719d4f261461009f578063ce1b815f146100cf575b600080fd5b6100596100ed565b60405161006691906102ce565b60405180910390f35b61008960048036038101906100849190610358565b61010d565b60405161009691906103a0565b60405180910390f35b6100b960048036038101906100b49190610456565b610166565b6040516100c69190610533565b60405180910390f35b6100d7610215565b6040516100e49190610564565b60405180910390f35b606060405180606001604052806036815260200161063a60369139905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16149050919050565b60608573ffffffffffffffffffffffffffffffffffffffff167ff74ab0321342348f95dcd4b17840e4413b065385bc038b4a5845bbcc0e93221e868686866040516101b494939291906105ca565b60405180910390a2600067ffffffffffffffff8111156101d7576101d661060a565b5b6040519080825280601f01601f1916602001820160405280156102095781602001600182028036833780820191505090505b50905095945050505050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b600081519050919050565b600082825260208201905092915050565b60005b8381101561027857808201518184015260208101905061025d565b60008484015250505050565b6000601f19601f8301169050919050565b60006102a08261023e565b6102aa8185610249565b93506102ba81856020860161025a565b6102c381610284565b840191505092915050565b600060208201905081810360008301526102e88184610295565b905092915050565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610325826102fa565b9050919050565b6103358161031a565b811461034057600080fd5b50565b6000813590506103528161032c565b92915050565b60006020828403121561036e5761036d6102f0565b5b600061037c84828501610343565b91505092915050565b60008115159050919050565b61039a81610385565b82525050565b60006020820190506103b56000830184610391565b92915050565b6000819050919050565b6103ce816103bb565b81146103d957600080fd5b50565b6000813590506103eb816103c5565b92915050565b600080fd5b600080fd5b600080fd5b60008083601f840112610416576104156103f1565b5b8235905067ffffffffffffffff811115610433576104326103f6565b5b60208301915083600182028301111561044f5761044e6103fb565b5b9250929050565b600080600080600060808688031215610472576104716102f0565b5b600061048088828901610343565b9550506020610491888289016103dc565b945050604086013567ffffffffffffffff8111156104b2576104b16102f5565b5b6104be88828901610400565b935093505060606104d1888289016103dc565b9150509295509295909350565b600081519050919050565b600082825260208201905092915050565b6000610505826104de565b61050f81856104e9565b935061051f81856020860161025a565b61052881610284565b840191505092915050565b6000602082019050818103600083015261054d81846104fa565b905092915050565b61055e8161031a565b82525050565b60006020820190506105796000830184610555565b92915050565b610588816103bb565b82525050565b82818337600083830152505050565b60006105a983856104e9565b93506105b683858461058e565b6105bf83610284565b840190509392505050565b60006060820190506105df600083018761057f565b81810360208301526105f281858761059d565b9050610601604083018461057f565b95945050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fdfe332e302e302d626574612e332b6f70656e67736e2e67617370617373726563697069656e742e65726332373731726563697069656e74a2646970667358221220190f2657b5a94d700ecabcb06b19fd4904e9fc93dd95f19b63a07e2cef8b724564736f6c63430008120033";

type GasPassRecipientConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: GasPassRecipientConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class GasPassRecipient__factory extends ContractFactory {
  constructor(...args: GasPassRecipientConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    forwarder: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<GasPassRecipient> {
    return super.deploy(
      forwarder,
      overrides || {}
    ) as Promise<GasPassRecipient>;
  }
  override getDeployTransaction(
    forwarder: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(forwarder, overrides || {});
  }
  override attach(address: string): GasPassRecipient {
    return super.attach(address) as GasPassRecipient;
  }
  override connect(signer: Signer): GasPassRecipient__factory {
    return super.connect(signer) as GasPassRecipient__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): GasPassRecipientInterface {
    return new utils.Interface(_abi) as GasPassRecipientInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): GasPassRecipient {
    return new Contract(address, _abi, signerOrProvider) as GasPassRecipient;
  }
}
