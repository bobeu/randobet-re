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
    // setBetPlaced(true)
    // setTotalPool(prev => prev + nextBetAmount)
    // setPlayersCount(prev => prev + 1)
    
    // setTimeout(() => {
    //   setIsSpinning(false)
    //   setBetPlaced(false)
    // }, 3000)
  }

  const progressValue = ((60 - timeLeft) / 60) * 100

  return (
    <div className="h-screen gradient-bg relative overflow-hidden">
      {/* Full Page ParticleField Background */}
      <ParticleField />
      
      {/* SpookySwap themed decorative elements - moved to top */}
      <div className="absolute top-4 left-4 z-10">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold spooky-text mb-1">
            RANDOBET
          </h2>
          <p className="text-purple-200 text-xs sm:text-sm md:text-base">
            On-Chain Betting Protocol
          </p>
        </motion.div>
      </div>

      {/* Mystical elements - positioned to not interfere */}
      <div className="absolute top-20 right-20 hidden md:block z-10">
        <motion.div
          className="w-16 h-16 border-2 border-purple-400/30 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <div className="absolute bottom-20 left-20 hidden md:block z-10">
        <motion.div
          className="w-12 h-12 border-2 border-orange-400/30 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Main Content Layout */}
      <div className="relative z-20 h-full flex flex-col md:flex-row">
        {/* Mobile: AnimatedOrb at top */}
        <div className="md:hidden flex flex-col items-center justify-center p-4 pt-8">
          <div className="relative w-full max-w-sm">
            <AnimatedOrb isSpinning={isSpinning} />

            {/* Bet Button */}
            <motion.div 
              className="absolute -bottom-16 left-1/2 transform -translate-x-1/2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={handleBet}
                size="lg"
                className="bg-gradient-to-r from-orange-400 to-purple-500 hover:from-orange-300 hover:to-purple-400 text-white font-bold py-3 px-6 rounded-full shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 glow-orange text-sm"
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
                      <Sparkles className="w-4 h-4 animate-spin" />
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
                      <Zap className="w-4 h-4" />
                      PLACE BET
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Desktop: Betting Area - 40% width */}
        <div className="hidden md:flex w-2/5 items-center justify-center p-4 md:p-8">
          <div className="relative w-full max-w-sm md:max-w-md lg:max-w-lg">
            <AnimatedOrb isSpinning={isSpinning} />

            {/* Bet Button */}
            <motion.div 
              className="absolute -bottom-16 md:-bottom-20 left-1/2 transform -translate-x-1/2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={handleBet}
                size="lg"
                className="bg-gradient-to-r from-orange-400 to-purple-500 hover:from-orange-300 hover:to-purple-400 text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-full shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 glow-orange text-sm md:text-base"
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
          </div>
        </div>

        {/* Stats Sidebar - 100% width on mobile, 60% on desktop */}
        <div className="w-full md:w-3/5 spooky-glass border-t md:border-t-0 md:border-l border-purple-500/20 p-4 md:p-6 overflow-y-auto">
          <div className="space-y-4 md:space-y-6">
            {/* Header */}
            <motion.div 
              className="text-center mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold spooky-text">
                SPOOKY RANDOBET
              </h1>
              <p className="text-purple-200 text-xs md:text-sm mt-2">On-Chain Betting Protocol</p>
            </motion.div>

            {/* Next Draw Timer */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="bg-gradient-to-br from-purple-900/40 to-orange-900/40 border-orange-500/20 spooky-glass">
                <CardHeader className="pb-2 md:pb-3">
                  <CardTitle className="flex items-center gap-2 md:gap-3 text-orange-400 text-sm md:text-base">
                    <Timer className="w-4 h-4 md:w-5 md:h-5" />
                    Next Draw
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 md:mb-3">
                    {formatTime(timeLeft)}
                  </div>
                  <Progress 
                    value={progressValue} 
                    className="h-2 bg-purple-700"
                  />
                </CardContent>
              </Card>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-3 md:gap-4">
              <StatsCard
                icon={DollarSign}
                label="Total Pool"
                value={`${totalPool.toFixed(3)} ETH`}
                gradient="from-orange-900/30 to-purple-900/30"
                borderColor="border-orange-500/20"
                textColor="text-orange-400"
                delay={0.2}
              />

              <StatsCard
                icon={Users}
                label="Active Players"
                value={playersCount.toString()}
                gradient="from-purple-900/30 to-violet-900/50"
                borderColor="border-purple-500/20"
                textColor="text-purple-400"
                delay={0.3}
              />

              <StatsCard
                icon={TrendingUp}
                label="Min Bet"
                value={`${nextBetAmount} ETH`}
                gradient="from-violet-900/50 to-orange-900/30"
                borderColor="border-violet-500/20"
                textColor="text-violet-200"
                delay={0.4}
              />
            </div>

            {/* Recent Activity */}
            <RecentBets />

            {/* Connection Status */}
            <motion.div 
              className="text-center text-xs text-purple-400"
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