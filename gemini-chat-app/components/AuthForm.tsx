'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { phoneSchema } from '@/utils/validatePhone';
import { z } from 'zod';
import { TextField, Button, MenuItem } from '@mui/material';
import { useEffect, useState } from 'react';
import { fetchCountries } from '@/utils/countryService';
import { useDispatch } from 'react-redux';
import { sendOtp } from '@/store/authSlice';

type FormData = z.infer<typeof phoneSchema>;

export default function AuthForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(phoneSchema),
  });
  const dispatch = useDispatch();
  const [countries, setCountries] = useState<any[]>([]);

  useEffect(() => {
    fetchCountries().then(setCountries);
  }, []);

  const onSubmit = (data: FormData) => {
    const fullPhone = `${data.countryCode}${data.phone}`;
    console.log('Simulating OTP send to', fullPhone);
    setTimeout(() => {
      dispatch(sendOtp(fullPhone));
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        select
        label="Country Code"
        fullWidth
        margin="normal"
        {...register('countryCode')}
        error={!!errors.countryCode}
        helperText={errors.countryCode?.message}
      >
        {countries.map((c) => (
          <MenuItem key={c.code} value={c.dialCode}>
            {c.name} ({c.dialCode})
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Phone Number"
        fullWidth
        margin="normal"
        {...register('phone')}
        error={!!errors.phone}
        helperText={errors.phone?.message}
      />
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
        Send OTP
      </Button>
    </form>
  );
}
