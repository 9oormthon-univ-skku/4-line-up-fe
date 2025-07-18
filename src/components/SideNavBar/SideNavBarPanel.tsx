import { colors, shadows } from '@/styles/styles';
import { css } from '@emotion/react';

const SideNavBarPanel = (props: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      css={css`
        height: 100lvh;
        width: 100%;
        padding: 14px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background-color: ${colors.white};
        border-left: 2px solid ${colors.primary};
        box-shadow: ${shadows.left};
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 20px;
        `}
      >
        {props.children}
      </div>
      <p
        css={css`
          margin-bottom: 10rem;
        `}
      >
        logo
      </p>
    </div>
  );
};

export default SideNavBarPanel;
