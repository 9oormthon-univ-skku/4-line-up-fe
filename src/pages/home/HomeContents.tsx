import { colors, fonts } from '@/styles/styles';
import { css } from '@emotion/react';
import Arrow0 from '@images/arrow-bold-down.svg?react';
import Arrow1 from '@images/arrow-second.svg?react';

const contentsCss = css`
  width: 101%;
  height: 790px;
  border-radius: 215px 215px 0 0;
  border: 1px solid ${colors.white};
  border-bottom: 5px dashed ${colors.white};
  margin-top: 47px;
  padding: 20px;
  padding-top: 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .date-wrapper:nth-of-type(2n+1) {
    align-self: flex-end;
    right: 0;
  }
  .dayorder {
    ${fonts.title_lg}
  }
  .date {
    ${fonts.title_xlg}
  }
  .arrow {
    height: 0;
    position: relative;
    right: 20px;
    top: 30px;
  }
  .date-wrapper:nth-of-type(2n) .arrow{
    left: 80px;
    svg{
      -webkit-transform: scaleX(-1);
      transform: scaleX(-1);
    }
  }
  .date-wrapper:last-of-type .arrow{
    display: none;
  }
`;
interface HomeContentsProps {
  dateList: string[];
}
const HomeContents = ({ dateList }: HomeContentsProps) => {
  return (
    <>
      <div css={contentsCss}>
      <div
        css={css`
          position: relative;
          top: -140px;
          height: 0;
          text-align: center;
        `}
      >
        <Arrow0 />
      </div>
        {dateList.map((date, i) => {
          return (
            <div className='date-wrapper' key={i}>
              <div className='dayorder'>day{i + 1}</div>
              <div className='date'>{date}</div>
              <div className="arrow"><Arrow1/></div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default HomeContents;
