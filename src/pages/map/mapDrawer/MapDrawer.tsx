import { colors, shadows } from '@/styles/styles';
import { css } from '@emotion/react';
import type React from 'react';
import { useState } from 'react';
import { Drawer } from 'vaul';

const drawerContentCss = css`
  background-color: ${colors.primary20};
  height: 95%;
  width: 100%;
  max-width: 100vw;
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
  }
  z-index: 10;
`;

const snapPoints = ['80px', '300px', 0.95];

const MapDrawer = ({ children }: React.HTMLAttributes<HTMLDivElement>) => {
  const [snapMap, setSnapMap] = useState<number | string | null>(snapPoints[0]);
  const [open, setOpen] = useState(true);

  const handleSnapClick = () => {
    snapMap === 0.95 ? setSnapMap(snapPoints[0]) : setSnapMap(0.95);
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
            <Drawer.Title>부스 목록</Drawer.Title>
          </header>
          {children}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default MapDrawer;
