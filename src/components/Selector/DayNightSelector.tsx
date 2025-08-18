import { colors, fonts, shadows } from '@/styles/styles';
import { css } from '@emotion/react';
import { useState } from 'react';
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

    label {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${colors.primary20};
      z-index: 10;
      cursor: pointer;
      height: 100%;
      transition: color 0.3s ease;
    }
  }

  input[type='radio'] {
    display: none;
  }

  h4 {
    line-height: 0;
    user-select: none;
    ${fonts.display_xlg};
  }

  /*
 * 실제 움직이는 스위치 부분
 */
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

  .selected-font {
    color: ${colors.white} !important;
    font-weight: bold;
  }
`;

type valueType = 'day' | 'night';

interface TripleToggleSwitchProps {
  onChange: (value: valueType) => void;
}

const DayNightSelector = ({ onChange }: TripleToggleSwitchProps) => {
  const [switchPosition, setSwitchPosition] = useState<valueType>('day');

  const handleSwitchChange = (value: string) => {
    setSwitchPosition(value as valueType);
    onChange(value as valueType);
  };

  return (
    <div css={containerCss}>
      <div className='switch-wrapper'>
        <div className={`switch ${switchPosition}-position`}>
          <DayNightIcon value={switchPosition} />
        </div>
        <input
          defaultChecked
          onChange={(e) => handleSwitchChange(e.target.value)}
          name='map-switch'
          id='day'
          type='radio'
          value='day'
        />
        <label
          className={`day-label ${switchPosition === 'day' ? 'selected-font' : ''}`}
          htmlFor='day'
        >
        </label>

        <input
          onChange={(e) => handleSwitchChange(e.target.value)}
          name='map-switch'
          id='night'
          type='radio'
          value='night'
        />
        <label
          className={`night-label ${switchPosition === 'night' ? 'selected-font' : ''}`}
          htmlFor='night'
        >
          
        </label>
      </div>
    </div>
  );
};

export default DayNightSelector;
