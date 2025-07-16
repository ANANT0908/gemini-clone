'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { addChatroom, deleteChatroom } from '@/store/chatSlice';
import {
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  TextField,
  Box,
  Typography,
  useTheme,
  Paper,
  Divider,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';

export default function ChatroomList() {
  const dispatch = useDispatch();
  const chatrooms = useSelector((state: RootState) => state.chat.chatrooms);
  const [chatName, setChatName] = useState('');
  const theme = useTheme();

  const handleAdd = () => {
    if (!chatName.trim()) return;
    dispatch(addChatroom({ id: uuidv4(), name: chatName }));
    toast.success('Chatroom created');
    setChatName('');
  };

  const handleDelete = (id: string) => {
    dispatch(deleteChatroom(id));
    toast.success('Chatroom deleted');
  };

  return (
    <Box>
      <Typography variant="h5" mb={2} color="text.primary">
        Your Chatrooms
      </Typography>

      <Box display="flex" gap={2} mb={2}>
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

      <Paper
        elevation={2}
        sx={{
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 2,
          bgcolor: theme.palette.background.paper,
          overflow: 'hidden',
        }}
      >
        <List disablePadding>
          {chatrooms.map((chat, index) => (
            <Box key={chat.id}>
              <ListItem
                sx={{
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                  },
                }}
                secondaryAction={
                  <IconButton
                    edge="end"
                    onClick={() => handleDelete(chat.id)}
                    aria-label={`Delete ${chat.name}`}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={chat.name}
                  primaryTypographyProps={{ color: 'text.primary' }}
                />
              </ListItem>
              {index < chatrooms.length - 1 && <Divider />}
            </Box>
          ))}
        </List>
      </Paper>
    </Box>
  );
}
