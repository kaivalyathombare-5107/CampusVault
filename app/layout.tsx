import { Analytics } from '@vercel/analytics/next'
import { Geist } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })

export const metadata: Metadata = {
  title: 'CampusVault | Your campus knowledge, organized',
  description: 'Discover and share lecture notes, previous year papers, practicals, and study material with your campus community.',
  generator: 'CampusVault',
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [{ media: '(prefers-color-scheme: light)', color: '#f8fafc' }, { media: '(prefers-color-scheme: dark)', color: '#172033' }],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className="bg-background"><body className={`${geist.variable} antialiased`}>{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
