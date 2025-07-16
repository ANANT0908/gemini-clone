'use client';
import { IconButton } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useRef } from 'react';

export default function ImageUpload({ onUpload }: { onUpload: (url: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        onUpload(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <input type="file" accept="image/*" hidden ref={inputRef} onChange={handleFile} />
      <IconButton onClick={() => inputRef.current?.click()}>
        <AddPhotoAlternateIcon />
      </IconButton>
    </>
  );
}
