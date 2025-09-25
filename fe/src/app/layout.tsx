/*eslint-disable */
import type { Metadata } from 'next'
import '@rainbow-me/rainbowkit/styles.css';
import './globals.css'

export const metadata: Metadata = {
  title: 'Randobet - On-Chain Betting Protocol',
  description: 'Experience the mystical thrill of on-chain betting with our SpookySwap-themed betting protocol',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full overflow-hidden no-scrollbar">{children}</body>
    </html>
  )
}