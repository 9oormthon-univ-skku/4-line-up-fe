import Marker from '@/components/Marker';
import { css } from '@emotion/react';
import { colors } from '@/styles/styles';
import { useRef } from 'react';
import MapDrawer from './mapDrawer/MapDrawer';
import {
  TransformComponent,
  TransformWrapper,
  type ReactZoomPanPinchRef,
} from 'react-zoom-pan-pinch';

const wrapperSt = {
  height: '100vh',
  width: '100%',
  backgroundColor: colors.primary10,
};
const contentSt = {
  height: '100%',
  width: '100%',
};

const MapPage = () => {
  const transformComponentRef = useRef<ReactZoomPanPinchRef | null>(null);
  const zoomTo = (elementId: string, scale?: number) => {
    if (!transformComponentRef.current) {
      return;
    }
    const { zoomToElement } = transformComponentRef.current;
    console.log('zoomTo', elementId);
    zoomToElement(elementId, scale ?? 3.0);
  };

  return (
    <TransformWrapper ref={transformComponentRef}>
      <TransformComponent wrapperStyle={wrapperSt} contentStyle={contentSt}>
        <Marker id='m1' onClick={() => zoomTo('m1', 1.5)} />
        <Marker id='m2' onClick={() => zoomTo('m2', 1.5)} selected />
      </TransformComponent>
      <MapDrawer>
        <div onClick={() => zoomTo('m1')}>Booth List Element 1</div>
        <div onClick={() => zoomTo('m2')}>Booth List Element 2</div>
        <div>Booth List Element 3</div>
      </MapDrawer>
    </TransformWrapper>
  );
};

export default MapPage;
