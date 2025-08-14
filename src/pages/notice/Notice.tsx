import Banner from '@/components/Banner';
import Star from '@/components/icons/Star';
import { colors, fonts, shadows } from '@/styles/styles';
import { css } from '@emotion/react';
import { useState } from 'react';
import RingBinder from '@images/ring-binder-vt.svg?react';

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

  #modal {
    width: 100%;
    height: calc(100vh - 140px);
    top: 140px;
    position: absolute;
    z-index: 40;
    background-color: ${colors.primary10};
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
      top: 200px;
      left: 12px;
      color: ${colors.primary20};
      ${shadows.dropBottom};
    }
    #inset {
      background-color: transparent;
      inset: 0;
      position: fixed;
    }
  }
`;

// TODO: 꺼내기
interface Link {
  label: string;
  href: string;
}
interface Post {
  title: string;
  content: string;
  images?: string[];
  links?: Link[];
}

const Posts: Post[] = [
  {
    title: 'title1',
    content: 'content1',
  },
  {
    title: 'title2',
    content:
      'content2 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum error consequatur qui nostrum voluptatem vero saepe velit nesciunt fugit et nemo eius perspiciatis, consequuntur, temporibus exercitationem similique minima ab rem!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum error consequatur qui nostrum voluptatem vero saepe velit nesciunt fugit et nemo eius perspiciatis, consequuntur, temporibus exercitationem similique minima ab rem!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum error consequatur qui nostrum voluptatem vero saepe velit nesciunt fugit et nemo eius perspiciatis, consequuntur, temporibus exercitationem similique minima ab rem!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum error consequatur qui nostrum voluptatem vero saepe velit nesciunt fugit et nemo eius perspiciatis, consequuntur, temporibus exercitationem similique minima ab rem!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum error consequatur qui nostrum voluptatem vero saepe velit nesciunt fugit et nemo eius perspiciatis, consequuntur, temporibus exercitationem similique minima ab rem!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum error consequatur qui nostrum voluptatem vero saepe velit nesciunt fugit et nemo eius perspiciatis, consequuntur, temporibus exercitationem similique minima ab rem!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum error consequatur qui nostrum voluptatem vero saepe velit nesciunt fugit et nemo eius perspiciatis, consequuntur, temporibus exercitationem similique minima ab rem!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum error consequatur qui nostrum voluptatem vero saepe velit nesciunt fugit et nemo eius perspiciatis, consequuntur, temporibus exercitationem similique minima ab rem!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum error consequatur qui nostrum voluptatem vero saepe velit nesciunt fugit et nemo eius perspiciatis, consequuntur, temporibus exercitationem similique minima ab rem!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum error consequatur qui nostrum voluptatem vero saepe velit nesciunt fugit et nemo eius perspiciatis, consequuntur, temporibus exercitationem similique minima ab rem!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum error consequatur qui nostrum voluptatem vero saepe velit nesciunt fugit et nemo eius perspiciatis, consequuntur, temporibus exercitationem similique minima ab rem!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum error consequatur qui nostrum voluptatem vero saepe velit nesciunt fugit et nemo eius perspiciatis, consequuntur, temporibus exercitationem similique minima ab rem!',
  },
];

const Notice = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState<Post>();
  const handleBannerClick = (i: number) => {
    // console.log(Posts.at(i)?.content);
    setCurrentPost(Posts[i]);
    setModalOpen(true);
  };

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
          <Banner
            text={e.title}
            onClick={() => {
              handleBannerClick(i);
            }}
            variant='secondary'
            key={i}
          />
        ))}
      </section>
      {modalOpen && (
        <div id='modal'>
          <div id='inset' onClick={() => setModalOpen(false)} />
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
