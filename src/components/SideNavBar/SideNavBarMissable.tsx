import { Drawer } from 'vaul';
import SideNavOpenBtn from './SideNavOpenBtn';
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import SideNavBarPanel from './SideNavBarPanel';
import SideNavCloseBtn from './SideNavCloseBtn';
import SideNavMenuBtn from './SideNavMenuBtn';
import { useLocation } from 'react-router-dom';

const drawerContentCss = css`
  height: 100%;
  width: 230px;

  position: fixed;
  top: 0;
  right: 0;
  z-index: 40;

  h2 {
    visibility: hidden;
    height: 0;
  }
`;

const SideNavBarMissable = () => {
  const [open, setOpen] = useState(true);
  const location = useLocation();

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    onClose();
  }, [location]);

  return (
    <Drawer.Root direction='right' open={open} onOpenChange={setOpen}>
      {!open && (
        <Drawer.Trigger
          css={css`
            position: fixed;
            right: -5rem;
            top: 5.2rem;
            z-index: 30;
          `}
        >
          <SideNavOpenBtn />
        </Drawer.Trigger>
      )}
      <Drawer.Overlay
        css={css`
          position: fixed;
          inset: 0;
          background-color: rgba(0, 0, 0, 0.35);
          z-index: 20;
        `}
      />
      <Drawer.Portal>
        <Drawer.Content css={drawerContentCss}>
          <Drawer.Title>메뉴</Drawer.Title>
          <Drawer.Description />
          <SideNavOpenBtn
            onClick={onClose}
            css={css`
              position: fixed;
              right: 18rem;
              top: 5.2rem;
              filter: none;
            `}
          />
          <SideNavBarPanel>
            <SideNavCloseBtn onClick={onClose} />
            <SideNavMenuBtn
              to='home'
              text='메인'
              selected={location.pathname === '/home'}
            />
            <SideNavMenuBtn
              to='notice'
              text='공지'
              selected={location.pathname === '/notice'}
            />
            <SideNavMenuBtn
              to='timetable'
              text='타임 테이블'
              selected={location.pathname === '/timetable'}
            />
            <SideNavMenuBtn
              to='map'
              text='지도'
              selected={location.pathname === '/map'}
            />
          </SideNavBarPanel>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default SideNavBarMissable;
