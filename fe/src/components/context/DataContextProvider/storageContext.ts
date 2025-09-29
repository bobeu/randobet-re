import type { BetData, Order } from "../../../types";

export interface DataContextProps {
    data: BetData;
    isDrawNeeded: boolean;
    epochPoolBal: bigint;
    isVerified: boolean;
    isApproved: boolean;
    orders: Order[];
    userOrder: Order;
}
