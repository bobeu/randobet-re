import React from 'react';
import { useAccount } from "wagmi";
import { filterTransactionData, formatAddr } from '../utilities/common';
import { Address, FunctionName } from '@/types';
import TransactionModal from '../modals/TransactionModal';
import { zeroAddress } from 'viem';
import { motion } from 'framer-motion'
import { Settings } from 'lucide-react'

function SetBetListUpfront() {
    const { chainId, address, isConnected } = useAccount();
    const[ showTransactionModal, setShowTransactionModal ] = React.useState<boolean>(false);
    const account = formatAddr(address);

    const trxnSteps = React.useMemo(() => {
        const { transactionData: td, } = filterTransactionData({
            chainId,
            filter: true,
            functionNames: ['setBetListUpfront'],
        });

        const data = {
            abi: td[0].abi,
            functionName: td[0].functionName as FunctionName,
            contractAddress: td[0].contractAddress as Address,
            args: [],
            value: undefined
        }

        return (isConnected && account !== zeroAddress)? [{
            id: 'set-bet-list-upfront',
            title: 'Setting Bet List Upfront',
            description: `Configuring bet list parameters`,
            ...data
        }] : [];

    }, [chainId, isConnected, account]);

    const handleSetBetListUpfront = () => {
        if (trxnSteps.length === 0) {
            alert('Cannot set bet list upfront');
            return;
        }
        setShowTransactionModal(true);
    };
    
    const handleTransactionSuccess = (txHash: string) => {
        console.log('Bet list upfront set:', txHash);
        setShowTransactionModal(false);
    };

    const handleTransactionError = (error: Error) => {
        console.error('Failed to set bet list upfront:', error);
    };
    

    return (
        <div>
            <motion.button
                onClick={handleSetBetListUpfront}
                className="bg-gradient-to-r from-red-400 to-orange-500 hover:from-red-300 hover:to-orange-400 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:shadow-red-500/25 transition-all duration-300 glow-red flex items-center gap-2"
                disabled={trxnSteps.length === 0}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <Settings className="w-4 h-4" />
                ⚙️ Set Bet List Upfront
            </motion.button>
            <TransactionModal 
                title="Set Bet List Upfront"
                getSteps={() => trxnSteps}
                isOpen={showTransactionModal}
                onClose={() => setShowTransactionModal(false)}
                onSuccess={handleTransactionSuccess}
                description='Setting bet list upfront configuration'
                onError={handleTransactionError}
            />
        </div>
    );
}

export default SetBetListUpfront;
