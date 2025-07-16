'use client';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { addChatroom, deleteChatroom } from '@/store/chatSlice';
import { Button, List, ListItem, ListItemText, IconButton, TextField, Box, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';

export default function ChatroomList() {
  const dispatch = useDispatch();
  const chatrooms = useSelector((state: RootState) => state.chat.chatrooms);
  const [chatName, setChatName] = useState('');

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
      <Typography variant="h5" mb={2}>Your Chatrooms</Typography>
      <Box display="flex" gap={2} mb={2}>
        <TextField
          label="New Chatroom"
          value={chatName}
          onChange={(e) => setChatName(e.target.value)}
          fullWidth
        />
        <Button variant="contained" onClick={handleAdd}>Add</Button>
      </Box>
      <List>
        {chatrooms.map((chat) => (
          <ListItem key={chat.id} secondaryAction={
            <IconButton edge="end" onClick={() => handleDelete(chat.id)}>
              <DeleteIcon />
            </IconButton>
          }>
            <ListItemText primary={chat.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
