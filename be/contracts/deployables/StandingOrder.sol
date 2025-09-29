// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import { ReentrancyGuard } from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

interface IStandingOrder {
    struct Order {
        uint256 balances;
        address addr;
    }

    function getOrders(uint256 bet) external returns(Order[] memory _orders);
}

contract StandingOrder is IStandingOrder, ReentrancyGuard, Ownable {
    address public betFactory;

    ///@dev Mapping of users to positions in orders array
    mapping(address user => uint orderIndex) private indexes;

    ///@notice Mapping showing whether user has spot or not
    mapping(address user => bool) public hasSpot;

    ///@notice orders
    Order[] private orders;

    constructor() Ownable(_msgSender()) {}
 
    ///@dev Open order/increase order balances
    function openOrder() public payable returns(bool) {
        uint256 value = msg.value;
        require(value > 0, "Zero value");
        address sender = _msgSender();
        uint spot = indexes[sender];
        if(!hasSpot[sender]){
            spot = orders.length;
            hasSpot[sender] = true;
            indexes[sender] = spot;
            orders.push(Order(value, sender));
        } else {
            if(value > 0) {
                orders[spot].balances += value;
            }
        }

        return true;
    }

    ///@notice Withdraw order balances
    function closeOrder() public nonReentrant returns(bool) {
        address sender = _msgSender();
        require(hasSpot[sender], "No order found");
        uint spot = indexes[sender];
        uint balances = orders[spot].balances;
        require(balances > 0, "Zero balances");
        orders[spot].balances = 0;
        (bool sent,) = sender.call{value: balances}("");
        require(sent, 'Transfer failed');
        return true;
    }

    ///@notice Get orders
    function getOrders(uint256 bet) external returns(Order[] memory _orders) {
        address bf = betFactory;
        require(bf != address(0), "Bet Factory is zero address");
        require(_msgSender() == bf, "Not Authorized");
        _orders = orders;
        uint256 amount;
        for(uint i = 0; i < _orders.length; i++) {
            Order memory ord = _orders[i];
            if(ord.balances >= bet && ord.addr != address(0)) {
                unchecked {
                    amount += bet;
                    orders[i].balances -= bet;
                }
            }
        }
        if(amount > 0) {
            (bool sent,) = bf.call{value: amount}("");
            require(sent, "TF Failed");
        }
        return orders;
    }

    ///@notice Set new bet factory address
    function setBetFactory(address newFactory) public onlyOwner returns(bool) {
        if(newFactory != betFactory) betFactory = newFactory;
        return true;
    }

    function getAllOrders() external view returns(Order[] memory _orders) {
        _orders = orders;
        return _orders; 
    }

}
