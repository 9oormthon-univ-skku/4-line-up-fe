import Marker from '@/components/Marker';
import { css } from '@emotion/react';
import { colors } from '@/styles/styles';
import { useRef } from 'react';
import MapDrawer from './mapDrawer/MapDrawer';
import {
  TransformComponent,
  TransformWrapper,
  useTransformComponent,
  type ReactZoomPanPinchRef,
  type ReactZoomPanPinchState,
} from 'react-zoom-pan-pinch';

const mapImgSize = { h: '1000px', w: '750px' };
// const mapImgSize = {h: '2000px', w: '1500px'}

const containerCss = css`
  .transformWrapper {
    height: 100vh;
    width: 100%;
    background-color: ${colors.primary10};
  }
  .transformContent {
    height: ${mapImgSize.h};
    width: ${mapImgSize.w};
  }
  .markers {
    position: absolute;
  }
  #mapImg {
    height: ${mapImgSize.h};
    width: ${mapImgSize.w};
  }
`;

const mapImageSrc = ['/img-01.jpg', '/img-02.jpg'];

const MapImg = () => {
  return useTransformComponent(({ state }) => {
    const secondMapScale = 1.9;
    const src = (state: ReactZoomPanPinchState) => {
      if (state.scale < secondMapScale) {
        return mapImageSrc[0];
      } else {
        return mapImageSrc[1];
      }
    };
    return <img id='mapImg' src={src(state)} />;
  });
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
    <div css={containerCss}>
      <TransformWrapper
        minScale={0.9}
        centerZoomedOut
        centerOnInit
        ref={transformComponentRef}
      >
        <TransformComponent
          wrapperClass='transformWrapper'
          contentClass='transformContent'
        >
          <div className='markers'>
            <Marker x={375} y={375} id='m1' onClick={() => zoomTo('m1', 1.5)} />
            <Marker
              x={250}
              y={750}
              id='m2'
              onClick={() => zoomTo('m2', 1.5)}
              selected
            />
          </div>
          <MapImg />
        </TransformComponent>
        <MapDrawer>
          <div onClick={() => zoomTo('m1')}>Booth List Element 1</div>
          <div onClick={() => zoomTo('m2')}>Booth List Element 2</div>
          <div>Booth List Element 3</div>
        </MapDrawer>
      </TransformWrapper>
    </div>
  );
};

export default MapPage;
