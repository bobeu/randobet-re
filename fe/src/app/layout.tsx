/*eslint-disable */
import type { Metadata } from 'next'
import '@rainbow-me/rainbowkit/styles.css';
import './globals.css'
import { APP_DESCRIPTION, APP_NAME } from '@/lib/constants';
import { Providers } from './providers';
import { ToastProvider } from '@/components/ui/Toast'
import ErrorBoundary from '@/components/utilities/ErrorBoundary';

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
  twitter: {
    card: "summary_large_image",
    title: APP_NAME,
    description: APP_DESCRIPTION,
    images: "https://images.pexels.com/photos/301920/pexels-photo-301920.jpeg?auto=compress&cs=tinysrgb&w=1200",
    creator: "https://twitter.com/bobman7000",
    site: "https://randobet-re.vercel.app"
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full overflow-hidden no-scrollbar">
        <Providers>
          <ErrorBoundary>
            <ToastProvider>
              {children}
            </ToastProvider>
          </ErrorBoundary>
        </Providers>
      </body>
    </html>
  )
}