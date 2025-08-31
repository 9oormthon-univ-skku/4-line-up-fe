import { shadows } from '@/styles/styles';
import { css } from '@emotion/react';
import useEmblaCarousel from 'embla-carousel-react';

const galleryCss = css`
  overflow: hidden;
  width: 100%;
  ${shadows.dropBottom}
  .embla__container {
    display: flex;
  }
  .embla__slide {
    height: 443px;
    flex: 0 0 314px;
    min-width: 0;
    border-radius: 15px;
    background: center/cover;
  }
  .small {
    height: 320px;
    flex: 0 0 240px;
  }
`;

interface GalleryProps {
  images: string[];
  size?: 'default' | 'small';
}

const Gallery = ({ images, size = 'default' }: GalleryProps) => {
  const [emblaRef] = useEmblaCarousel({ loop: true });

  return (
    <div css={galleryCss} ref={emblaRef} className='embla__viewport'>
      <div className='embla__container'>
        {images.map((e, i) => (
          <div
            className={`embla__slide ${size === 'small' ? 'small' : ''}`}
            style={{ backgroundImage: `url(${e})` }}
            key={i}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
