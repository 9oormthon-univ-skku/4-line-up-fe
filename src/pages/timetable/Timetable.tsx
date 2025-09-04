import { colors, fonts } from '@/styles/styles';
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import DateSelector, {
  type valueType,
} from '@/components/Selector/DateSelector';
import TimetableTable from './TimetableTable';
import { Link } from 'react-router-dom';
import type { Timeslot } from '@/types/schema';
import { getTimeSlots } from '@/api';
import dayjs, { Dayjs } from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { days } from '@/constants';
// import { timeslotData } from '@/api/mockData';

dayjs.extend(duration);

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

const valueIdx = {
  left: 0,
  right: 1,
  center: 2,
};
const hourRange = { start: 9, end: 21 }; // TODO: 응답 데이터 최대 최소 시각 동적으로 구하기

const filterTimslots = (timeslots: Timeslot[], date: Dayjs) => {
  console.log(`date: ${date?.format('MM/DD')} all timeslots:`, timeslots);
  return timeslots.filter((timeslot) => date.isSame(timeslot.startTime, 'day'));
};

const Timetable = () => {
  const [timeslots, setTimeslots] = useState<Timeslot[]>([]);
  const [currentTimeslots, setCurrentTimeslots] = useState<Timeslot[]>([]);
  const [currentDay, setCurrentDay] = useState<dayjs.Dayjs>(days[0]);
  const onDateChange = (value: string) => {
    // console.log(value);
    setCurrentDay(days.at(valueIdx[value as valueType]) ?? currentDay);
  };

  useEffect(() => {
    // setTimeslots(timeslotData); // Mockup data
    getTimeSlots(setTimeslots);

    if (
      dayjs().isBetween(days[0], days.at(-1), 'day', '[]') && // during fest and..
      days.some((day) => day.isSame(dayjs(), 'day')) // today exist in days
    ) {
      setCurrentDay(dayjs().startOf('date'));
      // if during festival, set default day with TODAY 00:00
      console.log('enjoy the festival!');
      // TODO: set selector props
    }
  }, []);

  useEffect(() => {
    console.log(currentDay.format('MMDD HHmm'));
    setCurrentTimeslots(filterTimslots(timeslots, currentDay));
  }, [currentDay, timeslots]);

  return (
    <div css={containerCss}>
      <header>
        <h1>Time Line</h1>
        <DateSelector onChange={onDateChange} />
        <h2>{currentDay?.format('MM.DD')}</h2>
      </header>
      <section>
        <TimetableTable
          rangeStartHour={hourRange.start}
          rangeEndHour={hourRange.end}
        >
          {currentTimeslots.map((timeslot, i) => {
            const startTime = timeslot.startTime;
            const endTime = timeslot.endTime;
            const top =
              Math.floor(
                dayjs
                  .duration({
                    hours: startTime.hour() - hourRange.start,
                    minutes: startTime.minute(),
                  })
                  .asMinutes() / 30
              ) / 2; // round to every 30mins
            const duration =
              Math.floor(
                dayjs.duration(endTime.diff(startTime)).asMinutes() / 30
              ) / 2;
            return (
              <Link
                css={itemCss}
                style={{
                  top: `${top * 44 - 2}px`,
                  height: `${duration * 44 + 2}px`,
                  left: i % 2 === 0 ? '0' : '50%',
                }}
                key={i}
                to={timeslot.href ?? ''}
              >
                {timeslot.name}
                <p>
                  {startTime.format('HH:mm')}~{endTime.format('HH:mm')}
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
