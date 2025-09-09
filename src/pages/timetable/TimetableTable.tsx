import { colors, fonts, shadows } from '@/styles/styles';
import { css } from '@emotion/react';
import type { ComponentProps } from 'react';

const tableCss = css`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: ${colors.white};
  border-radius: 16px;
  border: 2px solid ${colors.primary20};
  ${shadows.dropBottom};
  .hour-line {
    ${fonts.display_xlg};
    line-height: 2.4rem;
    color: ${colors.black};
    display: flex;

    border-bottom: 2px solid ${colors.primary20};
    div:first-of-type {
      background-color: ${colors.primary20};
      width: 8.4rem;
      text-align: center;
      padding: 9px 0;
    }
    &:last-child {
      border-bottom: none;
    }
    .inner-line {
      border-bottom: 2px dotted ${colors.primary20};
      flex-grow: 1;
      margin-bottom: calc(1.2rem + 8px); // calc((2.4rem + 18px - 2px) / 2);
    }
  }
  .item-wrapper {
    position: absolute;
    height: 100%;
    width: 100%;
    /* width: calc(100% - 8.4rem - 8px); */
    /* right: 0; */
    display: flex;
    .column-place {
      width: 8.4rem;
    }
    .items {
      position: relative;
      flex-grow: 1;
      margin: 0 8px;
    }
  }
  // calc(2.4rem + 20px) per line
`;

interface TimetableTableProps extends ComponentProps<'div'> {
  rangeStartHour?: number;
  rangeEndHour?: number;
}

const TimetableTable = ({
  rangeStartHour = 11,
  rangeEndHour = 21,
  children,
  ...props
}: TimetableTableProps) => {
  const hourList = [...Array(25).keys()]
    .map((e) => `${e.toString().padStart(2, '0')}:00`)
    .slice(rangeStartHour, rangeEndHour);
  return (
    <div css={tableCss} {...props}>
      {hourList.map((e, i) => (
        <div className='hour-line' key={i}>
          <div>{e}</div>
          <div className='inner-line'></div>
        </div>
      ))}
      <div className='item-wrapper'>
        <div className='column-place' />
        <div className='items'>{children}</div>
      </div>
    </div>
  );
};

export default TimetableTable;
