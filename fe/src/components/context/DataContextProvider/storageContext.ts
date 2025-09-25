import type { BetData } from "../../../types";

export interface DataContextProps {
    data: BetData;
    isDrawNeeded: boolean;
    epochPoolBal: bigint;
    isVerified: boolean;
    isApproved: boolean;
}
