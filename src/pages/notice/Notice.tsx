import { colors, fonts, shadows } from '@/styles/styles';
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import RingBinder from '@images/ring-binder-vt.svg?react';
import IconChat from '@icons/kko.svg?react';
import IconIG from '@icons/ig.svg?react';
import type { Post } from '@/types/schema';
import BtnBack from '@/components/icons/BtnBack';
import { getPosts } from '@/api';
import Gallery from '@/components/Gallery';
import { SocialLinkUrls } from '@/constants';
import Card from '@/components/Card';

import dayjs, { type Dayjs } from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
dayjs.extend(relativeTime);

const containerCss = css`
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  background-color: ${colors.primary10};
  color: ${colors.primary};

  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    ${fonts.title_lg};
    line-height: 100%;
  }
  header {
    width: 100%;
    padding: 54px 26px;
    .social-links {
      margin-top: 10px;
      display: flex;
      align-items: center;
      gap: 8px;
      color: ${colors.primary};
    }
  }

  section {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding: 6px 20px 60px 20px;
  }

  #modal {
    width: 100%;
    height: 100%;
    min-height: 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
    color: ${colors.white};
    padding: 24px;
    padding-bottom: 0;
    #notice-detail {
      position: relative;
      width: 100%;
      flex-grow: 1;
      /* min-height: 0; */
      max-height: 80vh;
      border-radius: 14px 14px 0 0;
      background-color: ${colors.primary};
      ${shadows.dropBottom};
      padding: 20px 14px 0 56px;
      article {
        height: 100%;
        padding-bottom: 64px;
        overflow-y: scroll;
      }
      h3 {
        ${fonts.body_lg}
      }
    }
    #ringbinder {
      position: absolute;
      top: 24px;
      left: -12px;
      height: calc(100% - 24px);
      color: ${colors.primary20};
      ${shadows.dropBottom};
      overflow: hidden;
    }
    button {
      margin: 6px;
    }

    #inset {
      inset: 0;
      height: 100dvh;
      position: absolute;
      z-index: 10;
      background-color: #ffffff55;
    }
    .imgModal {
      height: 120vw;
      width: 90vw;
      max-height: 80vh;
      border-radius: 15px;
      background: center/cover;
      margin: auto;
      margin-top: 135px;
      ${shadows.dropBottom};
    }
  }
`;

const Notice = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [imgModal, setImgModal] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPost, setCurrentPost] = useState<Post>();
  const [visitedPostIDs, setVisitedPostIDs] = useState<number[]>([]);
  const handleBannerClick = (id: number) => {
    // console.log(Posts.at(i)?.content);
    setCurrentPost(posts.find((e) => e.id === id));
    setModalOpen(true);
    setVisitedPostIDs([...visitedPostIDs, id]);
  };

  const handleImageClick = (key: number) => {
    if (currentPost?.images?.at(key) === undefined) return;
    // console.log(currentPost?.images?.at(key))
    setImgModal(currentPost?.images?.at(key) ?? '');
  };

  useEffect(() => {
    // setPosts(postsData); // Mockup data
    getPosts(setPosts);
  }, []);

  return (
    <div css={containerCss}>
      {modalOpen ? (
        <div id='modal'>
          <BtnBack onClick={() => setModalOpen(false)} />
          {currentPost?.images && currentPost.images.length > 0 && (
            <>
              <div>
                <Gallery
                  images={currentPost.images}
                  size='small'
                  loop={false}
                  onSlideClick={handleImageClick}
                />
              </div>
              {imgModal && (
                <>
                  <div id='inset' onClick={() => setImgModal(null)}>
                    <div
                      className='imgModal'
                      style={{ backgroundImage: `url(${imgModal})` }}
                    />
                  </div>
                </>
              )}
            </>
          )}
          <div id='notice-detail'>
            <article>
              <h3>{currentPost?.title}</h3>
              <br />
              <br />
              <p>{currentPost?.content}</p>
            </article>
            <div id='ringbinder'>
              <RingBinder />
            </div>
          </div>
        </div>
      ) : (
        <>
          <header>
            <h1>Notice</h1>
            <div className='social-links'>
              <button onClick={() => window.open(SocialLinkUrls.kko)}><IconChat/></button>
              <button onClick={() => window.open(SocialLinkUrls.ig)}><IconIG/></button>
            </div>
          </header>
          <section>
            {posts.map((e, i) => (
              <Card
                title={e.title}
                desc={e.createdAt?.locale('ko').fromNow()}
                onClick={() => {
                  handleBannerClick(e.id);
                }}
                imgUrl={e.images?.at(0)}
                key={i}
                style={{ backgroundColor: colors.white }}
              />
            ))}
          </section>
        </>
      )}
    </div>
  );
};

export default Notice;
