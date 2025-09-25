import React from 'react';
import { useAccount } from "wagmi";
import { filterTransactionData } from '../utilities/common';
import { Address, FunctionName } from '@/types';
import TransactionModal from '../modals/TransactionModal';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '../ui/Toast';
import { zeroAddress } from 'viem';

function SetApproval() {
    const { chainId, address, isConnected } = useAccount();
    const[ showTransactionModal, setShowTransactionModal ] = React.useState<boolean>(false);
    const [newAdmin, setNewAdmin] = React.useState<string>('');
    const { showToast } = useToast();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const value = e.target.value;
        // console.log("value", value)
        if(value.length === 42 && value.startsWith('0x')) setNewAdmin(value);
    };

    const trxnSteps = React.useMemo(() => {
        const { transactionData: td, contractAddresses: ca} = filterTransactionData({
            chainId,
            filter: true,
            functionNames: ['setPermission'],
        });

        // const parsedBetList = newBet.split(',').map(s => BigInt(s.trim()));
        const data = {
            abi: td[0].abi,
            functionName: td[0].functionName as FunctionName,
            contractAddress: td[0].contractAddress as Address,
            args: [newAdmin as Address],
            value: undefined
        }

        return [{
            id: 'setting-approval',
            title: 'Setting admin approval',
            description: `Setting approval for new account: ${newAdmin}`,
            ...data
        }];

    }, [chainId, newAdmin]);

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
                message: 'Cannot complete approval. Please check your input.'
            });
            return;
        }
        setShowTransactionModal(true);
    };
    
    const handleTransactionSuccess = (txHash: string) => {
        showToast({
            type: 'success',
            title: 'Approval Setting Successfully',
            message: `Transaction hash: ${txHash.slice(0, 10)}...`
        });
        setShowTransactionModal(false);
    };

    const handleTransactionError = (error: Error) => {
        console.error('Failed To Set Approval:', error);
        showToast({
            type: 'error',
            title: 'Updating Approval Failed',
            message: error.message || 'Failed set approval. Please try again.'
        });
    };
    
    return (
        <div className="space-y-4 p-4 border rounded-lg bg-purple-900/10 border-purple-500/20">
            <h3 className="text-lg font-bold text-orange-400">Set Approval</h3>
            <div className="space-y-2">
                {/* <div className="bg-purple-800/30 border border-purple-500/30 rounded-lg p-3">
                    <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                            <span className="text-purple-200">Current Interval (In Minute):</span>
                            <span className="text-orange-400 font-mono">{Number(drawInterval) / 60} {Number(drawInterval) > 24? 'Min' : 'Hrs'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-purple-200">Next Bet:</span>
                            <span className="text-green-400 font-mono">{(Number(nextEpochBet) / 1e18).toFixed(4)} CELO</span>
                        </div>
                    </div>
                </div> */}
                <div className="space-y-2">
                    <Label htmlFor="newAdmin" className="text-purple-200">New Interval (In minutes)</Label>
                    <Input
                        id="newAdmin"
                        type="text"
                        value={newAdmin}
                        onChange={(e) => handleChange(e)}
                        className="bg-purple-800/30 border-purple-500/30 text-white"
                        placeholder="valid address, e.g 0x123YB23333..."
                    />
                    <p className="text-xs text-purple-300">
                        Enter an address 
                    </p>
                </div>
            </div>
            <Button
                onClick={handleSetBetListUpfront}
                className="w-full bg-gradient-to-r from-red-400 to-orange-500 hover:from-red-300 hover:to-orange-400 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:shadow-red-500/25 transition-all duration-300 glow-red"
                disabled={trxnSteps.length === 0}
            >
                <Settings className="w-4 h-4 mr-2" />
                SET APPROVAL
            </Button>
            <TransactionModal 
                title="Set Approval"
                getSteps={() => trxnSteps}
                isOpen={showTransactionModal}
                onClose={() => setShowTransactionModal(false)}
                onSuccess={handleTransactionSuccess}
                description={`Setting Approval for ${newAdmin}`}
                onError={handleTransactionError}
            />
        </div>
    );
}

export default SetApproval;



// setDataStruct(
//         uint24 drawIntervalInMin, 
//         address feeTo, 
//         uint playerFee
//     )

    