// components/Header.tsx
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Chat App
        </Typography>
        <ThemeToggle />
      </Toolbar>
    </AppBar>
  );
}
