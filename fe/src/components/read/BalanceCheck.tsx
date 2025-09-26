import React from 'react';
import { useAccount, useConfig, useReadContracts } from "wagmi";
import { filterTransactionData, formatAddr, formatValue } from '../utilities/common';
import { Address } from '@/types';

function BalanceCheck({bet, epoch, target} : BalanceProps) {
    const { chainId, address, isConnected } = useAccount();
    const account = formatAddr(address);
    const config = useConfig();

    const { readTxObject } = React.useMemo(() => {
        const { transactionData: td, } = filterTransactionData({
            chainId,
            filter: true,
            functionNames: ['checkBalance', 'checkEpochBalance'],
        });
        const readArgs = [[bet, epoch, target], [bet, epoch]];
        const contractAddresses = [
            td[0].contractAddress as Address,
        ];

        const readTxObject = td.map((item, i) => {
            return{
                abi: item.abi,
                functionName: item.functionName,
                address: contractAddresses[i],
                args: readArgs[i]
            }
        });

        return { readTxObject }
    }, [bet, epoch, target, chainId]);

    // Read data from the CampaignFactory contact 
    const { data, isPending } = useReadContracts({
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
    const { playerBalance, balanceLeftInEpoch } = React.useMemo(() => {
        let playerBalance : string = '0';
        let balanceLeftInEpoch : string = '0';

        if(!isPending && data && data[0].status === 'success' && data[0].result !== undefined) {
            playerBalance = formatValue(data[0].result as bigint).toStr;
        }
        if(!isPending && data && data[1].status === 'success' && data[1].result !== undefined) {
            balanceLeftInEpoch = formatValue(data[1].result as bigint).toStr;
        }
        return { playerBalance, balanceLeftInEpoch };
    }, [data, isPending]);

    return (
        <div className="bg-violet-900 backdrop-blur-sm border border-stone-600 rounded-lg p-6 space-y-6">
            <div className="text-center">
                <h3 className="text-stone-300 text-sm mb-2">Player Balance</h3>
                <h3 className="text-2xl font-bold spooky-text">
                    {playerBalance || '0'} CELO
                </h3>
            </div>
            <div className="text-center">
                <h3 className="text-stone-300 text-sm mb-2">Balance In Epoch</h3>
                <h3 className="text-2xl font-bold spooky-text">
                    {balanceLeftInEpoch || '0'} CELO
                </h3>
            </div>
        </div>
    );
}

export default BalanceCheck;

interface BalanceProps {
    bet: bigint;
    epoch: bigint; 
    target: Address; 
}