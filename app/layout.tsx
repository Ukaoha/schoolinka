import { AppProvider } from '@/ContextApi/AppContext'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Todo App',
  description: 'A CRUD todo app that shows in real time',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AppProvider>
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
    </AppProvider>
  )
}
