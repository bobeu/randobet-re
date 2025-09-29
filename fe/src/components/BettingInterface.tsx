'use client'
/* esling-disable */
import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Timer, Users, DollarSign, TrendingUp, Zap, Clock, AlertTriangle, Shield, Settings, Coins, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import AnimatedOrb from '@/components/AnimatedOrb';
import ParticleField from '@/components/ParticleField';
import StatsCard from '@/components/StatsCard';
import RecentBets from '@/components/RecentBets';
import PlaceBet from './transactions/PlaceBet';
import Withdraw from './transactions/Withdraw';
import RunDraw from './transactions/RunDraw';
// import SetVerification from './transactions/SetVerification';
import ClaimTriggerReward from './transactions/ClaimTriggerReward';
import SetBetListUpfront from './admin/SetBetListUpfront';
import SetFee from './admin/SetFee';
import DisclaimerModal from './DisclaimerModal';
import VerificationSection from './VerificationSection';
import useData from '@/hooks/useData';
import SetIntervalAndFeeTo from './admin/SetDataStruct'
import SetApproval from './admin/SetApproval'
import OrdersPanel from './OrdersPanel'
import { formatTime } from './utilities/common'
import VerificationStatus from './verification/VerificationStatus'
import ControlButtonPanel, { Panel } from './utilities/ControlButtonPanel'
import Header from './utilities/Header'
import { MysticalElements } from './utilities/MysticalElements'
import FloatingControlButton from './utilities/FloatingControlButton'

export default function BettingInterface() {
  const { 
    data: { 
      currentEpochBet, 
      nextEpochBet, 
      deadEpoch,
      state: {
        data:{ drawInterval, lastDraw, feeTo, playerFee },
        epoches: currentEpoch
      },
      spin: {
        players,
        pool: totalBet,
      }
    },
    isDrawNeeded,
    isVerified,
    isApproved
  } = useData();
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [activePanel, setActivePanel] = useState<Panel>('main-view');
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);
  const [showControlButtons, setShowControlButtons] = useState(false);

  // Close control buttons when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (showControlButtons && !target.closest('.control-panel') && !target.closest('.floating-button')) {
        setShowControlButtons(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showControlButtons]);

  // Calculate real-time data from blockchain
  const { 
    totalPool, 
    playersCount, 
    currentBetAmount, 
    nextBetAmount,
    timeUntilNextDraw,
    progressValue,
    lastDrawDate,
    drawIntervalHours,
    playerFeeAmount,
    isDeadEpochWarning
  } = useMemo(() => {
    const totalPool = Number(totalBet) / 1e18; // Convert from wei to CELO
    const playersCount = players.length;
    const currentBetAmount = Number(currentEpochBet) / 1e18; // Convert from wei to CELO
    const nextBetAmount = Number(nextEpochBet) / 1e18; // Convert from wei to CELO
    const playerFeeAmount = Number(playerFee) / 1e18; // Convert from wei to CELO

    // Calculate time until next draw
    const now = Math.floor(Date.now() / 1000);
    const lastDrawTime = Number(lastDraw);
    const intervalSeconds = Number(drawInterval);
    const nextDrawTime = lastDrawTime + intervalSeconds;
    const timeUntilNextDraw = Math.max(0, nextDrawTime - now);
    
    // Calculate progress (0-100)
    const progressValue = intervalSeconds > 0 ? Math.max(0, Math.min(100, ((intervalSeconds - timeUntilNextDraw) / intervalSeconds) * 100)) : 0;
    
    // Format last draw date
    const lastDrawDate = new Date(Number(lastDraw) * 1000).toLocaleString();
    
    // Convert draw interval to hours
    const drawIntervalHours = Number(drawInterval) / 3600;
    
    // Check if current epoch is close to dead epoch
    const isDeadEpochWarning = Number(currentEpoch) >= Number(deadEpoch) - 1;

    return{
      totalPool,
      playersCount,
      currentBetAmount,
      nextBetAmount,
      timeUntilNextDraw,
      progressValue,
      lastDrawDate,
      drawIntervalHours,
      playerFeeAmount,
      isDeadEpochWarning
    }

  }, [totalBet, currentEpochBet, nextEpochBet, players, lastDraw, drawInterval, playerFee, currentEpoch, deadEpoch]);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if(prev <= 1) {
          return Math.max(0, timeUntilNextDraw)
        }
        return prev - 1 
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [timeUntilNextDraw]);

  // Show disclaimer on page load
  useEffect(() => {
    const hasAccepted = localStorage.getItem('randobet-disclaimer-accepted');
    const hasRejected = localStorage.getItem('randobet-disclaimer-rejected');
    
    if (hasAccepted === 'true') {
      setDisclaimerAccepted(true)
    } else if (hasRejected === 'true') {
      setDisclaimerAccepted(false)
    } else {
      setShowDisclaimer(true)
    }
  }, []);

  const setIsLoading = (arg: boolean) => {
    setLoading(arg);
  } 

  const handleDisclaimerAccept = () => {
    setShowDisclaimer(false)
    setDisclaimerAccepted(true)
  }

  const handleDisclaimerReject = () => {
    setShowDisclaimer(false)
    setDisclaimerAccepted(false)
  }

  // Show disclaimer if not accepted
  if (!disclaimerAccepted) {
    return (
      <DisclaimerModal 
        isOpen={showDisclaimer}
        onAccept={handleDisclaimerAccept}
        onReject={handleDisclaimerReject}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-950 via-stone-900 to-yellow-900 relative overflow-hidden">
      {/* Full Page ParticleField Background */}
      <ParticleField />
      
      {/* Header with Logo and Connect Button */}
      <Header />

      {/* Mystical elements - positioned to not interfere */}
      <MysticalElements />

      {/* Floating Control Button */}
      <FloatingControlButton 
        setShowControlButtons={(arg: boolean) => setShowControlButtons(arg)} 
        showControlButtons={showControlButtons} 
      />

      {/* Control Buttons Panel */}
      <ControlButtonPanel 
        activePanel={ activePanel} 
        setActivePanel={setActivePanel} 
        setShowControlButtons={(arg: boolean) => setShowControlButtons(arg)}
        showControlButtons={showControlButtons}
      />

      {/* Main Content Layout with Flip Animation */}
      <div className="relative z-20 h-full flex flex-col md:flex-row">
        {/* AnimatedOrb - Always visible */}
        <div className="flex w-full md:w-2/5 items-center justify-center p-4 md:p-8">
          <div className="relative w-full max-w-sm md:max-w-md lg:max-w-lg">
            <AnimatedOrb isSpinning={loading} playerCount={playersCount} />
            {activePanel === 'main-view' && (
              (isDrawNeeded && playersCount > 0) ? <RunDraw showOnlyButton={true} /> : <PlaceBet
                setIsLoading={setIsLoading} 
                loading={loading} 
                playerFee={playerFeeAmount}
                onPlaceBetClick={() => setShowVerification(true)}
              />
            )}
          </div>
        </div>

        {/* Content Panel - 100% width on mobile, 60% on desktop */}
        <div className="w-full md:w-3/5 bg-stone-900/80 backdrop-blur-sm border border-stone-600 p-6 overflow-y-auto max-h-screen">
          <AnimatePresence mode="wait">
            {activePanel === 'main-view' && showVerification && !isVerified && (
              <motion.div
                key="verification"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-4 md:space-y-6"
              >
                <VerificationSection 
                  onVerificationComplete={() => {
                    setShowVerification(false)
                  }} 
                />
              </motion.div>
            )}

            {activePanel === 'main-view' && (!showVerification || isVerified) && (
              <motion.div
                key="main"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-4 md:space-y-6"
              >
            {/* Current Epoch Display */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
                  <Card className="bg-violet-900/40 border-violet-500/20 backdrop-blur-lg">
                    <CardContent className="text-center">
                      <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-yellow-400 mb-2">
                        EPOCH #{currentEpoch.toString()}
                  </div>
                      <p className="text-sm md:text-base text-violet-200 uppercase tracking-widest">
                        Current Betting Round
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Verification Status */}
            <VerificationStatus handleShowVerificationPage={() => setShowVerification(true)} />

        {/* Next Draw Timer */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
              <Card className="bg-yellow-900/40 border-yellow-500/20 backdrop-blur-lg">
            <CardHeader className="pb-2 md:pb-3">
                  <CardTitle className="flex items-center gap-2 md:gap-3 text-yellow-400 text-sm md:text-base">
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
                    className="h-2 bg-violet-700"
              />
                  <div className="flex justify-between text-xs text-violet-300 mt-2">
                <span>Last: {lastDrawDate}</span>
                <span>Interval: {drawIntervalHours.toFixed(1)}h</span>
              </div>
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
                <Card className="bg-yellow-900/40 border-yellow-500/20 backdrop-blur-lg">
              <CardContent className="p-4 text-center">
                    <div className="text-2xl md:text-3xl font-bold text-yellow-400 mb-2">
                  🎯 DRAW READY!
                </div>
                    <p className="text-yellow-200 text-sm">
                  The draw can be triggered by anyone
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Dead Epoch Warning */}
        {isDeadEpochWarning && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="bg-red-900/40 border-red-500/20 backdrop-blur-lg">
              <CardContent className="text-center">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center justify-center gap-3 mb-4 cursor-help">
                        <AlertTriangle className="w-8 h-8 text-red-400" />
                        <span className="text-xl font-bold text-red-400">URGENT: CLAIM WARNING</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-xs bg-stone-800 border border-stone-600 p-4">
                      <div className="space-y-2">
                        <p className="font-bold text-yellow-400 uppercase tracking-wider">Dead Epoch Approaching</p>
                        <p className="text-sm text-stone-200">
                          The current epoch is close to the dead epoch (#{deadEpoch.toString()}). 
                          If you have unclaimed winnings, you must claim them before the dead epoch 
                          or they will be forfeited permanently.
                        </p>
                      </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <p className="text-sm text-red-200">
                  Epoch #{deadEpoch.toString()} is approaching! Claim your winnings before they're forfeited.
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
            value={`${totalPool.toFixed(4)} CELO`}
                gradient=""
                borderColor=""
                textColor=""
            delay={0.2}
          />

          <StatsCard
            icon={Users}
            label="Active Players"
            value={playersCount.toString()}
                gradient=""
                borderColor=""
                textColor=""
            delay={0.3}
          />

          <StatsCard
            icon={TrendingUp}
            label="Current Bet Amount"
            value={`${currentBetAmount.toFixed(4)} CELO`}
                gradient=""
                borderColor=""
                textColor=""
            delay={0.4}
            isBold={true}
          />

          <StatsCard
            icon={Clock}
            label="Next Bet Amount"
            value={`${nextBetAmount.toFixed(4)} CELO`}
                gradient=""
                borderColor=""
                textColor=""
            delay={0.5}
          />
        </div>

        {/* Recent Activity */}
        <RecentBets />

        {/* Network Status */}
        <motion.div 
          className="text-center text-xs text-violet-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="flex items-center justify-center gap-2">
            <motion.div 
              className="w-2 h-2 bg-yellow-400 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            Celo Network Ready
          </div>
        </motion.div>
          </motion.div>
        )}

        {activePanel === 'admin' && (
          <motion.div
            key="admin"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-4 p-6 md:p-8"
          >
            <Card className="bg-stone-900/20 border-none">
              <CardHeader className="pb-3">
                <CardTitle className="text-violet-400 text-lg flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Admin Dashboard
                </CardTitle>
                <p className="text-violet-200 text-sm">
                  Contract administration functions
                </p>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Fee Information Display */}
                <div className="bg-stone-900/20 border border-stone-500/20 rounded-lg p-3 mb-4">
                  <h4 className="text-stone-300 font-semibold mb-2">Current Fee Settings</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-stone-200">Player Fee:</span>
                      <span className="text-yellow-400 font-mono">{playerFeeAmount.toFixed(4)} CELO</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-200">Fee Recipient:</span>
                      <span className="text-violet-400 font-mono text-xs">{feeTo.slice(0, 6)}...{feeTo.slice(-4)}</span>
                    </div>
                  </div>
                </div>
                    <SetBetListUpfront />
                    <SetFee currentPlayerFee={playerFeeAmount} />
                    <SetIntervalAndFeeTo />
                    <SetApproval />
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {activePanel === 'betting-action' && (
              <motion.div
                key="betting"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-4 p6 md:p-8"
              >
                <Card className="bg-stone-900/20 border-none">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-yellow-200 text-sm font-medium flex items-center gap-2">
                      <Zap className="w-4 h-4 text-yellow-400" />
                      Betting Actions
                    </CardTitle>
                    <p className="text-stone-300 text-xs">
                      Available betting and interaction functions
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Withdraw />
                    <RunDraw showOnlyButton={false} />
                    <ClaimTriggerReward />
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {activePanel === 'standing-order' && <OrdersPanel />}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}