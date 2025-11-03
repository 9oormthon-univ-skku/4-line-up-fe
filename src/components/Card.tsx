import type { ComponentProps } from 'react';
import Button from './Button';
import { css } from '@emotion/react';
import { colors, fonts, shadows } from '@/styles/styles';
import defaultImg from '@images/default_thumbnail.jpg';

const cardCss = css`
  display: flex;
  width: 100%;
  height: 8rem;
  border-radius: 10px;
  border: 1px solid ${colors.grayE0};
  background-color: ${colors.primary15};
  ${shadows.dropBottom};
  overflow: hidden;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
  transform: translate3d(0,0,0);

  .card-img {
    width: 8rem;
    height: 100%;
    border-radius: 10px;
    border: 1px solid ${colors.grayE0};
    background: center/cover;
    flex-shrink: 0;
  }
  .card-title-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    div {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
  }
  .card-title {
    ${fonts.body_md};
    color: ${colors.black};
  }
  .card-desc {
    ${fonts.label_sm};
    color: ${colors.gray77};
  }
  button {
    margin-right: 8px;
  }
`;

interface CardProps extends ComponentProps<'div'> {
  imgUrl?: string;
  title: string;
  desc?: string;
  btnText?: string;
  btnOnClick?: () => void;
}

const Card = ({
  imgUrl = defaultImg,
  title,
  desc,
  btnText,
  btnOnClick,
  ...props
}: CardProps) => {
  const handleBtnClick = (e: React.MouseEvent) => {
    if (!btnOnClick) return;
    e.stopPropagation();
    btnOnClick();
  };
  return (
    <div css={cardCss} {...props}>
      <div className='card-img' style={{ backgroundImage: `url(${imgUrl})` }} />
      <div className='card-title-wrapper'>
        <div className='card-title'>{title}</div>
        <div className='card-desc'>{desc}</div>
      </div>
      {btnText && <Button text={btnText} onClick={handleBtnClick} />}
    </div>
  );
};

export default Card;
