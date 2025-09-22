import React from 'react';
import { useAccount } from "wagmi";
import { filterTransactionData, formatAddr } from '../utilities/common';
import { Address, FunctionName } from '@/types';
import TransactionModal from '../modals/TransactionModal';
import { zeroAddress } from 'viem';
import { motion } from 'framer-motion'
import { DollarSign } from 'lucide-react'

function SetFee() {
    const { chainId, address, isConnected } = useAccount();
    const[ showTransactionModal, setShowTransactionModal ] = React.useState<boolean>(false);
    const account = formatAddr(address);

    const trxnSteps = React.useMemo(() => {
        const { transactionData: td, } = filterTransactionData({
            chainId,
            filter: true,
            functionNames: ['setFee'],
        });

        const data = {
            abi: td[0].abi,
            functionName: td[0].functionName as FunctionName,
            contractAddress: td[0].contractAddress as Address,
            args: [],
            value: undefined
        }

        return (isConnected && account !== zeroAddress)? [{
            id: 'set-fee',
            title: 'Setting Fee',
            description: `Configuring platform fees`,
            ...data
        }] : [];

    }, [chainId, isConnected, account]);

    const handleSetFee = () => {
        if (trxnSteps.length === 0) {
            alert('Cannot set fee');
            return;
        }
        setShowTransactionModal(true);
    };
    
    const handleTransactionSuccess = (txHash: string) => {
        console.log('Fee set:', txHash);
        setShowTransactionModal(false);
    };

    const handleTransactionError = (error: Error) => {
        console.error('Failed to set fee:', error);
    };
    

    return (
        <div>
            <motion.button
                onClick={handleSetFee}
                className="bg-gradient-to-r from-yellow-400 to-red-500 hover:from-yellow-300 hover:to-red-400 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:shadow-yellow-500/25 transition-all duration-300 glow-yellow flex items-center gap-2"
                disabled={trxnSteps.length === 0}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <DollarSign className="w-4 h-4" />
                💰 Set Fee
            </motion.button>
            <TransactionModal 
                title="Set Fee"
                getSteps={() => trxnSteps}
                isOpen={showTransactionModal}
                onClose={() => setShowTransactionModal(false)}
                onSuccess={handleTransactionSuccess}
                description='Setting platform fees'
                onError={handleTransactionError}
            />
        </div>
    );
}

export default SetFee;
