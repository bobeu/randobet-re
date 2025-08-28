// // SPDX-License-Identifier: MIT 

// pragma solidity 0.8.28;

// import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
// import {Pausable} from "@openzeppelin/contracts/utils/Pausable.sol";
// import {IRandoFuturesTest} from "../interfaces/IRandoFuturesTest.sol";
// import {IERC20} from "../interfaces/IERC20.sol";
// import { IVRFTestSetUp } from "../interfaces/IVRFTestSetUp.sol";
// import { IiWallet } from "../interfaces/IiWallet.sol";
// import { IWalletFactoryInterface } from "../interfaces/IWalletFactoryInterface.sol";

// /**@title RandoFuturesTest */
// contract RandoFuturesTest is IRandoFuturesTest, Ownable, Pausable {
//   uint public epoches;

//   // Last upkeep that was performed
//   UpKeep private lastUpkeep;

//   DataStruct public data;

//   IVRFTestSetUp private vrfCoordinator;
  
//   IWalletFactoryInterface public walletFactory;

//   /**@dev Mapping of epoches to stage
//     A Global circuit breaker for each epoches
//   */
//   mapping(uint => Stage) public stages;

//   // Bet validator
//   mapping(uint32 => bool) public isValidBet;

//   // Balances in each epoch
//   mapping(uint => Balance) public balances;

//   /**@dev
//     Active boards.
//   */
//   mapping(uint32 => Spin) private spinBoard;

//   // Mapping of players to address to bet/spin showing if they ever exist
//   mapping(address => mapping(uint32 => bool)) private isPlayer;

//   /**@dev Request Ids are specific to a players
//     It is generated when a request is sent to the oracle.
//    */
//   mapping(uint => Player) private requests;

//   /**
//    * Mapping showing if user has withdrawn from the previous epoch or not
//    */
//   mapping(address => mapping (uint => bool))public withdrawn;

//   modifier onlyForwarderOrOwner{
//     if(data.forwarder == address(0)) revert('Null 4wdr');
//     require(_msgSender() == data.forwarder || _msgSender() == owner(), 'Not permitted');
//     _;
//   }

//   modifier onlyPlayer(uint32 betType, address _caller, bool status, string memory errorMessage) {
//     _requireIsSpiner(betType, _caller, status, errorMessage);
//     _;
//   }

//   /**
//     @dev Initialized state varibles
//     Note: At construction, we set interval to 5mins.
//     @param _usd : Stable token address { Should be ERC20 compatible}. This is the contract
//                   address of the asset being used for deposit e.g USDT on BSC or other supported chains.
//     @param _feeTo : Address to receive fee.
//     @param betTypeList: Array of acceptable bet category/amount.

//    */
//   constructor( IERC20 _usd,  address _feeTo,  uint32[12] memory betTypeList) Ownable(msg.sender) {
//     require(address(_usd) != address(0), "USD is zero addr");
//     uint24 interval = 10 minutes;
//     data = DataStruct( interval, 1,  betTypeList, 15e14 wei, address(0), _feeTo, _usd);
//     for(uint i = 0; i < betTypeList.length; i++) {
//       isValidBet[betTypeList[i]] = true;
//     }
//     epoches ++;
//   }

//   receive() external payable {
//     (bool s,) = data.feeTo.call{value: msg.value}('');
//     require(s, 'ff');
//   }

//   function _validateBet(uint32 betType) internal view {
//     require(isValidBet[betType], 'Selected Treasure is invalid');
//   }

//   /**@dev Modifier checks whether miner should be true or not
//     based on the boolean flag
//   */
//   function _isPlayer(address caller, uint32 betType) internal view returns(bool isplayer) {
//     isplayer = isPlayer[caller][betType];
//   }

//   /**@dev Checks that player had given enough allowance while allowance should
//   also be above minimum spin.
//   @param target : Player ID
//   @param amount : Bet allowance
//   */
//   function _transferAllowance(address target, uint256 amount) private returns(bool _return) {
//     IERC20 usd = data.usd;
//     _return = IERC20(usd).transferFrom(target, address(this), amount);
//   }

//   /**@dev Converts to value with decimals
//     @param valueToConvert : Value to convert
//   */
//   function _toDecimals(uint32 valueToConvert) internal view returns(uint _decimals) {
//     IERC20 usd = data.usd;
//     _decimals = valueToConvert * (10**IERC20(usd).decimals());
//   }

//   function _now() internal view returns(uint _timeStamp) {
//     _timeStamp = block.timestamp;
  
//   }
  
//   /**@dev Transfer asset to @param to : recipient */
//   function _transfer(address to, uint256 amount) private returns(bool _return) {
//     _return = IERC20(data.usd).transfer(to, amount);
//   }

//   ///@dev Require caller is miner or not.
//   function _requireIsSpiner(uint32 betType, address _caller, bool status, string memory errorMessage) internal view {
//     require(_isPlayer(_caller, betType) == status, errorMessage);
//   }

//   /**@dev Here, we initialize all the 12 pool category with an empty content.
//       This ensures the pools are up to date in size. Although some pool may permanently 
//       have empty contents in a particular, this will happen if such pool (s) do not have subscribers
//       in that round.
//       It will as well avoid out-of-bound error when we query a spot using the 'round' state variable.

//       Note: We avoid triggering 'round' increment. This is the job of the ChainLink Keeper to transition
//       the round for us. For every 6 hours, the 'round' variable is incremented by the oracle which 
//       equivalently transition the contract global state for all the rounds in each bet category.

//       Function should be invoked by the oracle or from an authorized account 
//    */
//   function _resetBoards() private {
//     for(uint8 i = 0; i < data.spinList.length; i++) {
//       delete spinBoard[data.spinList[i]];
//     }
//   }

  
//     function _readWalletBalance(
//         address user,
//         uint expected
//     ) internal returns (uint256 balance, address _wallet) {
//         IWalletFactoryInterface.ReturnDataType
//             memory rt = IWalletFactoryInterface(walletFactory).hasWallet(user);
//         _wallet = rt.iWallet;
//         if(!rt.hasWallet) {
//             _wallet = IWalletFactoryInterface(walletFactory).getWallet(user);
//         }
//         require(_wallet != address(0), "No wallet found");
//         balance = IERC20(data.usd).balanceOf(_wallet);
//         require(
//             balance > 0 && (expected > 0 ? balance >= expected : true),
//             "Instant: Not enough balance in iWallet"
//         );
//     }

//   /**@dev Each round is switched to next at every 'interval' period. 
//     An indication that this function is callable anytime, except that it operates
//     based on the current round id. Round transit to the next when the forwarder 
//     invokes the 'performUpKeep()'. 
//    */
//   function placeBet(uint32 amount) 
//     external 
//     payable 
//     whenNotPaused
//     returns(bool) 
//   {
//     _validateBet(amount);
//     if(address(vrfCoordinator) == address(0)) revert VRFCoordinatorNotSet();
//     DataStruct memory _ds = data;
//     (, uint epoch,) = _getLastUpKeep();
//     address msgSender = _msgSender();
//     uint bet = amount * (10 ** IERC20(_ds.usd).decimals());
//     (, address _wallet) = _readWalletBalance(msgSender, bet);
//     Stage stage = stages[epoch];
//     require(stage == Stage.PLACEBET, stage == Stage.SPIN? "Spin mode" : "Stage is Closed");
//     if(_ds.oracleFee > 0) {
//       require(msg.value >= _ds.oracleFee, "Value too low");
//     }
//     _requireIsSpiner(amount, msgSender, false, 'User already in round');
//     balances[epoch].totalDeposits += bet;
//     isPlayer[msgSender][amount] = true;
//     if(msg.value > 0) {
//       (bool sent,) = _ds.feeTo.call{value: msg.value}('');
//       require(sent, 'Failed');
//     }
//     uint reqId = IVRFTestSetUp(vrfCoordinator).requestSpinTools(msgSender, amount, Consumers.FUTURES);
//     Spin memory sp = spinBoard[amount];
//     requests[reqId].addr = msgSender;
//     spinBoard[amount].spinPool = sp.spinPool + bet;
//     spinBoard[amount].unit = amount;
//     spinBoard[amount].players[sp.playerCount] = PlayerOutput(msgSender, 0, false);
//     spinBoard[amount].playerCount = sp.playerCount + 1;
//     // requestIds[amount][msgSender] = reqId;
//     IiWallet(_wallet).eventListener(
//       TransactionData(
//         Events.ONWITHDRAWREQUEST,
//         OnDeposit(0), 
//         OnCancel(0),
//         OnWithdraw(0, bet, address(this))
//       )
//     );
//     // require(_transferAllowance(msgSender, bet), "Fee or Treasure transfer failed");
//     emit PlayerAdded(msgSender, amount, epoch);

//     return true;
//   }

//   /**@dev We levereage the Chainlink Upkeep service to switch the different stages
//      A new epoch will be created when the previous epoch is about to close in this call session.
//      Note: Players have a max of 2 window intervals to withdraw from previous epoch.
//    */
//   function _performUpkeep(address forwarder) private {
//     (UpKeep memory luk, uint cEpoch, uint pEpoch) = _getLastUpKeep(); // Epoch is 1
//     uint24 interval = data.interval;
//     uint _nw = _now();
//     Stage nextStage = Stage(uint8(stages[cEpoch]) + 1);
//     if(_nw >= (luk.lastKeep + interval)){
//       lastUpkeep = UpKeep(forwarder, uint64(_nw + interval));
//       stages[cEpoch] = nextStage;
//       if(nextStage == Stage.RESOLVED) {
//         epoches ++;
//         Balance memory balOfPrevEpoch = balances[pEpoch];
//         if(balOfPrevEpoch.totalDeposits > 0) {
//           balances[pEpoch] = Balance(balOfPrevEpoch.totalDeposits, 0);
//         }
//       }
//     }
//   }

//   // See _performUpkeep()
//   /**@dev Oracle specific function.
//     For testing, we use dual-access method where an oracle or any authorized
//     account can invoke the keeper function.
//    */
//   function performUpkeep() external onlyForwarderOrOwner {
//     _performUpkeep(_msgSender());
//   }

//   /**@dev Spining.
//     Only approved players can spin.
//     Explicit function that must be invoked by the players.
//    */
//   function spin(uint32 betType) 
//     external
//     whenNotPaused
//     onlyPlayer(betType, _msgSender(), true, 'Caller not a player')
//     returns(bool) 
//   {
//     uint epoch = epoches;
//     Stage stage = stages[epoch];
//     require(stage == Stage.SPIN, "Stage in deposit mode");
//     _validateBet(betType);
//     (FulfilledRandomCallback memory req, uint reqId) = IVRFTestSetUp(vrfCoordinator).getRequest(_msgSender(), betType, Consumers.FUTURES);
//     SpinData memory _md = _getSpinData(betType, reqId);
//     IWalletFactoryInterface.ReturnDataType memory rt = IWalletFactoryInterface(walletFactory).hasWallet(_msgSender());
//     if(!req.fulfilled) { revert RequestNotFulfilled(); }
//     require(_md.spinPool > 0, "Pool Was Exhausted");
//     require(!_md.playerInfo.usedSpot, "Spot used");
//     requests[reqId].usedSpot = true;
//     if(_md.players > 0) {
//       uint found = uint256(req.value) % _md.spinPool; // Win or loss is a function of the generated VRF and the total pooled bets. 
//       if(_md.players == 1) {
//         found = _md.spinPool;
//       }
//       (uint32 bet) = (betType);
//       if(_md.players > 1) {
//         if(found == _md.spinPool) { // If player is lucky to find all the pool amt
//           found = found - (found / 10 ); // board fee is 10% flat
//           _md.fee = _md.spinPool - found;
//         } 
//       }
//       _md.spinPool -= found;
//       spinBoard[bet].spinPool = _md.spinPool;
//       requests[reqId].bal = found;
//       if(found > 0) {
//         _transfer(rt.iWallet, found);
//         IiWallet(rt.iWallet).eventListener(
//           TransactionData(
//             Events.ONDEPOSITREQUEST,
//             OnDeposit(found),
//             OnCancel(0),
//             OnWithdraw(0, 0, address(0))
//           )
//         );
//       }
//       if(_md.fee > 0) {
//         _transfer(data.feeTo, _md.fee);
//       }
//       emit Spinned(_md.msgSender, epoch);
//     }
//     return true;
//   }

//   // function withdraw(uint epoch, uint32 betType) 
//   //   external
//   //   onlyPlayer(betType, _msgSender(), true, "User not a player in round")
//   //   returns(bool _return) 
//   // {
//   //   address msgSender = _msgSender();
//   //   _validateBet(betType);
//   //   // uint reqId = _getRequestId(msgSender, betType);
//   //   uint reqId = IVRFTestSetUp(vrfCoordinator).getRequestId(_msgSender(), betType, Consumers.FUTURES);
//   //   (uint userBalance,,uint currentEpoch) = _getInternalBalance(reqId);
//   //   uint epochBalance = balances[epoch].totalDeposits;
//   //   require(epoch < currentEpoch, "Epoch is the current");
//   //   require(userBalance > 0 && epochBalance >= userBalance && !withdrawn[msgSender][epoch], "Nothing to withdraw");
//   //   withdrawn[msgSender][epoch] = true;
//   //   balances[epoch].totalDeposits -= userBalance;
//   //   delete requests[reqId];
//   //   (address sender, uint _epoch, uint32 _betType) = (msgSender, epoch, betType);
//   //   isPlayer[sender][_betType] = false;
//   //   require(_transfer(sender, userBalance), "Transfer failed");
//   //   emit PlayerWithdrawn(sender, _betType, _epoch, userBalance, balances[_epoch].totalDeposits);

//   //   return true;
//   // }

//   // function reBalance(uint epoch) external onlyOwner returns(bool _return) 
//   // {
//   //   Balance memory bal = balances[epoch];
//   //   require(stages[epoch] == Stage.RESOLVED, "Epoch is active");
//   //   require(bal.forfeitures > 0, "No forteitures");
//   //   balances[epoch].forfeitures = 0;
//   //   require(_transfer(data.feeTo, bal.forfeitures), "Rebalance: Transfer failed");

//   //   return true;
//   // }

//   function setOracleFee(uint newFee) public onlyOwner {
//     data.oracleFee = newFee;
//   }

//   /**@dev Update forwarder address.
//     OnlyOwner function.
//    */
//   function setForwarder(address forwarder) public onlyOwner {
//     require(forwarder != address(0), 'Invalid forwarder');
//     data.forwarder = forwarder;
//   }

//   function setFeeTo(address newFeeTo) public onlyOwner {
//     require(newFeeTo != address(0), 'Invalid feeTo');
//     data.feeTo = newFeeTo;
//   }

//   function setInterval(uint24 _newIntervalInMinutes) public onlyOwner {
//     data.interval = _newIntervalInMinutes;
//   }

//   /**@dev Returns the last upkeep that was performed, current epoch and epoch before the last.
//   */
//   function _getLastUpKeep() private view returns(UpKeep memory _lastUpKeep, uint currentEpoch, uint prevEpoch) {
//     currentEpoch = epoches;
//     prevEpoch = currentEpoch < 1 ? 0 : currentEpoch - 1;
//     _lastUpKeep = lastUpkeep;
//   }

//   function _getInternalBalance(uint requestId) internal view returns(uint userBalance, uint epochBalance, uint epoch) {
//     epoch = epoches;
//     userBalance = requests[requestId].bal;
//     epochBalance = balances[epoch - 1].totalDeposits;
//   }

//   ///@dev Get allowance of miner to contract
//   function _getAllowance(address _player, address beneficiary) internal view returns(uint256 _allowance) {
//     _allowance = IERC20(data.usd).allowance(_player, beneficiary);
//     require(_allowance > 0, 'No approval to spend');
//   }

//   function _getSpinData(uint32 betType, uint reqId) internal view returns(SpinData memory _m) {
//     _m = SpinData(
//       spinBoard[betType].spinPool,
//       requests[reqId],
//       _msgSender(),
//       spinBoard[betType].playerCount,
//       0
//     );
//   }

//   /////////////////// ReadOnly { Public } functions /////////////////////////
//     /** @dev For testing purposes, we use this method to stream data to the frontend.
//     Note: We aren't fetching for previous epoched. Our concern is current epoch.
//     ReturnType : GetData struct
//     {
//       - Spin[12]
//       - DataStruct
//       - UpKeep
//     }

//   */
//   function getData(address user) public view returns(GetData memory _data) {
//     (UpKeep memory prevUpKeep, uint epoch,) = _getLastUpKeep();
//     IWalletFactoryInterface.ReturnDataType memory rt = IWalletFactoryInterface(walletFactory).hasWallet(user);
//     _data.misc = MiscData(stages[epoch], rt.iWallet);
//     _data.data = data;
//     _data.data.currentEpoch = epoch;
//     _data.upkeep = prevUpKeep;
//     uint32[12] memory category = data.spinList;
//     uint size = category.length;
//     for(uint i = 0; i < size; i++) {
//       _data.spin[i] = spinBoard[category[i]];
//     }
//     return _data;
//   }

//   function checkMyBalance(uint32 betType) 
//     public 
//     view
//     onlyPlayer(betType, _msgSender(), true, "User not a player")
//     returns(uint256 _return) 
//   {
//     _validateBet(betType);
//     uint reqId = IVRFTestSetUp(vrfCoordinator).getRequestId(_msgSender(), betType, Consumers.FUTURES);
//     (uint bal,,) = _getInternalBalance(reqId);
//     return bal;
//   }

  
//   /**@dev Switch between erc20 tokens anytime.
//     This is helpful during development especially live testing
//    */
//   function setToken(IERC20 newUSD) public onlyOwner {
//     require(address(newUSD) != address(0), 'RF is 0');
//     data.usd = newUSD;
//   }

//   function setIVRFCoordinator(address vrf) public onlyOwner returns(bool) {
//     require(vrf != address(0), "vrf is zero address");
//     vrfCoordinator = IVRFTestSetUp(vrf);
//     return true;
//   }
// }
