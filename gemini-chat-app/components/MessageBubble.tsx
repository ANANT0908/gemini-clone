'use client';

import { Message } from '@/store/messagesSlice';
import { Box, Typography, IconButton, useTheme } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import copy from 'copy-to-clipboard';
import { useState } from 'react';
import Image from 'next/image';

export default function MessageBubble({ message }: { message: Message }) {
  const [copied, setCopied] = useState(false);
  const isUser = message.sender === 'user';
  const theme = useTheme();
  const bg = isUser
    ? theme.palette.mode === 'dark'
      ? theme.palette.primary.dark
      : '#DCF8C6'
    : theme.palette.mode === 'dark'
      ? theme.palette.grey[800]
      : theme.palette.background.paper;

  const borderColor = theme.palette.divider;
  const align = isUser ? 'flex-end' : 'flex-start';

  const handleCopy = () => {
    if (message.text) {
      copy(message.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: align, mb: 1, px: 1 }}>
      <Box
        sx={{
          maxWidth: '75%',
          bgcolor: bg,
          p: 2,
          borderRadius: 2,
          position: 'relative',
          boxShadow: 2,
          color: theme.palette.text.primary,
          border: `1px solid ${borderColor}`,
          overflowWrap: 'break-word',
          wordBreak: 'break-word',
        }}
      >
        {message.text && (
          <IconButton
            size="small"
            onClick={handleCopy}
            sx={{ position: 'absolute', top: 8, right: 8 }}
            aria-label="Copy message"
          >
            <ContentCopyIcon fontSize="small" />
          </IconButton>
        )}
        {message.imageUrl && (
          <Image
            src={message.imageUrl}
            alt="upload"
            width={400} // or your expected width
            height={300} // or your expected height
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: 8,
              marginBottom: 8,
              objectFit: 'cover',
            }}
          />
        )}
        {message.text && (
          <Typography sx={{ pr: 4, whiteSpace: 'pre-wrap' }}>
            {message.text}
          </Typography>
        )}
        <Typography
          variant="caption"
          sx={{ display: 'block', textAlign: 'right', mt: 0.5 }}
        >
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Typography>
        {copied && (
          <Typography
            variant="caption"
            sx={{
              position: 'absolute',
              top: -20,
              right: 0,
              color: theme.palette.success.main,
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
