//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "hardhat/console.sol";

contract PredictorGame {
    address public immutable owner;

    uint256 public currentEpoch;
    uint256 public minBetAmount;

    constructor(uint256 initialBetAmount) {
        currentEpoch = 1;
		minBetAmount = initialBetAmount;
        owner = msg.sender;
    }

    modifier isOwner() {
        require(msg.sender == owner, "Not the Owner");
        _;
    }

    receive() external payable {}
}
