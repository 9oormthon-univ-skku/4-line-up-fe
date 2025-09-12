import { colors, shadows } from '@/styles/styles';
import { css } from '@emotion/react';
import DefaultMarkerIcon from '@icons/marker-icon-default.svg?react';
import MarkerPin from '@icons/marker.svg?react';
import SvgInline from './icons/SvgInline';
import type { ComponentProps } from 'react';
import { KeepScale } from 'react-zoom-pan-pinch';
import type { Point } from '@/types/schema';
import MarkerIcon from './icons/MarkerIcon';

const markerCss = css`
  position: fixed;
  height: 1px;
  width: 1px;
  color: ${colors.primary};
  & > * {
    transform: translate(-27px, -67px) scale(0.85);
  }
  & > svg {
    ${shadows.dropBottom}
  }
  path {
    stroke: ${colors.primary30};
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
  z-index: 5;
  color: ${colors.primary20};
  svg * {
    stroke: ${colors.primary30} !important;
  }
`;

interface MarkerProps extends ComponentProps<'div'> {
  selected?: boolean;
  iconUrl?: string;
  point: Point;
  color?: string;
  categoryId?: number;
  onPinClicked: ()=>void;
}

const Marker = ({
  selected = false,
  iconUrl,
  point,
  color,
  categoryId,
  onPinClicked,
  ...props
}: MarkerProps) => {
  return (
    <KeepScale
      css={[markerCss, selected && selectedCss]}
      style={{
        bottom: `${point.y}px`,
        left: `${point.x}px`,
        // color: color ? color : '',
      }}
      onClick={(e)=>e.preventDefault()}
      {...props}
    >
      <MarkerPin onClick={onPinClicked} />
      {iconUrl ? (
        <SvgInline
          className='markerIcon'
          url={iconUrl}
          defaultSvg={<DefaultMarkerIcon />}
        />
      ) : (
        <MarkerIcon className='markerIcon' categoryId={categoryId} onClick={onPinClicked}/>
      )}
    </KeepScale>
  );
};

export default Marker;
