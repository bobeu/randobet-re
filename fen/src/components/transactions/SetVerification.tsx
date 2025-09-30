<<<<<<< HEAD
import React from 'react';
import { useAccount } from "wagmi";
import { filterTransactionData } from '../utilities/common';
import { Address, FunctionName } from '@/types';
import TransactionModal from '../modals/TransactionModal';
import { motion } from 'framer-motion'
import { Shield } from 'lucide-react'
import { useToast } from '../ui/Toast';

function SetVerification({ isVerified }: { isVerified?: boolean }) {
    const { chainId, address, isConnected } = useAccount();
    const[ showTransactionModal, setShowTransactionModal ] = React.useState<boolean>(false);
    const { showToast } = useToast();

    const trxnSteps = React.useMemo(() => {
        const { transactionData: td, } = filterTransactionData({
            chainId,
            filter: true,
            functionNames: ['setVerification'],
        });

        const data = {
            abi: td[0].abi,
            functionName: td[0].functionName as FunctionName,
            contractAddress: td[0].contractAddress as Address,
            args: [],
            value: undefined
        }

        return [{
            id: 'set-verification',
            title: 'Setting Verification',
            description: `Setting up verification parameters`,
            ...data
        }];

    }, [chainId]);

    const handleSetVerification = () => {
        if (!isConnected || !address) {
            showToast({
                type: 'error',
                title: 'Wallet Not Connected',
                message: 'Please connect your wallet to set verification.'
            });
            return;
        }
        
        if (trxnSteps.length === 0) {
            showToast({
                type: 'error',
                title: 'Verification Failed',
                message: 'Cannot set verification. Please try again.'
            });
            return;
        }
        setShowTransactionModal(true);
    };
    
    const handleTransactionSuccess = (txHash: string) => {
        console.log('Verification set:', txHash);
        showToast({
            type: 'success',
            title: 'Verification Successful',
            message: `Transaction hash: ${txHash.slice(0, 10)}...`
        });
        setShowTransactionModal(false);
    };

    const handleTransactionError = (error: Error) => {
        console.error('Failed to set verification:', error);
        showToast({
            type: 'error',
            title: 'Verification Failed',
            message: error.message || 'Failed to set verification. Please try again.'
        });
    };
    

    return (
        <div>
            <motion.button
                onClick={handleSetVerification}
                className={`font-bold py-2 px-4 rounded-lg shadow-lg transition-all duration-300 flex items-center gap-2 ${
                    isVerified 
                        ? 'bg-green-600 hover:bg-green-500 text-white' 
                        : 'bg-violet-600 hover:bg-violet-500 text-white'
                }`}
                disabled={trxnSteps.length === 0 || isVerified}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <Shield className="w-4 h-4" />
                {isVerified ? 'Verified' : 'Verify'}
            </motion.button>
            <TransactionModal 
                title="Set Verification"
                getSteps={() => trxnSteps}
                isOpen={showTransactionModal}
                onClose={() => setShowTransactionModal(false)}
                onSuccess={handleTransactionSuccess}
                description='Setting verification parameters'
                onError={handleTransactionError}
            />
        </div>
    );
}

export default SetVerification;
=======
// import React from 'react';
// import { useAccount } from "wagmi";
// import { filterTransactionData } from '../utilities/common';
// import { Address, FunctionName } from '@/types';
// import TransactionModal from '../modals/TransactionModal';
// import { motion } from 'framer-motion'
// import { Shield } from 'lucide-react'
// import { useToast } from '../ui/Toast';

// function SetVerification({ isVerified }: { isVerified?: boolean }) {
//     const { chainId, address, isConnected } = useAccount();
//     const[ showTransactionModal, setShowTransactionModal ] = React.useState<boolean>(false);
//     const { showToast } = useToast();

//     const trxnSteps = React.useMemo(() => {
//         const { transactionData: td, } = filterTransactionData({
//             chainId,
//             filter: true,
//             functionNames: ['setVerification'],
//         });

//         const data = {
//             abi: td[0].abi,
//             functionName: td[0].functionName as FunctionName,
//             contractAddress: td[0].contractAddress as Address,
//             args: [],
//             value: undefined
//         }

//         return [{
//             id: 'set-verification',
//             title: 'Setting Verification',
//             description: `Setting up verification parameters`,
//             ...data
//         }];

//     }, [chainId]);

//     const handleSetVerification = () => {
//         if (!isConnected || !address) {
//             showToast({
//                 type: 'error',
//                 title: 'Wallet Not Connected',
//                 message: 'Please connect your wallet to set verification.'
//             });
//             return;
//         }
        
//         if (trxnSteps.length === 0) {
//             showToast({
//                 type: 'error',
//                 title: 'Verification Failed',
//                 message: 'Cannot set verification. Please try again.'
//             });
//             return;
//         }
//         setShowTransactionModal(true);
//     };
    
//     const handleTransactionSuccess = (txHash: string) => {
//         console.log('Verification set:', txHash);
//         showToast({
//             type: 'success',
//             title: 'Verification Successful',
//             message: `Transaction hash: ${txHash.slice(0, 10)}...`
//         });
//         setShowTransactionModal(false);
//     };

//     const handleTransactionError = (error: Error) => {
//         console.error('Failed to set verification:', error);
//         showToast({
//             type: 'error',
//             title: 'Verification Failed',
//             message: error.message || 'Failed to set verification. Please try again.'
//         });
//     };
    

//     return (
//         <div>
//             <motion.button
//                 onClick={handleSetVerification}
//                 className={`font-bold py-2 px-4 rounded-lg shadow-lg transition-all duration-300 flex items-center gap-2 ${
//                     isVerified 
//                         ? 'bg-green-600 hover:bg-green-500 text-white' 
//                         : 'bg-violet-600 hover:bg-violet-500 text-white'
//                 }`}
//                 disabled={trxnSteps.length === 0 || isVerified}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//             >
//                 <Shield className="w-4 h-4" />
//                 {isVerified ? 'Verified' : 'Verify'}
//             </motion.button>
//             <TransactionModal 
//                 title="Set Verification"
//                 getSteps={() => trxnSteps}
//                 isOpen={showTransactionModal}
//                 onClose={() => setShowTransactionModal(false)}
//                 onSuccess={handleTransactionSuccess}
//                 description='Setting verification parameters'
//                 onError={handleTransactionError}
//             />
//         </div>
//     );
// }

// export default SetVerification;
>>>>>>> b0834868ef79d049acd38997737ae5694a9371e5
