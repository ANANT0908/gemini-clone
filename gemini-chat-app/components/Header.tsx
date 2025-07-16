'use client';

import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import ThemeToggle from './ThemeToggle';
import { useDispatch } from 'react-redux';
import { reset } from '@/store/authSlice'; 
import { useRouter, usePathname } from 'next/navigation';

export default function Header() {
  const dispatch = useDispatch();
  const router = useRouter();
    const pathname = usePathname();

  const handleLogout = () => {
    dispatch(reset());     
    router.push('/');      
  };
const isDashboard = pathname === '/dashboard';

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Chat App
        </Typography>

        <Box display="flex" alignItems="center" gap={1}>
          <ThemeToggle />
         {isDashboard && (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
