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
`;

const imgBaseUrl = 'https://flzedqolwsvpundopfcv.supabase.co/storage/v1/object/public/images';

interface GalleryProps {
  images: string[];
}

const Gallery = ({ images }: GalleryProps) => {
  const [emblaRef] = useEmblaCarousel({ loop: true });

  return (
    <div css={galleryCss} ref={emblaRef} className='embla__viewport'>
      <div className='embla__container'>
        {images.map((e, i) => (
          <div
            className='embla__slide'
            style={{ backgroundImage: `url(${imgBaseUrl}${e})` }}
            key={i}
          >
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
