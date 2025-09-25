import React from 'react';
import { useAccount } from "wagmi";
import { filterTransactionData, formatAddr } from '../utilities/common';
import { Address, FunctionName } from '@/types';
import TransactionModal from '../modals/TransactionModal';
import { zeroAddress } from 'viem';
import { motion } from 'framer-motion'
import { Shield } from 'lucide-react'

function SetVerification() {
    const { chainId, address, isConnected } = useAccount();
    const[ showTransactionModal, setShowTransactionModal ] = React.useState<boolean>(false);
    const account = formatAddr(address);

    const trxnSteps = React.useMemo(() => {
        const { transactionData: td, } = filterTransactionData({
            chainId,
            filter: true,
            functionNames: ['setVerification'],
        });

        const data = {
            abi: td[0].abi,
            functionName: td[0].functionName as FunctionName,
            contractAddress: td[0].contractAddress as Address,
            args: [],
            value: undefined
        }

        return (isConnected && account !== zeroAddress)? [{
            id: 'set-verification',
            title: 'Setting Verification',
            description: `Setting up verification parameters`,
            ...data
        }] : [];

    }, [chainId, isConnected, account]);

    const handleSetVerification = () => {
        if (trxnSteps.length === 0) {
            alert('Cannot set verification');
            return;
        }
        setShowTransactionModal(true);
    };
    
    const handleTransactionSuccess = (txHash: string) => {
        console.log('Verification set:', txHash);
        setShowTransactionModal(false);
    };

    const handleTransactionError = (error: Error) => {
        console.error('Failed to set verification:', error);
    };
    

    return (
        <div>
            <motion.button
                onClick={handleSetVerification}
                className="bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-300 hover:to-cyan-400 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:shadow-blue-500/25 transition-all duration-300 glow-blue flex items-center gap-2"
                disabled={trxnSteps.length === 0}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <Shield className="w-4 h-4" />
                🛡️ Set Verification
            </motion.button>
            <TransactionModal 
                title="Set Verification"
                getSteps={() => trxnSteps}
                isOpen={showTransactionModal}
                onClose={() => setShowTransactionModal(false)}
                onSuccess={handleTransactionSuccess}
                description='Setting verification parameters'
                onError={handleTransactionError}
            />
        </div>
    );
}

export default SetVerification;
