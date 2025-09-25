'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Shield, Settings, DollarSign, ShieldCheck } from 'lucide-react'
import SetBetListUpfront from './admin/SetBetListUpfront'
import SetFee from './admin/SetFee'
import SetVerificationByOwner from './admin/SetVerificationByOwner'

export default function AdminDashboard() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed top-4 right-4 z-50">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-400 hover:to-orange-400 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:shadow-red-500/25 transition-all duration-300 glow-red flex items-center gap-2"
      >
        <Shield className="w-4 h-4" />
        Admin Panel
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-12 right-0 w-80 bg-gradient-to-br from-red-900/40 to-orange-900/40 border border-red-500/20 rounded-lg spooky-glass p-4"
          >
            <Card className="bg-transparent border-red-500/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-red-400 text-lg flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Admin Dashboard
                </CardTitle>
                <p className="text-red-200 text-sm">
                  Contract administration functions
                </p>
              </CardHeader>
              <CardContent className="space-y-3">
                <SetBetListUpfront />
                <SetFee />
                <SetVerificationByOwner />
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
