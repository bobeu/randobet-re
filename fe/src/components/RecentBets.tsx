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
      <Card className="bg-stone-900/80 border-stone-600/20 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-yellow-200 text-sm font-medium flex items-center gap-2">
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
                className="flex justify-between items-center text-sm hover:bg-stone-800/50 p-2 rounded-lg transition-colors border border-stone-700/30"
              >
                <span className="text-stone-300 font-mono text-xs">{bet.address}</span>
                <div className="text-right">
                  <motion.div 
                    className="text-white font-bold"
                    whileHover={{ scale: 1.05 }}
                  >
                    {bet.amount} CELO
                  </motion.div>
                  <div className="text-stone-400 text-xs">{bet.time}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}