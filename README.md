# Randobet

Randobet is an innovative betting platform that leverages user curiosity to create a unique betting experience. Users bet against themselves by depositing funds into a pool, with winners selected through a transparent, time-based draw mechanism such as Chainlink oracles.

---

## Table of Contents

- [Introduction](#introduction)
- [Problem Statement](#problem-statement)
- [Solution](#solution)
- [Project Goals](#project-goals)
- [Architecture Overview](#architecture-overview)
- [Technology Stack](#technology-stack)
- [Features](#features)
- [Getting Started](#getting-started)
- [License](#license)

---

## Introduction

Randobet is designed to gamify the betting process, allowing users to participate in a pool where the outcome is determined by a provably fair, time-based oracle. The platform is built for transparency, security, and user engagement, and is deployed on the Celo blockchain for fast, low-cost transactions.

---

## Problem Statement

Traditional betting platforms often lack transparency, fairness, and user engagement. Many rely on centralized systems that can be manipulated, and users have limited control over the betting process.

---

## Solution

Randobet solves these issues by:
- Allowing users to bet against themselves in a pooled system.
- Using Chainlink time-based oracles to automate and verify the draw process.
- Deploying smart contracts on the Celo blockchain for security and transparency.
- Providing a seamless, interactive frontend compatible with Farcaster mini-apps.

---

## Project Goals

- **Transparency:** Ensure all draws and outcomes are verifiable and fair.
- **Security:** Protect user funds with robust smart contracts.
- **User Engagement:** Create an exciting, curiosity-driven betting experience.
- **Scalability:** Support a growing user base with efficient architecture.
- **Compatibility:** Integrate with Farcaster mini-apps for enhanced social interaction.
- **Accessibility:** Provide a user-friendly interface that is easy to navigate.
- **Decentralization:** Leverage the Celo blockchain for a decentralized betting platform.
- **Community-Driven:** Foster a community of users who can influence the platform's future through feedback and participation.
- **Innovation:** Continuously improve the platform with new features and technologies.
- **Education:** Help users understand the betting process, smart contracts, and blockchain technology.
- **Sustainability:** Ensure the platform operates efficiently and can scale without excessive resource consumption.

---
## Summary
Randobet is a decentralized betting platform that transforms the traditional betting experience by allowing users to bet against themselves in a pooled system. With a focus on transparency, security, and user engagement, Randobet utilizes Chainlink oracles for automated draws and is built on the Celo blockchain for fast, low-cost transactions. The platform is designed to be user-friendly and compatible with Farcaster mini-apps, ensuring a modern and interactive betting experience.

## Business Model
Randobet operates on a revenue-sharing model where a small percentage of the total pool is taken as a fee for each draw. This fee is used to maintain the platform, fund development, and support community initiatives. The platform also aims to attract partnerships with other decentralized applications and services within the Celo ecosystem, creating additional revenue streams through collaborations and integrations.

## Architecture Overview

- **Frontend:** Built with React.js, Next.js, Typescript, and MaterialUI for a modern, responsive user interface.
- **Smart Contracts:** Written in Solidity, deployed on the Celo blockchain to manage deposits, draws, and payouts.
- **Oracle Integration:** Chainlink time-based oracle triggers automated draws and winner selection.
- **Farcaster Mini-App Compatibility:** Ensures seamless integration with Farcaster ecosystem.

---

## Technology Stack

- **Solidity:** Smart contract development
- **Celo Blockchain:** Decentralized, scalable backend
- **Chainlink Oracle:** Time-based automation and randomness
- **React.js & Next.js:** Frontend development
- **Typescript:** Type safety and maintainability
- **MaterialUI:** UI components and styling
- **Farcaster Mini-App:** Integration for social betting experiences

---

## Features

- Deposit funds to join betting pools
- Automated, time-based draws using Chainlink oracles
- Transparent winner selection and payout process
- Responsive, user-friendly interface
- Secure, decentralized backend on Celo

---

## Getting Started

1. **Clone the repository**
    ```
    git clone https://github.com/yourusername/randobet.git
    ```
2. **Install dependencies**
    ```
    cd randobet
    npm install
    ```
3. **Run the frontend**
    ```
    npm run dev
    ```
4. **Deploy smart contracts**
    - Follow instructions in `/contracts/README.md`

---

## License

This project is licensed under the MIT License.

<!-- August 15: Fee manager: 0x378bc6636445Edf805cc7730cD7b8953037e3F81
RouteTo: 0x84f043e2ca7928ec79aa08eed595313aef434028 -->


<!-- Smart contract testing
Aug 29, 2025 - Aug 31, 2025
We completed the restructuring of the project in the previous Proof of Ship program. This time, we will revisit the testing suite to ensure everything works as expected.

Betting interface
Sep 2, 2025 - Sep 4, 2025
We will create the betting interface

Deployment
Sep 6, 2025 - Sep 8, 2025
We will deploy the smart contract to the Celo mainnet

Self integration
Sep 11, 2025 - Sep 15, 2025
We will complete the self-protocol integration we started in the previous season

components.json
==============
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/app/globals.css",
    "baseColor": "stone",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}



Global.css
==========
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 60 9% 98%;
    --foreground: 24 10% 10%;
    --card: 60 9% 98%;
    --card-foreground: 24 10% 10%;
    --popover: 60 9% 98%;
    --popover-foreground: 24 10% 10%;
    --primary: 47 96% 53%;
    --primary-foreground: 26 83% 14%;
    --secondary: 60 5% 96%;
    --secondary-foreground: 24 10% 10%;
    --muted: 25 5% 95%;
    --muted-foreground: 25 5% 45%;
    --accent: 60 5% 96%;
    --accent-foreground: 24 10% 10%;
    --destructive: 0 84% 60%;
    --destructive-foreground: 60 9% 98%;
    --border: 20 6% 90%;
    --input: 20 6% 90%;
    --ring: 47 96% 53%;
    --radius: 0.75rem;
  }

  .dark {
    --background: 20 14% 4%;
    --foreground: 60 9% 98%;
    --card: 24 10% 10%;
    --card-foreground: 60 9% 98%;
    --popover: 0 0% 9%;
    --popover-foreground: 60 9% 98%;
    --primary: 47 96% 53%;
    --primary-foreground: 26 83% 14%;
    --secondary: 12 7% 15%;
    --secondary-foreground: 60 9% 98%;
    --muted: 12 7% 15%;
    --muted-foreground: 24 5% 64%;
    --accent: 12 7% 15%;
    --accent-foreground: 60 9% 98%;
    --destructive: 0 63% 31%;
    --destructive-foreground: 60 9% 98%;
    --border: 12 7% 15%;
    --input: 12 7% 15%;
    --ring: 47 96% 53%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}

/* Custom gradient backgrounds */
.gradient-bg {
  background: linear-gradient(135deg, 
    theme('colors.stone.900') 0%, 
    theme('colors.violet.900') 35%, 
    theme('colors.stone.800') 70%, 
    theme('colors.yellow.900') 100%
  );
}

.orb-gradient {
  background: radial-gradient(circle at center,
    theme('colors.yellow.400') 0%,
    theme('colors.violet.500') 40%,
    theme('colors.stone.800') 80%,
    theme('colors.stone.900') 100%
  );
}

.glass-effect {
  backdrop-filter: blur(16px);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Particle effects */
.particle {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  animation: float 6s ease-in-out infinite;
}

.particle:nth-child(odd) {
  animation-delay: -2s;
}

.particle:nth-child(even) {
  animation-delay: -4s;
}

/* Glow effects */
.glow-yellow {
  box-shadow: 0 0 30px rgba(234, 179, 8, 0.6);
}

.glow-violet {
  box-shadow: 0 0 30px rgba(139, 92, 246, 0.6);
}

/* Mobile optimizations */
@media (max-width: 768px) {
  .mobile-stack {
    flex-direction: column;
  }
  
  .mobile-full {
    width: 100%;
    height: auto;
  }
}


Page.css
========
import BettingInterface from '@/components/BettingInterface'

export default function Home() {
  return (
    <main className="min-h-screen">
      <BettingInterface />
    </main>
  )
}


AnimatedOrb.tsx
===============
'use client'

import { motion } from 'framer-motion'

interface AnimatedOrbProps {
  isSpinning: boolean
}

export default function AnimatedOrb({ isSpinning }: AnimatedOrbProps) {
  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 mx-auto">
      {/* Outer Ring */}
      <motion.div 
        className="absolute inset-0 rounded-full orb-gradient"
        animate={{ 
          rotate: isSpinning ? 360 : 0,
          scale: isSpinning ? [1, 1.05, 1] : 1
        }}
        transition={{ 
          rotate: { duration: 3, ease: "linear", repeat: isSpinning ? Infinity : 0 },
          scale: { duration: 2, repeat: Infinity }
        }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-r from-transparent via-yellow-300/30 to-transparent" />
      </motion.div>
      
      {/* Middle Ring */}
      <motion.div 
        className="absolute inset-4 rounded-full bg-gradient-to-br from-violet-500 via-yellow-400 to-stone-800 shadow-2xl glow-violet"
        animate={{ 
          rotate: isSpinning ? -360 : 0,
          boxShadow: [
            "0 0 30px rgba(139, 92, 246, 0.6)",
            "0 0 50px rgba(234, 179, 8, 0.8)",
            "0 0 30px rgba(139, 92, 246, 0.6)"
          ]
        }}
        transition={{ 
          rotate: { duration: 4, ease: "linear", repeat: isSpinning ? Infinity : 0 },
          boxShadow: { duration: 3, repeat: Infinity }
        }}
      >
        <motion.div 
          className="w-full h-full rounded-full bg-gradient-to-tr from-yellow-500/50 to-transparent"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
      
      {/* Inner Core */}
      <motion.div 
        className="absolute inset-1/4 rounded-full bg-gradient-to-br from-yellow-600 to-stone-900 flex items-center justify-center"
        animate={{ 
          scale: isSpinning ? [1, 1.1, 1] : [1, 1.05, 1]
        }}
        transition={{ 
          duration: isSpinning ? 1.5 : 3, 
          repeat: Infinity 
        }}
      >
        <motion.div 
          className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-yellow-400 to-violet-500 rounded-full shadow-lg glow-yellow"
          animate={{ 
            y: isSpinning ? [0, -10, 0] : [0, -5, 0],
            rotate: 360
          }}
          transition={{ 
            y: { duration: 2, repeat: Infinity },
            rotate: { duration: 8, ease: "linear", repeat: Infinity }
          }}
        />
      </motion.div>
      
      {/* Orbiting Particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 bg-gradient-to-r from-yellow-400 to-violet-400 rounded-full"
          style={{
            top: '50%',
            left: '50%',
            transformOrigin: '0 0',
          }}
          animate={{
            rotate: 360,
            scale: [1, 1.5, 1],
          }}
          transition={{
            rotate: { 
              duration: 8 + i * 2, 
              ease: "linear", 
              repeat: Infinity 
            },
            scale: { 
              duration: 2, 
              repeat: Infinity, 
              delay: i * 0.3 
            }
          }}
          initial={{
            x: 120 + i * 10,
            y: -6,
          }}
        />
      ))}
      
      {/* Floating Sparkles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute w-1 h-1 bg-yellow-300 rounded-full"
          style={{
            top: `${50 + 35 * Math.sin(i * Math.PI / 4)}%`,
            left: `${50 + 35 * Math.cos(i * Math.PI / 4)}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.4,
          }}
        />
      ))}
    </div>
  )
}



BettingInterface.tsx
=====================
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



ParticleField.tsx
=================
'use client'

import { motion } from 'framer-motion'

export default function ParticleField() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-yellow-400/30 to-violet-400/30"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.sin(particle.id) * 50, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Floating geometric shapes */}
      {Array.from({ length: 8 }, (_, i) => (
        <motion.div
          key={`geo-${i}`}
          className="absolute border border-yellow-400/20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 20 + 10}px`,
            height: `${Math.random() * 20 + 10}px`,
            borderRadius: i % 2 === 0 ? '50%' : '0',
          }}
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: Math.random() * 15 + 10,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}
    </div>
  )
}




RecentBet.tsx
============
'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const recentBets = [
  { address: '0x1a2b...3c4d', amount: 0.25, time: '2s ago' },
  { address: '0x5e6f...7g8h', amount: 0.15, time: '5s ago' },
  { address: '0x9i0j...1k2l', amount: 0.30, time: '8s ago' },
  { address: '0xm3n4...5o6p', amount: 0.12, time: '12s ago' },
]

export default function RecentBets() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      <Card className="bg-gradient-to-br from-stone-900/40 to-violet-900/20 border-stone-700/50 glass-effect">
        <CardHeader className="pb-3">
          <CardTitle className="text-white font-semibold flex items-center gap-2">
            <motion.div 
              className="w-2 h-2 bg-green-400 rounded-full"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            Recent Bets
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentBets.map((bet, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.7 + i * 0.1 }}
                className="flex justify-between items-center text-sm hover:bg-white/5 p-2 rounded-lg transition-colors"
              >
                <span className="text-stone-400 font-mono">{bet.address}</span>
                <div className="text-right">
                  <motion.div 
                    className="text-yellow-400 font-semibold"
                    whileHover={{ scale: 1.05 }}
                  >
                    {bet.amount} ETH
                  </motion.div>
                  <div className="text-stone-500 text-xs">{bet.time}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}



StatsCard.tsx
=============
'use client'

import { motion } from 'framer-motion'
import { DivideIcon as LucideIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface StatsCardProps {
  icon: LucideIcon
  label: string
  value: string
  gradient: string
  borderColor: string
  textColor: string
  delay: number
  className?: string
}

export default function StatsCard({
  icon: Icon,
  label,
  value,
  gradient,
  borderColor,
  textColor,
  delay,
  className = ""
}: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      <Card className={`bg-gradient-to-br ${gradient} ${borderColor} glass-effect hover:scale-105 transition-transform duration-300`}>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon className={`w-4 h-4 ${textColor}`} />
            <span className="text-stone-300 text-sm">{label}</span>
          </div>
          <motion.div 
            className={`text-lg lg:text-xl font-bold ${textColor}`}
            key={value}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            {value}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}






lib/utils.ts
===========
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


App.tsx
=======
import React, { useState, useEffect } from 'react';
import { Timer, Users, DollarSign, TrendingUp, Zap } from 'lucide-react';

function App() {
  const [timeLeft, setTimeLeft] = useState(45);
  const [totalPool, setTotalPool] = useState(12.847);
  const [playersCount, setPlayersCount] = useState(127);
  const [nextBetAmount, setNextBetAmount] = useState(0.1);
  const [isSpinning, setIsSpinning] = useState(true);
  const [particles, setParticles] = useState([]);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Reset for next round
          setTotalPool(prev => prev + Math.random() * 2);
          setPlayersCount(prev => prev + Math.floor(Math.random() * 5));
          return 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Generate random particles
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 20; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 1,
          speed: Math.random() * 2 + 1,
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleBet = () => {
    setIsSpinning(true);
    setTotalPool(prev => prev + nextBetAmount);
    setPlayersCount(prev => prev + 1);
    
    // Add some visual feedback
    setTimeout(() => setIsSpinning(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-red-900 to-yellow-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-pulse"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.id * 0.1}s`,
              transform: `scale(${particle.size})`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex min-h-screen">
        {/* Main Betting Area */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="relative">
            {/* Central Orb */}
            <div className="relative w-80 h-80 md:w-96 md:h-96">
              {/* Outer Ring */}
              <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-red-500 ${isSpinning ? 'animate-spin' : ''}`} 
                   style={{ animationDuration: '3s' }}>
                <div className="w-full h-full rounded-full bg-gradient-to-r from-transparent via-yellow-300/30 to-transparent" />
              </div>
              
              {/* Inner Orb */}
              <div className="absolute inset-4 rounded-full bg-gradient-to-br from-yellow-400 via-red-500 to-black shadow-2xl">
                <div className="w-full h-full rounded-full bg-gradient-to-tr from-yellow-500/50 to-transparent animate-pulse" />
                
                {/* Center Element */}
                <div className="absolute inset-1/4 rounded-full bg-gradient-to-br from-red-600 to-black flex items-center justify-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-red-500 rounded-full animate-bounce shadow-lg" />
                </div>
              </div>
              
              {/* Floating Particles */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-ping"
                  style={{
                    top: `${50 + 40 * Math.sin(i * Math.PI / 4)}%`,
                    left: `${50 + 40 * Math.cos(i * Math.PI / 4)}%`,
                    animationDelay: `${i * 0.2}s`,
                  }}
                />
              ))}
            </div>

            {/* Bet Button */}
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
              <button
                onClick={handleBet}
                className="bg-gradient-to-r from-yellow-400 to-red-500 hover:from-yellow-300 hover:to-red-400 text-black font-bold py-4 px-8 rounded-full shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                <span className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  PLACE BET
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Sidebar */}
        <div className="w-80 bg-black/30 backdrop-blur-lg border-l border-yellow-500/20 p-6">
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
                CHAIN ROULETTE
              </h1>
              <p className="text-gray-300 text-sm mt-2">On-Chain Betting Protocol</p>
            </div>

            {/* Next Draw Timer */}
            <div className="bg-gradient-to-r from-red-900/40 to-yellow-900/40 rounded-xl p-4 border border-yellow-500/20">
              <div className="flex items-center gap-3 mb-2">
                <Timer className="w-5 h-5 text-yellow-400" />
                <span className="text-yellow-400 font-semibold">Next Draw</span>
              </div>
              <div className="text-3xl font-bold text-white">{formatTime(timeLeft)}</div>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
                <div 
                  className="bg-gradient-to-r from-red-500 to-yellow-400 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${((60 - timeLeft) / 60) * 100}%` }}
                />
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-4">
              {/* Total Pool */}
              <div className="bg-gradient-to-br from-yellow-900/30 to-red-900/30 rounded-lg p-4 border border-yellow-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-4 h-4 text-yellow-400" />
                  <span className="text-gray-300 text-sm">Total Pool</span>
                </div>
                <div className="text-xl font-bold text-yellow-400">{totalPool.toFixed(3)} ETH</div>
              </div>

              {/* Players */}
              <div className="bg-gradient-to-br from-red-900/30 to-black/50 rounded-lg p-4 border border-red-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-red-400" />
                  <span className="text-gray-300 text-sm">Active Players</span>
                </div>
                <div className="text-xl font-bold text-red-400">{playersCount}</div>
              </div>

              {/* Next Bet Amount */}
              <div className="bg-gradient-to-br from-black/50 to-yellow-900/30 rounded-lg p-4 border border-yellow-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-yellow-400" />
                  <span className="text-gray-300 text-sm">Min Bet</span>
                </div>
                <div className="text-xl font-bold text-white">{nextBetAmount} ETH</div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gradient-to-br from-black/40 to-red-900/20 rounded-xl p-4 border border-gray-700/50">
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Recent Bets
              </h3>
              <div className="space-y-2">
                {[
                  { address: '0x1a2b...3c4d', amount: 0.25, time: '2s ago' },
                  { address: '0x5e6f...7g8h', amount: 0.15, time: '5s ago' },
                  { address: '0x9i0j...1k2l', amount: 0.30, time: '8s ago' },
                ].map((bet, i) => (
                  <div key={i} className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">{bet.address}</span>
                    <div className="text-right">
                      <div className="text-yellow-400 font-semibold">{bet.amount} ETH</div>
                      <div className="text-gray-500 text-xs">{bet.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Connection Status */}
            <div className="text-center text-xs text-gray-400">
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Connected to Ethereum Mainnet
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

Main.tsx
========
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);



eslint.ts
==========
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  }
);


package.json
============
{
  "name": "vite-react-typescript-starter",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "framer-motion": "^12.23.12",
    "lucide-react": "^0.344.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@eslint/js": "^9.9.1",
    "@types/react": "^18.3.5",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.18",
    "eslint": "^9.9.1",
    "eslint-plugin-react-hooks": "^5.1.0-rc.0",
    "eslint-plugin-react-refresh": "^0.4.11",
    "globals": "^15.9.0",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.5.3",
    "typescript-eslint": "^8.3.0",
    "vite": "^5.4.2"
  }
}


postcss.config.js
================
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};

tailwindcss.config.js
====================
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};


tailwind.config.ts
=================
import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        stone: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
          950: '#0c0a09',
        },
        yellow: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
          950: '#422006',
        },
        violet: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(234, 179, 8, 0.5)" },
          "50%": { boxShadow: "0 0 40px rgba(234, 179, 8, 0.8)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "orbit": {
          "0%": { transform: "rotate(0deg) translateX(100px) rotate(0deg)" },
          "100%": { transform: "rotate(360deg) translateX(100px) rotate(-360deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 3s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "spin-slow": "spin-slow 8s linear infinite",
        "orbit": "orbit 10s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config



tsConfig.ts
=============
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}



components/ui/progress
======================
import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-gradient-to-r from-violet-500 to-yellow-400 transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }


components/ui/card
===================
import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }



components/ui/button
===================
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }


prompt
======
For all designs I ask you to make, have them be beautiful, not cookie cutter. Make webpages that are fully featured and worthy for production.

By default, this template supports JSX syntax with Tailwind CSS classes, React hooks, and Lucide React for icons. Do not install other packages for UI themes, icons, etc unless absolutely necessary or I request them.

Use icons from lucide-react for logos. -->
