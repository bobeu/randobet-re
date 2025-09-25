"use client"

import BettingInterface from '@/components/BettingInterface'
import DataProvider from '@/components/context/DataProvider'
import Provider from '@/components/context/WagmiProvider'
import { ToastProvider } from '@/components/ui/Toast'

export default function Home() {
  return (
    <Provider>
      <ToastProvider>
        <BettingInterface />
      </ToastProvider>
    </Provider>
  )
}