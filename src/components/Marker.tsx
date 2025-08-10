import { colors, shadows } from '@/styles/styles';
import { css } from '@emotion/react';
import DefaultMarkerIcon from '@icons/marker-icon-default.svg?react';
import MarkerPin from '@icons/marker.svg?react';

const markerCss = css`
  color: ${colors.primary};
  ${shadows.dropBottom}
  path {
    stroke: ${colors.primary20};
  }
  img {
    width: 24px;
  }
  div {
    position: absolute;
    left: 17px;
    top: 17px;
  }
`;

const selectedCss = css`
  color: ${colors.primary20};
  path {
    stroke: ${colors.primary30};
  }
`;

interface MarkerProps {
  selected?: boolean;
  iconUrl?: string;
}

const Marker = ({ selected = false, iconUrl }: MarkerProps) => {
  return (
    <div css={[markerCss, selected && selectedCss]}>
      <MarkerPin />
      <div>
        <DefaultMarkerIcon />
      </div>
    </div>
  );
};

export default Marker;
