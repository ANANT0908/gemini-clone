'use client';

import { ReactNode, createContext, useMemo, useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, useMediaQuery } from '@mui/material';
import Header from '@/components/Header';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { ColorModeContext } from './contexts/ColorModeContext';


export default function RootLayout({ children }: { children: ReactNode }) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const stored = localStorage.getItem('mui-mode') as 'light' | 'dark' | null;
    setMode(stored || (prefersDarkMode ? 'dark' : 'light'));
  }, [prefersDarkMode]);

  const toggleColorMode = () => {
    setMode((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('mui-mode', next);
      return next;
    });
  };

  const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);

  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <ColorModeContext.Provider value={{ toggleColorMode, mode }}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Header />
              {children}
            </ThemeProvider>
          </ColorModeContext.Provider>
        </Provider>
      </body>
    </html>
  );

}
