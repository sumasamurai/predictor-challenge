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
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

pragma solidity >=0.8.0 <0.9.0;

contract PredictorGame {
	using SafeMath for uint256;
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

	enum Position {
	    Long,
	    Short
	}

	struct UserRound {
		Position position;
		uint256 amount;
		bool claimed;
	}

	mapping(uint256 => Round) public rounds;
	mapping(uint256 => mapping(address => UserRound)) public ledger;
	mapping(address => uint256[]) public userRounds;

	constructor() {
		currentEpoch = 1;
		owner = msg.sender;
	}

	event StartRound(uint256 indexed epoch);
	event CloseRound(uint256 indexed epoch, int256 price);

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
		require(
			newMaxBet >= minBet,
			"Maximum bet must be greater than or equal to minimum bet"
		);
		maxBet = newMaxBet;
	}

	// Function to get the values of minBet and maxBet as an array
	function getBetLimits() public view returns (uint256[2] memory) {
		uint256[2] memory limits;
		limits[0] = minBet;
		limits[1] = maxBet;
		return limits;
	}

	function _startRound(uint256 epoch) private {
		Round storage round = rounds[epoch];
		round.startTimestamp = block.timestamp;
		round.closeTimestamp = block.timestamp + 5 minutes;
		round.epoch = epoch;
		round.totalAmount = 0;

		emit StartRound(epoch);
	}

	function _closeRound(uint256 epoch, int256 price) private {
		require(rounds[epoch].closeTimestamp != 0, "Round not started");
		require(
			block.timestamp >= rounds[epoch].closeTimestamp,
			"Round cannot be closed yet"
		);

		Round storage round = rounds[epoch];
		round.closePrice = price;

		emit CloseRound(epoch, round.closePrice);
	}

	function _isRoundPlayable(uint256 epoch) private view returns (bool) {
		return
			rounds[epoch].startTimestamp != 0 &&
			rounds[epoch].closeTimestamp != 0 &&
			block.timestamp > rounds[epoch].startTimestamp &&
			block.timestamp < rounds[epoch].closeTimestamp;
	}
}
