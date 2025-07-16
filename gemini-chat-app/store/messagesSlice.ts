import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Message {
  id: string;
  sender: 'user' | 'ai';
  text?: string;
  imageUrl?: string;
  timestamp: number;
}

interface MessagesState {
  items: Message[];
  page: number;
  hasMore: boolean;
  typing: boolean;
}

const initial: MessagesState = {
  items: [],
  page: 0,
  hasMore: true,
  typing: false,
};

const slice = createSlice({
  name: 'messages',
  initialState: initial as MessagesState,
  reducers: {
    loadOlder: (state) => {
      const page = state.page + 1;
      const older: Message[] = Array.from({ length: 20 }, (_, i) => ({
        id: `old-${page}-${i}`,
        sender: Math.random() < 0.5 ? 'user' : 'ai',
        text: `Dummy older message ${page}-${i}`,
        timestamp: Date.now() - (i + page * 20) * 60000,
      }));
      state.items = [...older, ...state.items];
      state.page = page;
      if (page >= 5) state.hasMore = false;
    },
    userMessage: (state, action: PayloadAction<{ text?: string; imageUrl?: string }>) => {
      state.items.push({
        id: `u-${Date.now()}`,
        sender: 'user',
        ...action.payload,
        timestamp: Date.now(),
      });
    },
    aiTyping: (state) => { state.typing = true; },
    aiMessage: (state, action: PayloadAction<{ text: string }>) => {
      state.typing = false;
      state.items.push({
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: action.payload.text,
        timestamp: Date.now(),
      });
    },
  },
});

export const { loadOlder, userMessage, aiTyping, aiMessage } = slice.actions;
export default slice.reducer;
