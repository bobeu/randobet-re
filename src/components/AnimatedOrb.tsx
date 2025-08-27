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