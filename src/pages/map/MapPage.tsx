import Marker from '@/components/Marker';
import { css } from '@emotion/react';
import { colors } from '@/styles/styles';
import { useRef, useState } from 'react';
import MapDrawer from './mapDrawer/MapDrawer';
import {
  TransformComponent,
  TransformWrapper,
  useTransformComponent,
  type ReactZoomPanPinchRef,
  type ReactZoomPanPinchState,
} from 'react-zoom-pan-pinch';
import type { Booth, Category } from '@/types/schema';
import Card from '@/components/Card';
import BoothInfoModal from './BoothInfoModal';

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
const boothData: Booth[] = [
  {
    id: 0,
    categoryId: 0,
    areaId: 0,
    name: '부스명 01',
    description: '부스에 관한 설명 예시',
    point: { x: 375, y: 750 },
    hour: { open: new Date().toString(), close: new Date().toString() },
  },
  {
    id: 3,
    categoryId: 0,
    areaId: 0,
    name: '부스명 03',
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
    point: { x: 375, y: 250 },
    hour: { open: new Date().toString(), close: new Date().toString() },
    images: ['/img-02.jpg'],
  },
];
const categoryData: Category[] = [{ id: 0, name: '', icon: '/mk-example.svg' }];

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
    setSelectedBooth(boothData.find((e) => `m${e.id}` === elementId) ?? null);
  };
  const [selectedBooth, setSelectedBooth] = useState<Booth | null>(null);

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
            {boothData.map((e, i) => {
              const category = categoryData.find(
                (cat) => cat.id == e.categoryId
              );
              return (
                <Marker
                  key={i}
                  x={e.point.x}
                  y={e.point.y}
                  id={`m${e.id}`}
                  iconUrl={category?.icon}
                  color={category?.color}
                  onClick={() => zoomTo(`m${e.id}`, 1.5)}
                  selected={selectedBooth?.id === e.id}
                />
              );
            })}
          </div>
          <MapImg />
        </TransformComponent>
        <MapDrawer selected={selectedBooth} setSelected={setSelectedBooth}>
          {boothData.map((e, i) => {
            return (
              <Card
                title={e.name}
                desc={e.description}
                imgUrl={e.images?.at(0)}
                btnText='선택'
                key={i}
                onClick={() => zoomTo(`m${e.id}`)}
              />
            );
          })}
        </MapDrawer>
      </TransformWrapper>
      {selectedBooth && (
        <BoothInfoModal>
          <Card
            title={selectedBooth.name}
            desc={selectedBooth.description}
            imgUrl={selectedBooth.images?.at(0)}
            btnText='자세히 보기'
            btnOnClick={() => {
              alert(`btn ${selectedBooth.id} clicked.`);
            }}
          />
        </BoothInfoModal>
      )}
    </div>
  );
};

export default MapPage;
