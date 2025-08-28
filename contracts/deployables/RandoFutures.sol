// SPDX-License-Identifier: MIT 

pragma solidity 0.8.28;

import { IERC20 } from "../interfaces/IERC20.sol";
import { VRFSetUp } from "../abstracts/VRFSetUp.sol";
import { DrawData } from "../abstracts/DrawData.sol";
import { ReentrancyGuard } from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import { IDeadBalance } from "./FeeReceiver.sol";

contract RandoFutures is DrawData, VRFSetUp, ReentrancyGuard {

    Fee public fee;

    uint internal deadEpoch;

    mapping(uint epochId => uint) public betList;

    mapping(uint epoch => mapping(uint bet => Spin)) public spinBoard;

    mapping(address player => mapping(uint epoch => mapping(uint bet => bool))) public isPlayer;

    mapping(address => uint256) public triggereRewards;

    constructor(uint bet, uint8 flat, uint8 otherFee) {
        require(bet > 0, "Invalid bet in detected");
        betList[0] = bet;
        _setFee(Fee({other: otherFee, flat: flat}));
    }

    receive() external payable {}

    function _now() internal view returns (uint _timeStamp) {
        _timeStamp = block.timestamp;
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
            (bool s,) = to.call{value:amount}('');
            require(s,"Transfer failed");
        }
    }

    function withdraw(uint bet, uint epoch, address player, address recipient) 
        public 
        onlyApproved
        nonReentrant
        returns(bool) 
    {
        require(isPlayer[player][epoch][bet], "Not a player");
        require(bet == betList[epoch], "Invalid bet");
        require(player != address(0), "Player address is invalid");
        require(recipient != address(0), "Recipient address is invalid");
        uint spot = _getSpotId(player, bet, epoch);
        uint epochBalance = spinBoard[epoch][bet].pool;
        uint claim = spinBoard[epoch][bet].players[spot].bal;
        // require(epochBalance >= claim, "Epoch balance is low");
        unchecked {
            spinBoard[epoch][bet].pool = epochBalance - claim;
        }
        spinBoard[epoch][bet].players[spot].bal = 0;
        _checkPlayerVerificationStatus(player);
        (bool s,) = recipient.call{value:claim}("");
        require(s, "Transfer failed");

        emit RewardClaimed(player, bet, epoch, claim, epochBalance - claim);
        return true;
    }

    function getTriggerReward(address recipient, address target) 
        public 
        onlyApproved
        nonReentrant
        returns(bool) 
    {
        _checkPlayerVerificationStatus(target);
        uint _triggerReward = triggereRewards[target];
        require(_triggerReward > 0, "No reward found");
        require(recipient != address(0), "Invalid recipient");
        triggereRewards[target] = 0;
        (bool s,) = recipient.call{value:_triggerReward}("");
        require(s, "Transfer failed");
        return true;
    }

    function placeBet() external payable whenNotPaused returns (bool) {
        DataStruct memory _ds = state.data;
        uint epoch = _getEpoch();
        uint bet = betList[epoch];
        require(msg.value >= bet, "Invalid bet");
        Spin memory sp = spinBoard[epoch][bet];
        require(sp.players.length <= 50, "Max players reached");
        address player = _msgSender();
        _checkPlayerVerificationStatus(player);
        require(!isPlayer[player][epoch][bet], "Already a player");
        isPlayer[player][epoch][bet] = true;
        unchecked {
            require(msg.value >= (_ds.playerFee + bet), "Value too low");
        }
        if(_ds.playerFee > 0) {
            (bool z, ) = _ds.feeTo.call{value: _ds.playerFee}("");
            require(z, "Fee sending failed");
        }
        unchecked {
            spinBoard[epoch][bet].pool = sp.pool + bet;
        }
        spinBoard[epoch][bet].unit = bet;
        uint spotId = spinBoard[epoch][bet].players.length;
        _setSpotId(player, bet, epoch, spotId);
        spinBoard[epoch][bet].players.push(Player(
            player,
            0
        ));
        emit BetPlaced(player, bet, epoch, spinBoard[epoch][bet]);

        return true;
    }

    function runDraw(uint256[] memory randomPults, uint _nextBet, address trigger)
        external
        whenNotPaused
        onlyApproved
        returns (bool)
    { 
        require(_currentDate() >= (state.data.lastDraw + state.data.drawInterval), "Draw date in future");
        state.data.lastDraw = _currentDate();
        uint epoch = _getEpoch();
        uint bet = betList[epoch];
        Player[] memory players = spinBoard[epoch][bet].players;
        uint found;
        SpinData memory _md = _getSpinData(bet, epoch);
        require(randomPults.length == players.length, "Invalid pults size for players");
        unchecked {
            if(players.length > 0){
                require(_md.pool >= (bet * players.length), "Pool bal not match");
                if(epoch >= 2 && ((epoch % 2) == 0)){
                    IDeadBalance(state.data.feeTo).burn{value:spinBoard[deadEpoch][bet].pool}(deadEpoch);
                    spinBoard[deadEpoch][bet].pool = 0;
                }
                if(players.length == 1) {
                    found = _md.pool;
                    spinBoard[epoch][bet].pool = 0;
                } else {
                    for(uint i = 0; i < players.length; i++) {
                        bytes32 pult = _fulfillRandomPults(randomPults[i]);
                        if(pult > 0) {
                            found = uint256(pult) % _md.pool;
                            if(found == _md.pool) { // If player is lucky to find all the pool amt
                                // spinBoard[epoch][bet].pool = 0;
                                found = _md.pool - (found / _md.fee.flat);
                                _md.boardFee += _md.pool - found;
                                _md.pool = 0;
                                break;
                            } else {
                                if(found >= _md.pool) {
                                    found = _md.pool;
                                    // spinBoard[epoch][bet].pool = 0;
                                    _md.boardFee += _md.pool - found;
                                    _md.pool = 0;
                                    break;
                                } else {
                                    // spinBoard[epoch][bet].pool = _md.pool - found;
                                    _md.pool -= found;
                                    _md.boardFee += found / _md.fee.other;
                                    found = found - (found / _md.fee.other); 
                                }
                                
                            }
                            // _runDraw(bet, fulfilledPult, epoch, trigger, players[i].addr);
                        }

                        if(found > 0) {
                            uint spot = _getSpotId(players[i].addr, bet, epoch);
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
            _setBetListUpfront(_nextBet);
            state.epoches ++;
        }
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

    function getData() public view returns (GetData memory _data) {
        uint epoches = _getEpoch();
        _data.deadEpoch = deadEpoch;
        uint bet = betList[epoches]; 
        _data.state = state;
        _data.currentEpochBet = bet;
        _data.nextEpochBet = betList[epoches + 1];
        _data.spin = spinBoard[epoches][bet];
        return _data;
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

    function checkDraw() external view returns(bool drawNeeded) {
      uint64 interval = state.data.drawInterval;
      drawNeeded = _currentDate() >= (state.data.lastDraw + interval);
      return drawNeeded;
    }

    function checkBalance(uint bet, uint epoch) external view returns(uint256) {
        require(isPlayer[_msgSender()][epoch][bet], "Not a player");
        uint spot = _getSpotId(_msgSender(), bet, epoch);
        return spinBoard[epoch][bet].players[spot].bal;
    }

    function checkEpochBalance(uint bet, uint epoch) external view returns(uint256) {
        require(bet >= betList[epoch], "Invalid bet");
        return spinBoard[epoch][bet].pool;
    }

    function _setBetListUpfront(uint bet) internal {
        uint nextEpoch = state.epoches + 1;
        if(bet > 0) {
            betList[nextEpoch] = bet;
        } else {
            uint _bet = betList[state.epoches];
            if(_bet > 0){
                betList[nextEpoch] = _bet;
            } else {
                betList[nextEpoch] = 1 ether;
            }
        }
    }

    function setBetListUpfront(uint bet) public onlyApproved {
        _setBetListUpfront(bet);
    }
}
