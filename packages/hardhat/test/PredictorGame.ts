import { expect, assert } from "chai";
import { ethers } from "hardhat";
import { MockV3Aggregator, PredictorGame } from "../typechain-types";

describe("PredictorGame", function () {
  const DECIMALS = "8";
  const INITIAL_PRICE = "200000000000"; // $2000

  let predictorGame: PredictorGame;
  let mockV3Aggregator: MockV3Aggregator;

  before(async () => {
    const [owner] = await ethers.getSigners();

    const mockV3AggregatorFactory = await ethers.getContractFactory("MockV3Aggregator");
    mockV3Aggregator = (await mockV3AggregatorFactory.deploy(DECIMALS, INITIAL_PRICE)) as MockV3Aggregator;

    const predictorGameFactory = await ethers.getContractFactory("PredictorGame");
    predictorGame = (await predictorGameFactory.deploy(mockV3Aggregator.address)) as PredictorGame;
    await predictorGame.deployed();
  });

  describe("Constructor", function () {
    it("Sets the aggregator address correctly", async () => {
      const response = await predictorGame.priceFeed();
      assert.equal(response, mockV3Aggregator.address);
    });
  });
});
