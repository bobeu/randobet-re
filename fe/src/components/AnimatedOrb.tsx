'use client'

import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useEffect } from 'react'

interface AnimatedOrbProps {
  isSpinning: boolean
}

export default function AnimatedOrb({ isSpinning }: AnimatedOrbProps) {
  const rotation = useMotionValue(0)
  const scale = useMotionValue(1)
  
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
      {/* Outer Ring - SpookySwap colors */}
      <motion.div 
        className="absolute inset-0 rounded-full orb-gradient"
        style={{ 
          rotate: isSpinning ? rotate : 0,
          scale: scaleValue
        }}
        animate={{ 
          scale: isSpinning ? [1, 1.05, 1] : 1
        }}
        transition={{ 
          scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-r from-transparent via-orange-300/30 to-transparent" />
      </motion.div>
      
      {/* Middle Ring - Purple/Orange gradient */}
      <motion.div 
        className="absolute inset-4 rounded-full bg-gradient-to-br from-purple-500 via-orange-400 to-violet-800 shadow-2xl glow-purple"
        style={{ 
          rotate: isSpinning ? useTransform(rotation, (value) => -value) : 0
        }}
        animate={{ 
          boxShadow: [
            "0 0 30px rgba(139, 92, 246, 0.6)",
            "0 0 50px rgba(251, 191, 36, 0.8)",
            "0 0 30px rgba(139, 92, 246, 0.6)"
          ]
        }}
        transition={{ 
          boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <motion.div 
          className="w-full h-full rounded-full bg-gradient-to-tr from-orange-500/50 to-transparent"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
      
      {/* Inner Core - Stable center */}
      <motion.div 
        className="absolute inset-1/4 rounded-full bg-gradient-to-br from-orange-600 to-purple-900 flex items-center justify-center"
        animate={{ 
          scale: isSpinning ? [1, 1.1, 1] : [1, 1.05, 1]
        }}
        transition={{ 
          duration: isSpinning ? 1.5 : 3, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <motion.div 
          className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-orange-400 to-purple-500 rounded-full shadow-lg glow-orange"
          animate={{ 
            y: isSpinning ? [0, -10, 0] : [0, -5, 0]
          }}
          transition={{ 
            y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
        />
      </motion.div>
      
      {/* Orbiting Particles - SpookySwap colors */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 bg-gradient-to-r from-orange-400 to-purple-400 rounded-full"
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
      
      {/* Floating Sparkles - Orange/Purple */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute w-1 h-1 bg-orange-300 rounded-full"
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
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Mystical glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/10 to-orange-500/10"
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