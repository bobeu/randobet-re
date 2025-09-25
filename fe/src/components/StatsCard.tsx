'use client'
/* eslint-disable */
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

interface StatsCardProps {
  icon: any;
  label: string
  value: string
  gradient: string
  borderColor: string
  textColor: string
  delay: number
  className?: string
  isBold?: boolean
}

export default function StatsCard({
  icon: Icon,
  label,
  value,
  // gradient,
  // borderColor,
  // textColor,
  delay,
  className = "",
  isBold = false
}: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      <Card className={`bg-stone-900/80 border-stone-600/20 backdrop-blur-sm hover:scale-105 transition-transform duration-300`}>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon className={`w-4 h-4 text-yellow-400`} />
            <span className="text-yellow-200 text-sm font-medium">{label}</span>
          </div>
          <motion.div 
            className={`${isBold ? 'text-xl lg:text-2xl xl:text-3xl' : 'text-lg lg:text-xl'} font-bold text-white`}
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