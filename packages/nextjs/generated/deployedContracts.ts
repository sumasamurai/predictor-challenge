const contracts = {
  31337: [
    {
      chainId: "31337",
      name: "localhost",
      contracts: {
        PredictorGame: {
          address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
          abi: [
            {
              inputs: [],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "epoch",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "int256",
                  name: "price",
                  type: "int256",
                },
              ],
              name: "CloseRound",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "epoch",
                  type: "uint256",
                },
              ],
              name: "StartRound",
              type: "event",
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
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              name: "ledger",
              outputs: [
                {
                  components: [
                    {
                      internalType: "uint256",
                      name: "positionId",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct PredictorGame.Position",
                  name: "position",
                  type: "tuple",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
                {
                  internalType: "bool",
                  name: "claimed",
                  type: "bool",
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
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "userRounds",
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
