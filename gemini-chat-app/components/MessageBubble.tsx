'use client';
import { Message } from '@/store/messagesSlice';
import { Box, Typography, IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import copy   from 'copy-to-clipboard';
import { useState } from 'react';

export default function MessageBubble({ message }: { message: Message }) {
  const [copied, setCopied] = useState(false);
  const isUser = message.sender === 'user';
  const bg = isUser ? '#DCF8C6' : '#FFF';
  const align = isUser ? 'flex-end' : 'flex-start';

  const handleCopy = () => {
    if (message.text) {
      copy (message.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Box sx={{ display:'flex', justifyContent: align, mb:1, position:'relative' }}>
      <Box sx={{ maxWidth:'60%', bgcolor:bg, p:1.5, borderRadius:2, position:'relative' }}>
        {message.imageUrl && (
          <img src={message.imageUrl} alt="upload" style={{ maxWidth: '100%', borderRadius: 8 }} />
        )}
        {message.text && (
          <Typography>{message.text}</Typography>
        )}
        <Typography variant="caption" sx={{ display:'block', textAlign:'right', mt:0.5 }}>
          {new Date(message.timestamp).toLocaleTimeString()}
        </Typography>
        {message.text && (
          <IconButton size="small" sx={{ position:'absolute', top:4, right:4 }} onClick={handleCopy}>
            <ContentCopyIcon fontSize="small" />
          </IconButton>
        )}
        {copied && (
          <Typography variant="caption" sx={{ position:'absolute', top:-16, right:0, color:'green' }}>
            Copied!
          </Typography>
        )}
      </Box>
    </Box>
  );
}
