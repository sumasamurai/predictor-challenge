import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";
// const { networkConfig } = require("../helper-hardhat-config");

/**
 * Deploys a contract named "PredictorGame" using the deployer account and
 * constructor arguments set to the deployer address
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployPredictorGame: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  /*
    On localhost, the deployer account is the one that comes with Hardhat, which is already funded.

    When deploying to live networks (e.g `yarn deploy --network goerli`), the deployer account
    should have sufficient balance to pay for the gas fees for contract creation.

    You can generate a random account with `yarn generate` which will fill DEPLOYER_PRIVATE_KEY
    with a random private key in the .env file (then used on hardhat.config.ts)
    You can run the `yarn account` command to check your balance in every network.
  */
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const chainId = (await ethers.provider.getNetwork()).chainId;

  let ethUsdPriceFeedAddress;
  if (chainId == 31337) {
    const ethUsdAggregator = await hre.deployments.get("MockV3Aggregator");
    ethUsdPriceFeedAddress = ethUsdAggregator.address;
  } else {
    // ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    ethUsdPriceFeedAddress = "0x694AA1769357215DE4FAC081bf1f309aDC325306";
    // Sepolia ETH / USD Address
    // https://docs.chain.link/data-feeds/price-feeds/addresses#Sepolia%20Testnet
  }

  await deploy("PredictorGame", {
    from: deployer,
    args: [ethUsdPriceFeedAddress],
    log: true,
    autoMine: true,
  });
};

export default deployPredictorGame;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags YourContract
deployPredictorGame.tags = ["all", "game"];
