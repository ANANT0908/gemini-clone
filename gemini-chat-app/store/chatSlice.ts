import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Chatroom {
  id: string;
  name: string;
}

interface ChatState {
  chatrooms: Chatroom[];
}

const initialState: ChatState = {
  chatrooms: [],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addChatroom: (state, action: PayloadAction<Chatroom>) => {
      state.chatrooms.push(action.payload);
    },
    deleteChatroom: (state, action: PayloadAction<string>) => {
      state.chatrooms = state.chatrooms.filter(c => c.id !== action.payload);
    },
  },
});

export const { addChatroom, deleteChatroom } = chatSlice.actions;
export default chatSlice.reducer;
