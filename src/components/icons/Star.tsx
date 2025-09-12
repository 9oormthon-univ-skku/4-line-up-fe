import StarSm from '@icons/star-sm.svg?react';
import StarMd from '@icons/star-md.svg?react';
import { css } from '@emotion/react';
import { colors, shadows } from '@/styles/styles';
import { useEffect, useRef } from 'react';
import { hexToMatix } from '@/utils';

interface StarProps {
  size?: 'md' | 'sm';
  color?: 'primary' | 'secondary';
}

const starCss = css`
  will-change: filter;
  color: ${colors.primary20};
  ${shadows.dropBottom};
  flex-shrink: 0;
  `;
const starSecondaryCss = css`
  color: ${colors.white};
  ${shadows.dropBottom};
`;

const Star = ({ size = 'md', color = 'primary' }: StarProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const innerShadowColor =
    color === 'primary' ? colors.primary30 : colors.primary20;

  useEffect(() => {
    if (!svgRef.current) return;
    const matrixEl = svgRef.current.querySelectorAll('feColorMatrix')[1];
    if (matrixEl) {
      matrixEl.setAttribute('values', hexToMatix(innerShadowColor));
      // console.log(matrixEl.attributes);
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
