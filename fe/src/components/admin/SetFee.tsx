import React from 'react';
import { useAccount } from "wagmi";
import { filterTransactionData, formatAddr } from '../utilities/common';
import { Address, FunctionName } from '@/types';
import TransactionModal from '../modals/TransactionModal';
import { motion } from 'framer-motion'
import { DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { Label } from '@/components/ui/label'
import { useToast } from '../ui/Toast';

function SetFee({ currentPlayerFee }: { currentPlayerFee: number }) {
    const { chainId, address, isConnected } = useAccount();
    const[ showTransactionModal, setShowTransactionModal ] = React.useState<boolean>(false);
    const [fee, setFee] = React.useState<string>('');
    const account = formatAddr(address);
    const { showToast } = useToast();

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
            args: [BigInt(fee)],
            value: undefined
        }

        return [{
            id: 'set-fee',
            title: 'Setting Fee',
            description: `Setting platform fee to ${fee} wei (${Number(fee) / 1e18} CELO)`,
            ...data
        }];

    }, [chainId, isConnected, account, fee]);

    const handleSetFee = () => {
        if (!isConnected || !address) {
            showToast({
                type: 'error',
                title: 'Wallet Not Connected',
                message: 'Please connect your wallet to set fee.'
            });
            return;
        }
        
        if (trxnSteps.length === 0) {
            showToast({
                type: 'error',
                title: 'Invalid Input',
                message: 'Cannot set fee. Please check your input.'
            });
            return;
        }
        setShowTransactionModal(true);
    };
    
    const handleTransactionSuccess = (txHash: string) => {
        console.log('Fee set:', txHash);
        showToast({
            type: 'success',
            title: 'Fee Set Successfully',
            message: `Transaction hash: ${txHash.slice(0, 10)}...`
        });
        setShowTransactionModal(false);
    };

    const handleTransactionError = (error: Error) => {
        console.error('Failed to set fee:', error);
        showToast({
            type: 'error',
            title: 'Fee Setting Failed',
            message: error.message || 'Failed to set fee. Please try again.'
        });
    };
    

    return (
        <div className="space-y-4 p-4 border rounded-lg bg-purple-900/10 border-purple-500/20">
            <h3 className="text-lg font-bold text-orange-400">Set Platform Fee</h3>
            <div className="space-y-2">
                <div className="bg-purple-800/30 border border-purple-500/30 rounded-lg p-3">
                    <Label className="text-purple-200 text-sm">Current Fee: {currentPlayerFee.toFixed(4)} CELO</Label>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="fee" className="text-purple-200">New Fee (in wei)</Label>
                    <Input
                        id="fee"
                        type="number"
                        value={fee}
                        onChange={(e) => setFee(e.target.value)}
                        className="bg-purple-800/30 border-purple-500/30 text-white"
                        placeholder="e.g., 10000000000000000"
                    />
                    <p className="text-xs text-purple-300">
                        {fee ? `≈ ${Number(fee) / 1e18} CELO` : 'Enter fee in wei'}
                    </p>
                </div>
            </div>
            <Button
                onClick={handleSetFee}
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:shadow-yellow-500/25 transition-all duration-300 glow-yellow"
                disabled={trxnSteps.length === 0}
            >
                <DollarSign className="w-4 h-4 mr-2" />
                SET FEE
            </Button>
            <TransactionModal 
                title="Set Platform Fee"
                getSteps={() => trxnSteps}
                isOpen={showTransactionModal}
                onClose={() => setShowTransactionModal(false)}
                onSuccess={handleTransactionSuccess}
                description='Setting platform fee'
                onError={handleTransactionError}
            />
        </div>
    );
}

export default SetFee;
