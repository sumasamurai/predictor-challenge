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
    uint256 openPrice;
    uint256 closePrice;
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
    address private admin;
    uint256 private currentEpoch;
    AggregatorV3Interface public priceFeed;

    mapping(uint256 => Round) public rounds;
    mapping(uint256 => mapping(address => UserRound)) public ledger;
    mapping(address => uint256[]) public userRounds;

    /**
     * EVENTS
     */

    event StartRound(uint256 indexed epoch);
    event CloseRound(uint256 indexed epoch);
    event PlayLong(address indexed sender, uint256 indexed epoch, uint256 amount, Position position);
    event PlayShort(address indexed sender, uint256 indexed epoch, uint256 amount, Position position);

    /**
     * MODIFIERS
     */

    modifier isOwner() {
        require(msg.sender == owner, "Not the Owner");
        _;
    }

    modifier isAdmin() {
        require(msg.sender == admin, "Not the Admin");
        _;
    }

    /**
     * FUNCTIONS
     */

    constructor(address _priceFeed) {
        priceFeed = AggregatorV3Interface(_priceFeed);
        currentEpoch = 2;
        owner = msg.sender;
        _startRound();
    }

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

    function setAdmin(address _admin) public isOwner {
        admin = _admin;
    }

    /**
     * INTERNAL AND PRIVATE FUNCTIONS
     */

    function _startRound() private {
        currentEpoch = currentEpoch + 1;
        Round storage round = rounds[currentEpoch];
        round.startTimestamp = block.timestamp;
        round.closeTimestamp = block.timestamp + 5 minutes;
        round.epoch = currentEpoch;
        uint256 latestPrice = getLatestPrice(1);
        round.openPrice = latestPrice;

        emit StartRound(currentEpoch);
    }

    function _closeRound() private {
        require(rounds[currentEpoch].closeTimestamp != 0, "Round not started");
        require(block.timestamp >= rounds[currentEpoch].closeTimestamp, "Round cannot be closed yet");
 
        Round storage round = rounds[currentEpoch];
        uint256 latestPrice = getLatestPrice(1);
        round.closePrice = latestPrice;

        emit CloseRound(currentEpoch);
    }

    function manageRound() public isAdmin {
        _closeRound();
        _startRound();
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
        int256 ethPrice = int256(answer); // ETH/USD rate with decimal places

        // Use the appropriate scale factor based on the number of decimal places (18 for most Chainlink price feeds)
        uint256 scaleFactor = 10**18;

        // Convert with decimal places
        uint256 ethAmountInUsd = (uint256(ethPrice) * ethAmount * scaleFactor) / uint256(1e8); // Convert from 8 decimal places to 18 decimal places
        return ethAmountInUsd;
    }

    // Function to get the values of minBet and maxBet as an array
    function getBetLimits() public view returns (uint256[2] memory) {
        uint256[2] memory limits;
        limits[0] = minBet;
        limits[1] = maxBet;
        return limits;
    }

    function playLong() public payable {
        require(_isRoundPlayable(currentEpoch), "Round not playable");
        require(msg.value >= minBet, "Play amount must be greater than minBet");
        require(ledger[currentEpoch][msg.sender].amount == 0, "Can only play once per round");

        // Update round data
        uint256 amount = msg.value;
        Round storage round = rounds[currentEpoch + 1];
        round.totalAmount = round.totalAmount + amount;
        round.longAmount = round.longAmount + amount;

        // Update user data
        UserRound storage userRound = ledger[currentEpoch][msg.sender];
        userRound.position = Position.LONG;
        userRound.amount = amount;
        userRounds[msg.sender].push(currentEpoch);

        emit PlayLong(msg.sender, currentEpoch, amount, userRound.position);
    }

    function playShort() public payable {
        require(_isRoundPlayable(currentEpoch), "Round not playable");
        require(msg.value >= minBet, "Play amount must be greater than minBet");
        require(ledger[currentEpoch][msg.sender].amount == 0, "Can only play once per round");

        // Update round data
        uint256 amount = msg.value;
        Round storage round = rounds[currentEpoch];
        round.totalAmount = round.totalAmount + amount;
        round.shortAmount = round.shortAmount + amount;

        // Update user data
        UserRound storage userRound = ledger[currentEpoch][msg.sender];
        userRound.position = Position.SHORT;
        userRound.amount = amount;
        userRounds[msg.sender].push(currentEpoch);

        emit PlayShort(msg.sender, currentEpoch, amount, userRound.position);
    }

    receive() external payable {}
}
