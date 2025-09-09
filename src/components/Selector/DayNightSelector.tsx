import { colors, shadows } from '@/styles/styles';
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import DayNightIcon from '../icons/DayNightIcon';

const containerCss = css`
  .switch-wrapper {
    display: flex;
    position: relative;
    width: 10rem;
    height: 5rem;
    border-radius: 1000px;
    background-color: ${colors.white};
    border: 2px solid ${colors.primary20};
    ${shadows.dropBottom};
    cursor: pointer;
    overflow: hidden;
  }

  .switch {
    position: absolute;
    top: -2px;
    left: -2px;
    transition: transform 0.2s ease-out;
    z-index: 5;
  }
  .day-position {
    transform: translateX(0);
  }
  .night-position {
    transform: translateX(5.2rem);
  }
`;

type valueType = 'day' | 'night';

interface ToggleSwitchProps {
  onChange: (value: valueType) => void;
}

const DayNightSelector = ({ onChange }: ToggleSwitchProps) => {
  const [switchPosition, setSwitchPosition] = useState<valueType>('day');

  const handleToggle = () => {
    setSwitchPosition(switchPosition === 'day' ? 'night' : 'day');
  };

  useEffect(() => {
    onChange(switchPosition);
  }, [switchPosition]);

  return (
    <div css={containerCss}>
      <div
        className='switch-wrapper'
        onClick={handleToggle}
        role='switch'
        aria-checked={switchPosition === 'day' ? 'true' : 'false'}
        aria-label={`day night selector, ${switchPosition}`}
      >
        <div className={`switch ${switchPosition}-position`}>
          <DayNightIcon value={switchPosition} />
        </div>
      </div>
    </div>
  );
};

export default DayNightSelector;
