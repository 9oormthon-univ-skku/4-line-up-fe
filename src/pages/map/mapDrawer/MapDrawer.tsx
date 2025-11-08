import { colors, fonts, shadows } from '@/styles/styles';
import { css } from '@emotion/react';
import type React from 'react';
import { useEffect, useState, type ComponentProps } from 'react';
import { Drawer } from 'vaul';
import BoothList from './BoothList';
import type { Booth } from '@/types/schema';
import { useNavigate } from 'react-router-dom';
import Tag from '@/components/Tag';
import { BoldParsedP } from '@/components/BoldParsedP';
import Gallery from '@/components/Gallery';
import Button from '@/components/Button';

const drawerContentCss = css`
  background-color: ${colors.white};
  height: 100%;
  width: 100%;
  max-width: 100vw;
  margin-top: 50px;
  border-radius: 32px 32px 0 0;
  ${shadows.dropUp};

  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  header {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 8px 36px;
    gap: 20px;
    ${fonts.display_lg};
    .handle {
      background-color: ${colors.primary20};
      width: 60px;
    }
  }
  header svg {
    position: fixed;
    top: -18px;
    color: ${colors.primary20};
  }
  z-index: 10;
`;

const boothInfoCss = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  padding: 12px 16px;
  ${fonts.label_xsm};
  color: ${colors.gray77};
  .title-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    .left {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    h3 {
      ${fonts.body_md};
      color: ${colors.gray40};
    }
  }
`;

const snapPoints = ['280px', '480px', 0.85];

interface MapDrawerProps extends ComponentProps<'div'> {
  selected: Booth | null;
  setSelected: React.Dispatch<React.SetStateAction<Booth | null>>;
  selcectedCatName?: string;
}

const MapDrawer = ({ selected, setSelected, selcectedCatName, children }: MapDrawerProps) => {
  const [snapMap, setSnapMap] = useState<number | string | null>(snapPoints[0]);
  const [open, setOpen] = useState(true);

  const handleSnapClick = () => {
    snapMap === snapPoints[2]
      ? setSnapMap(snapPoints[0])
      : setSnapMap(snapPoints[2]);
    setSelected(null);
  };
  const onSelect = () => {
    setSnapMap(snapPoints[1]);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (selected) {
      onSelect();
    }
  }, [selected]);

  useEffect(() => {
    if (snapMap !== snapPoints[1]) {
      setSelected(null);
    }
  }, [snapMap]);

  return (
    <Drawer.Root
      dismissible={false}
      modal={false}
      open={open}
      onOpenChange={setOpen}
      defaultOpen={true}
      snapPoints={snapPoints}
      activeSnapPoint={snapMap}
      setActiveSnapPoint={setSnapMap}
    >
      <Drawer.Portal>
        <Drawer.Content css={drawerContentCss}>
          <header onClick={handleSnapClick}>
            <Drawer.Handle className='handle' />
            {!selected && (
              <>
                <Drawer.Title>부스 목록</Drawer.Title>
                <Drawer.Description />
              </>
            )}
          </header>
          {selected ? (
            <div css={boothInfoCss}>
              <div className='title-wrapper'>
                <div className='left'>
                  <h3>{selected.name}</h3>
                  <BoldParsedP text={selected.summary || ''} />
                </div>
                <Tag text={selcectedCatName} />
              </div>
              <p>
                {`${selected.hour.open.locale('ko').format('MM/DD (dd) HH:mm')}~${selected.hour.close.format('HH:mm')}`}
              </p>
              {selected.images && (
                <Gallery
                  dotControl
                  size='xsmall'
                  onSlideClick={(key) => {
                    console.log(key);
                  }}
                  images={selected?.images}
                  id='gallery'
                />
              )}
              <Button
                className='btn-detail'
                size='lg'
                onClick={() => {
                  navigate(`/booths/${selected.id}`);
                }}
              >
                자세히 보기
              </Button>
            </div>
          ) : (
            <BoothList
              onClick={onSelect}
              css={
                snapMap === snapPoints[2] &&
                css`
                  overflow-y: scroll;
                `
              }
            >
              {children}
            </BoothList>
          )}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default MapDrawer;
