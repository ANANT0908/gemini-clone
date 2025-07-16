'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import AuthForm from '@/components/AuthForm';
import OTPForm from '@/components/OTPForm';
import { Container, Typography, Box } from '@mui/material';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const { otpSent, verified } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (verified) {
      router.push('/dashboard');
    }
  }, [verified, router]);

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h4" gutterBottom>Login / Signup</Typography>
        <Typography variant="body1" color="text.secondary">
          Enter your phone number to receive an OTP
        </Typography>
      </Box>

      {!otpSent ? <AuthForm /> : <OTPForm />}
    </Container>
  );
}
