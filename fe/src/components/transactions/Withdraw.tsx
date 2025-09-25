import React from 'react';
import { useAccount } from "wagmi";
import { filterTransactionData, formatAddr } from '../utilities/common';
import { Address, FunctionName } from '@/types';
import TransactionModal from '../modals/TransactionModal';
import { zeroAddress } from 'viem';
import useData from '@/hooks/useData';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '../ui/Toast';

function Withdraw() {
    const { chainId, address, isConnected } = useAccount();
    const [showTransactionModal, setShowTransactionModal] = React.useState<boolean>(false);
    const [betAmount, setBetAmount] = React.useState<string>('');
    const [epoch, setEpoch] = React.useState<string>('');
    const [customBetAmount, setCustomBetAmount] = React.useState<string>('');
    const account = formatAddr(address);
    const { data: { currentEpochBet, nextEpochBet, deadEpoch, state: { epoches: currentEpoch } } } = useData();
    const { showToast } = useToast();

    const trxnSteps = React.useMemo(() => {
        const { transactionData: td } = filterTransactionData({
            chainId,
            filter: true,
            functionNames: ['withdraw'],
        });

        const selectedBetAmount = betAmount === 'custom' ? BigInt(customBetAmount) : BigInt(betAmount);
        const selectedEpoch = BigInt(epoch);

        const data = {
            abi: td[0].abi,
            functionName: td[0].functionName as FunctionName,
            contractAddress: td[0].contractAddress as Address,
            args: [selectedBetAmount, selectedEpoch, address, address],
            value: undefined
        }

        return [{
            id: 'withdraw-winnings',
            title: 'Withdrawing Winnings',
            description: `Withdrawing ${Number(selectedBetAmount) / 1e18} CELO from epoch ${epoch}`,
            ...data
        }];

    }, [chainId, isConnected, account, betAmount, epoch, customBetAmount, address]);

    const handleWithdraw = () => {
        if (!isConnected || !address) {
            showToast({
                type: 'error',
                title: 'Wallet Not Connected',
                message: 'Please connect your wallet to withdraw winnings.'
            });
            return;
        }
        
        if (trxnSteps.length === 0) {
            showToast({
                type: 'error',
                title: 'Invalid Input',
                message: 'Please fill in all required fields.'
            });
            return;
        }
        setShowTransactionModal(true);
    };

    const handleTransactionSuccess = (txHash: string) => {
        console.log('Winnings withdrawn:', txHash);
        showToast({
            type: 'success',
            title: 'Withdrawal Successful',
            message: `Transaction hash: ${txHash.slice(0, 10)}...`
        });
        setShowTransactionModal(false);
    };

    const handleTransactionError = (error: Error) => {
        console.error('Failed to withdraw winnings:', error);
        showToast({
            type: 'error',
            title: 'Withdrawal Failed',
            message: error.message || 'Failed to withdraw winnings. Please try again.'
        });
    };

    // Generate available epochs (excluding dead epoch)
    const availableEpochs = Array.from({ length: Number(currentEpoch) }, (_, i) => i).filter(ep => ep < Number(deadEpoch));

    return (
        <div className="space-y-4 p-4 border border-stone-600/30 rounded-lg bg-stone-800/50">
            <h3 className="text-sm font-bold text-yellow-400">Withdraw Winnings</h3>
            <div className="space-y-3">
                <div className="space-y-2">
                    <Label htmlFor="betAmount" className="text-stone-200 text-xs">Bet Amount</Label>
                    <Select value={betAmount} onValueChange={setBetAmount}>
                        <SelectTrigger className="w-full bg-stone-900/80 border-stone-600/50 text-white">
                            <SelectValue placeholder="Select bet amount" />
                        </SelectTrigger>
                        <SelectContent className="bg-stone-900 border-stone-600 text-white">
                            <SelectItem value={currentEpochBet.toString()}>
                                Current: {(Number(currentEpochBet) / 1e18).toFixed(4)} CELO
                            </SelectItem>
                            <SelectItem value={nextEpochBet.toString()}>
                                Next: {(Number(nextEpochBet) / 1e18).toFixed(4)} CELO
                            </SelectItem>
                            <SelectItem value="custom">Custom Amount</SelectItem>
                        </SelectContent>
                    </Select>
                    {betAmount === 'custom' && (
                        <Input
                            type="number"
                            value={customBetAmount}
                            onChange={(e) => setCustomBetAmount(e.target.value)}
                            className="bg-stone-900/80 border-stone-600/50 text-white"
                            placeholder="Enter custom bet amount in wei"
                        />
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="epoch" className="text-stone-200 text-xs">Epoch</Label>
                    <Select value={epoch} onValueChange={setEpoch}>
                        <SelectTrigger className="w-full bg-stone-900/80 border-stone-600/50 text-white">
                            <SelectValue placeholder="Select epoch" />
                        </SelectTrigger>
                        <SelectContent className="bg-stone-900 border-stone-600 text-white">
                            {availableEpochs.map(ep => (
                                <SelectItem key={ep} value={ep.toString()}>
                                    Epoch {ep}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <Button
                onClick={handleWithdraw}
                className="w-full bg-violet-600 hover:bg-violet-500 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300"
                disabled={trxnSteps.length === 0}
            >
                <Wallet className="w-4 h-4 mr-2" />
                WITHDRAW
            </Button>

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
