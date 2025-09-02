import { colors, fonts } from '@/styles/styles';
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import DateSelector, {
  type valueType,
} from '@/components/Selector/DateSelector';
import TimetableTable from './TimetableTable';
import { Link } from 'react-router-dom';
// import { timeslotData } from '@/api/mockData';
import type { Timeslot } from '@/types/schema';
import { getTimeSlots } from '@/api';

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


const dateLabels = {
  left: '9/11',
  center: '9/11',
  right: '9/12',
};
const hourRange = { start: 9, end: 21 }; // TODO: 응답 데이터 최대 최소 시각 동적으로 구하기

/**
 * @returns 0 | 0.5 | -0.5
 */
const getHalfHours = (date: Date, secondDate?: Date): number => {
  if (secondDate) {
    return getHalfHours(date) - getHalfHours(secondDate);
  } else {
    return date.getMinutes() < 30 ? 0 : 0.5;
  }
};
const gethhmm = (date: Date): string => {
  // return `${date.getHours().toString().padStart(2, '0')}:${getHalfHours(date)===0 ? '00':'30'}`
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
}

const Timetable = () => {
  const [currentDateLabel, setCurrentDateLabel] = useState<string>('9/11');
  const onDateChange = (value: valueType) => {
    console.log(value);
    setCurrentDateLabel(dateLabels[value]);
  };
  const [timeslots, setTimeslots] = useState<Timeslot[]>([])

  useEffect(() => {
      // setTimeslots(timeslotData); // Mockup data
      getTimeSlots(setTimeslots);
    }, []);
  return (
    <div css={containerCss}>
      <header>
        <h1>Time Line</h1>
        <DateSelector labels={dateLabels} onChange={onDateChange} />
        <h2>
          {currentDateLabel
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
          {timeslots.map((timeslot, i) => {
            const startTime = new Date(timeslot.startTime);
            const endTime = new Date(timeslot.endTime);
            const top =
              startTime.getHours() - hourRange.start + getHalfHours(startTime);
            const duration =
              endTime.getHours() -
              startTime.getHours() +
              getHalfHours(endTime, startTime);
            return (
              <Link
                css={itemCss}
                style={{
                  top: `${top * 44 - 2}px`,
                  height: `${duration * 44 + 2}px`,
                  left: i%2===0 ? '0' : '50%',
                }}
                key={i}
                to={timeslot.href ?? ''}
              >
                {timeslot.name}
                <p>
                  {gethhmm(startTime)}~{gethhmm(endTime)}
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
