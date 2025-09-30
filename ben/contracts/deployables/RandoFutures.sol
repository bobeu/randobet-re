// SPDX-License-Identifier: MIT 

pragma solidity 0.8.28;

import { IERC20 } from "../interfaces/IERC20.sol";
import { VRFSetUp } from "../abstracts/VRFSetUp.sol";
import { DrawData } from "../abstracts/DrawData.sol";
import { ReentrancyGuard } from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import { IDeadBalance } from "./FeeReceiver.sol";
import { IStandingOrder } from "./StandingOrder.sol";

contract RandoFutures is DrawData, VRFSetUp, ReentrancyGuard {

    error NothingToClaim();
    error EpochBalanceIsLow();
    error NoRewardFound();
    error TransferFailed();
    error NotAPlayer();
    error InsufficientValue();
    error MaxPlayersReached();
    error PlayerAlreadyInRound();
    error DrawNotReady();
    error InsufficientPults();
    error PoolMisMatch();

    Fee public fee;

    uint internal deadEpoch;

    uint public maxPlayer;

    IStandingOrder internal orderBox;

    mapping(uint epochId => uint) public betList;

    mapping(uint epoch => mapping(uint bet => Spin)) public spinBoard;

    mapping(address player => mapping(uint epoch => mapping(uint bet => bool))) public isPlayer;

    mapping(address => uint256) public triggereRewards;

    constructor(uint bet, uint8 flatFee, uint8 otherFee) {
        require(bet > 0, "Invalid bet detected");
        betList[state.epoches] = bet;
        state.data.lastDraw = uint64(_now());
        _setMaxPlayer(50);
        _setFee(Fee({other: otherFee, flat: flatFee}));
    }

    receive() external payable {}

    function _now() internal view returns (uint _timeStamp) {
        _timeStamp = block.timestamp;
    }

    function _sendValue(address to, uint amount) internal {
        if(amount > 0) {
            (bool sent, ) = to.call{value: amount}("");
            if(!sent) revert TransferFailed();
        }
    }

    function _setMaxPlayer(uint24 _maxPlayer) internal {
        maxPlayer = _maxPlayer;
    }

    function _setFee(Fee memory _fee) internal {
        if(_fee.flat != fee.flat) fee.flat = _fee.flat;
        if(_fee.other != fee.other) fee.other = _fee.other;
    }

    function setFee(uint8 flat, uint8 otherFee) public onlyApproved returns(bool) {
        _setFee(Fee({other: otherFee, flat: flat}));
        return true;
    }

    function _transfer(address to, uint256 amount) private {
        if(address(this).balance >= amount){
            _sendValue(to, amount);
        }
    }

    function setMaxPlayer(uint24 newMaxPlayer) public onlyApproved() returns(bool) {
        _setMaxPlayer(newMaxPlayer);
        return true;
    }

    function withdraw(uint epoch) 
        public 
        nonReentrant
        returns(bool) 
    {
        address sender = _msgSender();
        uint256 bet = betList[epoch];
        if(!isPlayer[sender][epoch][bet]) revert NotAPlayer();
        uint spot = _getSpotId(sender, bet, epoch);
        uint epochBalance = spinBoard[epoch][bet].pool;
        uint claim = spinBoard[epoch][bet].players[spot].bal;
        if(claim == 0) revert NothingToClaim();
        spinBoard[epoch][bet].players[spot].bal = 0;
        if(epochBalance < claim) revert EpochBalanceIsLow();
        unchecked {
            spinBoard[epoch][bet].pool = epochBalance - claim;
        }
        _validateStatus(sender);
        _sendValue(sender, claim);

        emit RewardClaimed(sender, bet, epoch, claim, epochBalance - claim);
        return true;
    }

    /**@dev Complete bet placing step
        @param bet : Bet amount
        @param epoch: Epoch Id
        @param player : Target player account
     */
    function _completePlaceBet(uint bet, uint epoch, address player) internal {
        isPlayer[player][epoch][bet] = true;
        unchecked {
            spinBoard[epoch][bet].pool += bet;
        }
        spinBoard[epoch][bet].unit = bet;
        uint spotId = spinBoard[epoch][bet].players.length;
        _setSpotId(player, bet, epoch, spotId);
        spinBoard[epoch][bet].players.push(Player(
            player,
            0,
            bet,
            _now()
        ));

        emit BetPlaced(player, bet, epoch, spinBoard[epoch][bet]);
    }

    function claimTriggerReward() 
        public 
        nonReentrant
        returns(bool) 
    {
        address sender = _msgSender();
        _validateStatus(sender);
        uint reward = triggereRewards[sender];
        if(reward == 0) revert NoRewardFound();
        triggereRewards[sender] = 0;
        _sendValue(sender, reward);

        return true;
    }

    function placeBet() external payable whenNotPaused returns (bool) {
        DataStruct memory _ds = state.data;
        uint epoch = _getEpoch();
        uint bet = betList[epoch];
        unchecked {
            if(msg.value < (bet + _ds.playerFee)) revert InsufficientValue();
        }
        Spin memory sp = spinBoard[epoch][bet];
        if(sp.players.length == maxPlayer) revert MaxPlayersReached();
        address player = _msgSender();
        _validateStatus(player);
        if(isPlayer[player][epoch][bet]) revert PlayerAlreadyInRound();
        isPlayer[player][epoch][bet] = true;
        _sendValue(_ds.feeTo, _ds.playerFee);
        _completePlaceBet(bet, epoch,  player);

        return true;
    }

    function runDraw(bytes32[] memory randomPults, address trigger)
        external
        whenNotPaused
        onlyApproved
        returns (bool)
    { 
        if(_currentDate() < (state.data.lastDraw + state.data.drawInterval)) revert DrawNotReady();
        state.data.lastDraw = _currentDate();
        uint epoch = _getEpoch();
        uint bet = betList[epoch];
        Player[] memory players = spinBoard[epoch][bet].players;
        uint found;
        SpinData memory _md = _getSpinData(bet, epoch);
        if(randomPults.length < players.length) revert InsufficientPults();
        unchecked {
            if(players.length > 0){
                if(_md.pool < (bet * players.length)) revert PoolMisMatch();
                if(epoch >= 2 && ((epoch % 2) == 0)){
                    IDeadBalance(state.data.feeTo).burn{value:spinBoard[deadEpoch][bet].pool}(deadEpoch);
                    spinBoard[deadEpoch][bet].pool = 0;
                }
                uint spot;
                if(players.length == 1) {
                    found = _md.pool;
                    _md.pool = 0;
                    spot = _getSpotId(players[0].addr, bet, epoch);
                    spinBoard[epoch][bet].players[spot].bal += found;
                } else {
                    for(uint i = 0; i < players.length; i++) {
                        uint256 pult = _fulfillRandomPults(randomPults[i]);
                        spot = _getSpotId(players[i].addr, bet, epoch);
                        if(pult > 0) {
                            if(_md.pool > 0) {
                                found = pult % _md.pool;
                                if(found >= _md.pool) { // If player is lucky to find all the pool amt
                                    found = _md.pool - (found / _md.fee.flat);
                                    _md.boardFee += _md.pool - found;
                                    _md.pool = 0;
                                    break;
                                } else {
                                    uint _fee = found / _md.fee.other; 
                                    _md.pool -= found;
                                    found = found - _fee; 
                                    _md.boardFee += _fee;
                                }
                            }
                        }
                        if(found > 0) {
                            spinBoard[epoch][bet].players[spot].bal += found;
                        }
                    }
                } 
                if(_md.boardFee > 0) {
                    spinBoard[epoch][bet].pool -= _md.boardFee;
                    found = _md.boardFee / 5;
                    if(found > 0) triggereRewards[trigger] += found; // Reward the trigger
                    _transfer(state.data.feeTo, _md.boardFee - found);
                }
                emit Drawn(trigger, epoch, spinBoard[epoch][bet]);
            }
            if(epoch >= 2 && ((epoch % 2) == 0)) deadEpoch ++;
            state.epoches ++;
            _updateRoundWithOrders(_updateBetList(0, false, bet) + state.data.playerFee);
        }
        return true;
    }

    function _updateRoundWithOrders(uint bet) internal {
        RandoState memory st = state;
        IStandingOrder.Order[] memory ords = orderBox.getOrders(bet + st.data.playerFee);
        if(ords.length > 0) {
            for(uint i = 0; i < ords.length; i++) {
                if(verifier.isVerified(ords[i].addr)) {
                    if(!isPlayer[ords[i].addr][st.epoches][bet]){
                        _sendValue(st.data.feeTo, st.data.playerFee);
                        _completePlaceBet(bet, st.epoches, ords[i].addr);
                    }
                }
            }
        }
    }

    function updateRoundWithOrders() public whenNotPaused returns(bool) {
        uint bet = betList[state.epoches];
        _updateRoundWithOrders(bet);
        return true;
    }

    function _getEpoch() internal view returns (uint currentEpoch){
        currentEpoch = state.epoches;
    }

    function _getSpinData(uint bet, uint epoch) internal view returns (SpinData memory sData) {
        sData = SpinData({
                pool: spinBoard[epoch][bet].pool,
                fee: fee,
                boardFee: 0,
                players: spinBoard[epoch][bet].players.length
            });
    }

    function getData() external view returns (GetData memory _data) {
        return getDataByEpoch(_getEpoch());
    }

    function getDataByEpoch(uint epoch) public view returns (GetData memory _data) {
        require(epoch <= _getEpoch(), "Invalid epoch");
        _data.deadEpoch = deadEpoch;
        uint bet = betList[epoch]; 
        _data.state = state;
        _data.currentEpochBet = bet;
        _data.nextEpochBet = betList[epoch + 1];
        _data.spin = spinBoard[epoch][bet];
        return _data;
    }

    function isDrawNeeded() external view returns(bool drawNeeded) {
      uint64 interval = state.data.drawInterval;
      drawNeeded = _currentDate() >= (state.data.lastDraw + interval);
      return drawNeeded;
    }

    /**@dev Get the balance of target address in a pool from a specific epoch
     */
    function checkBalance(uint epoch, address target) external view returns(uint256 bal) {
        uint bet = betList[epoch];
        if(isPlayer[target][epoch][bet]){
            uint spot = _getSpotId(_msgSender(), bet, epoch);
            bal = spinBoard[epoch][bet].players[spot].bal;
        }
        return bal;
    }

    function _checkEpochBalance(uint bet, uint epoch) internal view returns(uint256 bal) {
        bal = spinBoard[epoch][bet].pool;
    }
 
    function checkEpochBalance(uint epoch) external view returns(uint256) {
        return _checkEpochBalance(betList[epoch], epoch);
    }

    // Return total bet balances in the pool at current epoch
    function getBalanceFromCurrentEpoch() external view returns(uint256) {
        uint epoch = state.epoches;
        uint bet = betList[epoch];
        return  _checkEpochBalance(bet, epoch);
    }

    function _updateBetList(uint bet, bool isUpfront, uint prevBet) internal returns(uint newBet) {
        uint epoch = isUpfront ? state.epoches + 1 : state.epoches;
        if(bet > 0) {
            betList[epoch] = bet;
        } else {
            uint _bet = betList[epoch];
            if(_bet > 0){
                betList[epoch] = _bet;
            } else {
                betList[epoch] = prevBet;
            }
        }
        newBet =  betList[epoch];
    }

    function setBetListUpfront(uint bet) public onlyApproved {
        _updateBetList(bet, true, 0);
    }

    function setOrderBox(IStandingOrder _orderBox) public onlyApproved() returns(bool) {
        if(_orderBox != orderBox) orderBox = _orderBox;
        return true;
    }
}
