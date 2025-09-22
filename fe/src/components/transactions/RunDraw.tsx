import React from 'react';
import { useAccount } from "wagmi";
import { filterTransactionData, formatAddr } from '../utilities/common';
import { Address, FunctionName } from '@/types';
import TransactionModal from '../modals/TransactionModal';
import { zeroAddress } from 'viem';
import { motion } from 'framer-motion'
import { Shuffle } from 'lucide-react'

function RunDraw() {
    const { chainId, address, isConnected } = useAccount();
    const[ showTransactionModal, setShowTransactionModal ] = React.useState<boolean>(false);
    const account = formatAddr(address);

    const trxnSteps = React.useMemo(() => {
        const { transactionData: td, } = filterTransactionData({
            chainId,
            filter: true,
            functionNames: ['runDraw'],
        });

        const data = {
            abi: td[0].abi,
            functionName: td[0].functionName as FunctionName,
            contractAddress: td[0].contractAddress as Address,
            args: [],
            value: undefined
        }

        return (isConnected && account !== zeroAddress)? [{
            id: 'run-draw',
            title: 'Running Draw',
            description: `Executing the draw to determine winners`,
            ...data
        }] : [];

    }, [chainId, isConnected, account]);

    const handleRunDraw = () => {
        if (trxnSteps.length === 0) {
            alert('Cannot run draw');
            return;
        }
        setShowTransactionModal(true);
    };
    
    const handleTransactionSuccess = (txHash: string) => {
        console.log('Draw executed:', txHash);
        setShowTransactionModal(false);
    };

    const handleTransactionError = (error: Error) => {
        console.error('Failed to run draw:', error);
    };
    

    return (
        <div>
            <motion.button
                onClick={handleRunDraw}
                className="bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-300 hover:to-pink-400 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:shadow-purple-500/25 transition-all duration-300 glow-purple flex items-center gap-2"
                disabled={trxnSteps.length === 0}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <Shuffle className="w-4 h-4" />
                🎲 Run Draw
            </motion.button>
            <TransactionModal 
                title="Run Draw"
                getSteps={() => trxnSteps}
                isOpen={showTransactionModal}
                onClose={() => setShowTransactionModal(false)}
                onSuccess={handleTransactionSuccess}
                description='Executing the draw'
                onError={handleTransactionError}
            />
        </div>
    );
}

export default RunDraw;
