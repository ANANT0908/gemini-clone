'use client';

import ChatroomList from '@/components/ChatroomList';
import ChatWindow from '@/components/ChatWindow';
import { Container, Box } from '@mui/material';
import { Toaster } from 'react-hot-toast';

export default function DashboardPage() {
  return (
    <Container maxWidth="lg" sx={{ mt: 6 }}>
      <Toaster position="top-right" />
      
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box sx={{ flex: 1 }}>
          <ChatroomList />
        </Box>
        <Box sx={{ flex: 2 }}>
          <ChatWindow />
        </Box>
      </Box>
    </Container>
  );
}
