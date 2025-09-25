'use client'

import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useEffect } from 'react'

interface AnimatedOrbProps {
  isSpinning: boolean
  playerCount?: number
}

export default function AnimatedOrb({ isSpinning, playerCount = 0 }: AnimatedOrbProps) {
  const rotation = useMotionValue(0)
  const scale = useMotionValue(1)
  
  // Calculate dynamic sparkle count and size based on player count
  const sparkleCount = Math.min(Math.max(playerCount, 3), 12); // Min 3, max 12 sparkles
  const baseSize = playerCount > 0 ? Math.max(0.5, 2 - (playerCount / 20)) : 1; // Smaller when more players
  
  // Smooth rotation that doesn't reset
  useEffect(() => {
    if (isSpinning) {
      const interval = setInterval(() => {
        rotation.set(rotation.get() + 1)
      }, 16) // 60fps
      return () => clearInterval(interval)
    }
  }, [isSpinning, rotation])

  const rotate = useTransform(rotation, (value) => value)
  const scaleValue = useTransform(scale, (value) => value)

  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 mx-auto">
      {/* Outer Glow Ring */}
      <motion.div 
        className="absolute inset-0 rounded-full bg-gradient-to-r from-stone-400/20 via-violet-500/20 to-stone-400/20"
        style={{ 
          rotate: isSpinning ? rotate : 0,
          scale: scaleValue
        }}
        animate={{ 
          scale: isSpinning ? [1, 1.1, 1] : [1, 1.05, 1],
          opacity: [0.3, 0.7, 0.3]
        }}
        transition={{ 
          scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
      />
      
      {/* Main Orb Ring */}
      <motion.div 
        className="absolute inset-2 rounded-full bg-gradient-to-br from-stone-600 via-stone-500 to-violet-700 shadow-2xl"
        style={{ 
          rotate: isSpinning ? useTransform(rotation, (value) => -value * 0.5) : 0
        }}
        animate={{ 
          boxShadow: [
            "0 0 40px rgba(139, 92, 246, 0.8)",
            "0 0 60px rgba(250, 204, 21, 0.6)",
            "0 0 40px rgba(139, 92, 246, 0.8)"
          ]
        }}
        transition={{ 
          boxShadow: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        {/* Inner Pattern */}
        <motion.div 
          className="w-full h-full rounded-full bg-gradient-to-tr from-stone-400/60 via-transparent to-violet-400/60"
          animate={{ 
            opacity: [0.4, 0.8, 0.4],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 8, repeat: Infinity, ease: "linear" }
          }}
        />
      </motion.div>
      
      {/* Central Core */}
      <motion.div 
        className="absolute inset-1/3 rounded-full bg-gradient-to-br from-stone-500 to-violet-600 flex items-center justify-center shadow-xl"
        animate={{ 
          scale: isSpinning ? [1, 1.15, 1] : [1, 1.08, 1],
          boxShadow: [
            "0 0 20px rgba(250, 204, 21, 0.4)",
            "0 0 30px rgba(139, 92, 246, 0.8)",
            "0 0 20px rgba(250, 204, 21, 0.4)"
          ]
        }}
        transition={{ 
          scale: { duration: isSpinning ? 2 : 4, repeat: Infinity, ease: "easeInOut" },
          boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        {/* Inner Core with Pulsing Effect */}
        <motion.div 
          className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-stone-300 to-violet-400 rounded-full shadow-lg"
          animate={{ 
            y: isSpinning ? [0, -8, 0] : [0, -3, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            y: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
        />
      </motion.div>
      
      {/* Orbiting Particles - Stone with violet accents */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 bg-gradient-to-r from-stone-400 to-violet-400 rounded-full"
          style={{
            top: '50%',
            left: '50%',
            transformOrigin: '0 0',
          }}
          animate={{
            scale: [1, 1.5, 1],
          }}
          transition={{
            scale: { 
              duration: 2, 
              repeat: Infinity, 
              delay: i * 0.3,
              ease: "easeInOut"
            }
          }}
          initial={{
            x: 120 + i * 10,
            y: -6,
          }}
        />
      ))}
      
      {/* Dynamic Floating Sparkles - Stone with yellow accents */}
      {[...Array(sparkleCount)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute bg-gradient-to-r from-stone-300 to-yellow-300 rounded-full"
          style={{
            width: `${baseSize * 4}px`,
            height: `${baseSize * 4}px`,
            top: `${50 + 35 * Math.sin(i * Math.PI / (sparkleCount / 2))}%`,
            left: `${50 + 35 * Math.cos(i * Math.PI / (sparkleCount / 2))}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, baseSize, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * (0.4 / sparkleCount),
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Mystical glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500/10 to-stone-500/10"
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  )
}