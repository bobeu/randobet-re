// SPDX-License-Identifier: MIT 

pragma solidity 0.8.28;

import { IRandoFutures } from "../interfaces/IRandoFutures.sol";
import { Approved } from "./Approved.sol";

abstract contract DrawData is IRandoFutures, Approved {
    RandoState internal state;

    function  setDataStruct(
        uint24 drawInterval, 
        address feeTo, 
        uint playerFee
    ) public onlyApproved {
        if (playerFee != state.data.playerFee && playerFee > 0) {
            state.data.playerFee = playerFee;
        }
        if (feeTo != state.data.feeTo && feeTo != address(0)) {
            state.data.feeTo = feeTo;
        }
        if (drawInterval != state.data.drawInterval && drawInterval > 0) {
            state.data.drawInterval = drawInterval * 1 minutes;
        }
    }

    function _currentDate() internal view returns(uint64 _date){
        _date = uint64(block.timestamp);
    }

}