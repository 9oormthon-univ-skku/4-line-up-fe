import { colors, fonts, shadows } from '@/styles/styles';
import { css } from '@emotion/react';
import type { ComponentProps } from 'react';
import Star from './icons/Star';

const bannerCss = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1.6rem 1rem 1.6rem 2.2rem;
  border-radius: 14px;
  ${fonts.body_md};
  background-color: ${colors.primary20};
  border: 2px solid ${colors.primary20};
  color: ${colors.black};
  ${shadows.dropBottom};
  cursor: pointer;

  div{
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
  }
  svg{
    margin: 0 5px;
    height: 24px;
    width: 24px;
    flex-shrink: 0;
  }
`;

const secondary = css`
  background-color: ${colors.white};
`;

const banner = css`
  justify-content: center;
  padding-right: 2.4rem;
  border: 2px solid ${colors.primary};
  background-color: ${colors.primary};
  color: ${colors.white};
`;

interface BannerProps extends ComponentProps<'div'> {
  text: string;
  variant?: 'default' | 'primary' | 'secondary';
}

const Banner = ({ text, variant = 'default', ...props }: BannerProps) => {
  return (
    <div
      css={[
        bannerCss,
        variant === 'secondary' && secondary,
        variant === 'default' && banner,
      ]}
      {...props}
    >
      <div>{text}</div>
      {variant !== 'default' && (
        <Star
          size='sm'
          color={variant === 'primary' ? 'secondary' : 'primary'}
        />
      )}
    </div>
  );
};

export default Banner;
