'use client';
import { useEffect } from 'react';
export default function CopyProtection() {
  useEffect(() => {
    const prevent = event => event.preventDefault();
    const preventImageDrag = event => {
      if (event.target instanceof HTMLImageElement) event.preventDefault();
    };
    document.addEventListener('contextmenu', prevent);
    document.addEventListener('dragstart', preventImageDrag);
    return () => {
      document.removeEventListener('contextmenu', prevent);
      document.removeEventListener('dragstart', preventImageDrag);
    };
  }, []);
  return null;
}
