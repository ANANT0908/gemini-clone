import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  phone: string;
  otpSent: boolean;
  verified: boolean;
}

const initialState: AuthState = {
  phone: '',
  otpSent: false,
  verified: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    sendOtp(state, action: PayloadAction<string>) {
      state.phone = action.payload;
      state.otpSent = true;
    },
    verifyOtp(state) {
      state.verified = true;
    },
    reset(state) {
      return initialState;
    },
  },
});

export const { sendOtp, verifyOtp, reset } = authSlice.actions;
export default authSlice.reducer;
