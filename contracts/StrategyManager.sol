// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./IBlokkoVault.sol";
import "./IProtocolMetricsOracle.sol";

/**
 * @title StrategyManager
 * @notice Reads protocol metrics via oracle and suggests rebalance weights to BlokkoVault.
 *         This is a simplified placeholder – real production version would require governance,
 *         timelocks, and security checks.
 */
contract StrategyManager {
    IBlokkoVault public immutable vault;
    IProtocolMetricsOracle public immutable oracle;

    bytes32[] public protocols;                // List of tracked protocol ids (keccak256("Aave"), etc.)
    uint8 public maxRiskAllowed = 50;          // Risk threshold (0-100)
    uint256 public minTVLAllowed = 10e6 * 1e18; // 10M USD scaled to 18 decimals

    event RebalanceSuggested(bytes32[] adapters, uint16[] weights);

    constructor(address _vault, address _oracle, bytes32[] memory _protocols) {
        vault = IBlokkoVault(_vault);
        oracle = IProtocolMetricsOracle(_oracle);
        protocols = _protocols;
    }

    /// @notice Evaluate metrics and emit event suggesting new weights
    function evaluateProtocols() external {
        uint256 totalScore;
        uint256[] memory scores = new uint256[](protocols.length);

        for (uint256 i = 0; i < protocols.length; i++) {
            bytes32 id = protocols[i];
            uint8 risk = oracle.getRiskScore(id);
            uint256 tvlUSD = oracle.getTVL(id);
            uint256 apy = oracle.getSupplyAPY(id); // 1e18

            if (risk > maxRiskAllowed || tvlUSD < minTVLAllowed) {
                scores[i] = 0;
                continue;
            }
            // Simple heuristic: score = tvl * apy (bigger is better)
            uint256 score = tvlUSD * apy / 1e18;
            scores[i] = score;
            totalScore += score;
        }

        require(totalScore > 0, "No protocols passed filters");

        // Convert scores to weights (bps) – uint16 for 0-10000 representing 0-100%
        uint16[] memory weights = new uint16[](protocols.length);
        for (uint256 i = 0; i < protocols.length; i++) {
            weights[i] = uint16((scores[i] * 10000) / totalScore);
        }

        emit RebalanceSuggested(protocols, weights);
    }
}