import './globals.css';
import { ReactNode } from 'react';
import { CssBaseline } from '@mui/material';
import { Providers } from '@/store/provider';

export const metadata = {
  title: 'OTP Auth App',
  description: 'Login/Signup with OTP and Country Code',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <CssBaseline />
          {children}
        </Providers>
      </body>
    </html>
  );
}
