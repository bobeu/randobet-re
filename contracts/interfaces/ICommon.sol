// SPDX-License-Identifier: MIT

pragma solidity 0.8.28;

interface ICommon {
  // enum Events { ONDEPOSITREQUEST, ONCANCELREQUEST, ONWITHDRAWREQUEST }
  // enum Consumers { FUTURES, INSTANT }

  // struct OnDeposit {
  //   uint epoch;
  //   uint value;
  // }

  // struct OnCancel {
  //   uint epoch;
  //   uint refundable;
  // }

  // struct OnWithdraw {
  //   uint epoch;
  //   uint fee;
  //   uint win;
  //   address player;
  // }

  // struct TransactionData {
  //   address player;
  //   Events events;
  //   OnDeposit onDeposit;
  //   OnCancel onCancel;
  //   OnWithdraw onWithdraw;
  // }

  // struct ChainLinkData {
  //   uint16 requestConfirmations;
  //   uint32 callbackGasLimit;
  //   bytes32 keyHash;
  // }

  // struct FulfilledRandomCallback {
  //   bool fulfilled;
  //   bytes32 value;
  // }
}