'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Zap } from 'lucide-react'
import PlaceBet from './transactions/PlaceBet'
import Withdraw from './transactions/Withdraw'
import RunDraw from './transactions/RunDraw'
import SetVerification from './transactions/SetVerification'
import ClaimTriggerReward from './transactions/ClaimTriggerReward'

interface UserFunctionsProps {
  setIsLoading: (arg: boolean) => void
  loading: boolean
  playerFee: number
}

export default function UserFunctions({ setIsLoading, loading, playerFee }: UserFunctionsProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-400 hover:to-blue-400 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:shadow-purple-500/25 transition-all duration-300 glow-purple flex items-center gap-2"
      >
        <Zap className="w-4 h-4" />
        Betting Actions
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-12 right-0 w-80 bg-gradient-to-br from-purple-900/40 to-blue-900/40 border border-purple-500/20 rounded-lg spooky-glass p-4"
          >
            <Card className="bg-transparent border-purple-500/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-purple-400 text-lg flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Betting Actions
                </CardTitle>
                <p className="text-purple-200 text-sm">
                  Available betting and interaction functions
                </p>
              </CardHeader>
              <CardContent className="space-y-3">
                <PlaceBet setIsLoading={setIsLoading} loading={loading} playerFee={playerFee} />
                <Withdraw />
                <RunDraw showOnlyButton={true} />
                <SetVerification />
                <ClaimTriggerReward />
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
