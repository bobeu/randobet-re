// SPDX-License-Identifier: MIT

pragma solidity 0.8.28;

interface IRandoFutures {  
  event Drawn(address indexed trigger, uint indexed epoch, Spin);
  event BetPlaced(address indexed player, uint bet, uint indexed epoch, Spin);
  event RewardClaimed(address indexed player, uint bet, uint indexed epoch, uint amount, uint epochCurrentBalance);

  // Flat fee can be 10 = 10%, 20 = 5% , etc
  struct Fee {
    uint8 flat; 
    uint8 other;
  }

  struct SpinData {
    uint pool;
    Fee fee;
    uint boardFee;
    uint players;
  }

  struct Player {
    address addr;
    uint256 bal;
  }

  struct OData {
    uint16 requestConfirmations;
    uint32 callbackGasLimit;
    bytes32 keyHash;
  }

  struct Spin {
    uint unit;
    uint pool;
    Player[] players;
  }

  struct DataStruct {
    uint playerFee;
    address feeTo;
    uint64 lastDraw;
    uint64 drawInterval;
  }

  struct RandoState {
    uint epoches;
    DataStruct data;
  }

  struct GetData {
    Spin spin;
    RandoState state;
    uint currentEpochBet;
    uint nextEpochBet;
    uint deadEpoch;
  }

  // function placeBet(uint selectedAmt) external payable returns(bool);
  // function getDeadline(uint epoch) external view returns(uint64);
  // function spin(uint bet, address player, uint256[] memory randomPults) external returns(bool);
}