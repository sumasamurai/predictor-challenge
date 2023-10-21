const contracts = {
  11155111: [
    {
      chainId: "11155111",
      name: "sepolia",
      contracts: {
        PredictorGame: {
          address: "0x0619640aB2cb42282D397B0a6E64EC002A00505a",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_priceFeed",
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
                  components: [
                    {
                      internalType: "uint256",
                      name: "epoch",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "openPrice",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "closePrice",
                      type: "uint256",
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
                    {
                      internalType: "uint256",
                      name: "lockTimestamp",
                      type: "uint256",
                    },
                  ],
                  indexed: false,
                  internalType: "struct Round",
                  name: "round",
                  type: "tuple",
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
                  internalType: "address",
                  name: "sender",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "epoch",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "enum Position",
                  name: "position",
                  type: "uint8",
                },
              ],
              name: "PlayLong",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "sender",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "epoch",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "enum Position",
                  name: "position",
                  type: "uint8",
                },
              ],
              name: "PlayShort",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  components: [
                    {
                      internalType: "uint256",
                      name: "epoch",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "openPrice",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "closePrice",
                      type: "uint256",
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
                    {
                      internalType: "uint256",
                      name: "lockTimestamp",
                      type: "uint256",
                    },
                  ],
                  indexed: false,
                  internalType: "struct Round",
                  name: "round",
                  type: "tuple",
                },
              ],
              name: "StartRound",
              type: "event",
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
                  name: "ethAmount",
                  type: "uint256",
                },
              ],
              name: "getLatestPrice",
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
                  internalType: "enum Position",
                  name: "position",
                  type: "uint8",
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
              name: "manageRound",
              outputs: [],
              stateMutability: "nonpayable",
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
              inputs: [],
              name: "playLong",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [],
              name: "playShort",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [],
              name: "priceFeed",
              outputs: [
                {
                  internalType: "contract AggregatorV3Interface",
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
                  internalType: "uint256",
                  name: "openPrice",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "closePrice",
                  type: "uint256",
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
                {
                  internalType: "uint256",
                  name: "lockTimestamp",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_admin",
                  type: "address",
                },
              ],
              name: "setAdmin",
              outputs: [],
              stateMutability: "nonpayable",
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
