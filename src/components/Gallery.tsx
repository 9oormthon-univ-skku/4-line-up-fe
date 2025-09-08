import { shadows } from '@/styles/styles';
import { css } from '@emotion/react';
import useEmblaCarousel from 'embla-carousel-react';
import type { ComponentProps } from 'react';

const galleryCss = css`
  /* overflow: hidden; */
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

interface GalleryProps extends ComponentProps<'div'> {
  images: string[];
  size?: 'default' | 'small';
  loop?: boolean;
  onSlideClick?: (key: number) => void;
}

const Gallery = ({
  images,
  size = 'default',
  loop = true,
  onSlideClick = () => {},
  ...props
}: GalleryProps) => {
  const [emblaRef] = useEmblaCarousel({ loop: loop });

  return (
    <div css={galleryCss} ref={emblaRef} className='embla__viewport' {...props}>
      <div className='embla__container'>
        {images.map((e, i) => (
          <div
            className={`embla__slide ${size === 'small' ? 'small' : ''}`}
            style={{ backgroundImage: `url(${e})` }}
            key={i}
            onClick={() => {
              onSlideClick(i);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
