import { colors, shadows } from '@/styles/styles';
import { css } from '@emotion/react';
import DefaultMarkerIcon from '@icons/marker-icon-default.svg?react';
import MarkerPin from '@icons/marker.svg?react';
import SvgInline from './icons/SvgInline';
import type { ComponentProps } from 'react';
import { KeepScale } from 'react-zoom-pan-pinch';
import type { Point } from '@/types/schema';

const markerCss = css`
  position: fixed;
  color: ${colors.primary};
  & > * {
    transform: translateY(-39.5px);
  }
  svg {
    ${shadows.dropBottom}
  }
  path {
    stroke: ${colors.primary20};
  }
  .markerIcon {
    width: 24px;
    position: absolute;
    left: 17px;
    top: 17px;
    path {
      stroke: ${colors.primary};
    }
  }
`;

const selectedCss = css`
  color: ${colors.primary20};
  path {
    stroke: ${colors.primary30} !important;
  }
`;

interface MarkerProps extends ComponentProps<'div'> {
  selected?: boolean;
  iconUrl?: string;
  point: Point;
  color?: string;
}

const Marker = ({
  selected = false,
  iconUrl,
  point,
  color,
  ...props
}: MarkerProps) => {
  return (
    <KeepScale
      onClick={props.onClick}
      css={[markerCss, selected && selectedCss]}
      style={{
        bottom: `${point.x}px`,
        left: `${point.y}px`,
        color: color ? color : '',
      }}
      {...props}
    >
      <MarkerPin />
      <SvgInline
        className='markerIcon'
        url={iconUrl}
        defaultSvg={<DefaultMarkerIcon />}
      />
    </KeepScale>
  );
};

export default Marker;
