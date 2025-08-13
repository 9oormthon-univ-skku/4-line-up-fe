import type { ComponentProps } from 'react';
import { css } from '@emotion/react';
import { colors, fonts, shadows } from '@/styles/styles';

const btnCss = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0.5rem 2rem;

  border-radius: 1.7rem;
  background-color: ${colors.primary20};
  color: ${colors.black};
  ${fonts.label_xsm};
  ${shadows.dropBottom};
  :active {
    opacity: 75%;
  }
  :disabled {
    opacity: 50%;
    cursor: not-allowed;
  }
`;
const btnLargeCss = css`
  width: 100%;
  padding: 1.6rem;
  background-color: ${colors.primary10};
  border: 2px solid ${colors.primary20};
  ${fonts.body_md};
`;

interface ButtonProps extends ComponentProps<'button'> {
  size?: 'default' | 'lg';
  text?: string;
}

const Button = ({ size = 'default', ...props }: ButtonProps) => {
  return (
    <button css={[btnCss, size === 'lg' && btnLargeCss]} {...props}>
      {props.text}
      {props.children}
    </button>
  );
};

export default Button;
