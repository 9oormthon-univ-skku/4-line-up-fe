import { colors, shadows } from '@/styles/styles';
import { css } from '@emotion/react';
import DefaultMarkerIcon from '@icons/marker-icon-default.svg?react';
import MarkerPin from '@icons/marker.svg?react';
import SvgInline from './SvgInline';
import type { ComponentProps } from 'react';

const markerCss = css`
  width: fit-content;
  height: fit-content;
  color: ${colors.primary};
  ${shadows.dropBottom}
  path {
    stroke: ${colors.primary20};
  }
  img {
}
div {
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
}

const Marker = ({ selected = false, iconUrl, ...props }: MarkerProps) => {
  return (
    <div id={props.id} onClick={props.onClick} css={[markerCss, selected && selectedCss]}>
      <MarkerPin />
      {iconUrl ? (
        <SvgInline url={iconUrl} />
      ) : (
        <div>
          <DefaultMarkerIcon />
        </div>
      )}
    </div>
  );
};

export default Marker;
