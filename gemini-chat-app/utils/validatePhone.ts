import * as z from 'zod';

export const phoneSchema = z.object({
  countryCode: z.string().nonempty(),
  phone: z.string().min(5, 'Phone number is too short'),
});

export const otpSchema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits'),
});
