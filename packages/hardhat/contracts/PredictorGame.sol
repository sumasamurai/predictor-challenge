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

/**
 * VERSION
 */
pragma solidity >=0.8.0 <0.9.0;

/**
 * IMPORTS
 */
import "hardhat/console.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

enum Position {
    LONG,
    SHORT
}

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

struct UserRound {
    Position position;
    uint256 amount;
    bool claimed;
}

contract PredictorGame {
    /**
     * STATE VARIABLES
     */

    uint256 private minBet = 0.001 ether;
    uint256 private maxBet = 0.101 ether;

    address public immutable owner;
    uint256 public currentEpoch;
    AggregatorV3Interface public priceFeed;

    mapping(uint256 => Round) public rounds;
    mapping(uint256 => mapping(address => UserRound)) public ledger;
    mapping(address => uint256[]) public userRounds;

    /**
     * EVENTS
     */

    event StartRound(uint256 indexed epoch);
    event CloseRound(uint256 indexed epoch, int256 price);
	event PlayLong(address indexed sender, uint256 indexed epoch, uint256 amount);
	event PlayShort(address indexed sender, uint256 indexed epoch, uint256 amount);

    /**
     * MODIFIERS
     */

    modifier isOwner() {
        require(msg.sender == owner, "Not the Owner");
        _;
    }

    /**
     * FUNCTIONS
     */

    constructor(address _priceFeed) {
        priceFeed = AggregatorV3Interface(_priceFeed);
        currentEpoch = 1;
        owner = msg.sender;
    }

    receive() external payable {}

    /**
     * PUBLIC FUNCTIONS
     */

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

    /**
     * INTERNAL AND PRIVATE FUNCTIONS
     */

    function _startRound(uint256 epoch) private {
        Round storage round = rounds[epoch];
        round.startTimestamp = block.timestamp;
        round.closeTimestamp = block.timestamp + 5 minutes;
        round.epoch = epoch;
        // round.totalAmount = 0; // already set to 0

        emit StartRound(epoch);
    }

    function _closeRound(uint256 epoch, int256 price) private {
        require(rounds[epoch].closeTimestamp != 0, "Round not started");
        require(block.timestamp >= rounds[epoch].closeTimestamp, "Round cannot be closed yet");

        Round storage round = rounds[epoch];
        round.closePrice = price;

        emit CloseRound(epoch, round.closePrice);
    }

    function _isRoundPlayable(uint256 epoch) private view returns (bool) {
        return rounds[epoch].startTimestamp != 0 && rounds[epoch].closeTimestamp != 0
            && block.timestamp > rounds[epoch].startTimestamp && block.timestamp < rounds[epoch].closeTimestamp;
    }

    /**
     * VIEW AND PURE FUNCTIONS
     */

    // Get the latest price for the ethAmount of ETH in USD
    function getLatestPrice(uint256 ethAmount) public view returns (uint256) {
        (, int256 answer,,,) = priceFeed.latestRoundData();
        uint256 ethPrice = uint256(answer * 1e10); // ETH/USD rate in 18 digits
        uint256 ethAmountInUsd = (ethPrice * ethAmount) / 1e18; // the actual ETH/USD conversion rate, after adjusting the extra 0s.
        return ethAmountInUsd;
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
		require(_isRoundPlayable(epoch), "Round not playable");
		require(msg.value >= minBet, "Play amount must be greater than minBet");
		require(ledger[epoch][msg.sender].amount == 0, "Can only play once per round");

		// Update round data
		uint256 amount = msg.value;
		Round storage round = rounds[epoch];
		round.totalAmount = round.totalAmount + amount;
		round.longAmount = round.longAmount + amount;

		// Update user data
		UserRound storage userRound = ledger[epoch][msg.sender];
		userRound.position = Position.LONG;
		userRound.amount = amount;
		userRounds[msg.sender].push(epoch);

		emit PlayLong(msg.sender, epoch, amount);
	}

	function playShort(uint256 epoch) external payable {
		require(epoch == currentEpoch, "Play is too early/late");
		require(_isRoundPlayable(epoch), "Round not playable");
		require(msg.value >= minBet, "Play amount must be greater than minBet");
		require(ledger[epoch][msg.sender].amount == 0, "Can only play once per round");

		// Update round data
		uint256 amount = msg.value;
		Round storage round = rounds[epoch];
		round.totalAmount = round.totalAmount + amount;
		round.shortAmount = round.shortAmount + amount;

		// Update user data
		UserRound storage userRound = ledger[epoch][msg.sender];
		userRound.position = Position.SHORT;
		userRound.amount = amount;
		userRounds[msg.sender].push(epoch);

		emit PlayShort(msg.sender, epoch, amount);
	}
    
}
