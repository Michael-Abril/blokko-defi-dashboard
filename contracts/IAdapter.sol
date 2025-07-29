// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IAdapter {
    function deposit(address _token, uint256 _amount) external returns (bool);
    function withdraw(address _token, uint256 _amount) external returns (bool);
    function getBalance(address _token) external view returns (uint256);
    function getAPY(address _token) external view returns (uint256);
}