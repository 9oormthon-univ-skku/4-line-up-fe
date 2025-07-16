import { colors, shadows } from '@/styles/styles';
import { css } from '@emotion/react';
import HamburgerIcon from '@icons/hamburger.svg?react';

const SideNavOpenBtn = (props:React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div css={css`
        height: 6rem;
        width: 12rem;
        border-radius: 3rem;
        border: 0.2rem solid ${colors.primary};
        background-color: ${colors.white};
        ${shadows.dropBottom};
        display: flex;
        align-items: center;
        svg {
          height: 5.6rem;
          color: ${colors.primary};
          filter: drop-shadow(${shadows.center});
        }
    `}
    {...props}>
      <HamburgerIcon />
    </div>
  );
};
export default SideNavOpenBtn;
