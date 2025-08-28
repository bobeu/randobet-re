// // SPDX-License-Identifier: MIT

// pragma solidity 0.8.28;

// import { IRandoFutures } from "../interfaces/IRandoFutures.sol";

// interface IDrawLogic {
//   function drawResult(
//     IRandoFutures.Player[] memory player,
    
//   ) external returns(bool);
// }

// contract DrawLogic is IDrawLogic {
//   function drawResult(uint[] memory randoPults, IRandoFutures.Player memory players) external returns(bool) {
//     require(randoPults.length == player.length);
//     for(uint i = 0; i < players.length; i++) {
//         bytes32 pult = _fulfillRandomPults(randomPults[i]);
//         if(pult > 0) {
//             found = uint256(pult) % _md.pool;
//             if(found == _md.pool) { // If player is lucky to find all the pool amt
//                 // spinBoard[epoch][bet].pool = 0;
//                 found = _md.pool - (found / _md.fee.flat);
//                 _md.boardFee += _md.pool - found;
//                 _md.pool = 0;
//                 break;
//             } else {
//                 if(found >= _md.pool) {
//                     found = _md.pool;
//                     // spinBoard[epoch][bet].pool = 0;
//                     _md.boardFee += _md.pool - found;
//                     _md.pool = 0;
//                     break;
//                 } else {
//                     // spinBoard[epoch][bet].pool = _md.pool - found;
//                     _md.pool -= found;
//                     _md.boardFee += found / _md.fee.other;
//                     found = found - (found / _md.fee.other); 
//                 }
                
//             }
//             // _runDraw(bet, fulfilledPult, epoch, trigger, players[i].addr);
//         }

//         if(found > 0) {
//             uint spot = _getSpotId(players[i].addr, bet, epoch);
//             spinBoard[epoch][bet].players[spot].bal += found;
//         }
//     }
//     return true;
//   }
// }