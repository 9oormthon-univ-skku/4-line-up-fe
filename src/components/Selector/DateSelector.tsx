import { colors, fonts, shadows } from '@/styles/styles';
import { css } from '@emotion/react';
import { useState } from 'react';

const containerCss = css`
  .switch-wrapper {
    display: flex;
    position: relative;
    width: 19.3rem;
    height: 3.8rem;
    border-radius: 100px;
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
    height: 3.8rem;
    width: 6.5rem;
    background-color: ${colors.primary};
    border-radius: 100px;
    border: 2px solid ${colors.primary20};
    transition: transform 0.2s ease-out;
    z-index: 5;
  }
  .left-position {
    transform: translateX(0);
  }
  .center-position {
    transform: translateX(6.4rem);
  }
  .right-position {
    transform: translateX(12.8rem);
  }

  .selected-font {
    color: ${colors.white} !important;
    font-weight: bold;
  }
`;

export type valueType = 'left' | 'center' | 'right';

interface TripleToggleSwitchProps {
  labels: {
    left: string;
    center: string;
    right: string;
  };
  onChange: (value: valueType) => void;
}

const DateSelector = ({ labels, onChange }: TripleToggleSwitchProps) => {
  const [switchPosition, setSwitchPosition] = useState<valueType>('left');

  const handleSwitchChange = (value: string) => {
    setSwitchPosition(value as valueType);
    onChange(value as valueType);
  };

  return (
    <div css={containerCss}>
      <div className='switch-wrapper'>
        <div className={`switch ${switchPosition}-position`}></div>
        <input
          defaultChecked
          onChange={(e) => handleSwitchChange(e.target.value)}
          name='map-switch'
          id='left'
          type='radio'
          value='left'
        />
        <label
          className={`left-label ${switchPosition === 'left' ? 'selected-font' : ''}`}
          htmlFor='left'
        >
          <h4>{labels.left}</h4>
        </label>

        <input
          onChange={(e) => handleSwitchChange(e.target.value)}
          name='map-switch'
          id='center'
          type='radio'
          value='center'
        />
        <label
          className={`center-label ${switchPosition === 'center' ? 'selected-font' : ''}`}
          htmlFor='center'
        >
          <h4>{labels.center}</h4>
        </label>

        <input
          onChange={(e) => handleSwitchChange(e.target.value)}
          name='map-switch'
          id='right'
          type='radio'
          value='right'
        />
        <label
          className={`right-label ${switchPosition === 'right' ? 'selected-font' : ''}`}
          htmlFor='right'
        >
          <h4>{labels.right}</h4>
        </label>
      </div>
    </div>
  );
};

export default DateSelector;
