import { colors, fonts, shadows } from '@/styles/styles';
import { css } from '@emotion/react';
import { useState } from 'react';
import type { Timeslot } from '@/types/schema';
import DateSelector, {
  type valueType,
} from '@/components/Selector/DateSelector';
import TimetableTable from './TimetableTable';
import { Link } from 'react-router-dom';

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
    padding: 54px 0 0 26px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    ${fonts.title_lg};
    h2 {
      ${fonts.title_xlg};
      margin-top: 36px;
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
`;

const itemCss = css`
  position: absolute;
  width: 30%;
  background-color: ${colors.primary};
  color: ${colors.white};
  border: 2px solid ${colors.primary20};
  border-radius: 10px;
  padding: 2px 4px;
  ${fonts.label_sm};
  p {
    ${fonts.label_xsm};
    opacity: 80%;
  }
`;

const Timeslots: Timeslot[] = [
  {
    id: 0,
    name: 'name',
    startTime: '2025-05-07T13:00:00',
    endTime: '2025-05-07T15:00:00',
  },
  {
    id: 1,
    name: 'name',
    startTime: '2025-05-07T16:00:00',
    endTime: '2025-05-07T20:00:00',
    href: 'https://instagram.com/',
  },
];
const dateLabels = {
  left: '5/7',
  center: '5/8',
  right: '12/25',
};
const hourRange = { start: 9, end: 21 }; // TODO: 응답 데이터 최대 최소 시각 동적으로 구하기

const Timetable = () => {
  const [currentDateValue, setCurrentDateValue] = useState<valueType>('left');
  const onDateChange = (value: valueType) => {
    console.log(value);
    setCurrentDateValue(value);
  };
  return (
    <div css={containerCss}>
      <header>
        <h1>Time Line</h1>
        <DateSelector labels={dateLabels} onChange={onDateChange} />
        <h2>
          {dateLabels[currentDateValue]
            .split('/')
            .map((e) => e.padStart(2, '0'))
            .join('.')}
        </h2>
      </header>
      <section>
        <TimetableTable
          rangeStartHour={hourRange.start}
          rangeEndHour={hourRange.end}
        >
          {Timeslots.map((timeslot, i) => {
            const startTime = new Date(timeslot.startTime);
            const endTime = new Date(timeslot.endTime);
            const top = startTime.getHours() - hourRange.start;
            const duration = endTime.getHours() - startTime.getHours();
            return (
              <Link
                css={itemCss}
                style={{
                  top: `${top * 44 - 2}px`,
                  height: `${duration * 44 + 2}px`,
                }}
                key={i}
                to={timeslot.href ?? ''}
              >
                {timeslot.name}
                <p>
                  {startTime.getHours()}:00~{endTime.getHours()}:00
                </p>
              </Link>
            );
          })}
        </TimetableTable>
      </section>
    </div>
  );
};

export default Timetable;
