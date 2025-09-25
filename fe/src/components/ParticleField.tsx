'use client'

import { motion } from 'framer-motion'

export default function ParticleField() {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 12 + 8,
    delay: Math.random() * 6,
    color: Math.random() > 0.5 ? 'violet' : 'yellow',
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Main floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute rounded-full ${
            particle.color === 'violet' 
              ? 'bg-gradient-to-r from-violet-400/40 to-violet-500/40' 
              : 'bg-gradient-to-r from-yellow-400/40 to-yellow-500/40'
          }`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [0, -120, 0],
            x: [0, Math.sin(particle.id * 0.5) * 30, 0],
            opacity: [0, 0.8, 0],
            scale: [0, 1.2, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Floating geometric shapes - SpookySwap style */}
      {Array.from({ length: 12 }, (_, i) => (
        <motion.div
          key={`geo-${i}`}
          className={`absolute border-2 ${
            i % 3 === 0 
              ? 'border-purple-400/30' 
              : i % 3 === 1 
              ? 'border-orange-400/30' 
              : 'border-violet-400/30'
          }`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 25 + 15}px`,
            height: `${Math.random() * 25 + 15}px`,
            borderRadius: i % 4 === 0 ? '50%' : i % 4 === 1 ? '25%' : '0',
          }}
          animate={{
            rotate: 360,
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: Math.random() * 18 + 12,
            repeat: Infinity,
            delay: Math.random() * 4,
          }}
        />
      ))}

      {/* Glowing orbs for mystical effect */}
      {Array.from({ length: 6 }, (_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full bg-gradient-to-r from-purple-500/20 to-orange-500/20 glow-purple"
          style={{
            left: `${20 + i * 15}%`,
            top: `${20 + (i % 2) * 40}%`,
            width: `${Math.random() * 8 + 4}px`,
            height: `${Math.random() * 8 + 4}px`,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.4, 0.8, 0.4],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            delay: i * 0.8,
          }}
        />
      ))}
    </div>
  )
}