import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CursorGlow from '@/components/CursorGlow';
import RouteTransition from '@/components/RouteTransition';
import { ThemeProvider } from '@/context/ThemeContext';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const metadata: Metadata = {
  title: 'EduPrime – Premium Learning Platform',
  description: 'Learn from India\'s best educators. Live classes, recorded courses, test series, and personalized learning paths for school, competitive exams, and professional upskilling.',
  keywords: 'online learning, edtech, live classes, test series, courses, upskilling',
  openGraph: {
    title: 'EduPrime – Premium Learning Platform',
    description: 'Transform your learning journey with EduPrime.',
    type: 'website',
  },
};

import { AuthProvider } from '@/context/AuthContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <ThemeProvider>
          <AuthProvider>
            <CursorGlow />
            <Navbar />
            <RouteTransition>
              <main>{children}</main>
            </RouteTransition>
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
