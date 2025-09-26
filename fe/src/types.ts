/*eslint-disable */

import { zeroAddress } from "viem";
import { formatAddr } from "./components/utilities/common";

export type Address = `0x${string}`;
export type FunctionName = 'placeBet' | 'checkBalance' | 'checkEpochBalance' | 'triggereRewards' | 'getData' | 'getDataByEpoch' | 'claimTriggerReward' | 'isDrawNeeded' | 'isVerified' | 'runDraw' | 'setBetListUpfront' | 'setFee' | 'setVerification' | 'setVerificationByOwner' | 'withdraw' | 'getBalanceFromCurrentEpoch' | 'isPermitted' | 'setDataStruct' | 'setPermission';
export const adminFunctions : FunctionName[] = [
    "setBetListUpfront",
    "setFee",
    "setVerificationByOwner",
    "setDataStruct",
    "setPermission"
];

export const userFunctions : FunctionName[] = [
    "placeBet",
    "runDraw",
    "withdraw",
    "setVerification",
];

export interface Player {
    bal: bigint;
    addr: Address;
    bet: bigint;
    timePlaced: bigint;
}

export interface Spin {
    unit: bigint;
    pool: bigint;
    players: Player[];
}

export interface DataStruct {
    playerFee: bigint;
    feeTo: Address;
    lastDraw: bigint;
    drawInterval: bigint;
}

export interface RandoState {
    epoches: bigint;
    data: DataStruct;
}

export interface BetData {
    spin: Spin;
    state: RandoState;
    currentEpochBet: bigint;
    nextEpochBet: bigint;
    deadEpoch: bigint;
}

export interface FilterTransactionDataProps {
  chainId: number | undefined;
  functionNames?: FunctionName[];
  filter: boolean;
}

export interface FilterTransactionReturnType {
  transactionData: TransactionData[];
  approvedFunctions: string[];
  contractAddresses: {
    stablecoin: string;
    FeeReceiver: string;
    RandoFutures: string;
    Verifier: string;
  };
}

export type TransactionData = {
  contractAddress: string;
  inputCount: number;
  functionName: string;
  abi: any;
  requireArgUpdate: boolean;
};

///////////////////////// Constants  ///////////////////////////////
export const APP_ICON_URL = "https://randobet.vercel.app";
export const APP_NAME = "Randobet";

export const mockBetData : BetData = {
    spin: {
        unit: 0n,
        pool: 0n,
        players: [0, 1, 2, 3].map((c) => {
            return {
                addr: formatAddr(`0x${'0'.repeat(42-c)}${c.toString().repeat(c)}`),
                bal: BigInt(c),
                bet: BigInt(c),
                timePlaced: BigInt(new Date().getTime() + c)
            }
        })
    },
    state: {
        epoches: 0n,
        data: {
            playerFee: 0n,
            feeTo: zeroAddress,
            lastDraw: 0n,
            drawInterval: 0n
        }
    },
    currentEpochBet: 0n,
    nextEpochBet: 0n,
    deadEpoch: 0n
}