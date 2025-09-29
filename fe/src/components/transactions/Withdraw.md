import React from 'react';
import { Button } from '@/components/ui/button';
import useData from '@/hooks/useData';
import RunDrawTransactionModal from '../modals/RunDrawTransactionModal';
import { useAccount } from "wagmi";
import { filterTransactionData, formatAddr, formatValue } from '../utilities/common';
import { Address, FunctionName } from '@/types';
import { Wallet } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '../ui/Toast';
import BalanceCheck from '../read/BalanceCheck';
import { parseUnits } from 'viem';

function WithDraw() {
    const { chainId, address, isConnected } = useAccount();
    const { showToast } = useToast();

    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>('');

    const [showTransactionModal, setShowTransactionModal] = React.useState<boolean>(false);
    const [betAmount, setBetAmount] = React.useState<string>('');
    const [epoch, setEpoch] = React.useState<string>('');
    const [customBetAmount, setCustomBetAmount] = React.useState<string>('');
    const { data: { currentEpochBet, nextEpochBet, deadEpoch, state: { epoches: currentEpoch } } } = useData();

    const { trxnSteps, selectedBetAmount, selectedEpoch, player } = React.useMemo(() => {
        const { transactionData: td } = filterTransactionData({
            chainId,
            filter: true,
            functionNames: ['withdraw'],
        });

        const selectedBetAmount = betAmount === 'custom' ? parseUnits(customBetAmount, 18) : BigInt(betAmount);
        const selectedEpoch = BigInt(epoch);
        // console.log(`selectedBetAmount: ${selectedBetAmount}\n, selectedEpoch: ${selectedEpoch}`);

        const data = {
            abi: td[0].abi,
            functionName: td[0].functionName as FunctionName,
            contractAddress: td[0].contractAddress as Address,
            args: [selectedBetAmount, selectedEpoch, address, address],
            value: undefined
        }

        return {
            trxnSteps:  [{
                id: 'withdraw-winnings',
                title: 'Withdrawing Winnings',
                description: `Withdrawing ${Number(selectedBetAmount) / 1e18} CELO from epoch ${epoch}`,
                ...data
            }],
            selectedBetAmount,
            selectedEpoch,
            player: formatAddr(address),
            recipient: formatAddr(address)

        }

    }, [chainId, betAmount, epoch, customBetAmount, address]);

    const handleWithdraw = async () => {
        if (!isConnected || !address) {
            showToast({
                type: 'error',
                title: 'Wallet Not Connected',
                message: 'Please connect your wallet to withdraw winnings.'
            });
            return;
        }
        setIsLoading(true);
        setError('');
        
        try {
            // Call API to trigger the actual runDraw transaction
            const response = await fetch('/api/withdraw', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chainId: chainId, 
                    bet: selectedBetAmount.toString(), 
                    epoch: selectedEpoch.toString(), 
                    player: player, 
                    recipient: player
                }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Failed to trigger draw');
            }

            const result = await response.json();
            showToast({
                type: 'success',
                title: 'Withdrawal was successful',
                message: `Transaction with hash: ${result.transactionHash.slice(0, 10)}... was ${result.status}`
            });
            
            setShowTransactionModal(false);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to withdraw winnings';
            console.error('Failed to withdraw:', error);
            setError(errorMessage);
            showToast({
                type: 'error',
                title: 'Withdrawal Failed',
                message: errorMessage
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleCustomBet = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setCustomBetAmount(e.target.value);
    }

    const availableEpochs = Array.from({ length: Number(currentEpoch) }, (_, i) => i).filter(ep => ep === 0? true : ep > Number(deadEpoch));

    return (
        <div className="space-y-4 p-4 border border-stone-600/30 rounded-lg bg-stone-800/50">
           <div className='w-full flex justify-between items-center'>
                <h3 className="text-sm font-bold text-yellow-400">Withdraw Winnings</h3>
                <BalanceCheck bet={selectedBetAmount} epoch={selectedEpoch} target={player} />
            </div>
            <div className="space-y-3">
                <div className="space-y-2">
                    <Label htmlFor="betAmount" className="text-stone-200 text-xs">Bet Amount</Label>
                    <Select value={betAmount} onValueChange={setBetAmount}>
                        <SelectTrigger className="w-full bg-stone-900/80 border-stone-600/50 text-white">
                            <SelectValue placeholder="Select bet amount" />
                        </SelectTrigger>
                        <SelectContent className="bg-stone-900 border-stone-600 text-white">
                            <SelectItem value={currentEpochBet.toString()}>
                                Current: {formatValue(currentEpochBet).toStr} CELO
                            </SelectItem>
                            <SelectItem value={nextEpochBet.toString()}>
                                Next: {formatValue(nextEpochBet).toStr} CELO
                            </SelectItem>
                            <SelectItem value="custom">Custom Amount</SelectItem>
                        </SelectContent>
                    </Select>
                    {betAmount === 'custom' && (
                        <Input
                            type="number"
                            value={customBetAmount}
                            onChange={(e) => handleCustomBet(e)}
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

            <RunDrawTransactionModal 
                isOpen={showTransactionModal}
                onClose={() => setShowTransactionModal(false)}
                onRunDraw={handleWithdraw}
                isLoading={isLoading}
                error={error}
            />
        </div>
    );
}

export default WithDraw;
