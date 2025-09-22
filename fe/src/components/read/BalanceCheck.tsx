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
            functionNames: ['checkBalance'],
        });
        const readArgs = [[bet, epoch, target]];
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
    const { balance } = React.useMemo(() => {
        let balance : string = '0';

        if(!isPending && data && data[0].status === 'success' && data[0].result !== undefined) {
            balance = formatValue(data[0].result as bigint).toStr;
        }
        return { balance };
    }, [data]);

    return (
        <div>{balance}</div>
    );
}

export default BalanceCheck;

interface BalanceProps {
    bet: bigint;
    epoch: bigint; 
    target: Address; 
}