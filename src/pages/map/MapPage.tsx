import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';
import { colors } from '@/styles/styles';
import type { Booth, Point } from '@/types/schema';
import Marker from '@/components/Marker';
import Card from '@/components/Card';
import DateSelector, {
  valueIdx,
  type valueType,
} from '@/components/Selector/DateSelector';
import DayNightSelector from '@/components/Selector/DayNightSelector';
import MapDrawer from './mapDrawer/MapDrawer';
import BoothInfoModal from './BoothInfoModal';
import { getBooths } from '@/api';
import { days } from '@/constants';
import MapImg1 from '@images/map-img-lv1.svg';
import MapImg2 from '@images/map-img-lv2.svg';
// import { boothsData } from '@/api/mockData';

import {
  TransformComponent,
  TransformWrapper,
  useTransformComponent,
  type ReactZoomPanPinchProps,
  type ReactZoomPanPinchRef,
  type ReactZoomPanPinchState,
} from 'react-zoom-pan-pinch';
import dayjs, { type Dayjs } from 'dayjs';
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
    top: 24px;
    left: 24px;
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
  date: Dayjs,
  dayOrNight: 'day' | 'night',
  areaId?: number
): Booth[] => {
  console.log(
    `date: ${date?.format('MM/DD')} areaId:${areaId} all booths:`,
    booths
  );
  return booths
    .filter((booth) => date.isSame(booth.hour.open, 'day'))
    .filter((booth) =>
      dayOrNight === 'day'
        ? booth.hour.open.isBefore(date.add(dayNightBoundary, 'h'))
        : booth.hour.close.isAfter(date.add(dayNightBoundary, 'h'))
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
  const [currentBooths, setCurrentBooths] = useState<Booth[]>([]);
  const [filteredBooths, setFilteredBooths] = useState<Booth[]>([]);
  const [currentDay, setCurrentDay] = useState<Dayjs>(days[0]);
  const [dayOrNight, setDayOrNight] = useState<'day' | 'night'>('day');
  const [selectedBooth, setSelectedBooth] = useState<Booth | null>(null);
  const [defaultVal, setDefaultVal] = useState<valueType>();
  const [runOnlyOnce, setRunOnlyOnce] = useState(true);

  const zoomTo = (elementId: string, scale?: number) => {
    if (!transformComponentRef.current) {
      return;
    }
    const { zoomToElement } = transformComponentRef.current;
    console.log('zoomTo', elementId);
    zoomToElement(elementId, scale ?? transformComponentRef.current.instance.transformState.scale);
    setSelectedBooth(booths.find((e) => `m${e.id}` === elementId) ?? null);
  };

  const onDateChange = (value: string) => {
    // console.log(value, days.at(valueIdx[value as valueType]));
    setCurrentDay(days.at(valueIdx[value as valueType]) ?? currentDay);
  };
  const onDayNightChange = (value: string) => {
    console.log(value);
    setDayOrNight(value as 'day' | 'night');
  };

  const setDaySelector = (date: Dayjs) => {
    setDefaultVal(
      Object.keys(valueIdx).at(
        days.findIndex((tgt) => tgt.isSame(date))
      ) as valueType
    );
  };

  const navigate = useNavigate();

  useEffect(() => {
    // setBooths(boothsData); // Mockup data
    getBooths(setBooths);

    setRunOnlyOnce(false); // resolve collision between TransformWrapper's 'centerOnInit' prop and bugfix of KeepScale
    if (
      dayjs().isBetween(days[0], days.at(-1), 'day', '[]') && // during fest and..
      days.some((day) => day.isSame(dayjs(), 'day')) // today exist in days
    ) {
      setCurrentDay(dayjs().startOf('date'));
      // if during festival, set default day with TODAY 00:00
      console.log('enjoy the festival!');
      setDaySelector(dayjs().startOf('date'));
    }
  }, []);

  useEffect(() => {
    setFilteredBooths(filterBooths(booths, currentDay, dayOrNight));

    if (transformComponentRef.current && runOnlyOnce === false) {
      console.log('transform state: ', transformComponentRef.current.state);
      transformComponentRef.current.zoomIn(0); // KeepScale bugfix
    }
  }, [currentDay, booths, dayOrNight]);

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
          {[2, 4, 6, 7, 10].includes(selectedBooth.category.id)  ? 
          <Card
            title={selectedBooth.name}
            desc={selectedBooth.summary}
            imgUrl={selectedBooth.images?.at(0)}
            btnText='자세히 보기'
            onClick={() => {
              // alert(`btn ${selectedBooth.id} clicked.`);
              navigate(`/booths/${selectedBooth.id}`);
            }}
          />:
          <Card
            title={selectedBooth.name}
            desc={selectedBooth.summary}
            imgUrl={selectedBooth.images?.at(0)}
          /> 
          }
        </BoothInfoModal>
      )}
      <div className='controlPanels'>
        <DateSelector onChange={onDateChange} defaultValue={defaultVal} />
        <DayNightSelector onChange={onDayNightChange} />
      </div>
    </div>
  );
};

export default MapPage;
