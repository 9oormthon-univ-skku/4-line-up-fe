import { colors, fonts } from '@/styles/styles';
import { css } from '@emotion/react';
import Gallery from '../../components/Gallery';
import HomeContents from './HomeContents';
import { useEffect, useState } from 'react';
import { getPosts } from '@/api';
import type { Post } from '@/types/schema';
import { useNavigate } from 'react-router-dom';
import { days, festivalTitle } from '@/constants';

const containerCss = css`
  min-height: 100%;
  background-color: ${colors.primary};
  color: ${colors.white};

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 54px;

  h1 {
    margin: 54px auto 0 26px;
  }
`;

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [galleryImgages, setGalleryImgages] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getPosts(setPosts);
  }, []);

  useEffect(() => {
    setGalleryImgages(
      posts
        .filter((e) => e.images != undefined)
        .map((e) => e.images?.at(0) ?? '')
    );
  }, [posts]);

  return (
    <div css={containerCss}>
      <h1 css={fonts.title_lg}>{festivalTitle}</h1>
      <Gallery
        images={galleryImgages}
        onSlideClick={() => navigate('/notice')}
      />
      <HomeContents dateList={days} />
      <footer
        css={[
          fonts.title_md,
          css`
            position: relative;
            bottom: 44px;
          `,
        ]}
      >
        {festivalTitle}
      </footer>
    </div>
  );
};

export default Home;
