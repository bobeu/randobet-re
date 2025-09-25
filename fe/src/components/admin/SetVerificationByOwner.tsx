import React from 'react';
import { useAccount } from "wagmi";
import { filterTransactionData, formatAddr } from '../utilities/common';
import { Address, FunctionName } from '@/types';
import TransactionModal from '../modals/TransactionModal';
import { zeroAddress } from 'viem';
import { motion } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'

function SetVerificationByOwner() {
    const { chainId, address, isConnected } = useAccount();
    const[ showTransactionModal, setShowTransactionModal ] = React.useState<boolean>(false);
    const account = formatAddr(address);

    const trxnSteps = React.useMemo(() => {
        const { transactionData: td, } = filterTransactionData({
            chainId,
            filter: true,
            functionNames: ['setverificationByOwner'],
        });

        const data = {
            abi: td[0].abi,
            functionName: td[0].functionName as FunctionName,
            contractAddress: td[0].contractAddress as Address,
            args: [],
            value: undefined
        }

        return (isConnected && account !== zeroAddress)? [{
            id: 'set-verification-by-owner',
            title: 'Setting Verification by Owner',
            description: `Configuring verification settings as contract owner`,
            ...data
        }] : [];

    }, [chainId, isConnected, account]);

    const handleSetVerificationByOwner = () => {
        if (trxnSteps.length === 0) {
            alert('Cannot set verification by owner');
            return;
        }
        setShowTransactionModal(true);
    };
    
    const handleTransactionSuccess = (txHash: string) => {
        console.log('Verification by owner set:', txHash);
        setShowTransactionModal(false);
    };

    const handleTransactionError = (error: Error) => {
        console.error('Failed to set verification by owner:', error);
    };
    

    return (
        <div>
            <motion.button
                onClick={handleSetVerificationByOwner}
                className="bg-gradient-to-r from-indigo-400 to-purple-500 hover:from-indigo-300 hover:to-purple-400 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 glow-indigo flex items-center gap-2"
                disabled={trxnSteps.length === 0}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <ShieldCheck className="w-4 h-4" />
                🛡️ Set Verification by Owner
            </motion.button>
            <TransactionModal 
                title="Set Verification by Owner"
                getSteps={() => trxnSteps}
                isOpen={showTransactionModal}
                onClose={() => setShowTransactionModal(false)}
                onSuccess={handleTransactionSuccess}
                description='Setting verification by contract owner'
                onError={handleTransactionError}
            />
        </div>
    );
}

export default SetVerificationByOwner;
