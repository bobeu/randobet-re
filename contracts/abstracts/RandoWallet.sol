// // SPDX-License-Identifier: MIT
// pragma solidity 0.8.28;

// // import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
// // import { IERC20 } from "../interfaces/IERC20.sol";
// // import { IERC20Mint } from "../TestToken.sol";
// import { IRandoWallet } from "../interfaces/IRandoWallet.sol";
// import { Approved } from "./Approved.sol";
 
// contract RandoWallet is IRandoWallet, Approved {
//   error NotTheSponsor();
//   error TransferFailed();

//   // uint256 public locked;

//   address public immutable sponsor;

//   address public feeTo;

//   // address public immutable usd;

//   // mapping (address => bool) private permitted;
//   mapping(uint epoch => mapping(address player => uint256)) private locked;

//   mapping(uint epoch => mapping(address player => uint256)) internal deposits;

//   constructor(address _feeTo) {
//     require(_feeTo != address(0), "FeeTo is zero address");
//     // sponsor = user;
//     // usd = _usd;
//     feeTo = _feeTo;
//     // permitted[futures] = true;
//     // permitted[instant] = true;
//     // require(IERC20Mint(usd).mint(address(this)), "IWallet: Transfer failed");
//   }

//   receive() external payable returns(string memory) { 
//     return "Thank you";
//   }
 
//   function _transfer(address to, uint amount) private {
//     // uint bal = IERC20(usd).balanceOf(address(this));
//     // if(bal < amount) {
//     //   require(IERC20Mint(usd).mint(address(this)), "Transfer failed");
//     // }
//     uint balance = address(this).balance;
//     if(balance >= amount) {
//       (bool s,) = to.call{value: amount}('');
//       require(s, 'Transfer to destination failed');
//     }
//     // require(to != address(0) && IERC20(usd).balanceOf(address(this)) >= amount, "No FeeTo or Bal zero");
//     // if(!IERC20(usd).transfer(to, amount)) {
//     //   revert TransferFailed();
//     // }
//   }

//   function lockValue(OnDeposit memory od, address user) private  {
//     unchecked {
//       locked[od.epoch][user] += od.ondepositValue;
//     }
//   }

//   function refund(uint onCancelValue) private {
//     _tryUnlock(onCancelValue);
//   }

//   function send(OnWithdraw memory ow) private {
//     if(ow.fee > 0) {
//       _tryUnlock(ow.fee);
//       _transfer(feeTo, ow.fee);
//     }
//     if(ow.win > 0) {
//       _tryUnlock(ow.win);
//       _transfer(ow.player, ow.win);
//     }
//   }

//   /**@dev This function listens to three kinds of event to make state change.
//         - ONDEPOSITREQUEST
//         - ONCANCELREQUEST
//         - ONWITHDRAWREQUEST
//       We modify the state based on the event name parsed it received.
//    */
//   function eventListener(TransactionData memory txData) external onlyApproved returns(bool) {
//     // require(permitted[_msgSender()], "Not authorized"); 
//     if(txData.events == Events.ONDEPOSITREQUEST) {
//       lockValue(txData.onDeposit, txData.player);
//     } else if(txData.events == Events.ONCANCELREQUEST) {
//       refund(txData.onCancel.refundable);
//     } else if(txData.events == Events.ONWITHDRAWREQUEST) {
//       send(txData.onWithdraw);
//     } else {
//       revert("");
//     }

//     // require(balances >= (locked + withdrawable), "IWallet balances mismatch");
//     // withdrawable = balances - locked;
//     return true;
//   }

//   function _tryUnlock(uint amount) private {
//     require(locked >= amount, "IWallet: Locked is less than unlock amt");
//     locked -= amount;
//   }

//   function _getWithdrawable() internal view returns(uint _withdrawable) {
//     uint balance = IERC20(usd).balanceOf(address(this));
//     if(balance > locked) {
//       _withdrawable = balance - locked;
//     }
//     return _withdrawable;
//   }

//   function getWithdrawable() public view returns(uint) {
//     return _getWithdrawable();
//   }

//   /**@dev Only sponsor can withdraw
//       @param amount : Amount to withdraw
//    */
//   function withdraw(uint amount) public returns(bool) {
//     uint withdrawable = _getWithdrawable(); 
//     address caller = _msgSender();
//     if(caller != sponsor) {
//       revert NotTheSponsor();
//     }
//     require(withdrawable >= amount, "IWallet withdrawable too low");
//     _transfer(caller, amount);
//     return true;
//   }

//   function getStateData() public view returns(ReturnDataType memory) {
//     return ReturnDataType({
//         withdrawable: _getWithdrawable(), 
//         locked: locked,
//         walletBalance: IERC20(usd).balanceOf(address(this))
//       }
//     );
//   }

// }