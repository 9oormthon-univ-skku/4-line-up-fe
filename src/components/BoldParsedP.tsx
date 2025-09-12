import type { ComponentProps } from 'react';

interface BoldParsedPProps extends ComponentProps<'p'> {
  text: string;
}

export const BoldParsedP = ({ text, ...props }: BoldParsedPProps) => {
  const parts = text.split(/(\*\*.*?\*\*|__.*?__)/g);

  return (
    <p {...props}>
      {parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          const content = part.slice(2, -2);
          return <b key={index}>{content}</b>;
        }
        if (part.startsWith('__') && part.endsWith('__')) {
          const content = part.slice(2, -2);
          return <b key={index}>{content}</b>;
        }
        return <span key={index}>{part}</span>;
      })}
    </p>
  );
};
