/*eslint-disable */
import React, { useState } from 'react';
import { useAccount } from "wagmi";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, XCircle, AlertTriangle } from 'lucide-react';
import { filterTransactionData, formatValue } from '../utilities/common';
import { Address, FunctionName } from '@/types';
import { useToast } from '@/components/ui/Toast';
import TransactionModal from '../modals/TransactionModal';
import useData from '@/hooks/useData';

export default function CloseOrder() {
  const { userOrder } = useData();
  const [loading, setIsLoading] = useState<boolean>(false);
  const[ showTransactionModal, setShowTransactionModal ] = React.useState<boolean>(false);


  const { isConnected, chainId } = useAccount();
  const { showToast } = useToast();
 
  const trxnSteps = React.useMemo(() => {
    const { transactionData: td, } = filterTransactionData({
      chainId,
      filter: true,
      functionNames: ['closeOrder'],
    });

    const data = {
      abi: td[0].abi,
      functionName: td[0].functionName as FunctionName,
      contractAddress: td[0].contractAddress as Address,
      args: [],
      value: undefined
    }
    
    return[{
      id: 'close-order',
      title: 'Close order',
      description: `Preparing to close order and withdraw amount - ${formatValue(userOrder?.balances || 0n).toStr} Celo`,
      ...data
    }];

  }, [chainId]);

  const handleCloseOrder = () => {
    if(!isConnected) {
      showToast({
        type: 'error',
        title: 'Wallet Not Connected',
        message: 'Please connect your wallet to place a bet.'
      });
      return;
    }
    setShowTransactionModal(true);
  };

  const handleTransactionSuccess = (txHash: string) => {
    console.log('Bet placed with hash:', txHash);
    showToast({
      type: 'success',
      title: 'Order Closed Successfully',
      message: `Transaction hash: ${txHash.slice(0, 10)}...`
    });
    setIsLoading(false);
    setShowTransactionModal(false);
  };

  const handleTransactionError = (error: Error) => {
    setIsLoading(false);
    // console.error('Failed to place bet:', error);
    showToast({
      type: 'error',
      title: 'Close order failed',
      message: error.message || 'Failed to close standing order. Please try again'
    });
  };

  return (
    <>
      <Card className="bg-violet-900 backdrop-blur-sm border border-stone-600">
        <CardHeader className="pb-3">
          <CardTitle className="text-red-400 text-sm font-medium flex items-center gap-2">
            <XCircle className="w-4 h-4" />
            Close Standing Order
          </CardTitle>
          <p className="text-stone-300 text-xs">
            Close your order and withdraw your deposited funds
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3 space-y-2">
            <div className="flex items-center gap-2 text-red-300 text-xs">
              <AlertTriangle className="w-3 h-3" />
              <span className="font-medium">Warning:</span>
            </div>
            <ul className="text-red-200 text-xs space-y-1 ml-5">
              <li>• This will close your standing order permanently</li>
              <li>• You'll need to manually place bets in future rounds</li>
              <li>• All deposited funds will be returned to your wallet</li>
              <li>• You can reopen an order anytime</li>
            </ul>
          </div>

          <Button
            onClick={handleCloseOrder}
            disabled={loading}
            className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            {loading? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {'Processing...'}
              </>
            ) : (
              <>
                <XCircle className="w-4 h-4" />
                Close Standing Order
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <TransactionModal
        title="Cancel Standing order"
        getSteps={() => trxnSteps}
        isOpen={showTransactionModal}
        onClose={() => setShowTransactionModal(false)}
        onSuccess={handleTransactionSuccess}
        description='Canceling order and withdrawing balances'
        onError={handleTransactionError}
        showAnimation={true}
      />
    </>
  );
}
