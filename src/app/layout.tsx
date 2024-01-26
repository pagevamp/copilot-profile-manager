import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ThemeRegistry from './ThemeRegistry';
import { AppContextProvider } from '@/context';
import { ToggleDecider } from '@/hoc/ToggleDecider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Profile Manager App',
  description: 'Copilot Profile Manager App',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <AppContextProvider>
        <ThemeRegistry options={{ key: 'mui' }}>
          <body className={inter.className}>
            <ToggleDecider>{children}</ToggleDecider>
          </body>
        </ThemeRegistry>
      </AppContextProvider>
    </html>
  );
}
