import { getBooths } from '@/api';
import Gallery from '@/components/Gallery';
import BtnBack from '@/components/icons/BtnBack';
import { colors, fonts, shadows } from '@/styles/styles';
import type { Booth } from '@/types/schema';
import { css } from '@emotion/react';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'dayjs/locale/ko';
import Button from '@/components/Button';
import Star from '@/components/icons/Star';
import Card from '@/components/Card';
import { BoldParsedP } from '@/components/BoldParsedP';
// import { boothsData } from '@/api/mockData';
dayjs.locale('ko');

const containerCss = css`
  min-height: 100%;
  overflow-y: scroll;
  background-color: ${colors.primary10};

  display: flex;
  flex-direction: column;
  gap: 22px;
  & > button {
    margin: 5.8rem auto 0px 26px;
  }

  section {
    ${shadows.dropUp};
    background-color: ${colors.primary};
    border-radius: 14px 14px 0 0;
    padding: 24px;
    overflow-x: hidden;
    flex-grow: 1;

    display: flex;
    flex-direction: column;

    gap: 24px;
  }
  article {
    flex-grow: 1;
    padding: 20px;
    padding-bottom: 36px;
    display: flex;
    flex-direction: column;
    gap: 8px;

    background-color: ${colors.white};
    color: ${colors.gray40};
    border: 2px solid ${colors.primary20};
    border-radius: 14px;
    ${fonts.desc_md};
    h3 {
      ${fonts.desc_lg};
    }
    b {
      font-weight: bolder;
    }
  }
  .star-wrapper {
    display: flex;
    gap: 16px;
    justify-content: center;
    align-items: center;
    padding: 0 24px;

    h4 {
      ${fonts.title_lg};
      color: ${colors.white};
      text-align: center;
      flex-grow: 1;
    }
  }
  .store-content {
    display: flex;
    flex-direction: column;
    gap: 28px;
    margin-top: 60px;
    border-top: 5px dashed ${colors.white};
    padding-top: 40px;
  }
  .menu-list {
    display: flex;
    flex-direction: column;
    gap: 10px;

    div {
      background-color: ${colors.primary10};
    }
    .card-title {
      color: ${colors.black};
    }
  }
  .btn-wrapper {
    display: flex;
    gap: 14px;
  }
`;

const BoothDetail = () => {
  const [booths, setBooths] = useState<Booth[]>([]);
  const [booth, setBooth] = useState<Booth>();

  const param = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // setBooths(boothsData); // Mockup Data
    getBooths(setBooths);
  }, []);
  useEffect(() => {
    if (booths.length > 0) {
      const found = booths.find((e) => e.id === Number(param.boothId));
      console.log('found:', found, booths, Number(param.boothId));
      if (found) {
        setBooth(found);
      } else {
        // Not Found
        navigate('/home');
      }
    }
  }, [booths]);

  useEffect(() => {
    if (booth?.dtype === 'store') {
      console.log(booth.menus);
    }
  }, [booth]);

  return (
    <div css={containerCss}>
      <BtnBack onClick={() => navigate(-1)} />
      {booth && (
        <section>
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
          <article>
            <h3>{booth.name}</h3>
            <p
              css={css`
                color: ${colors.primary30};
              `}
            >
              {booth.category.name}
            </p>
            <p>
              {`${booth.hour.open.format('dd요일 운영시간: HH:mm')}~${booth.hour.close.format('HH:mm')}`}
              {booth.summary && `\n한줄 소개: ${booth.summary}`}
            </p>
            {booth.description && (
              <BoldParsedP text={`${booth.description}`}></BoldParsedP>
            )}
          </article>
          {booth.dtype === 'store' ? (
            <div className='store-content'>
              <div className='star-wrapper'>
                <Star />
                <h4>Menu</h4>
                <Star />
              </div>
              <article className='menu-list'>
                {booth.menus && booth.menus.length > 0
                  ? booth.menus.map((menu) => (
                      <Card
                        key={menu.id}
                        title={menu.name}
                        imgUrl={menu.image}
                        desc={`${menu.price.toLocaleString()}원`}
                      />
                    ))
                  : '등록된 메뉴가 없습니다.'}
              </article>
              <div className='btn-wrapper'>
                {booth.links?.map((link, i) => (
                  <Button
                    key={i}
                    size='lg'
                    text={link.label}
                    onClick={() => window.open(link.href)}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className='star-wrapper'>
              <Star />
              {booth.links?.map((link, i) => (
                <Button
                  key={i}
                  size='lg'
                  text={link.label}
                  onClick={() => window.open(link.href)}
                />
              ))}
              {booth.links && booth.links.length > 0 && <Star />}
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default BoothDetail;
