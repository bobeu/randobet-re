import React from 'react';
import { useAccount } from "wagmi";
import { filterTransactionData } from '../utilities/common';
import { Address, FunctionName } from '@/types';
import TransactionModal from '../modals/TransactionModal';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useData from '@/hooks/useData';
import { useToast } from '../ui/Toast';
import { parseUnits } from 'viem';

function SetBetListUpfront() {
    const { chainId, address, isConnected } = useAccount();
    const[ showTransactionModal, setShowTransactionModal ] = React.useState<boolean>(false);
    const [newBet, setNewBet] = React.useState<string>('');
    const { data: { currentEpochBet, nextEpochBet } } = useData();
    const { showToast } = useToast();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const value = e.target.value;
        setNewBet(value);
    };

    const trxnSteps = React.useMemo(() => {
        const { transactionData: td, } = filterTransactionData({
            chainId,
            filter: true,
            functionNames: ['setBetListUpfront'],
        });

        // const parsedBetList = newBet.split(',').map(s => BigInt(s.trim()));
        const data = {
            abi: td[0].abi,
            functionName: td[0].functionName as FunctionName,
            contractAddress: td[0].contractAddress as Address,
            args: [parseUnits(newBet, 18)],
            value: undefined
        }

        return [{
            id: 'set-bet-list-upfront',
            title: 'Setting Bet List Upfront',
            description: `Setting bet list with ${newBet} amounts`,
            ...data
        }];

    }, [chainId, newBet]);

    const handleSetBetListUpfront = () => {
        if (!isConnected || !address) {
            showToast({
                type: 'error',
                title: 'Wallet Not Connected',
                message: 'Please connect your wallet to set bet list.'
            });
            return;
        }
        
        if (trxnSteps.length === 0) {
            showToast({
                type: 'error',
                title: 'Invalid Input',
                message: 'Cannot set bet list upfront. Please check your input.'
            });
            return;
        }
        setShowTransactionModal(true);
    };
    
    const handleTransactionSuccess = (txHash: string) => {
        console.log('Bet list upfront set:', txHash);
        showToast({
            type: 'success',
            title: 'Bet List Set Successfully',
            message: `Transaction hash: ${txHash.slice(0, 10)}...`
        });
        setShowTransactionModal(false);
    };

    const handleTransactionError = (error: Error) => {
        console.error('Failed to set bet list upfront:', error);
        showToast({
            type: 'error',
            title: 'Bet List Setting Failed',
            message: error.message || 'Failed to set bet list upfront. Please try again.'
        });
    };
    
    return (
        <div className="space-y-4 p-4 border rounded-lg bg-purple-900/10 border-purple-500/20">
            <h3 className="text-lg font-bold text-orange-400">Set Bet List Upfront</h3>
            <div className="space-y-2">
                <div className="bg-purple-800/30 border border-purple-500/30 rounded-lg p-3">
                    <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                            <span className="text-purple-200">Current Bet:</span>
                            <span className="text-orange-400 font-mono">{(Number(currentEpochBet) / 1e18).toFixed(4)} CELO</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-purple-200">Next Bet:</span>
                            <span className="text-green-400 font-mono">{(Number(nextEpochBet) / 1e18).toFixed(4)} CELO</span>
                        </div>
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="newBet" className="text-purple-200">Bet List (comma-separated BigInts)</Label>
                    <Input
                        id="newBet"
                        type="text"
                        value={newBet}
                        onChange={(e) => handleChange(e)}
                        className="bg-purple-800/30 border-purple-500/30 text-white"
                        placeholder="e.g., 10000000000000000, 20000000000000000"
                    />
                    <p className="text-xs text-purple-300">
                        Enter bet amounts
                    </p>
                </div>
            </div>
            <Button
                onClick={handleSetBetListUpfront}
                className="w-full bg-gradient-to-r from-red-400 to-orange-500 hover:from-red-300 hover:to-orange-400 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:shadow-red-500/25 transition-all duration-300 glow-red"
                disabled={trxnSteps.length === 0}
            >
                <Settings className="w-4 h-4 mr-2" />
                SET NEW BET
            </Button>
            <TransactionModal 
                title="Set New Bet Upfront"
                getSteps={() => trxnSteps}
                isOpen={showTransactionModal}
                onClose={() => setShowTransactionModal(false)}
                onSuccess={handleTransactionSuccess}
                description='Setting bet list upfront'
                onError={handleTransactionError}
            />
        </div>
    );
}

export default SetBetListUpfront;
