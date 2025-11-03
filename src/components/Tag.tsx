import type { ComponentProps } from 'react';
import { css } from '@emotion/react';
import { colors, fonts, shadows } from '@/styles/styles';

const tagCss = css`
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 4px 8px;

  border-radius: 2rem;
  border: 2px solid ${colors.primary30};
  background-color: ${colors.primary20};
  color: ${colors.black};
  ${fonts.label_xsm};
  ${shadows.dropBottom};
`;
const secondaryCss = css`
  background-color: ${colors.white};
  border: none;
`;

interface TagProps extends ComponentProps<'div'> {
  variant?: 'primary' | 'secondary';
  text?: string;
}

const Tag = ({ variant = 'primary', ...props }: TagProps) => {
  return (
    <div css={[tagCss, variant === 'secondary' && secondaryCss]} {...props}>
      {props.text}
      {props.children}
    </div>
  );
};

export default Tag;
