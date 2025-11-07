import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';
import { colors } from '@/styles/styles';
import type { Booth, Category, Hour, Point } from '@/types/schema';
import Marker from '@/components/Marker';
import Card from '@/components/Card';
import DropdownSelector from '@/components/Selector/DropdownSelector';
import CategorySelector from '@/components/Selector/CategorySelector';
import MapDrawer from './mapDrawer/MapDrawer';
import BoothInfoModal from './BoothInfoModal';
import { getBooths, getCategories } from '@/api';
import { days } from '@/constants';
import MapImg1 from '@images/map-img-lv1.svg';
import MapImg2 from '@images/map-img-lv2.svg';
// import { boothsData, categoriesData } from '@/api/mockData';

import {
  TransformComponent,
  TransformWrapper,
  useTransformComponent,
  type ReactZoomPanPinchProps,
  type ReactZoomPanPinchRef,
  type ReactZoomPanPinchState,
} from 'react-zoom-pan-pinch';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);

const mapImgSize = { h: 1000, w: 660 };

const containerCss = css`
  .transformWrapper {
    height: 100vh;
    width: 100%;
    /* background-color: ${colors.primary10}; */
    background-color: #2e4035; // temp
  }
  .transformContent {
    height: ${mapImgSize.h}px;
    width: ${mapImgSize.w}px;
  }
  .markers {
    position: absolute;
  }
  #mapImg {
    height: ${mapImgSize.h}px;
    width: ${mapImgSize.w}px;
  }
  .hidden {
    display: none;
  }
  .controlPanels {
    position: fixed;
    top: 0;
    left: 0;
    padding: 0;
    margin-top: 6rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
`;
const dayNightBoundary = 18; // hour
const secondMapScale = 1.9; // boundary between lv1 and lv2 img
const transformWrapperProps: ReactZoomPanPinchProps = {
  initialScale: 1.3,
  centerZoomedOut: true,
  centerOnInit: true,
}; // map settings

const MapImg = () =>
  useTransformComponent(({ state }) => (
    <>
      <img
        id='mapImg'
        src={MapImg1}
        className={state.scale <= secondMapScale ? '' : 'hidden'}
      />
      <img
        id='mapImg'
        src={MapImg2}
        className={state.scale > secondMapScale ? '' : 'hidden'}
      />
    </>
  ));

const filterBooths = (
  booths: Booth[],
  hour: Hour,
  categories: string[],
  areaId?: number
): Booth[] => {
  console.log(
    `hour: ${hour?.open.format('MM/DD HH')}~${hour?.close.format('HH')}`,
    `\nareaId:${areaId} \nall booths:`,
    booths
  );
  return (
    booths
      // hour.open < booth.close && hour.close > booth.open
      .filter(
        (booth) =>
          booth.hour.open.isBefore(hour.close) &&
          booth.hour.close.isAfter(hour.open)
      )
      .filter((booths) => categories.length===0||categories.includes(booths.category.name))
  );
  // TODO: area filtering
};

const sortBooths = (
  booths: Booth[],
  transformState?: ReactZoomPanPinchState
) => {
  const getCenterPosition = (s: number, dx: number, dy: number) => {
    return {
      w: (window.innerWidth / 2 - dx) / s,
      h: (window.innerHeight / 2 - dy) / s,
    };
  };
  const getDist2 = (a: Point, b: any) => {
    return (a.y - b.h) ** 2 + (a.x - b.w) ** 2;
  };
  const centerPosition = transformState
    ? getCenterPosition(
        transformState.scale,
        transformState.positionX,
        transformState.positionY
      )
    : { h: mapImgSize.h / 2, w: mapImgSize.w / 2 };
  console.log(transformState, centerPosition);

  return booths.sort(
    (a, b) =>
      getDist2(a.point, centerPosition) - getDist2(b.point, centerPosition)
  );
};

const MapPage = () => {
  const transformComponentRef = useRef<ReactZoomPanPinchRef | null>(null);
  const [booths, setBooths] = useState<Booth[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentBooths, setCurrentBooths] = useState<Booth[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filteredBooths, setFilteredBooths] = useState<Booth[]>([]);
  const [currentHour, setCurrentHour] = useState<Hour>({
    open: days[0],
    close: days[0].add(dayNightBoundary, 'hour'),
  });
  const [selectedBooth, setSelectedBooth] = useState<Booth | null>(null);
  const [runOnlyOnce, setRunOnlyOnce] = useState(true);

  const zoomTo = (elementId: string, scale?: number) => {
    if (!transformComponentRef.current) {
      return;
    }
    const { zoomToElement } = transformComponentRef.current;
    console.log('zoomTo', elementId);
    zoomToElement(
      elementId,
      scale ?? transformComponentRef.current.instance.transformState.scale
    );
    setSelectedBooth(booths.find((e) => `m${e.id}` === elementId) ?? null);
  };

  const navigate = useNavigate();

  useEffect(() => {
    // setBooths(boothsData); // Mockup data
    // setCategories(categoriesData);
    getBooths(setBooths);
    getCategories(setCategories);
    setRunOnlyOnce(false); // resolve collision between TransformWrapper's 'centerOnInit' prop and bugfix of KeepScale
  }, []);

  useEffect(() => {
    setFilteredBooths(filterBooths(booths, currentHour, selectedCategories));

    if (transformComponentRef.current && runOnlyOnce === false) {
      console.log('transform state: ', transformComponentRef.current.state);
      transformComponentRef.current.zoomIn(0); // KeepScale bugfix
    }
  }, [booths, currentHour, selectedCategories]);

  useEffect(() => {
    setCurrentBooths(
      sortBooths(
        filteredBooths,
        transformComponentRef.current?.instance.transformState
      )
    );
  }, [booths, filteredBooths, selectedBooth]);

  return (
    <div css={containerCss}>
      <TransformWrapper {...transformWrapperProps} ref={transformComponentRef}>
        <TransformComponent
          wrapperClass='transformWrapper'
          contentClass='transformContent'
        >
          <div className='markers'>
            {currentBooths.map((e, i) => (
              <Marker
                key={i}
                point={e.point}
                id={`m${e.id}`}
                // iconUrl={e.category?.icon}
                categoryId={e.category.id}
                color={e.category?.color}
                onPinClicked={() => zoomTo(`m${e.id}`)}
                selected={selectedBooth?.id === e.id}
              />
            ))}
          </div>
          <div onClick={() => setSelectedBooth(null)}>
            <MapImg />
          </div>
        </TransformComponent>
        <MapDrawer selected={selectedBooth} setSelected={setSelectedBooth}>
          {currentBooths.map((e, i) => (
            <Card
              title={e.name}
              desc={e.summary}
              imgUrl={e.images?.at(0)}
              btnText={e.category.name}
              key={i}
              onClick={() => zoomTo(`m${e.id}`, 6)}
            />
          ))}
        </MapDrawer>
      </TransformWrapper>
      {selectedBooth && (
        <BoothInfoModal>
          {[2, 4, 6, 7, 10].includes(selectedBooth.category.id) ? (
            <Card
              title={selectedBooth.name}
              desc={selectedBooth.summary}
              imgUrl={selectedBooth.images?.at(0)}
              btnText='자세히 보기'
              onClick={() => {
                // alert(`btn ${selectedBooth.id} clicked.`);
                navigate(`/booths/${selectedBooth.id}`);
              }}
            />
          ) : (
            <Card
              title={selectedBooth.name}
              desc={selectedBooth.summary}
              imgUrl={selectedBooth.images?.at(0)}
            />
          )}
        </BoothInfoModal>
      )}
      <div className='controlPanels'>
        <DropdownSelector
          className='select'
          name='currentTime'
          setCurrent={setCurrentHour}
          dayNightBoundary={dayNightBoundary}
          days={days}
        />
        <CategorySelector
          categories={categories}
          selected={selectedCategories}
          setSelected={setSelectedCategories}
        />
      </div>
    </div>
  );
};

export default MapPage;
