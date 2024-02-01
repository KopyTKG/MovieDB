import './global.css'
import '../assets/scss/index.scss'
import React from 'react'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Verison from '../../package.json'
import GlobalNav from '@/modules/global.navbar'

export const metadata: Metadata = {
 title: 'MovieDB',
 description: 'Database of my plex library',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
 return (
  <html lang="en">
   <body className={GeistSans.className}>
    <main className="min-h-screen h-max dark text-foreground bg-background">
     <GlobalNav />
     {children}
     <footer className="w-full text-center bg-background">
      <a href="https://thekrew.app" target="_blank" rel="noreferrer">
       thekrew.app
      </a>{' '}
      &nbsp; &copy; &nbsp;
      {new Date(Date.now()).getFullYear()}
      <span>&nbsp; ver: {Verison.version}</span>
     </footer>
    </main>
    <Analytics />
    <SpeedInsights />
   </body>
  </html>
 )
}
