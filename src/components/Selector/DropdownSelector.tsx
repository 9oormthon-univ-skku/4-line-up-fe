// import { days } from '@/constants';
// import { colors, fonts, shadows } from '@/styles/styles';
import type { Hour } from '@/types/schema';
import { css } from '@emotion/react';
import type { Dayjs } from 'dayjs';
import { useState, useEffect, type ComponentProps } from 'react';

const containerCss = css``;

interface DropdownProps extends ComponentProps<'select'> {
  days: Dayjs[];
  defaultValue?: string;
  dayNightBoundary: number;
  setCurrent: React.Dispatch<React.SetStateAction<Hour>>;
}

const DropdownSelector = ({
  days,
  defaultValue,
  dayNightBoundary,
  setCurrent,
  ...props
}: DropdownProps) => {
  const [selected, setSelected] = useState(0);
  const [hours, setHours] = useState<Hour[]>([]);

  useEffect(() => {
    setHours(
      days.flatMap((day) => {
        return [
          { open: day, close: day.add(dayNightBoundary, 'h') },
          { open: day.add(dayNightBoundary, 'h'), close: day.add(24, 'h') },
        ];
      })
    );
  }, [days]);

  useEffect(() => {
    if(hours.length === 0) return;
    setCurrent(hours[selected]);
  }, [selected]);

  return (
    <select
      value={selected}
      onChange={(e) => setSelected(Number(e.target.value))}
      css={containerCss}
      {...props}
    >
      {days.map((day, i) => (
        <>
          <option value={i * 2}>
            {day.format('MM/DD 주간 (09:00 - 18:00)')}
          </option>
          <option value={i * 2 + 1}>
            {day.format('MM/DD 야간 (18:00 - 24:00)')}
          </option>
        </>
      ))}
    </select>
  );
};

export default DropdownSelector;
