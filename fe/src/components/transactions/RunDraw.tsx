import React from 'react';
import { useAccount } from "wagmi";
import { motion, AnimatePresence } from 'framer-motion';
import { Shuffle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useData from '@/hooks/useData';
import { keccak256 } from 'viem';
import RunDrawTransactionModal from '../modals/RunDrawTransactionModal';
import { useToast } from '../ui/Toast';


// Generate random numbers and hash them
const generateRandomHashes = (numOfPlayers: number) => {
    const randomNumbers = Array.from({ length: numOfPlayers === 0? 4 : numOfPlayers }, () => 
        Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
    );
    // console.log("randomNumbers", randomNumbers);
    return randomNumbers.map(num => keccak256(new Uint8Array([num])));
};

function RunDraw({ showOnlyButton }: { showOnlyButton: boolean }) {
    const { chainId, address, isConnected } = useAccount();
    const [showRunDrawModal, setShowRunDrawModal] = React.useState<boolean>(false);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>('');
    const { data: { spin: { players } }, isDrawNeeded } = useData();
    const { showToast } = useToast();

    const handleRunDraw = async () => {
        if (!isConnected || !address) {
            showToast({
                type: 'error',
                title: 'Wallet Not Connected',
                message: 'Please connect your wallet to run the draw.'
            });
            return;
        }

        setIsLoading(true);
        setError('');
        
        try {
            const randoPults = generateRandomHashes(players.length);
            // Call API to trigger the actual runDraw transaction
            const response = await fetch('/api/run-draw', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    randoPults: randoPults,
                    trigger: address,
                    chainId: chainId
                }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Failed to trigger draw');
            }

            const result = await response.json();
            console.log('Draw triggered:', result.transactionHash);
            
            showToast({
                type: 'success',
                title: 'Draw Executed Successfully',
                message: `Transaction with hash: ${result.transactionHash.slice(0, 10)}... was ${result.status}`
            });
            
            setShowRunDrawModal(false);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to trigger draw';
            console.error('Failed to trigger draw:', error);
            setError(errorMessage);
            showToast({
                type: 'error',
                title: 'Draw Failed',
                message: errorMessage
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-4 p-4 border border-stone-600/30 rounded-lg bg-stone-800/50">
            {
                !showOnlyButton && (
                    <div className='space-y-4'>
                        <h3 className="text-sm font-bold text-yellow-400">Run Draw</h3>
                        <div className="space-y-3">
                            <div className="bg-stone-900/80 border border-stone-600/50 rounded-lg p-3">
                                <p className="text-stone-200 text-xs">
                                    Players: {players.length} | Status: {isDrawNeeded ? 'Ready' : 'Not Ready'}
                                </p>
                            </div>
                        </div>
                    </div>
                )
            }

            <Button
                onClick={() => setShowRunDrawModal(true)}
                className="w-full bg-violet-600 hover:bg-violet-500 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300"
                disabled={!isDrawNeeded || players.length === 0}
            >
                <AnimatePresence mode="wait">
                    <motion.span
                        key="run-draw"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center gap-2"
                    >
                        <Shuffle className="w-4 h-4" />
                        RUN DRAW
                    </motion.span>
                </AnimatePresence>
            </Button>

            <RunDrawTransactionModal 
                isOpen={showRunDrawModal}
                onClose={() => setShowRunDrawModal(false)}
                onRunDraw={handleRunDraw}
                isLoading={isLoading}
                error={error}
            />
        </div>
    );
}

export default RunDraw;
