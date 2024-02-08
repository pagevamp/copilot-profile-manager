import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ThemeRegistry from './ThemeRegistry';
import { AppContextProvider } from '@/context';
import { ToggleDecider } from '@/hoc/ToggleDecider';
import { Footer } from '@/layouts/Footer';
import { apiUrl } from '@/config';
import { revalidateTag } from 'next/cache';

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
            <ToggleDecider>
              {children}
              <Footer
                handleSave={async (customFieldAccessPayload, settingsPayload) => {
                  'use server';
                  await fetch(`${apiUrl}/api/custom-field-access`, {
                    method: 'PUT',
                    body: JSON.stringify(customFieldAccessPayload),
                  });
                  await fetch(`${apiUrl}/api/settings`, {
                    method: 'PUT',
                    body: JSON.stringify(settingsPayload),
                  });
                  revalidateTag('settings');
                  revalidateTag('customFieldAccess');
                }}
              />
            </ToggleDecider>
          </ThemeRegistry>
        </body>
      </AppContextProvider>
    </html>
  );
}
