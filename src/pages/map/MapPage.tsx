import Marker from '@/components/Marker';
import { css } from '@emotion/react';
import { colors } from '@/styles/styles';
import { useEffect, useRef, useState } from 'react';
import MapDrawer from './mapDrawer/MapDrawer';
import {
  TransformComponent,
  TransformWrapper,
  useTransformComponent,
  type ReactZoomPanPinchRef,
} from 'react-zoom-pan-pinch';
import type { Booth } from '@/types/schema';
import Card from '@/components/Card';
import BoothInfoModal from './BoothInfoModal';
import DateSelector from '@/components/Selector/DateSelector';
import DayNightSelector from '@/components/Selector/DayNightSelector';
import { getBooths } from '@/api';
import { imageList } from '@/constants';
// import { boothsData } from '@/api/mockData';

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
  .hidden {
    display: none;
  }
  .controlPanels {
    position: fixed;
    top: 24px;
    left: 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
`;

const mapImageSrc = imageList.slice(0, 2);

const secondMapScale = 1.9;
const MapImg = () =>
  useTransformComponent(({ state }) => (
    <>
      <img
        id='mapImg'
        src={mapImageSrc[0]}
        className={state.scale < secondMapScale ? '' : 'hidden'}
      />
      <img
        id='mapImg'
        src={mapImageSrc[1]}
        className={state.scale > secondMapScale ? '' : 'hidden'}
      />
    </>
  ));

const MapPage = () => {
  const transformComponentRef = useRef<ReactZoomPanPinchRef | null>(null);
  const [booths, setBooths] = useState<Booth[]>([]);
  const [selectedBooth, setSelectedBooth] = useState<Booth | null>(null);
  const zoomTo = (elementId: string, scale?: number) => {
    if (!transformComponentRef.current) {
      return;
    }
    const { zoomToElement } = transformComponentRef.current;
    console.log('zoomTo', elementId);
    zoomToElement(elementId, scale ?? 3.0);
    setSelectedBooth(booths.find((e) => `m${e.id}` === elementId) ?? null);
  };
  const onDateChange = (value: string) => {
    console.log(value);
    //TODO: filter boothData
  };
  const onDayNightChange = (value: string) => {
    console.log(value);
  };

  useEffect(() => {
    // setBooths(boothsData); // Mockup data
    getBooths(setBooths);
  }, []);

  return (
    <div css={containerCss}>
      <TransformWrapper
        centerZoomedOut
        centerOnInit
        ref={transformComponentRef}
      >
        <TransformComponent
          wrapperClass='transformWrapper'
          contentClass='transformContent'
        >
          <div className='markers'>
            {booths.map((e, i) => (
              <Marker
                key={i}
                point={e.point}
                id={`m${e.id}`}
                iconUrl={e.category?.icon}
                color={e.category?.color}
                onClick={() => zoomTo(`m${e.id}`, 1.5)}
                selected={selectedBooth?.id === e.id}
              />
            ))}
          </div>
          <div onClick={() => setSelectedBooth(null)}>
            <MapImg />
          </div>
        </TransformComponent>
        <MapDrawer selected={selectedBooth} setSelected={setSelectedBooth}>
          {booths.map((e, i) => (
            <Card
              title={e.name}
              desc={e.description}
              imgUrl={e.images?.at(0)}
              btnText={e.category.name}
              key={i}
              onClick={() => zoomTo(`m${e.id}`)}
            />
          ))}
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
      <div className='controlPanels'>
        <DateSelector onChange={onDateChange} />
        <DayNightSelector onChange={onDayNightChange} />
      </div>
    </div>
  );
};

export default MapPage;
