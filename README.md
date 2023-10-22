# Predictor Game

Predictor Game is an interactive game that allows users to predict market prices and earn from correct forecasts. The game is built on blockchain technology and utilizes smart contracts to automate processes.

## Key Features

- **Price Prediction:** Players can make predictions about prices of various assets and markets.
- **Earnings:** Accurate forecasts bring cryptocurrency earnings to players.
- **Automated Rounds:** We utilize Chainlink for automatically starting new rounds, ensuring stability and non-interference.
- **Uniswap V4:** We have plans to use Uniswap V4 to create a pool for each round. The pool will automatically grow based on the number of player predictions, providing more earning opportunities.

## Technologies

Predictor Game leverages the following technologies:

- **Blockchain:** For reliability and transaction authenticity.
- **Smart Contracts:** To automate operations and distribute profits.
- **Cryptocurrency:** For betting and payout of winnings.
- **Chainlink:** For the automatic initiation of new rounds and maintaining player trust.
- **Uniswap V4:** To provide liquidity for each round.

## Roadmap

Our plans include the following innovations:

- **Automated Rounds:** We will continue to enhance automated rounds to ensure players can always participate.
- **Uniswap V4 Integration:** We will expand our use of Uniswap V4 to create a pool for each round, depending on the number of player predictions.

Stay tuned for exciting developments in the world of Predictor Game!

<h4 align="center">
  <a href="https://docs.scaffoldeth.io">Documentation</a> |
  <a href="https://predictor-challenge.vercel.app">Demo Link</a>
</h4>

🧪 An open-source, up-to-date toolkit for building decentralized applications (dapps) on the Ethereum blockchain. It's designed to make it easier for developers to create and deploy smart contracts and build user interfaces that interact with those contracts.

⚙️ Built using NextJS, RainbowKit, Hardhat, Wagmi, and Typescript.

- ✅ **Contract Hot Reload**: Your frontend auto-adapts to your smart contract as you edit it.
- 🔥 **Burner Wallet & Local Faucet**: Quickly test your application with a burner wallet and local faucet.
- 🔐 **Integration with Wallet Providers**: Connect to different wallet providers and interact with the Ethereum network.

![Debug Contracts tab](https://github.com/sumasamurai/predictor-challenge/blob/dcf5d29ce417b47f061b201e994c944fa82311ba/packages/nextjs/public/assets/screenshot.png)

## Requirements

Before you begin, you need to install the following tools:

- [Node (v18 LTS)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

## Quickstart

To get started with Predictor Game, follow the steps below:

1. Clone this repo & install dependencies

```
git clone https://github.com/sumasamurai/predictor-challenge.git
cd predictor-challenge
yarn install
```

2. Run a local network in the first terminal:

```
yarn chain
```

This command starts a local Ethereum network using Hardhat. The network runs on your local machine and can be used for testing and development. You can customize the network configuration in `hardhat.config.ts`.

3. On a second terminal, deploy the test contract:

```
yarn deploy
```

This command deploys a test smart contract to the local network. The contract is located in `packages/hardhat/contracts` and can be modified to suit your needs. The `yarn deploy` command uses the deploy script located in `packages/hardhat/deploy` to deploy the contract to the network. You can also customize the deploy script.

4. On a third terminal, start your NextJS app:

```
yarn start
```

Visit your app on: `http://localhost:3000`. You can interact with your smart contract using the contract component or the example ui in the frontend. You can tweak the app config in `packages/nextjs/scaffold.config.ts`.

Run smart contract test with `yarn hardhat:test`

- Edit smart contract `PredictorGame.sol` in `packages/hardhat/contracts`
- Edit your frontend in `packages/nextjs/pages`
- Edit your deployment scripts in `packages/hardhat/deploy`

## Documentation

Visit our [docs](https://docs.scaffoldeth.io) to learn how to start building with Scaffold-ETH 2.



