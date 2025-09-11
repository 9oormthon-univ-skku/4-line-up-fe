import type { ComponentProps } from 'react';
import Button from './Button';
import { css } from '@emotion/react';
import { colors, fonts, shadows } from '@/styles/styles';
import defaultImg from '@images/eskara_thumbnail.jpg';

const cardCss = css`
  display: flex;
  width: 100%;
  height: 9.6rem;
  border-radius: 0.8rem;
  background-color: ${colors.white};
  ${shadows.dropBottom};
  overflow: hidden;
  flex-shrink: 0;
  transform: translate3d(0,0,0);

  .card-img {
    width: 9.5rem;
    height: 100%;
    border-radius: 0.8rem;
    background: center/cover;
    flex-shrink: 0;
  }
  .card-content {
    flex-grow: 1;
    max-width: calc(100% - 9.5rem);
    padding: 0.8rem 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
  }
  .card-title-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0 1.4rem;
    div {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
  }
  .card-title {
    ${fonts.body_lg};
  }
  .card-desc {
    ${fonts.label_sm};
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
      <div className='card-content'>
        <div className='card-title-wrapper'>
          <div className='card-title'>{title}</div>
          <div className='card-desc'>{desc}</div>
        </div>
        {btnText && <Button text={btnText} onClick={handleBtnClick} />}
      </div>
    </div>
  );
};

export default Card;
