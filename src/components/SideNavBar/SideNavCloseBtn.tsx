import { colors, shadows } from '@/styles/styles';
import { css } from '@emotion/react';
import CloseIcon from '@icons/close.svg?react';

const SideNavCloseBtn = (props:React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div css={css`
        margin-left: auto;
        svg {
            height: 5.6rem;
            width: 5.6rem;
            path {
                fill: ${colors.primary};
            }
            circle {
                fill: ${colors.primary10};
            }
            ${shadows.dropBottom};
        }
    `}
    {...props}>
      <CloseIcon />
    </div>
  );
};
export default SideNavCloseBtn;
