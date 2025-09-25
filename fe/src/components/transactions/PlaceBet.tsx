import React from 'react';
import { useAccount } from "wagmi";
import { filterTransactionData } from '../utilities/common';
import { Address, FunctionName } from '@/types';
import TransactionModal from '../modals/TransactionModal';
import useData from '@/hooks/useData';
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useToast } from '../ui/Toast';

// PlaceBet component for placing bets
function PlaceBet({setIsLoading, loading, playerFee, onPlaceBetClick}: {loading: boolean; setIsLoading: (arg: boolean) => void; playerFee: number; onPlaceBetClick?: () => void}) {
    const { chainId, address, isConnected } = useAccount();
    const[ showTransactionModal, setShowTransactionModal ] = React.useState<boolean>(false);
    const { data: { currentEpochBet, }, isVerified } = useData();
    const { showToast } = useToast();

    // The claim is performed by an approved account, the recipient account should be the account to receive the reward.
    // In the context of RandoBet, since we're integrating with the Gooddollar SDK, we can temporarily use the connected 
    //  as the recipient.
    const trxnSteps = React.useMemo(() => {
        const { transactionData: td, } = filterTransactionData({
            chainId,
            filter: true,
            functionNames: ['placeBet'],
        });

        const totalBetAmount = currentEpochBet + BigInt(Math.floor(playerFee * 1e18));

        const data = {
          abi: td[0].abi,
          functionName: td[0].functionName as FunctionName,
          contractAddress: td[0].contractAddress as Address,
          args: [],
          value: totalBetAmount
        }
        console.log("data", data);
        
        return[{
            id: 'place-bet',
            title: 'Placing bet',
            description: `Setting up data for placing your bet on the blockchain. Total amount: ${Number(currentEpochBet) / 1e18} CELO + ${playerFee.toFixed(4)} CELO fee = ${Number(totalBetAmount) / 1e18} CELO`,
            ...data
        }];

    }, [chainId, playerFee, currentEpochBet]);

    const handlePlaceBet = () => {
      if(!isConnected) {
        showToast({
          type: 'error',
          title: 'Wallet Not Connected',
          message: 'Please connect your wallet to place a bet.'
        });
        return;
      }
      // Call the verification check callback if player is not verified
      if(!isVerified) {
          onPlaceBetClick?.();
        } else {
          setShowTransactionModal(true);
        }
    };
    
    const handleTransactionSuccess = (txHash: string) => {
      console.log('Bet placed with hash:', txHash);
      showToast({
        type: 'success',
        title: 'Bet Placed Successfully',
        message: `Transaction hash: ${txHash.slice(0, 10)}...`
      });
      setIsLoading(false);
      setShowTransactionModal(false);
    };

    const handleTransactionError = (error: Error) => {
      setIsLoading(false);
      console.error('Failed to place bet:', error);
      showToast({
        type: 'error',
        title: 'Bet Failed',
        message: error.message || 'Failed to place bet. Please try again.'
      });
    };
    
    return (
      <div>
        <motion.div 
          className="absolute -bottom-16 md:-bottom-20 left-1/2 transform -translate-x-1/2"
          // whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Button
            onClick={handlePlaceBet}
            size="lg"
            className="bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-full shadow-2xl hover:shadow-violet-500/25 transition-all duration-300 text-sm md:text-base"
            disabled={loading}
          >
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.span
                  key="placing"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 md:w-5 md:h-5 animate-spin" />
                  PLACING...
                </motion.span>
              ) : (
                <motion.span
                  key="place"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-2"
                >
                  <Zap className="w-4 h-4 md:w-5 md:h-5" />
                  PLACE BET
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
        </motion.div>
        <TransactionModal 
            title="Placing bet"
            getSteps={() => trxnSteps}
            isOpen={showTransactionModal}
            onClose={() => setShowTransactionModal(false)}
            onSuccess={handleTransactionSuccess}
            description='Placing your bet'
            onError={handleTransactionError}
            showAnimation={true}
        />
    </div>
  );
}

export default PlaceBet;
