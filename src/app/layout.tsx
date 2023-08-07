import '../assets/scss/index.scss';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MovieDB',
  description: 'Database of my plex library',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <footer> 
          <a href='https://thekrew.app' target='_blank'>
            thekrew.app 
          </a> &nbsp; &copy; &nbsp; 
          {new Date(Date.now()).getFullYear()}
        </footer>
      </body>
    </html>
  )
}
