// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IAdapter.sol";

interface IBlokkoVault {
    struct Strategy {
        address[] adapters;
        uint256[] allocations; // Percentages, sum must be 100
    }

    event StrategySet(address indexed user, Strategy strategy);
    event Rebalance(address indexed user, uint256 totalValue);

    function deposit(address _token, uint256 _amount) external;
    function withdraw(address _token, uint256 _amount) external;
    function setStrategy(Strategy calldata _strategy) external;
    function getStrategy(address _user) external view returns (Strategy memory);
    function rebalance() external;
}