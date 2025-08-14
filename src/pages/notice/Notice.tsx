import Banner from '@/components/Banner';
import Star from '@/components/icons/Star';
import { colors, fonts } from '@/styles/styles';
import { css } from '@emotion/react';

const containerCss = css`
  height: 100%;
  overflow-y: hidden;
  background-color: ${colors.primary10};
  color: ${colors.primary};

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 54px;

  header {
    width: 100%;
    position: fixed;
    background-color: ${colors.primary10};
    z-index: 10;
    border-bottom: dashed 5px ${colors.primary};
    * {
      margin: 54px auto 0 26px;
    }
    ${fonts.title_lg};
    h2 {
      ${fonts.title_xlg};
    }
  }

  section {
    margin-top: calc(220px + 5rem);
    width: 100%;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding: 36px 24px 72px 24px;
  }
`;

const Posts = [
  {
    title: 'title1',
    content: 'content',
  },
  {
    title: 'title2',
    content: 'content',
  },
];

const Notice = () => {
  return (
    <div css={containerCss}>
      <header>
        <h1>Notification</h1>
        <h2>New</h2>
      </header>
      <section>
        <Banner text='총학생회 카카오톡 채널' />
        <Star size='md' color='primary' />
        <Banner text='공지 1' variant='primary' />
        {Posts.map((e, i) => (
          <Banner text={e.title} variant='secondary' key={i}/>
        ))}
      </section>
    </div>
  );
};

export default Notice;
