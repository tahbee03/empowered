'use client';

import { useState } from 'react';

export function useClipboard({ timeout = 2000 } = {}) {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = (value) => {
    if (!value) return;
    if (typeof window === 'undefined' || !navigator.clipboard?.writeText) return;

    navigator.clipboard.writeText(value).then(() => {
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, timeout);
    });
  };

  return { isCopied, copyToClipboard };
}
