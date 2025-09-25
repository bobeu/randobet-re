/* eslint-disable */
import { DataContextProvider } from "./DataContextProvider";
import React from 'react';
import { useAccount, useChainId, useConfig, useReadContracts } from "wagmi";
import { Address, BetData, mockBetData } from "@/types";
import { filterTransactionData, formatAddr } from "../utilities/common";

export default function DataProvider({children} : {children: React.ReactNode}) {
    // const [selectedBet, setSelectedBet] = React.useState<bigint>(0n);
    // const [selectedEpoch, setSelectedEpoch] = React.useState<bigint>(0n);
    const [data, setBetData] = React.useState<BetData>(mockBetData);
    const [isDrawNeeded, setIsDrawNeeded] = React.useState<boolean>(false);
    const [epochPoolBal, setEpochPoolBal] = React.useState<bigint>(0n);
    const [isVerified, setIsVerified] = React.useState<boolean>(false);
    const [isApproved, setIsApproved] = React.useState<boolean>(false);

    const chainId = useChainId();
    const config = useConfig();
    const { isConnected, address } = useAccount();
    const account = formatAddr(address);

    // Build read transactions data
    const readTxObject = React.useMemo(() => {
        const { transactionData: td} = filterTransactionData({
            chainId,
            filter: true,
            functionNames: ['getData', 'isDrawNeeded', 'getBalanceFromCurrentEpoch', 'isPermitted', 'isVerified'],
        });
        const readArgs = [[], [], [], [account], [account]];
        const readTxObject = td.map((item, i) => {
            return{
                abi: item.abi,
                functionName: item.functionName,
                address: item.contractAddress as Address,
                args: readArgs[i]
            }
        });

        return readTxObject;
    }, [account]);
   

    // Read data from the CampaignFactory contact 
    const { data: contractData, } = useReadContracts({
        config,
        account,
        contracts: readTxObject,
        allowFailure: true,
        query: {
            enabled: !!isConnected,
            refetchOnReconnect: 'always', 
            refetchInterval: 5000,
        }
    });

    // Update the state with the result  of the read action
    React.useEffect(() => {
        let data_ : BetData = mockBetData;
        let isDrawNeeded_ : boolean = false;
        let epochPoolBal_ : bigint = 0n;
        let isVerified_ : boolean = false;
        let isApproved_ : boolean = false;

        if(contractData && contractData[0].status === 'success' && contractData[0].result !== undefined) {
            data_ = contractData[0].result as BetData;
            setBetData(data_);
        }
        if(contractData && contractData[1].status === 'success' && contractData[1].result !== undefined) {
            isDrawNeeded_ = contractData[1].result as boolean;
            setIsDrawNeeded(isDrawNeeded_);
        }
        if(contractData && contractData[2].status === 'success' && contractData[2].result !== undefined) {
            epochPoolBal_ = contractData[2].result as bigint;
            setEpochPoolBal(epochPoolBal_);
        }
        if(contractData && contractData[3].status === 'success' && contractData[2].result !== undefined) {
            isApproved_ = contractData[3].result as boolean;
            setIsApproved(isApproved_);
        }
        if(contractData && contractData[4].status === 'success' && contractData[2].result !== undefined) {
            isApproved_ = contractData[3].result as boolean;
            setIsApproved(isApproved_);
        }
    }, [contractData]);

    return (
        <DataContextProvider
            value={{
                data,
                isDrawNeeded,
                epochPoolBal,
                isApproved,
                isVerified
            }}
        >
            { children }
        </DataContextProvider>
    );
}