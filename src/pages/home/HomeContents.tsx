import { colors, fonts } from '@/styles/styles';
import { css } from '@emotion/react';
import Arrow0 from '@images/arrow-bold-down.svg?react';
import Arrow1 from '@images/arrow-first.svg?react';
import Arrow2 from '@images/arrow-second.svg?react';

const contentsCss = css`
  width: 101%;
  height: 790px;
  border-radius: 215px 215px 0 0;
  border: 1px solid ${colors.white};
  border-bottom: 5px dashed ${colors.white};
  margin-top: 47px;
  * {
    position: relative;
  }
  .dayorder {
    ${fonts.title_lg}
  }
  .date {
    ${fonts.title_xlg}
  }
`;

const HomeContents = () => {
  return (
    <div css={contentsCss}>
      <div
        css={css`
          width: 100%;
          bottom: 88px;
          text-align: center;
        `}
      >
        <Arrow0 />
      </div>
      <div
        className='dayorder'
        style={{
          bottom: '47px',
          left: '27px',
        }}
      >
        DAY1
      </div>
      <div
        className='date'
        style={{
          bottom: '47px',
          left: '27px',
        }}
      >
        05.07
      </div>
      <Arrow1 style={{ bottom: '47px', left: '70px' }} />
      <div
        className='dayorder'
        style={{
          bottom: '109px',
          left: '239px',
        }}
      >
        DAY1
      </div>
      <div
        className='date'
        style={{
          bottom: '109px',
          left: '247px',
        }}
      >
        07
      </div>
      <Arrow2
        style={{
          bottom: '109px',
          left: '169px',
        }}
      />
      <div
        className='dayorder'
        style={{
          bottom: '146px',
          left: '27px',
        }}
      >
        DAY1
      </div>
      <div
        className='date'
        style={{
          bottom: '146px',
          left: '27px',
        }}
      >
        05.07
      </div>
    </div>
  );
};

export default HomeContents;
