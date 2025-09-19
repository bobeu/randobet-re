// SPDX-License-Identifier: MIT

pragma solidity 0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

interface IERC20Mint {
  function mint(address to) external returns(bool); 
}

contract TestToken is ERC20, IERC20Mint {
  mapping(address => bool) public requested;
  constructor() ERC20("Test USD", "TUSD") {}

  function mint(address to) external returns(bool) {
    uint mintable = 100000 * (10**18);
    if(requested[to]) {
      mintable = mintable / 4;
    } else {
      requested[to] = true;
    }
    _mint(to, mintable);
    return true;
  }
}