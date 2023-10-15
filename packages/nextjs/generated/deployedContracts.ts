const contracts = {
  31337: [
    {
      chainId: "31337",
      name: "localhost",
      contracts: {
        PredictorGame: {
          address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
          abi: [
            {
              inputs: [],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              inputs: [],
              name: "currentEpoch",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getBetLimits",
              outputs: [
                {
                  internalType: "uint256[2]",
                  name: "",
                  type: "uint256[2]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "owner",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "rounds",
              outputs: [
                {
                  internalType: "uint256",
                  name: "epoch",
                  type: "uint256",
                },
                {
                  internalType: "int256",
                  name: "closePrice",
                  type: "int256",
                },
                {
                  internalType: "uint256",
                  name: "longAmount",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "shortAmount",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "totalAmount",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "rewardAmount",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "startTimestamp",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "closeTimestamp",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "newMaxBet",
                  type: "uint256",
                },
              ],
              name: "setMaxBet",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "newMinBet",
                  type: "uint256",
                },
              ],
              name: "setMinBet",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              stateMutability: "payable",
              type: "receive",
            },
          ],
        },
      },
    },
  ],
} as const;

export default contracts;
