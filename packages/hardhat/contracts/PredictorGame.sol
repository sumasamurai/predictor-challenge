//SPDX-License-Identifier: MIT

// Layout of Contract:
// version
// imports
// errors
// interfaces/ libraries contracts
// State variables
// Events
// Modifiers
// Functions

// Layout of Functions:
// constructor
// receive/fallback function (if exists)
// external
// public
// internal
// private
// view & pure functions

// we wont need below line once we finish so will clean once we have the mvp
import "hardhat/console.sol";

pragma solidity >=0.8.0 <0.9.0;

contract PredictorGame {
	address public immutable owner;

	uint256 public currentEpoch;

	uint256 private minBet = 0.001 ether;
    uint256 private maxBet = 0.101 ether;

	struct Round {
		uint256 epoch;
		int256 closePrice;
		uint256 longAmount;
		uint256 shortAmount;
		uint256 totalAmount;
		uint256 rewardAmount;
		uint256 startTimestamp;
		uint256 closeTimestamp;
	}

	mapping(uint256 => Round) public rounds;

	constructor() {
		currentEpoch = 1;
		owner = msg.sender;
	}

	receive() external payable {}

	modifier isOwner() {
		require(msg.sender == owner, "Not the Owner");
		_;
	}

	// Function to update the minimum bet amount.
    function setMinBet(uint256 newMinBet) public isOwner {
        require(newMinBet > 0, "Minimum bet must be greater than zero");
        minBet = newMinBet;
    }

    // Function to update the maximum bet amount.
    function setMaxBet(uint256 newMaxBet) public isOwner {
        require(newMaxBet >= minBet, "Maximum bet must be greater than or equal to minimum bet");
        maxBet = newMaxBet;
    }

	// Function to get the values of minBet and maxBet as an array
    function getBetLimits() public view returns (uint256[2] memory) {
        uint256[2] memory limits;
        limits[0] = minBet;
        limits[1] = maxBet;
        return limits;
    }
}
