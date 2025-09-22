'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Timer, Users, DollarSign, TrendingUp, Zap, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import AnimatedOrb from '@/components/AnimatedOrb'
import ParticleField from '@/components/ParticleField'
import StatsCard from '@/components/StatsCard'
import RecentBets from '@/components/RecentBets'
import PlaceBet from './transactions/PlaceBet'
import UserFunctions from '@/components/UserFunctions'
import AdminDashboard from '@/components/AdminDashboard'
import useData from '@/hooks/useData'

export default function BettingInterface() {
  const { 
    data: { 
      currentEpochBet, 
      nextEpochBet, 
      deadEpoch,
      state: {
        data,
        epoches: currentEpoch
      },
      spin: {
        players,
        pool: totalBet,
      }
    },
    isDrawNeeded
  } = useData();
  const [timeLeft, setTimeLeft] = useState(45)
  const [loading, setLoading] = useState<boolean>(false);
  // const [betPlaced, setBetPlaced] = useState(false)

  // Countdown timer - using real blockchain data
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          return 60
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, []);

  // Calculate real-time data from blockchain
  const totalPool = Number(totalBet) / 1e18; // Convert from wei to ETH
  const playersCount = players.length;
  const nextBetAmount = Number(currentEpochBet) / 1e18; // Convert from wei to ETH

  const setIsLoading = (arg: boolean) => {
    setLoading(arg);
  } 

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
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

      {/* Connect Button - Top Right */}
      <div className="absolute top-4 right-4 z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          <ConnectButton 
            chainStatus="icon"
            accountStatus={{
              smallScreen: 'avatar',
              largeScreen: 'full',
            }}
            showBalance={{
              smallScreen: false,
              largeScreen: true,
            }}
          />
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
            <AnimatedOrb isSpinning={loading} playerCount={playersCount} />
            <PlaceBet setIsLoading={setIsLoading} loading={loading} /> {/* Bet Button */}
          </div>
        </div>

        {/* Desktop: Betting Area - 40% width */}
        <div className="hidden md:flex w-2/5 items-center justify-center p-4 md:p-8">
          <div className="relative w-full max-w-sm md:max-w-md lg:max-w-lg">
            <AnimatedOrb isSpinning={loading} playerCount={playersCount} />
            <PlaceBet setIsLoading={setIsLoading} loading={loading} /> {/* Bet Button */}
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
                RANDOBET
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

            {/* Draw Ready Status */}
            {isDrawNeeded && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Card className="bg-gradient-to-br from-red-900/40 to-orange-900/40 border-red-500/20 spooky-glass">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl md:text-3xl font-bold text-red-400 mb-2">
                      🎯 DRAW READY!
                    </div>
                    <p className="text-red-200 text-sm">
                      The draw can be triggered by anyone
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )}

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
                label="Current Bet Amount"
                value={`${nextBetAmount.toFixed(4)} ETH`}
                gradient="from-violet-900/50 to-orange-900/30"
                borderColor="border-violet-500/20"
                textColor="text-violet-200"
                delay={0.4}
                isBold={true}
              />
            </div>

            {/* Recent Activity */}
            <RecentBets />

            {/* Network Status */}
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
                Celo Network Ready
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* User Functions Panel */}
      <UserFunctions setIsLoading={setIsLoading} loading={loading} />
      
      {/* Admin Dashboard */}
      <AdminDashboard />
    </div>
  )
}