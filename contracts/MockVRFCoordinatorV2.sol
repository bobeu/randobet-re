// // SPDX-License-Identifier: MIT 

// pragma solidity 0.8.28;

// import "@openzeppelin/contracts/utils/Address.sol";
// import { IVRFTestSetUp } from "./interfaces/IVRFTestSetUp.sol";

// interface VRFCoordinatorV2Interface {  
//   function requestRandomWords(
//     bytes32 keyHash,
//     uint subId,
//     uint32 requestConfirmations,
//     uint32 callbackGasLimit,
//     uint16 numOfRandomRequest
//   ) external returns(uint requestId);
// }

// contract MockVRFCoordinatorV2 is VRFCoordinatorV2Interface {
//   uint private ids;
//   address public vrfContract;
//   struct Request {
//     bytes32 keyHash;
//     uint subId;
//     uint reqId;
//     uint32 requestConfirmations;
//     uint32 callbackGasLimit;
//     uint16 numOfRandomRequest;
//   }

//   mapping(uint => uint[]) private randomWords;
//   mapping(uint => Request) public requests;

//   constructor() {
//     ids = 100;
//   }

//   receive() payable external {}

//   function setVRFContract(address _address) public {
//     vrfContract = _address; 
//   }

//   function requestRandomWords(
//     bytes32 keyHash,
//     uint subId,
//     uint32 requestConfirmations,
//     uint32 callbackGasLimit,
//     uint16 numOfRandomRequest
//   ) external returns(uint _return) {
//     _return = ids;
//     requests[_return] = Request(
//       keyHash,
//       subId,
//       _return,
//       requestConfirmations,
//       callbackGasLimit,
//       numOfRandomRequest
//     );
//     return _return;
//   }

//   function fulfilRandomRequest() public {
//     uint id = ids;
//     ids += 1;
//     Request memory _r = requests[id];
//     for(uint i = 0; i < _r.numOfRandomRequest; i++) {
//       randomWords[id].push(uint256(keccak256(abi.encodePacked(_r.keyHash, _r.subId, _r.requestConfirmations, _r.callbackGasLimit, i))));
//     }
//     require(
//       IVRFTestSetUp(vrfContract).fulfilRandomWords(id, randomWords[id]),
//       "Failed"
//     );

//   }

//   function allRandomWords(uint index) public view returns(uint[] memory) {
//     return randomWords[index];
//   }
// }