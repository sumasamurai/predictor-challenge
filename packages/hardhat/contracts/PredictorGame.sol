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

	event PlayLong(address indexed sender, uint256 indexed epoch, uint256 amount);
	event PlayShort(address indexed sender, uint256 indexed epoch, uint256 amount);

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

	function playLong(uint256 epoch) external payable {
		require(epoch == currentEpoch, "Play is too early/late");
		require(_playable(epoch), "Round not playable");
		require(msg.value >= minPlayAmount, "Play amount must be greater than minPlayAmount");
		require(ledger[epoch][msg.sender].amount == 0, "Can only play once per round");

		// Update round data
		uint256 amount = msg.value;
		Round storage round = rounds[epoch];
		round.totalAmount = round.totalAmount + amount;
		round.longAmount = round.longAmount + amount;

		// Update user data
		UserRound storage userRound = ledger[epoch][msg.sender];
		userRound.position = Position.Long;
		userRound.amount = amount;
		userRounds[msg.sender].push(epoch);

		emit PlayLong(msg.sender, epoch, amount);
	}

	function playShort(uint256 epoch) external payable {
		require(epoch == currentEpoch, "Play is too early/late");
		require(_playable(epoch), "Round not playable");
		require(msg.value >= minPlayAmount, "Play amount must be greater than minPlayAmount");
		require(ledger[epoch][msg.sender].amount == 0, "Can only play once per round");

		// Update round data
		uint256 amount = msg.value;
		Round storage round = rounds[epoch];
		round.totalAmount = round.totalAmount + amount;
		round.shortAmount = round.shortAmount + amount;

		// Update user data
		UserRound storage userRound = ledger[epoch][msg.sender];
		userRound.position = Position.Short;
		userRound.amount = amount;
		userRounds[msg.sender].push(epoch);

		emit PlayShort(msg.sender, epoch, amount);
	}

}
