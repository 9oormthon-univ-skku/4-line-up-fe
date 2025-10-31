import { colors, shadows } from '@/styles/styles';
import { css } from '@emotion/react';
import HamburgerIcon from '@icons/hamburger.svg?react';

const SideNavOpenBtn = (props:React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div css={css`
        svg {
          height: 5.6rem;
          color: ${colors.primary};
          ${shadows.dropCenter};
        }
    `}
    {...props}>
      <HamburgerIcon />
    </div>
  );
};
export default SideNavOpenBtn;
