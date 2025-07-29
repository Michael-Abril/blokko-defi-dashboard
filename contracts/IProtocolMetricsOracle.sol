// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title IProtocolMetricsOracle
 * @dev Minimal interface exposing key DeFi protocol metrics that StrategyManager can read on-chain.
 *      A real implementation could be a Chainlink CCIP-Read oracle or custom upgradable contract
 *      that is periodically populated by an off-chain indexer pulling DeFiLlama / Amberdata feeds.
 */
interface IProtocolMetricsOracle {
    /// @notice Return TVL for a protocol (scaled to 18 decimals, USD)
    function getTVL(bytes32 protocol) external view returns (uint256);

    /// @notice Return current supply APY in 1e18, e.g. 5% => 0.05e18
    function getSupplyAPY(bytes32 protocol) external view returns (uint256);

    /// @notice Risk score 0-100 where 100 = highest risk
    function getRiskScore(bytes32 protocol) external view returns (uint8);
}