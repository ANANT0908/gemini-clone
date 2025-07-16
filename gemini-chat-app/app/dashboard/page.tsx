'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { addChatroom, deleteChatroom } from '@/store/chatSlice';
import ChatWindow from '@/components/ChatWindow';
import {
  Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  IconButton,
  TextField,
  Button,
  Divider,
  useTheme,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import toast, { Toaster } from 'react-hot-toast';

export default function DashboardPage() {
  const dispatch = useDispatch();
  const { chatrooms } = useSelector((state: RootState) => state.chat);
  const [expandedRoomId, setExpandedRoomId] = useState<string | null>(null);
  const [chatName, setChatName] = useState('');
  const theme = useTheme();

  const handleAccordionChange = (roomId: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedRoomId(isExpanded ? roomId : null);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteChatroom(id));
    toast.success('Chatroom deleted');
  };

  const handleAdd = () => {
    if (!chatName.trim()) return;
    dispatch(addChatroom({ id: uuidv4(), name: chatName }));
    toast.success('Chatroom created');
    setChatName('');
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Toaster position="top-right" />
      <Typography variant="h5" mb={2} color="text.primary">
        Your Chatrooms
      </Typography>
      <Box display="flex" gap={2} mb={3}>
        <TextField
          label="New Chatroom"
          value={chatName}
          onChange={(e) => setChatName(e.target.value)}
          fullWidth
          variant="outlined"
        />
        <Button variant="contained" onClick={handleAdd}>
          Add
        </Button>
      </Box>
      <Box>
        {chatrooms.map((chatroom, index) => (
          <Box key={chatroom.id} mb={1}>
            <Accordion
              expanded={expandedRoomId === chatroom.id}
              onChange={handleAccordionChange(chatroom.id)}
              sx={{
                bgcolor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 2,
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ flexGrow: 1 }}>{chatroom.name}</Typography>
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation(); 
                    handleDelete(chatroom.id);
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </AccordionSummary>
              <Divider />
              <AccordionDetails>
                <ChatWindow />
              </AccordionDetails>
            </Accordion>
          </Box>
        ))}
      </Box>
    </Container>
  );
}
