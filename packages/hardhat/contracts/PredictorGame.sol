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
	uint256 public minBetAmount;

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

	constructor(uint256 initialBetAmount) {
		currentEpoch = 1;
		minBetAmount = initialBetAmount;
		owner = msg.sender;
	}

	receive() external payable {}

	modifier isOwner() {
		require(msg.sender == owner, "Not the Owner");
		_;
	}
}
