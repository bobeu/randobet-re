import React from 'react';
import { useAccount } from "wagmi";
import { filterTransactionData, formatAddr } from '../utilities/common';
import { Address, FunctionName } from '@/types';
import TransactionModal from '../modals/TransactionModal';
import { zeroAddress } from 'viem';
import useData from '@/hooks/useData';
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

function PlaceBet({setIsLoading, loading}: {loading: boolean; setIsLoading: (arg: boolean) => void}) {
    const { chainId, address, isConnected } = useAccount();
    const[ showTransactionModal, setShowTransactionModal ] = React.useState<boolean>(false);
    const account = formatAddr(address);
    const { data: { currentEpochBet } } = useData();


    // The claim is performed by an approved account, the recipient account should be the account to receive the reward.
    // In the context of RandoBet, since we're integrating with the Gooddollar SDK, we can temporarily use the connected 
    //  as the recipient.
    const trxnSteps = React.useMemo(() => {
        const { transactionData: td, } = filterTransactionData({
            chainId,
            filter: true,
            functionNames: ['placebet'],
        });

        const data = {
            abi: td[0].abi,
            functionName: td[0].functionName as FunctionName,
            contractAddress: td[0].contractAddress as Address,
            args: [],
            value: currentEpochBet
        }

        return (isConnected && account !== zeroAddress)? [{
            id: 'place-bet',
            title: 'Placing bet',
            description: `Setting up data for placing your bet on the blockchain`,
            ...data
        }] : [];

    }, [chainId, isConnected, account, currentEpochBet]);

    const handlePlaceBet = () => {
        if (trxnSteps.length === 0) {
            alert('No data to create campaign');
            return;
        }
        setShowTransactionModal(true);
    };
    
    const handleTransactionSuccess = (txHash: string) => {
        console.log('Bet placed with hash:', txHash);
        setIsLoading(false);
        setShowTransactionModal(false);
    };

    const handleTransactionError = (error: Error) => {
        setIsLoading(false);
        console.error('Failed to place bet:', error);
    };
    

    return (
        <div>
            <motion.div 
              className="absolute -bottom-16 md:-bottom-20 left-1/2 transform -translate-x-1/2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={handlePlaceBet}
                size="lg"
                className="bg-gradient-to-r from-orange-400 to-purple-500 hover:from-orange-300 hover:to-purple-400 text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-full shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 glow-orange text-sm md:text-base"
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
            />
        </div>
    );
}

export default PlaceBet;
