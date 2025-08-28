import type { Metadata } from 'next'
// import { Inter } from 'next/font/google'
import './globals.css'

// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Chain Roulette - On-Chain Betting Protocol',
  description: 'Experience the thrill of on-chain betting with our sophisticated roulette protocol',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
      {/* <body className={inter.className}>{children}</body> */}
    </html>
  )
}