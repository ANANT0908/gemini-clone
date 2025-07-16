'use client';

import { Message } from '@/store/messagesSlice';
import { Box, Typography, IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import copy from 'copy-to-clipboard';
import { useState } from 'react';

export default function MessageBubble({ message }: { message: Message }) {
  const [copied, setCopied] = useState(false);
  const isUser = message.sender === 'user';
  const bg = isUser ? '#DCF8C6' : '#FFF';
  const align = isUser ? 'flex-end' : 'flex-start';

  const handleCopy = () => {
    if (message.text) {
      copy(message.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: align, mb: 1 }}>
      <Box
        sx={{
          maxWidth: '60%',
          bgcolor: bg,
          p: 2,
          borderRadius: 2,
          position: 'relative',
          boxShadow: 1,
        }}
      >
        {message.text && (
          <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
            <IconButton size="small" onClick={handleCopy}>
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Box>
        )}
        {message.imageUrl && (
          <img
            src={message.imageUrl}
            alt="upload"
            style={{ maxWidth: '100%', borderRadius: 8, marginBottom: 8 }}
          />
        )}
        {message.text && (
          <Typography sx={{ pr: 4 }}>{message.text}</Typography> 
        )}
        <Typography
          variant="caption"
          sx={{ display: 'block', textAlign: 'right', mt: 0.5 }}
        >
          {new Date(message.timestamp).toLocaleTimeString()}
        </Typography>
        {copied && (
          <Typography
            variant="caption"
            sx={{
              position: 'absolute',
              top: -20,
              right: 0,
              color: 'green',
              fontSize: '0.75rem',
            }}
          >
            Copied!
          </Typography>
        )}
      </Box>
    </Box>
  );
}
