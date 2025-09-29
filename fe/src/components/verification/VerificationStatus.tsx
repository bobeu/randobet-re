import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@radix-ui/react-tooltip'
import { motion } from 'framer-motion'
import { Shield, AlertTriangle } from 'lucide-react'
import React from 'react'
// import SetVerification from '../transactions/SetVerification'
import { Card, CardContent } from '../ui/card'
import useData from '@/hooks/useData'

export default function VerificationStatus({handleShowVerificationPage}: {handleShowVerificationPage: () => void}) {
    const { isVerified } = useData();
    
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
        >
            <Card className="bg-stone-800/40 border-stone-600/20 backdrop-blur-lg">
                <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                            <div className={`w-12 h-12 border-2 border-stone-600 flex items-center justify-center cursor-help rounded-lg ${
                                isVerified 
                                ? 'bg-green-600 text-white' 
                                : 'bg-yellow-500 text-stone-900'
                            }`}>
                                {isVerified ? (
                                <Shield className="w-6 h-6" />
                                ) : (
                                <AlertTriangle className="w-6 h-6" />
                                )}
                            </div>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="max-w-xs bg-stone-800 border border-stone-600 p-4">
                            <div className="space-y-2">
                                <p className="font-bold text-yellow-400 uppercase tracking-wider">
                                {isVerified ? 'IDENTITY VERIFIED' : 'IDENTITY NOT VERIFIED'}
                                </p>
                                <p className="text-sm text-stone-200">
                                {isVerified 
                                    ? 'Your identity has been verified. You can place bets and participate in the betting protocol.'
                                    : 'You need to verify your identity before placing bets. Use the verify button to complete verification.'
                                }
                                </p>
                            </div>
                            </TooltipContent>
                        </Tooltip>
                        </TooltipProvider>
                        <div>
                        <h3 className="text-lg font-bold text-stone-200">
                            {isVerified ? 'Identity Verified' : 'Identity Not Verified'}
                        </h3>
                        <p className="text-sm text-stone-400">
                            {isVerified ? 'You can place bets' : 'Verification required to bet'}
                        </p>
                        </div>
                    </div>
                    <motion.button
                        onClick={handleShowVerificationPage}
                        className={`font-bold py-2 px-4 rounded-lg shadow-lg transition-all duration-300 flex items-center gap-2 ${
                            isVerified 
                                ? 'bg-green-600 hover:bg-green-500 text-white' 
                                : 'bg-violet-600 hover:bg-violet-500 text-white'
                        }`}
                        disabled={isVerified}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Shield className="w-4 h-4" />
                        {isVerified ? 'Verified' : 'Verify'}
                    </motion.button>
                </div>
            </CardContent>
        </Card>
    </motion.div>
  )
}
