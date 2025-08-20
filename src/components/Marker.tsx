import { colors, shadows } from '@/styles/styles';
import { css } from '@emotion/react';
import DefaultMarkerIcon from '@icons/marker-icon-default.svg?react';
import MarkerPin from '@icons/marker.svg?react';
import SvgInline from './icons/SvgInline';
import type { ComponentProps } from 'react';
import { KeepScale } from 'react-zoom-pan-pinch';

const markerCss = css`
  position: fixed;
  transform: translateX(-29px);
  color: ${colors.primary};
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
  y?: number;
  x?: number;
  color?: string;
}

const Marker = ({
  selected = false,
  iconUrl,
  y: bottomPx = 0,
  x: leftPx = 0,
  color,
  ...props
}: MarkerProps) => {
  return (
    <div
      onClick={props.onClick}
      css={[markerCss, selected && selectedCss]}
      style={{ bottom: `${bottomPx}px`, left: `${leftPx}px`, color: color ? color : '' }}
      {...props}
    >
      <KeepScale>
        <MarkerPin />
        <SvgInline
          className='markerIcon'
          url={iconUrl}
          defaultSvg={<DefaultMarkerIcon />}
        />
      </KeepScale>
    </div>
  );
};

export default Marker;
