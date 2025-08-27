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