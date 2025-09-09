import { days } from '@/constants';
import { colors, fonts, shadows } from '@/styles/styles';
import { css } from '@emotion/react';
import { useState, useRef, useEffect } from 'react';

const containerCss = css`
  & {
    width: fit-content;
  }
  .switch-wrapper {
    display: flex;
    position: relative;
    height: 3.8rem;
    border-radius: 100px;
    background-color: ${colors.white};
    border: 2px solid ${colors.primary20};
    ${shadows.dropBottom};
  }

  label {
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${colors.primary20};
    z-index: 10;
    cursor: pointer;
    height: 100%;
    transition: color 0.3s ease;
    padding: 0 1rem;
    white-space: nowrap;
  }

  input[type='radio'] {
    display: none;
  }

  h4 {
    line-height: 0;
    user-select: none;
    ${fonts.display_xlg};
  }

  .switch {
    position: absolute;
    top: -2px;
    left: -2px;
    height: 3.8rem;
    background-color: ${colors.primary};
    border-radius: 100px;
    border: 2px solid ${colors.primary20};
    transition:
      transform 0.2s ease-out,
      width 0.2s ease-out;
    z-index: 5;
  }

  .selected-font {
    color: ${colors.white} !important;
    font-weight: bold;
  }
`;

export type valueType = 'left' | 'center' | 'right';
export type LabelsType = {
  left: string;
  center?: string;
  right: string;
};
export const valueIdx = {
  left: 0,
  right: 1,
  center: 2,
};

interface TripleToggleSwitchProps {
  labels?: LabelsType;
  defaultValue?: valueType;
  onChange: (value: valueType) => void;
}

const dateLabels: LabelsType = {
  left: days[0].format('M/D'),
  right: days[1].format('M/D'),
  center: days.at(2)?.format('M/D'),
};

const DateSelector = ({
  labels = dateLabels,
  defaultValue,
  onChange,
}: TripleToggleSwitchProps) => {
  const [switchPosition, setSwitchPosition] = useState<valueType>('left');
  const [switchStyles, setSwitchStyles] = useState({ width: 0, transform: 0 });

  const labelRefs = useRef<{
    [key in keyof LabelsType]?: HTMLLabelElement | null;
  }>({});

  const handleSwitchChange = (value: string) => {
    // console.log("value: ",value)
    setSwitchPosition(value as valueType);
    onChange(value as valueType);
  };

  useEffect(() => {
    // console.log("defaultvalue: ",defaultValue)
    if(defaultValue){
      handleSwitchChange(defaultValue);
    }
  }, [defaultValue]);

  useEffect(() => {
    const selectedLabel = labelRefs.current[switchPosition];
    const borderCorrection = 2;
    if (selectedLabel) {
      setSwitchStyles({
        width: selectedLabel.offsetWidth,
        transform: selectedLabel.offsetLeft + borderCorrection,
      });
    }
  }, [switchPosition]);

  const labelKeys = Object.keys(labels) as (keyof LabelsType)[];

  return (
    <div css={containerCss}>
      <div className='switch-wrapper'>
        <div
          className='switch'
          style={{
            width: `${switchStyles.width}px`,
            transform: `translateX(${switchStyles.transform}px)`,
          }}
        ></div>

        {labelKeys
          .filter((key) => labels[key])
          .map((key) => (
            <label
              key={key}
              ref={(el) => {
                labelRefs.current[key] = el;
              }}
              className={`${switchPosition === key ? 'selected-font' : ''}`}
              htmlFor={key}
            >
              <input
                defaultChecked={key === defaultValue}
                onChange={(e) => handleSwitchChange(e.target.value)}
                name='date-switch'
                id={key}
                type='radio'
                value={key}
              />
              <h4>{labels[key]}</h4>
            </label>
          ))}
      </div>
    </div>
  );
};

export default DateSelector;
