import Banner from '@/components/Banner';
import Star from '@/components/icons/Star';
import { colors, fonts, shadows } from '@/styles/styles';
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import RingBinder from '@images/ring-binder-vt.svg?react';
import type { Post } from '@/types/schema';
import BtnBack from '@/components/icons/BtnBack';
import { getPosts } from '@/api';
// import { postsData } from '@/api/mockData';

const containerCss = css`
  height: 100%;
  overflow-y: scroll;
  background-color: ${colors.primary10};
  color: ${colors.primary};

  display: flex;
  flex-direction: column;
  align-items: center;

  header {
    width: 100%;
    background-color: ${colors.primary10};
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
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding: 36px 24px 72px 24px;
  }

  #modal {
    width: 100%;
    height: calc(100vh - 120px);
    top: 120px;
    position: absolute;
    z-index: 20;
    color: ${colors.white};
    padding: 24px;
    padding-bottom: 0;
    #notice-detail {
      width: 100%;
      height: 100%;
      border-radius: 14px 14px 0 0;
      background-color: ${colors.primary};
      ${shadows.dropBottom};
      padding: 20px 14px 64px 56px;
      overflow-y: scroll;
    }
    #ringbinder {
      position: fixed;
      top: 180px;
      left: 12px;
      color: ${colors.primary20};
      ${shadows.dropBottom};
    }
    #inset {
      background-color: ${colors.primary10};
      inset: 0;
      position: fixed;
    }
    button {
      position: fixed;
      top: 5.2rem;
      z-index: 20;
      margin: 6px;
    }
  }
`;

const Notice = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPost, setCurrentPost] = useState<Post>();
  const [visitedPostIDs, setVisitedPostIDs] = useState<number[]>([]);
  const handleBannerClick = (id: number) => {
    // console.log(Posts.at(i)?.content);
    setCurrentPost(posts.find((e) => e.id === id));
    setModalOpen(true);
    setVisitedPostIDs([...visitedPostIDs, id]);
  };

  useEffect(() => {
    // setPosts(postsData); // Mockup data
    getPosts(setPosts);
  }, []);

  return (
    <div css={containerCss}>
      <header>
        <h1>Notification</h1>
        <h2>New</h2>
      </header>
      <section>
        <Banner text='총학생회 카카오톡 채널' />
        <Star size='md' color='primary' />
        {posts.map((e, i) => (
          <Banner
            text={e.title}
            onClick={() => {
              handleBannerClick(e.id);
            }}
            variant={visitedPostIDs.includes(e.id) ? 'secondary' : 'primary'}
            key={i}
          />
        ))}
      </section>
      {modalOpen && (
        <div id='modal'>
          <BtnBack onClick={() => setModalOpen(false)} />
          <div id='inset' />
          <div id='notice-detail'>
            <p>{currentPost?.title}</p>
            <p>{currentPost?.content}</p>
          </div>
          <RingBinder id='ringbinder' />
        </div>
      )}
    </div>
  );
};

export default Notice;
