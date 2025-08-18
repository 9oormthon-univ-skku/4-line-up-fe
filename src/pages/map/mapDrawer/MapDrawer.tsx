import { colors, fonts, shadows } from '@/styles/styles';
import { css } from '@emotion/react';
import type React from 'react';
import { useState } from 'react';
import { Drawer } from 'vaul';
import RingBinder from '@images/ring-binder-hz.svg?react';
import BoothList from './BoothList';

const drawerContentCss = css`
  background-color: ${colors.primary20};
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
    justify-content: center;
    width: 100%;
    padding: 36px;
    ${fonts.display_lg};
  }
  header svg {
    position: fixed;
    top: -18px;
    color: ${colors.primary20}
  }
  z-index: 10;
`;

const snapPoints = ['130px', '300px', 1];

const MapDrawer = ({ children }: React.HTMLAttributes<HTMLDivElement>) => {
  const [snapMap, setSnapMap] = useState<number | string | null>(snapPoints[0]);
  const [open, setOpen] = useState(true);

  const handleSnapClick = () => {
    snapMap === 1 ? setSnapMap(snapPoints[0]) : setSnapMap(1);
  };
  const onSelect = () => {
    setSnapMap(snapPoints[0]);
  };

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
            <RingBinder/>
            <Drawer.Title>부스 목록</Drawer.Title>
            <Drawer.Description/>
          </header>
          <BoothList onClick={onSelect}>
            {children}
          </BoothList>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default MapDrawer;
