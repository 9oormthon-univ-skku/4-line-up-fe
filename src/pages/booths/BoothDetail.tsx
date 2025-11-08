import { getBooth, getCategories } from '@/api';
import Gallery from '@/components/Gallery';
import BtnBack from '@/components/icons/BtnBack';
import { colors, fonts } from '@/styles/styles';
import type { Booth, Category } from '@/types/schema';
import { css } from '@emotion/react';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'dayjs/locale/ko';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { BoldParsedP } from '@/components/BoldParsedP';
// import { boothsData } from '@/api/mockData';
import Tag from '@/components/Tag';
dayjs.locale('ko');

const containerCss = css`
  height: 100%;
  background-color: ${colors.primary10};

  display: flex;
  flex-direction: column;
  header {
    display: flex;
    align-items: center;
    padding: 5.2rem calc(16px + 5.6rem) 22px 26px;
    h3 {
      flex-grow: 1;
      text-align: center;
      ${fonts.body_lg};
    }
  }
  .info {
    color: ${colors.gray77};
    display: flex;
    justify-content: space-between;
    .left {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
  }
  section {
    padding: 16px;
    min-height: 0;
    overflow-y: scroll;
    overflow-x: hidden;
    flex-grow: 1;

    display: flex;
    flex-direction: column;

    gap: 18px;
  }
  .tab-wrapper {
    display: flex;
    gap: 12px;
  }
  article {
    flex-grow: 1;
    padding: 8px;
    padding-bottom: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;

    color: ${colors.gray40};
    ${fonts.label_sm};
    b {
      font-weight: bolder;
    }
    .booth-links {
      margin-top: 18px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
  }
  .menu-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 8px 0;
    div {
      background-color: ${colors.white};
    }
  }
`;

const BoothDetail = () => {
  const [booth, setBooth] = useState<Booth>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [showMenu, setShowMenu] = useState(false);

  const param = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // setBooth(boothsData.find(e=>e.id===Number(param.boothId))); // Mockup Data
    const boothId = Number(param.boothId);
    getCategories(setCategories)
    if(!isNaN(boothId)) getBooth(boothId, setBooth);
    else navigate('/home');
  }, []);

  useEffect(() => {
    if (booth?.dtype === 'STORE') {
      console.log(booth.menus);
    }
  }, [booth]);

  return (
    <div css={containerCss}>
      <header>
        <BtnBack onClick={() => navigate(-1)} />
        <h3>{booth?.name}</h3>
      </header>
      {booth && (
        <section>
          <div className='info'>
            <div className='left'>
              <Tag text={ categories.find(cat=>cat.id=== booth.categoryId)?.name} />
              {booth.summary && (
                <BoldParsedP text={booth.summary}></BoldParsedP>
              )}
            </div>
            <p>
              {`${booth.hour.open.locale('ko').format('MM/DD (dd) HH:mm')}~${booth.hour.close.format('HH:mm')}`}
            </p>
          </div>
          {booth.images && (
            <Gallery
              dotControl
              size='sqaure'
              onSlideClick={(key) => {
                console.log(key);
              }}
              images={booth?.images}
              id='gallery'
            />
          )}
          {booth.dtype === 'STORE' && (
            <div className='tab-wrapper'>
              <Button
                size='lg'
                variant={!showMenu ? 'primary' : 'secondary'}
                onClick={() => setShowMenu(false)}
              >
                소개
              </Button>
              <Button
                size='lg'
                variant={showMenu ? 'primary' : 'secondary'}
                onClick={() => setShowMenu(true)}
              >
                메뉴
              </Button>
            </div>
          )}
          {!showMenu ? (
            <article>
              {booth.description && (
                <BoldParsedP text={`${booth.description}`}></BoldParsedP>
              )}
              {booth.dtype === 'STOP' && booth.times && (
                <div className='bustable'>
                  <h6>배차 시간표</h6>
                  {booth.times.map((time, i) => (
                    <p>
                      {i + 1}. {time.format('HH:mm')}
                    </p>
                  ))}
                </div>
              )}
              <div className="booth-links">
                {booth.links?.map((link, i) => (
                  <Button
                    key={i}
                    size='lg'
                    variant='secondary'
                    text={link.label}
                    onClick={() => window.open(link.href)}
                  />
                ))}
              </div>
            </article>
          ) : (
            <div className='menu-list'>
              {booth.dtype === 'STORE' && booth.menus && booth.menus.length > 0
                ? booth.menus.map((menu) => (
                    <Card
                      key={menu.id}
                      title={menu.name}
                      imgUrl={menu.image}
                      desc={`${menu.price.toLocaleString()}원`}
                    />
                  ))
                : '등록된 메뉴가 없습니다.'}
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default BoothDetail;
