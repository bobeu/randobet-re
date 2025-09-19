// SPDX-License-Identifier: MIT 

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC20} from "../interfaces/IERC20.sol";

pragma solidity 0.8.28;

interface IDeadBalance {
  function burn(uint epoch) external payable;
}

contract FeeReceiver is IDeadBalance, Ownable {
  address public immutable escapeAddr;

  uint public lastSeen;

  uint public flag;

  mapping(uint epoch => uint256) public deadBalances;

  constructor(address _escapeAddr) Ownable(_msgSender()) {
    require(_escapeAddr != address(0), 'Escape addr is zero');
    escapeAddr = _escapeAddr;
    lastSeen = block.timestamp;
  }
  
  receive() external payable {}

  function burn(uint epoch) external payable {
    deadBalances[epoch] += msg.value;
  }

  function _transfer(address token, address to, uint amount) private returns(bool _return) {
    _return = IERC20(token).transfer(to, amount);
  }

  function withdraw(address to, address token, uint nativeAmount, uint erc20Amount) public onlyOwner returns(bool) {
    uint256 erc20Bal = IERC20(token).balanceOf(address(this));
    uint256 native = address(this).balance;
    if(native >= nativeAmount) {
      (bool s,) = to.call{value: nativeAmount}('');
      require(s, 'Call failed');
    }

    if(erc20Bal >= erc20Amount) {
      if(token != address(0)){
        IERC20(token).transfer(to, erc20Amount);
      }
    }
    return true;
  }

  function panicWithdraw() public {
    if((flag == 1) && (block.timestamp - lastSeen) >= 90 days){
      flag = 0;
      uint256 balance = address(this).balance;
      if(balance > 0) {
        (bool s,) = escapeAddr.call{value: balance}('');
        require(s, 'Call failed');
      }
    } 
    
    if(flag == 0){
      flag ++;
      lastSeen = block.timestamp;
    }
  }
}