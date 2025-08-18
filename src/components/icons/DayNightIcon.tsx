import { colors, shadows } from '@/styles/styles';
import { hexToMatix } from '@/utils';
import { css } from '@emotion/react';
import Day from '@icons/day.svg?react';
import Night from '@icons/night.svg?react';
import { useEffect, useRef } from 'react';

interface DayNightProps {
  value: 'day' | 'night';
}

const iconCss = css`
  circle {
    color: ${colors.primary};
    stroke: ${colors.primary20};
  }
  width: 5rem;
  height: 5rem;
  ${shadows.dropCenter};
  flex-shrink: 0;
`;

const DayNightIcon = ({ value }: DayNightProps) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const matrixEl = svgRef.current.querySelectorAll('feColorMatrix');
    matrixEl.forEach((e) => {
      if (e.hasAttribute('in') === false) {
        e.setAttribute('values', hexToMatix(colors.primary20));
      }
    });
  }, [value]);

  return value === 'day' ? (
    <Day css={iconCss} ref={svgRef} />
  ) : (
    <Night css={iconCss} ref={svgRef} />
  );
};

export default DayNightIcon;
