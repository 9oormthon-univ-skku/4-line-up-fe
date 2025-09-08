import { getBooths } from '@/api';
import Gallery from '@/components/Gallery';
import BtnBack from '@/components/icons/BtnBack';
import { colors, fonts } from '@/styles/styles';
import type { Booth } from '@/types/schema';
import { css } from '@emotion/react';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'dayjs/locale/ko';
import Button from '@/components/Button';
import Star from '@/components/icons/Star';
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
    background-color: ${colors.white};
    color: ${colors.gray40};
    border: 2px solid ${colors.primary20};
    border-radius: 14px;
    ${fonts.desc_md};
    h3 {
      ${fonts.desc_lg};
    }
  }
  .button-wrapper {
    display: flex;
    gap: 16px;
    padding: 0 24px;
  }
`;

const BoothDetail = () => {
  const [booths, setBooths] = useState<Booth[]>([]);
  const [booth, setBooth] = useState<Booth>();

  const param = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getBooths(setBooths);
  }, []);
  useEffect(() => {
    setBooth(booths.find((e) => e.id === Number(param.boothId)));
  }, [booths]);

  return (
    <div css={containerCss}>
      <BtnBack onClick={() => navigate(-1)} />
      {booth && (
        <section>
          {booth.images && (
            <Gallery
              onSlideClick={(key) => {
                console.log(key);
              }}
              images={booth?.images}
              id='gallery'
            />
          )}
          <article>
            <h3>{booth.name}</h3>
            <p>{booth.category.name}</p>
            <p>
              {`
운영 시간: ${booth.hour.open.format('dd HH:mm')}~${booth.hour.close.format('HH:mm')}
한줄 소개: ${booth.summary}

${booth.description}`}
            </p>
          </article>
          <div className='button-wrapper'>
            <Star />
            {booth.links?.map((link) => (
              <Button
                size='lg'
                text={link.label}
                onClick={() => window.open(link.href)}
              />
            ))}
            <Star />
          </div>
        </section>
      )}
    </div>
  );
};

export default BoothDetail;
