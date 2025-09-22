import React from 'react';
import { useAccount } from "wagmi";
import { filterTransactionData, formatAddr } from '../utilities/common';
import { Address, FunctionName } from '@/types';
import TransactionModal from '../modals/TransactionModal';
import { zeroAddress } from 'viem';

function ClaimTriggerReward() {
    const { chainId, address, isConnected } = useAccount();
    const[ showTransactionModal, setShowTransactionModal ] = React.useState<boolean>(false);
    const account = formatAddr(address);

    // The claim is performed by an approved account, the recipient account should be the account to receive the reward.
    // In the context of RandoBet, since we're integrating with the Gooddollar SDK, we can temporarily use the connected 
    //  as the recipient.
    const trxnSteps = React.useMemo(() => {
        const { transactionData: td, } = filterTransactionData({
            chainId,
            filter: true,
            functionNames: ['claimTriggerReward'],
        });
        const args = [[account, account]];

        const data = {
            abi: td[0].abi,
            functionName: td[0].functionName as FunctionName,
            contractAddress: td[0].contractAddress as Address,
            args,
            value: undefined
        }

        return (isConnected && account !== zeroAddress)? [{
            id: 'claim-trigger-reward',
            title: 'Claiming Trigger Reward',
            description: `Setting up data for claiming trigger reward on the blockchain`,
            ...data
        }] : [];

    }, [chainId]);

    const handleCreateCampaign = () => {
        if (trxnSteps.length === 0) {
            alert('No data to create campaign');
            return;
        }
        setShowTransactionModal(true);
    };
    
    const handleTransactionSuccess = (txHash: string) => {
        console.log('Proof of assimilation stored:', txHash);
        setShowTransactionModal(false);
    };

    const handleTransactionError = (error: Error) => {
        console.error('Failed to store proof:', error);
    };
    

    return (
        <div>
            <p>Complete the implementation</p>
            <TransactionModal 
                title="Claim Trigger Reward"
                getSteps={() => trxnSteps}
                isOpen={showTransactionModal}
                onClose={() => setShowTransactionModal(false)}
                onSuccess={handleTransactionSuccess}
                description='Claiming trigger reward'
                onError={handleTransactionError}
            />
        </div>
    );
}

export default ClaimTriggerReward;
