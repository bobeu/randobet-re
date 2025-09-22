import React from 'react';
import { useAccount } from "wagmi";
import { filterTransactionData, formatAddr } from '../utilities/common';
import { Address, FunctionName } from '@/types';
import TransactionModal from '../modals/TransactionModal';
import { zeroAddress } from 'viem';
import { motion } from 'framer-motion'
import { Wallet } from 'lucide-react'

function Withdraw() {
    const { chainId, address, isConnected } = useAccount();
    const[ showTransactionModal, setShowTransactionModal ] = React.useState<boolean>(false);
    const account = formatAddr(address);

    const trxnSteps = React.useMemo(() => {
        const { transactionData: td, } = filterTransactionData({
            chainId,
            filter: true,
            functionNames: ['withdraw'],
        });

        const data = {
            abi: td[0].abi,
            functionName: td[0].functionName as FunctionName,
            contractAddress: td[0].contractAddress as Address,
            args: [],
            value: undefined
        }

        return (isConnected && account !== zeroAddress)? [{
            id: 'withdraw-winnings',
            title: 'Withdrawing Winnings',
            description: `Withdrawing your winnings from the current epoch`,
            ...data
        }] : [];

    }, [chainId, isConnected, account]);

    const handleWithdraw = () => {
        if (trxnSteps.length === 0) {
            alert('No winnings to withdraw');
            return;
        }
        setShowTransactionModal(true);
    };
    
    const handleTransactionSuccess = (txHash: string) => {
        console.log('Winnings withdrawn:', txHash);
        setShowTransactionModal(false);
    };

    const handleTransactionError = (error: Error) => {
        console.error('Failed to withdraw winnings:', error);
    };
    

    return (
        <div>
            <motion.button
                onClick={handleWithdraw}
                className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-300 hover:to-blue-400 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:shadow-green-500/25 transition-all duration-300 glow-green flex items-center gap-2"
                disabled={trxnSteps.length === 0}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <Wallet className="w-4 h-4" />
                💰 Withdraw Winnings
            </motion.button>
            <TransactionModal 
                title="Withdraw Winnings"
                getSteps={() => trxnSteps}
                isOpen={showTransactionModal}
                onClose={() => setShowTransactionModal(false)}
                onSuccess={handleTransactionSuccess}
                description='Withdrawing your winnings'
                onError={handleTransactionError}
            />
        </div>
    );
}

export default Withdraw;
