import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '../components/Providers'
import Header from '../components/Header'
import Navbar from "../components/Navbar"
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'EmpowerEd',
  description: 'Senior design project about ai resumebuilder',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} dark:bg-medium`}>
        <AuthProvider>
          <Navbar/>
          <main>
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  )
}
