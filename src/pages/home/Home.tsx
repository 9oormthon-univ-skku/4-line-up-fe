import { colors, fonts } from '@/styles/styles';
import { css } from '@emotion/react';
import Gallery from './Gallery';
import HomeContents from './HomeContents';

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
const imageList = ['/img-sample-01.jpg', '/img-sample-02.jpg', '/img-sample-03.jpg'];
const dateList = ['05.07.', '08', '09'];

const Home = () => {
  return (
    <div css={containerCss}>
      <h1 css={fonts.title_lg}>{`SKKU:\nEskara`}</h1>
      <Gallery images={imageList} />
      <HomeContents dateList={dateList} />
      <footer
        css={[
          fonts.title_md,
          css`
            position: relative;
            bottom: 44px;
          `,
        ]}
      >{`SKKU:\nEskara`}</footer>
    </div>
  );
};

export default Home;
