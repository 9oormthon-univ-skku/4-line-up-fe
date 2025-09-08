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
import DateSelector, {
  type valueType,
} from '@/components/Selector/DateSelector';
import DayNightSelector from '@/components/Selector/DayNightSelector';
import { getBooths } from '@/api';
import { days } from '@/constants';
import dayjs, { type Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { useNavigate } from 'react-router-dom';
// import { boothsData } from '@/api/mockData';
import MapImg1 from '@images/map-img-lv1.svg';
import MapImg2 from '@images/map-img-lv2.svg';

dayjs.extend(isBetween);

const mapImgSize = { h: '750px', w: '575px' };
// const mapImgSize = {h: '2000px', w: '1500px'}

const containerCss = css`
  .transformWrapper {
    height: 100vh;
    width: 100%;
    /* background-color: ${colors.primary10}; */
    background-color: #2E4035;  // temp
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
const dayNightBoundary = 18;

const secondMapScale = 1.9;
const MapImg = () =>
  useTransformComponent(({ state }) => (
    <>
      <img
        id='mapImg'
        src={MapImg1}
        className={state.scale < secondMapScale ? '' : 'hidden'}
      />
      <img
        id='mapImg'
        src={MapImg2}
        className={state.scale > secondMapScale ? '' : 'hidden'}
      />
    </>
  ));

const valueIdx = {
  left: 0,
  right: 1,
  center: 2,
};

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

const MapPage = () => {
  const transformComponentRef = useRef<ReactZoomPanPinchRef | null>(null);
  const [booths, setBooths] = useState<Booth[]>([]);
  const [currentBooths, setCurrentBooths] = useState<Booth[]>([]);
  const [currentDay, setCurrentDay] = useState<Dayjs>(days[0]);
  const [dayOrNight, setDayOrNight] = useState<'day' | 'night'>('day');
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
    // console.log(value, days.at(valueIdx[value as valueType]));
    setCurrentDay(days.at(valueIdx[value as valueType]) ?? currentDay);
  };
  const onDayNightChange = (value: string) => {
    console.log(value);
    setDayOrNight(value as 'day' | 'night');
  };

  const navigate = useNavigate();

  useEffect(() => {
    // setBooths(boothsData); // Mockup data
    getBooths(setBooths);

    if (
      dayjs().isBetween(days[0], days.at(-1), 'day', '[]') && // during fest and..
      days.some((day) => day.isSame(dayjs(), 'day')) // today exist in days
    ) {
      setCurrentDay(dayjs().startOf('date'));
      // if during festival, set default day with TODAY 00:00
      console.log('enjoy the festival!');
      // TODO: set selector props
    }
  }, []);

  useEffect(() => {
    setCurrentBooths(filterBooths(booths, currentDay, dayOrNight));
    if (transformComponentRef.current) {
      transformComponentRef.current.zoomIn(0); // KeepScale bugfix
    }
  }, [currentDay, booths, dayOrNight]);

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
            {currentBooths.map((e, i) => (
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
          {currentBooths.map((e, i) => (
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
              // alert(`btn ${selectedBooth.id} clicked.`);
              navigate(`/booths/${selectedBooth.id}`);
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
