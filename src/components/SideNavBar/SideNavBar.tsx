import { Drawer } from 'vaul';
import SideNavOpenBtn from './SideNavOpenBtn';
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import SideNavBarPanel from './SideNavBarPanel';
import SideNavCloseBtn from './SideNavCloseBtn';
import DrawerOverlay from './DrawerOverlay';
import SideNavMenuBtn from './SideNavMenuBtn';
import { useLocation } from 'react-router-dom';

const drawerContentCss = css`
  height: 100%;
  width: 230px;

  position: fixed;
  top: 0;
  right: 0;
`;
// const snapPoints = ['180px', 1];
const snapPoints = [`${window.innerWidth - 234}px`, 1]; //230px + shadow 4px
// const snapPoints = [`${ window.innerWidth - 234 + Math.max(0, (window.innerWidth - 480) / 2) }px`, 1];
// should Resize be handled?

const SideNavBar = () => {
  const [snap, setSnap] = useState<number | string | null>(snapPoints[0]);
  const [open, setOpen] = useState(true);
  const navigate = useLocation();

  const handleSnapClick = () => {
    snap === 1 ? setSnap(snapPoints[0]) : setSnap(1);
  };

  useEffect(() => {
    handleSnapClick();
  }, [navigate])
  
  return (
    <Drawer.Root
      direction='right'
      dismissible={false}
      modal={false}
      open={open}
      onOpenChange={setOpen}
      snapPoints={snapPoints}
      activeSnapPoint={snap}
      setActiveSnapPoint={setSnap}
    >
      <DrawerOverlay
        visible={snap === 1}
        onClick={() => {
          if (snap === 1) {
            handleSnapClick();
          }
        }}
      />
      <Drawer.Portal>
        <Drawer.Content css={drawerContentCss}>
          <Drawer.Title />
          <Drawer.Description />
          <SideNavOpenBtn
            onClick={handleSnapClick}
            css={css`
              position: fixed;
              right: 18rem;
              top: 5.2rem;
            `}
          />
          <SideNavBarPanel>
            <SideNavCloseBtn onClick={handleSnapClick} />
            <SideNavMenuBtn
              to='home'
              text='메인'
              selected={navigate.pathname === '/home'}
            />
            <SideNavMenuBtn
              to='notice'
              text='공지'
              selected={navigate.pathname === '/notice'}
            />
            <SideNavMenuBtn
              to='timetable'
              text='타임 테이블'
              selected={navigate.pathname === '/timetable'}
            />
            <SideNavMenuBtn
              to='map'
              text='지도'
              selected={navigate.pathname === '/map'}
            />
          </SideNavBarPanel>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default SideNavBar;
