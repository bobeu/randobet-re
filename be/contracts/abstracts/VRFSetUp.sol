// SPDX-License-Identifier: MIT

pragma solidity 0.8.28;

import { IVerifier } from "../interfaces/IVerifier.sol";

abstract contract VRFSetUp {

  IVerifier public verifier;

  mapping(uint epoch => mapping(address => mapping(uint bet => uint))) internal spotIds;

  // function _toHash(uint arg) internal pure returns(bytes32 _hashed) {
  //   _hashed = keccak256(abi.encodePacked(arg));
  // }

  function _fulfillRandomPults(bytes32 randomPult) internal pure returns(uint256 reqs) {
    reqs = uint256(randomPult);
  }

  function _getSpotId(address player, uint bet, uint epoch) internal view returns(uint spotId) {
    spotId = spotIds[epoch][player][bet];
  }

  function _setSpotId(address player, uint bet, uint epoch, uint spotId) internal {
    spotIds[epoch][player][bet] = spotId;
  }

  function setVerifier(IVerifier _verifier) public returns(bool) {
    require(address(_verifier) != address(0), "Verifier is zero");
    verifier = _verifier;
    return true;
  }

  function _validateStatus(address player) internal view {
    require(verifier.isVerified(player), "Player not verified");
  }
}