'use client';

import ChatroomList from '@/components/ChatroomList';
import ChatWindow from '@/components/ChatWindow';
import { Container, Box } from '@mui/material';
import { Toaster } from 'react-hot-toast';

export default function DashboardPage() {
  return (
    <Container maxWidth="lg">
      <Toaster position="top-right" />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}>
        <ChatroomList />
        <ChatWindow />
      </Box>
    </Container>
  );
}
