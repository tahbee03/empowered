'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { useClipboard } from '@/hooks/use-clipboard';
import { Button } from '@/components/ui/button';
import { CheckIcon, CopyIcon } from 'lucide-react';

export default function CopyToClipboard({
  message,
  className,
  ...props
}) {
  const { isCopied, copyToClipboard } = useClipboard({ timeout: 2000 });

  const onCopy = () => {
    if (isCopied) return;
    copyToClipboard(message.content);
  };

  return (
    React.createElement('div', { className: cn('', className), ...props },
      React.createElement(Button, {
        variant: 'secondary',
        size: 'icon',
        className: 'h-8 w-8',
        onClick: onCopy
      },
        isCopied ? (
          React.createElement(CheckIcon, { className: 'h-4 w-4 text-emerald-500' })
        ) : (
          React.createElement(CopyIcon, { className: 'h-4 w-4 text-zinc-500' })
        ),
        React.createElement('span', { className: 'sr-only' }, 'Copy message')
      )
    )
  );
}
