import type { Metadata } from 'next'
// import { Inter } from 'next/font/google'
import '@rainbow-me/rainbowkit/styles.css';
import './globals.css'

// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Spooky Randobet - On-Chain Betting Protocol',
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
      {/* <body className={inter.className}>{children}</body> */}
    </html>
  )
}