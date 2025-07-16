'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { otpSchema } from '@/utils/validatePhone';
import { z } from 'zod';
import { TextField, Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { verifyOtp } from '@/store/authSlice';
import { RootState } from '@/store';

type OTPData = z.infer<typeof otpSchema>;

export default function OTPForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<OTPData>({
    resolver: zodResolver(otpSchema),
  });

  const dispatch = useDispatch();
  const phone = useSelector((state: RootState) => state.auth.phone);

  const onSubmit = () => {
    console.log('Simulating OTP verification...');
    setTimeout(() => {
      dispatch(verifyOtp());
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="subtitle1">Enter OTP sent to {phone}</Typography>
      <TextField
        label="OTP"
        fullWidth
        margin="normal"
        {...register('otp')}
        error={!!errors.otp}
        helperText={errors.otp?.message}
      />
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
        Verify OTP
      </Button>
    </form>
  );
}
