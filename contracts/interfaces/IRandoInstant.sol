// // SPDX-License-Identifier: MIT

// pragma solidity 0.8.28;

// import { ICommon } from './ICommon.sol';

// interface IRandoInstant is ICommon {
//   enum Status { NULL, OPEN, CLOSED }

//   event Spinned(Position position, uint positionId);
//   event NewPosition(address indexed setter, uint value, uint positionId);
//   event PositionClosed(address indexed creator, uint value, uint positionId);
//   event Withdrawal(address indexed caller, uint amount);

//   struct ProofOfInteraction {
//     uint player;
//     uint sponsor;
//   }

//   struct Profile {
//     bool exist;
//     // address iWallet;
//     uint totalLocked;
//     ProofOfInteraction profit;
//   }

//   struct Position {
//     uint index;
//     uint256 win;
//     uint256 totalBet;
//     address player;
//     address creator;
//     Status status;
//     bool isPlayerWithdrawn;
//   }

//   struct GetData {
//     Profile profile;
//     Position[] positions;
//     uint minimumDeposit;
//     uint oracleFee;
//     address iWallet;
//   }

//   error NotExist();
//   error TransferFailed();
//   error NothingToWithdraw();
//   error PositionIdOutOfBound();
//   error PositionNotFulfilled();
//   error CannotClosePosition();
//   error AddressIsZero(address);
//   error NotAPlayer(address caller);
//   error SponsoredApprovalNotFound();
//   error DepositSourceContractFailed();

//   function openNewPosition(uint amount) external payable returns(bool);
//   function closePosition(uint positionId) external returns(bool);
//   function spin(uint positionId) external returns(bool);
// }
