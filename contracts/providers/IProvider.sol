// SPDX-License-Identifier: MIT

pragma solidity 0.8.28;

interface IProvider {
  function getProvider(address providerAddr) external view returns(uint256 liquidity, bool isProvider);
  function getToken() external view returns(address);
}