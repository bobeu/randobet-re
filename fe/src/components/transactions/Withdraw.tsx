/*eslint-disable */
import React from 'react';
import { useAccount } from "wagmi";
import { filterTransactionData, formatAddr, formatValue } from '../utilities/common';
import { Address, FunctionName } from '@/types';
import TransactionModal from '../modals/TransactionModal';
import useData from '@/hooks/useData';
import { Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '../ui/Toast';
import BalanceCheck from '../read/BalanceCheck';
import { parseUnits } from 'viem';

function Withdraw() {
    const { chainId, address, isConnected } = useAccount();
    const [showTransactionModal, setShowTransactionModal] = React.useState<boolean>(false);
    const [betAmount, setBetAmount] = React.useState<string>('');
    const [epoch, setEpoch] = React.useState<string>('');
    const [customBetAmount, setCustomBetAmount] = React.useState<string>('');
    const { data: { currentEpochBet, nextEpochBet, deadEpoch, state: { epoches: currentEpoch } } } = useData();
    const { showToast } = useToast();
// uint bet, uint epoch, address player, address recipient
    const { trxnSteps, selectedEpoch, account } = React.useMemo(() => {
        const { transactionData: td } = filterTransactionData({
            chainId,
            filter: true,
            functionNames: ['withdraw'],
        });

        // const selectedBetAmount = betAmount === 'custom' ? parseUnits(customBetAmount, 18) : BigInt(betAmount);
        const selectedEpoch = BigInt(epoch);
        // console.log(`selectedBetAmount: ${selectedBetAmount}\n, selectedEpoch: ${selectedEpoch}`);

        const data = {
            abi: td[0].abi,
            functionName: td[0].functionName as FunctionName,
            contractAddress: td[0].contractAddress as Address,
            args: [selectedEpoch],
            value: undefined
        }

        return {
            trxnSteps:  [{
                id: 'withdraw-winnings',
                title: 'Withdrawing Winnings',
                description: `Getting your winnings from epoch ${epoch}`,
                ...data
            }],
            selectedEpoch,
            account: formatAddr(address)
        }

    }, [chainId, betAmount, epoch, customBetAmount, address]);

    const handleCustomBet = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setCustomBetAmount(e.target.value);
    }

    const handleWithdraw = () => {
        if (!isConnected || !address) {
            showToast({
                type: 'error',
                title: 'Wallet Not Connected',
                message: 'Please connect your wallet to withdraw winnings.'
            });
            return;
        }
        
        // if (trxnSteps.length === 0) {
        //     showToast({
        //         type: 'error',
        //         title: 'Invalid Input',
        //         message: 'Please fill in all required fields.'
        //     });
        //     return
        // }1000000000000000000 1000000000000000000
        console.log("SelectedEpoch", selectedEpoch);
        console.log("CurrentEpochBet", currentEpochBet);
        console.log("NextEpochBet", nextEpochBet);
        console.log("DeadEpoch", deadEpoch);
        setShowTransactionModal(true);
    };

    const handleTransactionSuccess = (txHash: string) => {
        // console.log('Winnings withdrawn:', txHash);
        showToast({
            type: 'success',
            title: 'Withdrawal Successful',
            message: `Transaction hash: ${txHash.slice(0, 10)}...`
        });
        setShowTransactionModal(false);
    };

    const handleTransactionError = (error: Error) => {
        // console.error('Failed to withdraw winnings:', error);
        showToast({
            type: 'error',
            title: 'Withdrawal Failed',
            message: error.message || 'Failed to withdraw winnings. Please try again.'
        });
    };

    // Generate available epochs (excluding dead epoch)
    const availableEpochs = Array.from({ length: Number(currentEpoch) }, (_, i) => i).filter(ep => ep === 0? true : ep > Number(deadEpoch));

    return (
        <div className="space-y-4 p-4 border border-stone-600/30 rounded-lg bg-stone-800/50">
            <div className='w-full flex justify-between items-center'>
                <h3 className="text-sm font-bold text-yellow-400">Withdraw Winnings</h3>
                <BalanceCheck epoch={selectedEpoch} target={account} />
            </div>
            <div className="space-y-3">
                {/* <div className="space-y-2"> */}
                    {/* <Label htmlFor="betAmount" className="text-stone-200 text-xs">Bet Amount</Label>
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
                    </Select> */}
                    {/* {betAmount === 'custom' && (
                        <Input
                            type="number"
                            value={customBetAmount}
                            onChange={(e) => handleCustomBet(e)}
                            className="bg-stone-900/80 border-stone-600/50 text-white"
                            placeholder="Enter custom bet amount in wei"
                        />
                    )} */}
                {/* </div> */}

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
