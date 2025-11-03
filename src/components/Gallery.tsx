import { shadows } from '@/styles/styles';
import { css, keyframes } from '@emotion/react';
import useEmblaCarousel from 'embla-carousel-react';
import type { ComponentProps } from 'react';
import {
  DotButton,
  dotsCss,
  useDotButton,
} from './embla/EmblaCarouselDotButton';

const loadKeyframe = keyframes`
  0% {
    background-color: #222222;
  }
  100% {
    background-color: #404040;
  }
`;
const galleryCss = css`
  /* overflow: hidden; */
  width: 100%;
  flex-shrink: 0;
  ${shadows.dropBottom}
  .embla__container {
    display: flex;
  }
  .embla__slide {
    height: 392px;
    flex: 0 0 314px;
    min-width: 0;
    border-radius: 15px;
    background: center/cover;
    animation: ${loadKeyframe} 2s ease alternate infinite;
  }
  .small {
    height: 320px;
    flex: 0 0 240px;
  }
  .embla__controls {
    position: absolute;
    bottom: 8px;
    width: 100%;
  }
`;

const squareCss = css`
  overflow: hidden;
  border-radius: 15px;
  .embla__slide {
    height: calc((100vw - 48px) * 1.25);
    max-height: 537px;
    flex: 0 0 100%;
  }
`;

interface GalleryProps extends ComponentProps<'div'> {
  images: string[];
  size?: 'default' | 'small' | 'sqaure';
  dotControl?: boolean;
  loop?: boolean;
  onSlideClick?: (key: number) => void;
}

const Gallery = ({
  images,
  size = 'default',
  dotControl = false,
  loop = true,
  onSlideClick = () => {},
  ...props
}: GalleryProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: loop,
    containScroll: false,
  });

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  return (
    <div
      css={[galleryCss, size === 'sqaure' && squareCss]}
      ref={emblaRef}
      className='embla__viewport'
      {...props}
    >
      <div className='embla__container'>
        {images.map((e, i) => (
          <div
            className={`embla__slide ${size}`}
            style={{
              backgroundImage: `url(${e}), linear-gradient(transparent, #11111188)`,
            }}
            key={i}
            onClick={() => {
              onSlideClick(i);
            }}
          ></div>
        ))}
      </div>
      {dotControl && (
        <div className='embla__controls' css={dotsCss}>
          <div className='embla__dots'>
            {scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={'embla__dot'.concat(
                  index === selectedIndex ? ' embla__dot--selected' : ''
                )}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
