import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '../components/Providers'
import Header from '../components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Empowered',
  description: 'Senior design project about ai resumebuilder',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Header />
          <main>
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  )
}
