import { colors, fonts, shadows } from '@/styles/styles';
import { css } from '@emotion/react';
import type { ComponentProps } from 'react';

const BoothInfoModal = ({ children }: ComponentProps<'div'>) => {
  return (
    <div
      css={css`
        position: fixed;
        bottom: 130px;
        width: 100%;
        padding: 12px 28px;
        background-color: ${colors.primary20};
        ${shadows.dropBottom};
        h3 {
          position: absolute;
          top: -3.4rem;
          right: 0;
          padding: 0.8rem 24px;
          border-radius: 8px 8px 0 0;
          background-color: ${colors.primary20};
          ${fonts.display_sm};
        }
      `}
    >
      <h3>부스 간단 정보</h3>
      {children}
    </div>
  );
};

export default BoothInfoModal;
