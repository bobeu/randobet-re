'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Shield, QrCode, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react'
import { useAccount } from 'wagmi'
import { filterTransactionData } from './utilities/common';
import { Address, FunctionName } from '@/types'
import TransactionModal from './modals/TransactionModal'
import SelfQRCodeVerifier from './SelfQRCodeVerifier'
import { useToast } from './ui/Toast'

interface VerificationSectionProps {
  onVerificationComplete?: () => void;
}

export default function VerificationSection({ onVerificationComplete }: VerificationSectionProps) {
  const [verificationMethod, setVerificationMethod] = useState<'wallet' | 'self' | null>(null);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const { chainId, address, isConnected } = useAccount();
  const { showToast } = useToast();

  const trxnSteps = useMemo(() => {
    const { transactionData: td } = filterTransactionData({
      chainId,
      filter: true,
      functionNames: ['setVerification'],
    })

    const data = {
      abi: td[0].abi,
      functionName: td[0].functionName as FunctionName,
      contractAddress: td[0].contractAddress as Address,
      args: [],
      value: undefined
    }

    return [{
      id: 'verify-wallet',
      title: 'Verifying Identity',
      description: 'Signing transaction with your wallet to verify your identity on the blockchain',
      ...data
    }]
  }, [chainId]);

  const handleWalletVerification = () => {
    if (!isConnected || !address) {
      showToast({
        type: 'error',
        title: 'Wallet Not Connected',
        message: 'Please connect your wallet to verify your identity.'
      });
      return;
    }
    
    if (trxnSteps.length === 0) {
      showToast({
        type: 'error',
        title: 'Verification Failed',
        message: 'Unable to create verification transaction. Please try again.'
      });
      return;
    }
    setShowTransactionModal(true);
  }

  const handleTransactionSuccess = (txHash: string) => {
    console.log('Verification successful with hash:', txHash)
    showToast({
      type: 'success',
      title: 'Verification Successful',
      message: `Transaction hash: ${txHash.slice(0, 10)}...`
    });
    setShowTransactionModal(false);
    onVerificationComplete?.();
  }

  const handleTransactionError = (error: Error) => {
    console.error('Verification failed:', error)
    showToast({
      type: 'error',
      title: 'Verification Failed',
      message: error.message || 'Failed to verify identity. Please try again.'
    });
    setShowTransactionModal(false)
  }

  const handleSelfVerificationComplete = () => {
    setVerificationMethod(null);
    onVerificationComplete?.();
  }

  if (verificationMethod === 'self') {
    return (
      <SelfQRCodeVerifier 
        onVerificationComplete={handleSelfVerificationComplete}
        onClose={() => setVerificationMethod(null)}
      />
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto"
    >
      <Card className="bg-stone-900/20 border-none">
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-yellow-400" />
            <CardTitle className="text-2xl font-bold text-yellow-400">
              Identity Verification Required
            </CardTitle>
          </div>
          <p className="text-yellow-200 text-sm">
            You must verify your identity before placing bets. Choose your preferred verification method below.
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Verification Methods */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Wallet Verification */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="cursor-pointer"
              onClick={() => setVerificationMethod('wallet')}
            >
              <Card className="bg-stone-900/40 border-stone-500/20 hover:border-violet-500/40 transition-all duration-300">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-16 h-16 bg-violet-600/20 rounded-full flex items-center justify-center mx-auto">
                    <MessageSquare className="w-8 h-8 text-violet-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-violet-400">Wallet Signature</h3>
                  <p className="text-stone-300 text-sm">
                    Sign a message with your connected wallet to verify your identity
                  </p>
                  <div className="flex items-center justify-center gap-2 text-xs text-stone-400">
                    <CheckCircle className="w-4 h-4" />
                    <span>Quick & Easy</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Self Protocol Verification */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="cursor-pointer"
              onClick={() => setVerificationMethod('self')}
            >
              <Card className="bg-stone-900/40 border-stone-500/20 hover:border-yellow-500/40 transition-all duration-300">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-16 h-16 bg-yellow-600/20 rounded-full flex items-center justify-center mx-auto">
                    <QrCode className="w-8 h-8 text-yellow-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-yellow-400">Self Protocol</h3>
                  <p className="text-stone-300 text-sm">
                    Use Self Protocol app for advanced identity verification
                  </p>
                  <div className="flex items-center justify-center gap-2 text-xs text-stone-400">
                    <CheckCircle className="w-4 h-4" />
                    <span>Advanced Security</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Wallet Verification Details */}
          {verificationMethod === 'wallet' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4"
            >
              <div className="bg-violet-900/20 border border-violet-500/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <MessageSquare className="w-5 h-5 text-violet-400 mt-0.5 flex-shrink-0" />
                  <div className="space-y-2">
                    <h4 className="font-semibold text-violet-400">Wallet Signature Verification</h4>
                    <p className="text-stone-200 text-sm leading-relaxed">
                      This temporary method requires you to interact with a contract and sign a message with your connected wallet. 
                      The signature will be used to verify your identity on the blockchain.
                    </p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center gap-2 text-xs text-stone-400 cursor-help">
                            <AlertCircle className="w-4 h-4" />
                            <span>You need CELO tokens as gas fee to complete the verification</span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-xs">
                          <div className="space-y-2">
                            <p className="font-semibold text-yellow-400">Free Verification</p>
                            <p className="text-sm text-stone-300">
                              Wallet signature verification is completely free and tentative.
                            </p>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleWalletVerification}
                  disabled={!isConnected || trxnSteps.length === 0}
                  className="flex-1 bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {!isConnected ? 'Connect Wallet First' : 'Verify with Wallet'}
                </Button>
                <Button
                  onClick={() => setVerificationMethod(null)}
                  variant="outline"
                  className="flex-1 border-stone-500 text-stone-300 hover:bg-stone-800 hover:text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
                >
                  Back to Options
                </Button>
              </div>
            </motion.div>
          )}

          {/* Important Notice */}
          <div className="bg-stone-900/20 border border-stone-500/30 rounded-lg p-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-start gap-3 cursor-help">
                    <AlertCircle className="w-5 h-5 text-stone-400 mt-0.5 flex-shrink-0" />
                    <div className="space-y-2">
                      <h4 className="font-semibold text-stone-300">Important Information</h4>
                      <ul className="text-stone-200 text-sm space-y-1">
                        <li>• Verification is required before placing any bets</li>
                        <li>• Your verification status is stored on the blockchain</li>
                        <li>• You only need to verify once per wallet address</li>
                        <li>• Verification helps prevent fraud and ensures fair play</li>
                      </ul>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs">
                  <div className="space-y-2">
                    <p className="font-semibold text-yellow-400">Why Verification Matters</p>
                    <p className="text-sm text-stone-300">
                      Identity verification ensures a fair and secure betting environment. It prevents multiple accounts, 
                      ensures compliance with regulations, and protects the integrity of the betting protocol.
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardContent>
      </Card>

      <TransactionModal 
        title="Identity Verification"
        getSteps={() => trxnSteps}
        isOpen={showTransactionModal}
        onClose={() => setShowTransactionModal(false)}
        onSuccess={handleTransactionSuccess}
        description="Verifying your identity with wallet signature"
        onError={handleTransactionError}
      />
    </motion.div>
  )
}
