/*eslint-disable */
import React, { useState } from 'react';
import { useAccount } from "wagmi";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Coins, Zap } from 'lucide-react';
import { filterTransactionData } from '../utilities/common';
import { Address, FunctionName } from '@/types';
import { useToast } from '@/components/ui/Toast';
import TransactionModal from '../modals/TransactionModal';
import { parseUnits } from 'viem';

export default function OpenOrder() {
  const [amount, setAmount] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);
  const[ showTransactionModal, setShowTransactionModal ] = React.useState<boolean>(false);

  const { isConnected, chainId } = useAccount();
  const { showToast } = useToast();

  const {trxnSteps, value} = React.useMemo(() => {
    const { transactionData: td, } = filterTransactionData({
      chainId,
      filter: true,
      functionNames: ['openOrder'],
    });

    const value = parseUnits(amount, 18);
    const data = {
      abi: td[0].abi,
      functionName: td[0].functionName as FunctionName,
      contractAddress: td[0].contractAddress as Address,
      args: [],
      value
    }
    
    return {
      trxnSteps: [{
        id: 'open-order',
        title: 'Open order',
        description: `Opening a standing order`,
        ...data
      }],
      value
    };

  }, [chainId, amount]);

  const handleOpenOrder = () => {
    if(!isConnected) {
      showToast({
        type: 'error',
        title: 'Wallet Not Connected',
        message: 'Please connect your wallet to open a standing order.'
      });
      return;
    }
    if(!value || value === 0n) {
      showToast({
        type: 'error',
        title: 'Invalid Amount',
        message: 'Please enter a valid amount to open a standing order.'
      });
      return;
    }
    setShowTransactionModal(true);
  };

  const handleTransactionSuccess = () => {
    showToast({
      type: 'success',
      title: 'Standing Order Opened! 🎉',
      message: `Successfully deposited ${amount} CELO. You'll automatically join future betting rounds!`
    });
    setAmount('');
    setLoading(false);
  };

  const handleTransactionError = (error: Error) => {
    showToast({
      type: 'error',
      title: 'Transaction Failed',
      message: error.message || 'Failed to open standing order. Please try again.'
    });
    setLoading(false);
    setShowTransactionModal(false);
  };

  return (
    <>
      <Card className="bg-violet-900 backdrop-blur-sm border border-stone-600">
        <CardHeader className="pb-3">
          <CardTitle className="text-yellow-400 text-sm font-medium flex items-center gap-2">
            <Coins className="w-4 h-4" />
            Open Standing Order
          </CardTitle>
          <p className="text-stone-300 text-xs">
            Deposit CELO to automatically join future betting rounds
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-stone-300 text-sm">
              Amount (CELO)
            </Label>
            <Input
              id="amount"
              type="number"
              placeholder="0.0"
              value={amount}
              onChange={(e) => {
                e.preventDefault();
                setAmount(e.target.value);
              }}
              className="bg-stone-800 border-stone-600 text-white placeholder-stone-400"
              step="0.001"
              min="0"
            />
          </div>
          
          <div className="bg-stone-800/50 rounded-lg p-3 space-y-2">
            <div className="flex items-center gap-2 text-stone-300 text-xs">
              <Zap className="w-3 h-3 text-yellow-400" />
              <span className="font-medium">How it works:</span>
            </div>
            <ul className="text-stone-400 text-xs space-y-1 ml-5">
              <li>• Deposit CELO to create a standing order</li>
              <li>• Automatically join every new betting round</li>
              <li>• No need to manually place bets each time</li>
              <li>• Close your order anytime to withdraw funds</li>
            </ul>
          </div>

          <Button
            onClick={handleOpenOrder}
            disabled={loading || !amount || parseFloat(amount) <= 0}
            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            {loading? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {'Processing...'}
              </>
            ) : (
              <>
                <Coins className="w-4 h-4" />
                Open Standing Order
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <TransactionModal
        title="Opening standing order"
        getSteps={() => trxnSteps}
        isOpen={showTransactionModal}
        onClose={() => setShowTransactionModal(false)}
        onSuccess={handleTransactionSuccess}
        description={`Opening standing order with amount ${amount} Celo`}
        onError={handleTransactionError}
        showAnimation={true}
      />
    </>
  );
}
