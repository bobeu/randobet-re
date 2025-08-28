// // SPDX-License-Identifier: MIT

// pragma solidity 0.8.28;

// import { IWalletFactory } from "./interfaces/IWalletFactory.sol";
// import { IRandoWallet } from "./interfaces/IRandoWallet.sol";
// import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
// import { Approved } from "./abstracts/Approved.sol";

// contract WalletFactory is IWalletFactory, Approved {
//     address public feeTo;
//     mapping(address => address) private wallets;

//     constructor(address _feeTo) {
//         require(_feeTo != feeTo, "Feeto is zero");
//         feeTo = _feeTo;
//     }

//     function getWallet(uint bet) external whenNotPaused onlyApproved returns(address) {
//         return _getWallet(bet);
//     }

//     function _getWallet(uint bet) internal returns(address _wallet) {
//         ReturnDataType memory w = wallets[bet];
//         if(!w.hasWallet) {
//             w.wallet = address(new IRandoWallet(feeTo, futures, instant));
//             wallets[bet] = w.wallet;
//         }
//         return w.wallet;
//     } 

//     function hasWallet(uint bet) external view returns(ReturnDataType memory _rdt){
//         address _wallet = wallets[bet];
//         return ReturnDataType({
//             hasWallet: _wallet != address(0),
//             iWallet: _wallet
//         });
//     }

//     function setPermittedContracts(address[] betFactories) public whenNotPaused onlyApproved returns(bool) {
//         for(uint8 i = 0; i < betFactories.length; i++) {
//             address target = betFactories[i];
//             if(!_isApproved(target)) _setPermission(target, true);
//         }
//         return true;
//     }
// }