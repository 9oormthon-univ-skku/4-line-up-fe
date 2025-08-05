import { shadows } from '@/styles/styles';
import { css } from '@emotion/react';
// TODO: import useEmblaCarousel from 'embla-carousel-react'

const galleryCss = css`
  overflow: scroll;
  width: 100%;
  .container {
    display: flex;
    width: fit-content;
  }
  .slide {
    height: 443px;
    width: 314px;
    border-radius: 15px;
    ${shadows.dropBottom}
  }
`;

const Gallery = () => {
  return (
    <div css={galleryCss}>
      <div className='container'>
        <div className='slide' style={{ background: 'grey' }}>
          temp
        </div>
        <div className='slide' style={{ background: 'grey' }}>
          temp
        </div>
      </div>
    </div>
  );
};

export default Gallery;
