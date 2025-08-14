import StarSm from '@icons/star-sm.svg?react';
import StarMd from '@icons/star-md.svg?react';
import { css } from '@emotion/react';
import { colors, shadows } from '@/styles/styles';
import { useEffect, useRef } from 'react';

interface StarProps {
  size?: 'md' | 'sm';
  color?: 'primary' | 'secondary';
}

const starCss = css`
  color: ${colors.primary20};
  ${shadows.dropBottom};
  flex-shrink: 0;
  `;
const starSecondaryCss = css`
  color: ${colors.white};
  ${shadows.dropBottom};
`;

const hexToRgb = (hex: string) => {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return m
    ? [
        parseInt(m[1], 16) / 255,
        parseInt(m[2], 16) / 255,
        parseInt(m[3], 16) / 255,
      ]
    : null;
};

const hexToMatix = (hex: string) => {
  const rgb = hexToRgb(hex);
  if (!rgb) throw new Error('Invalid color');
  const [r, g, b] = rgb;
  return [0, 0, 0, 0, r, 0, 0, 0, 0, g, 0, 0, 0, 0, b, 0, 0, 0, 1, 0].join(' ');
};

const Star = ({ size = 'md', color = 'primary' }: StarProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const innerShadowColor =
    color === 'primary' ? colors.primary30 : colors.primary20;

  useEffect(() => {
    if (!svgRef.current) return;
    const matrixEl = svgRef.current.querySelectorAll('feColorMatrix')[1];
    if (matrixEl) {
      matrixEl.setAttribute('values', hexToMatix(innerShadowColor));
      console.log(matrixEl.attributes);
    }
  }, [color]);

  return size === 'md' ? (
    <StarMd
      css={color === 'primary' ? starCss : starSecondaryCss}
      ref={svgRef}
    />
  ) : (
    <StarSm
      css={color === 'primary' ? starCss : starSecondaryCss}
      ref={svgRef}
    />
  );
};

export default Star;
