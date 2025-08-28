// // SPDX-License-Identifier: MIT

// pragma solidity 0.8.28;

// import { ICommon } from "./ICommon.sol";
// import { IRandoTest } from "./IRandoTest.sol";

// interface IVRFTestSetUp is ICommon, IRandoTest {
//   function requestSpinTools(address user, uint betType, Consumers consumer) external returns(uint256 requestId);
//   function getRequestId(address user, uint betType, Consumers consumer) external view returns(uint256 requestId);
//   function getRequest(address user, uint betType, Consumers consumer) external view returns(FulfilledRandomCallback memory req, uint reqId);
// }