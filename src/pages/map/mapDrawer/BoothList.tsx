import { css } from '@emotion/react';
import type { ComponentProps } from 'react';

const BoothList = ({ children, ...props }: ComponentProps<'div'>) => {
  return (
    <div
      onScroll={(e) => {
        e.stopPropagation();
      }}
      css={css`
        width: 100%;
        height: calc(85% - 80px);
        padding: 0 16px 10rem 16px;
        display: flex;
        flex-direction: column;
        gap: 8px;
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export default BoothList;
