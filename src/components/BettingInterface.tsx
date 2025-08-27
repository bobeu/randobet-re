'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Timer, Users, DollarSign, TrendingUp, Zap, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import AnimatedOrb from '@/components/AnimatedOrb'
import ParticleField from '@/components/ParticleField'
import StatsCard from '@/components/StatsCard'
import RecentBets from '@/components/RecentBets'

export default function BettingInterface() {
  const [timeLeft, setTimeLeft] = useState(45)
  const [totalPool, setTotalPool] = useState(12.847)
  const [playersCount, setPlayersCount] = useState(127)
  const [nextBetAmount, setNextBetAmount] = useState(0.1)
  const [isSpinning, setIsSpinning] = useState(true)
  const [betPlaced, setBetPlaced] = useState(false)

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setTotalPool(prev => prev + Math.random() * 2)
          setPlayersCount(prev => prev + Math.floor(Math.random() * 5))
          return 60
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleBet = () => {
    setIsSpinning(true)
    setBetPlaced(true)
    setTotalPool(prev => prev + nextBetAmount)
    setPlayersCount(prev => prev + 1)
    
    setTimeout(() => {
      setIsSpinning(false)
      setBetPlaced(false)
    }, 3000)
  }

  const progressValue = ((60 - timeLeft) / 60) * 100

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      <ParticleField />
      
      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen">
        {/* Main Betting Area */}
        <div className="flex-1 flex items-center justify-center p-4 lg:p-8">
          <div className="relative w-full max-w-md lg:max-w-lg">
            {/* Header for mobile */}
            <motion.div 
              className="text-center mb-8 lg:hidden"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 via-violet-400 to-yellow-400 bg-clip-text text-transparent">
                CHAIN ROULETTE
              </h1>
              <p className="text-stone-300 text-sm mt-2">On-Chain Betting Protocol</p>
            </motion.div>

            <AnimatedOrb isSpinning={isSpinning} />

            {/* Bet Button */}
            <motion.div 
              className="absolute -bottom-20 left-1/2 transform -translate-x-1/2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={handleBet}
                size="lg"
                className="bg-gradient-to-r from-yellow-400 to-violet-500 hover:from-yellow-300 hover:to-violet-400 text-stone-900 font-bold py-4 px-8 rounded-full shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 glow-yellow"
                disabled={betPlaced}
              >
                <AnimatePresence mode="wait">
                  {betPlaced ? (
                    <motion.span
                      key="placing"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center gap-2"
                    >
                      <Sparkles className="w-5 h-5 animate-spin" />
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
                      <Zap className="w-5 h-5" />
                      PLACE BET
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Stats Sidebar */}
        <div className="w-full lg:w-80 glass-effect border-t lg:border-t-0 lg:border-l border-stone-600/30 p-4 lg:p-6 order-first lg:order-last">
          <div className="space-y-4 lg:space-y-6">
            {/* Header for desktop */}
            <motion.div 
              className="text-center hidden lg:block"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 via-violet-400 to-yellow-400 bg-clip-text text-transparent">
                CHAIN ROULETTE
              </h1>
              <p className="text-stone-300 text-sm mt-2">On-Chain Betting Protocol</p>
            </motion.div>

            {/* Next Draw Timer */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="bg-gradient-to-br from-violet-900/40 to-yellow-900/40 border-yellow-500/20 glass-effect">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-3 text-yellow-400">
                    <Timer className="w-5 h-5" />
                    Next Draw
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <motion.div 
                    className="text-2xl lg:text-3xl font-bold text-white mb-3"
                    key={timeLeft}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {formatTime(timeLeft)}
                  </motion.div>
                  <Progress 
                    value={progressValue} 
                    className="h-2 bg-stone-700"
                  />
                </CardContent>
              </Card>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 lg:gap-4">
              <StatsCard
                icon={DollarSign}
                label="Total Pool"
                value={`${totalPool.toFixed(3)} ETH`}
                gradient="from-yellow-900/30 to-violet-900/30"
                borderColor="border-yellow-500/20"
                textColor="text-yellow-400"
                delay={0.2}
              />

              <StatsCard
                icon={Users}
                label="Active Players"
                value={playersCount.toString()}
                gradient="from-violet-900/30 to-stone-900/50"
                borderColor="border-violet-500/20"
                textColor="text-violet-400"
                delay={0.3}
              />

              <StatsCard
                icon={TrendingUp}
                label="Min Bet"
                value={`${nextBetAmount} ETH`}
                gradient="from-stone-900/50 to-yellow-900/30"
                borderColor="border-stone-500/20"
                textColor="text-stone-200"
                delay={0.4}
                className="col-span-2 lg:col-span-1"
              />
            </div>

            {/* Recent Activity */}
            <RecentBets />

            {/* Connection Status */}
            <motion.div 
              className="text-center text-xs text-stone-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="flex items-center justify-center gap-2">
                <motion.div 
                  className="w-2 h-2 bg-green-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                Connected to Ethereum Mainnet
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}