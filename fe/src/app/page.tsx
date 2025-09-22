"use client"

import BettingInterface from '@/components/BettingInterface'
import DataProvider from '@/components/context/DataProvider'
import Provider from '@/components/context/WagmiProvider'

export default function Home() {
  return (
    <Provider>
      <DataProvider>
        <main className="h-screen overflow-hidden no-scrollbar">
          <BettingInterface />
        </main>
      </DataProvider>
    </Provider>
  )
}