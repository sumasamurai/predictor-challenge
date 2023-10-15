//SPDX-License-Identifier: MIT

pragma solidity >=0.8.0 <0.9.0;

/**
 * @dev Interface of the PredictorGame
 * @notice it still needs to be updated each time there are changes in PredictorGame
 */
interface IPredictorGame {
	/**
	 * @dev Emitted when the player calls playLong()
	 */
	event PlayLong(
		address indexed sender,
		uint256 indexed epoch,
		uint256 amount
	);

	/**
	 * @dev Emitted when the player calls playShort()
	 */
	event PlayShort(
		address indexed sender,
		uint256 indexed epoch,
		uint256 amount
	);

	/**
	 * @dev The StartRound event can be used to notify external parties or interfaces about the beginning of a new round.
	 */
	event StartRound(uint256 indexed epoch);

	/**
	 * @dev The CloseRound event can be used to notify external parties or interfaces about the closing of an existing round.
	 */
	event CloseRound(uint256 indexed epoch, int256 price);

	/**
	 * @dev Returns the current epoch
	 */

	function currentEpoch() external view returns (uint256);

	/**
	 * @dev Returns the minimum bet amount
	 */

	function minBetAmount() external view returns (uint256);

	/**
	 * @dev This function allows the player to playLong on PredictorGame, which takes epoch as an argument
	 */

	function playLong(uint256 epoch) external;

	/**
	 * @dev This function allows the player to playShort on PredictorGame, which takes epoch as an argument
	 */
	function playShort(uint256 epoch) external;
}
