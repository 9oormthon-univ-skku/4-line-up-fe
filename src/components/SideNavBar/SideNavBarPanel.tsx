import { colors, shadows } from '@/styles/styles';
import { css } from '@emotion/react';
import Bg from '@images/bg-stars.svg?react';
import Logo from '@images/logo-9u.svg?react'

const SideNavBarPanel = (props: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      css={css`
        height: 100lvh;
        width: 100%;
        padding: 5.4rem 16px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        position: fixed;
        z-index: -20;
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
        <Bg
          css={css`
            color: ${colors.primary20};
            position: fixed;
            bottom: 0;
            right: 0;
            z-index: -10;
          `}
        />
        <Logo css={css`
          color: ${colors.primary30};
        `}/>
      </p>
    </div>
  );
};

export default SideNavBarPanel;
