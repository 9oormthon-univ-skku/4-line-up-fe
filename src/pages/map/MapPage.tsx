import Marker from '@/components/Marker';
import { css } from '@emotion/react';
import MapDrawer from './mapDrawer/MapDrawer';

const MapPage = () => {
  return (
    <div css={css``}>
      <Marker />
      <Marker selected />
      <MapDrawer>
        <div>Booth List Element 1</div>
        <div>Booth List Element 2</div>
        <div>Booth List Element 3</div>
      </MapDrawer>
    </div>
  );
};

export default MapPage;
