import { colors, fonts } from '@/styles/styles';
import { css } from '@emotion/react';
import Gallery from '../../components/Gallery';
import HomeContents from './HomeContents';
import { useEffect, useState } from 'react';
import { getPosts } from '@/api';
import type { Post } from '@/types/schema';
import { useNavigate } from 'react-router-dom';

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

// const imageList = ['/img-01.jpg', '/img-02.jpg', '/img-02.jpg'];
const dateList = ['09.11.', '12'];

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
      <h1 css={fonts.title_lg}>{`2025 Eskara:\n초록의 파도`}</h1>
      <Gallery images={galleryImgages} onClick={()=> navigate('/notice')}/>
      <HomeContents dateList={dateList} />
      <footer
        css={[
          fonts.title_md,
          css`
            position: relative;
            bottom: 44px;
          `,
        ]}
      >{`2025 Eskara:\n초록의 파도`}</footer>
    </div>
  );
};

export default Home;
