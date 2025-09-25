import React from 'react';
import { useAccount } from "wagmi";
import { filterTransactionData, formatAddr } from '../utilities/common';
import { Address, FunctionName } from '@/types';
import TransactionModal from '../modals/TransactionModal';
import { zeroAddress } from 'viem';
import { motion, AnimatePresence } from 'framer-motion';
import { Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '../ui/Toast';

function ClaimTriggerReward() {
    const { chainId, address, isConnected } = useAccount();
    const [showTransactionModal, setShowTransactionModal] = React.useState<boolean>(false);
    const [targetAddress, setTargetAddress] = React.useState<string>('');
    const account = formatAddr(address);
    const { showToast } = useToast();

    const trxnSteps = React.useMemo(() => {
        const { transactionData: td } = filterTransactionData({
            chainId,
            filter: true,
            functionNames: ['claimTriggerReward'],
        });

        const data = {
            abi: td[0].abi,
            functionName: td[0].functionName as FunctionName,
            contractAddress: td[0].contractAddress as Address,
            args: [address, targetAddress || address],
            value: undefined
        }

        return [{
            id: 'claim-trigger-reward',
            title: 'Claiming Trigger Reward',
            description: `Claiming trigger reward for ${targetAddress || address}`,
            ...data
        }];

    }, [chainId, isConnected, account, address, targetAddress]);

    const handleClaimReward = () => {
        if (!isConnected || !address) {
            showToast({
                type: 'error',
                title: 'Wallet Not Connected',
                message: 'Please connect your wallet to claim trigger reward.'
            });
            return;
        }
        
        if (trxnSteps.length === 0) {
            showToast({
                type: 'error',
                title: 'Claim Failed',
                message: 'Not connected or no data to claim reward.'
            });
            return;
        }
        setShowTransactionModal(true);
    };

    const handleTransactionSuccess = (txHash: string) => {
        console.log('Trigger reward claimed:', txHash);
        showToast({
            type: 'success',
            title: 'Reward Claimed Successfully',
            message: `Transaction hash: ${txHash.slice(0, 10)}...`
        });
        setShowTransactionModal(false);
    };

    const handleTransactionError = (error: Error) => {
        console.error('Failed to claim trigger reward:', error);
        showToast({
            type: 'error',
            title: 'Claim Failed',
            message: error.message || 'Failed to claim trigger reward. Please try again.'
        });
    };

    return (
        <div className="space-y-4 p-4 border border-stone-600/30 rounded-lg bg-stone-800/50">
            <h3 className="text-sm font-bold text-yellow-400">Claim Trigger Reward</h3>
            <div className="space-y-3">
                <div className="space-y-2">
                    <Label htmlFor="targetAddress" className="text-stone-200 text-xs">Target Address (optional)</Label>
                    <Input
                        id="targetAddress"
                        type="text"
                        value={targetAddress}
                        onChange={(e) => setTargetAddress(e.target.value)}
                        className="bg-stone-900/80 border-stone-600/50 text-white"
                        placeholder="Leave empty to use your address"
                    />
                    <p className="text-xs text-stone-300">
                        Address to receive the trigger reward (defaults to your address)
                    </p>
                </div>
            </div>

            <Button
                onClick={handleClaimReward}
                className="w-full bg-violet-600 hover:bg-violet-500 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300"
                disabled={trxnSteps.length === 0}
            >
                <Target className="w-4 h-4 mr-2" />
                CLAIM REWARD
            </Button>

            <TransactionModal 
                title="Claim Trigger Reward"
                getSteps={() => trxnSteps}
                isOpen={showTransactionModal}
                onClose={() => setShowTransactionModal(false)}
                onSuccess={handleTransactionSuccess}
                description='Claiming trigger reward'
                onError={handleTransactionError}
            />
        </div>
    );
}

export default ClaimTriggerReward;
