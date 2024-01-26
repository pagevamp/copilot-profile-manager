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
        <body className={inter.className}>
          <ThemeRegistry options={{ key: 'mui' }}>
            <ToggleDecider>{children}</ToggleDecider>
          </ThemeRegistry>
        </body>
      </AppContextProvider>
    </html>
  );
}
