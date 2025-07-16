'use client';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { loadOlder, userMessage, aiTyping, aiMessage } from '@/store/messagesSlice';
import MessageBubble from './MessageBubble';
import ImageUpload from './ImageUpload';
import { Box, Button, CircularProgress, TextField, useTheme } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

export default function ChatWindow() {
  const dispatch = useDispatch();
  const { items, hasMore, typing } = useSelector((s: RootState) => s.messages);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const theme = useTheme();

  useEffect(() => {
    dispatch(loadOlder());
  }, [dispatch]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [items.length, typing]);

  const handleSend = (text?: string, imageUrl?: string) => {
    if (!text && !imageUrl) return;
    dispatch(userMessage({ text, imageUrl }));
    dispatch(aiTyping());
    setTimeout(() => {
      dispatch(aiMessage({ text: `Echo: ${text || '[image]'} 🤖` }));
    }, 1500 + Math.random() * 2000);
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleSendText = () => handleSend(inputRef.current?.value || '', undefined);

  return (
    <Box>
      {hasMore && (
        <Button fullWidth onClick={() => dispatch(loadOlder())}>Load more</Button>
      )}
      <Box
        ref={containerRef}
        sx={{
          height: 400,
          overflowY: 'auto',
          p: 2,
          bgcolor: theme.palette.mode === 'light' ? '#f5f5f5' : theme.palette.background.default,
          borderRadius: 2,
        }}
      >
        {items.map(msg => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        {typing && (
          <Box sx={{ fontStyle: 'italic', color: theme.palette.text.secondary, m: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
            <CircularProgress size={16} /> Gemini is typing...
          </Box>
        )}
      </Box>

      <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
        <TextField
          inputRef={inputRef}
          placeholder="Type a message..."
          fullWidth
          onKeyDown={(e) => e.key === 'Enter' && handleSendText()}
        />
        <ImageUpload onUpload={(url: string) => handleSend(undefined, url)} />
        <Button variant="contained" onClick={handleSendText}>Send</Button>
      </Box>
    </Box>
  );
}
