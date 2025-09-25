'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle, Shield, Zap, DollarSign } from 'lucide-react'

interface DisclaimerModalProps {
  isOpen: boolean
  onAccept: () => void
  onReject: () => void
}

export default function DisclaimerModal({ isOpen, onAccept, onReject }: DisclaimerModalProps) {
  const [hasAccepted, setHasAccepted] = useState(false)
  const [hasRejected, setHasRejected] = useState(false)

  useEffect(() => {
    // Check if user has previously accepted or rejected disclaimer
    const accepted = localStorage.getItem('randobet-disclaimer-accepted')
    const rejected = localStorage.getItem('randobet-disclaimer-rejected')
    
    if (accepted === 'true') {
      setHasAccepted(true)
    } else if (rejected === 'true') {
      setHasRejected(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('randobet-disclaimer-accepted', 'true')
    localStorage.removeItem('randobet-disclaimer-rejected')
    setHasAccepted(true)
    onAccept()
  }

  const handleReject = () => {
    localStorage.setItem('randobet-disclaimer-rejected', 'true')
    localStorage.removeItem('randobet-disclaimer-accepted')
    setHasRejected(true)
    onReject()
  }

  if (hasAccepted) {
    return null
  }

  if (hasRejected) {
    return (
      <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-yellow-400">ACCESS DENIED</h1>
          <p className="text-xl text-stone-200">
            You must accept the disclaimer to use Randobet.
          </p>
          <Button
            onClick={() => {
              localStorage.removeItem('randobet-disclaimer-rejected')
              setHasRejected(false)
            }}
            className="btn-primary"
          >
            Review Disclaimer Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <Card className="bg-stone-900/95 border-violet-500/20 backdrop-blur-lg">
              <CardHeader className="text-center pb-4">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Shield className="w-8 h-8 text-violet-400" />
                  <CardTitle className="text-2xl font-bold text-violet-400">
                    RANDOBET DISCLAIMER
                  </CardTitle>
                </div>
                <p className="text-stone-300 text-sm">
                  Please read and understand the following information before using Randobet
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* What is Randobet */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    <h3 className="text-lg font-semibold text-yellow-400">What is Randobet?</h3>
                  </div>
                  <p className="text-stone-200 text-sm leading-relaxed">
                    Randobet is an on-chain betting protocol built on the Celo blockchain. It allows users to participate in 
                    decentralized betting rounds where participants can win or lose CELO tokens based on random outcomes.
                  </p>
                </div>

                {/* Goal */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-violet-400" />
                    <h3 className="text-lg font-semibold text-violet-400">Our Goal</h3>
                  </div>
                  <p className="text-stone-200 text-sm leading-relaxed">
                    Randobet aims to provide a transparent, decentralized, and fair betting experience where all outcomes 
                    are determined by blockchain-based randomness, ensuring no manipulation or central control.
                  </p>
                </div>

                {/* Risks */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-400" />
                    <h3 className="text-lg font-semibold text-yellow-400">Risks Involved</h3>
                  </div>
                  <div className="space-y-2 text-stone-200 text-sm">
                    <p className="font-medium text-yellow-300">⚠️ Financial Risk:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>You may lose all CELO tokens you bet</li>
                      <li>There is no guarantee of winning</li>
                      <li>Past performance does not indicate future results</li>
                    </ul>
                    
                    <p className="font-medium text-yellow-300 mt-4">⚠️ Technical Risk:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Smart contract bugs or vulnerabilities</li>
                      <li>Network congestion affecting transactions</li>
                      <li>Wallet security and private key management</li>
                    </ul>
                    
                    <p className="font-medium text-yellow-300 mt-4">⚠️ Regulatory Risk:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Betting regulations may vary by jurisdiction</li>
                      <li>Legal compliance is your responsibility</li>
                      <li>Use at your own risk and discretion</li>
                    </ul>
                  </div>
                </div>

                {/* Important Notice */}
                <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <div className="space-y-2">
                      <h4 className="font-semibold text-yellow-400">Important Notice</h4>
                      <p className="text-stone-200 text-sm leading-relaxed">
                        By using Randobet, you acknowledge that you understand the risks involved and that you are 
                        participating voluntarily. Only bet what you can afford to lose. If you do not agree with 
                        these terms, please do not use this platform.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button
                    onClick={handleAccept}
                    className="btn-primary flex-1"
                  >
                    I Understand & Accept
                  </Button>
                  <Button
                    onClick={handleReject}
                    className="btn-secondary flex-1"
                  >
                    Reject & Exit
                  </Button>
                </div>

                <p className="text-xs text-stone-400 text-center pt-2">
                  This disclaimer will appear each time you refresh the page. 
                  By accepting, you confirm you have read and understood all risks.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
