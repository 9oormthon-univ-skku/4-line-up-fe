import { fonts, shadows } from '@/styles/styles';
import type { Hour } from '@/types/schema';
import { css } from '@emotion/react';
import type { Dayjs } from 'dayjs';
import { useState, useEffect, type ComponentProps } from 'react';

const containerCss = css`
  position: relative;

  select {
    appearance: none;
    padding: 1rem;
    padding-left: 4rem;
    width: calc(100% - 6rem);
    border-radius: 10px;
    border: none;
    ${shadows.dropBottom};
    ${fonts.label_sm}
  }

  &::after {
    content: url('data:image/svg+xml;utf8,<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.18031 8.21071C4.43214 7.9421 4.85403 7.9285 5.12263 8.18031L10 12.7529L14.8773 8.18031C15.146 7.9285 15.5679 7.9421 15.8197 8.21071C16.0715 8.47932 16.0579 8.90122 15.7893 9.15303L10.456 14.1531C10.1995 14.3935 9.80048 14.3935 9.54404 14.1531L4.21071 9.15303C3.9421 8.90122 3.9285 8.47932 4.18031 8.21071Z" fill="black"/></svg>');
    position: absolute;
    top: 50%;
    left: 12px;
    transform: translateY(-50%);
    pointer-events: none;
  }
  select:focus {
    outline: none;
  }
`;

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
    if (hours.length === 0) return;
    setCurrent(hours[selected]);
  }, [selected]);

  return (
    <div css={containerCss}>
      <select
        value={selected}
        onChange={(e) => setSelected(Number(e.target.value))}
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
    </div>
  );
};

export default DropdownSelector;
