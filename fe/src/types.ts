import { zeroAddress } from "viem";

export type Address = `0x${string}`;
export type FunctionName = 'placebet' | 'checkBalance' | 'checkEpochBalance' | 'getData' | 'getDataByEpoch' | 'claimTriggerReward' | 'isDrawNeeded' | 'isVerified' | 'runDraw' | 'setBetListUpfront' | 'setFee' | 'setVerification' | 'setverificationByOwner' | 'withdraw' | 'getBalanceFromCurrentEpoch';

export interface Player {
    bal: bigint;
    addr: Address;
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

export const mockBetData : BetData = {
    spin: {
        unit: 0n,
        pool: 0n,
        players: [0, 1, 2, 3].map((c) => {
            return {
                addr: `0x${'0'.repeat(42-c)}${c.toString().repeat(c)}`,
                bal: BigInt(c)
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