import { css } from '@emotion/react';
import type { ComponentProps } from 'react';

const BoothList = ({ children, ...props }: ComponentProps<'div'>) => {
  return (
    <div
      css={css`
        width: 100%;
        padding: 0 28px 10rem 28px;
        display: flex;
        flex-direction: column;
        gap: 12px;
        overflow-y: scroll;
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export default BoothList;
