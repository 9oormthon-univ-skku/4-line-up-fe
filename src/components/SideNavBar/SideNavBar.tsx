import { Drawer } from 'vaul';
import SideNavOpenBtn from './SideNavOpenBtn';
import { css } from '@emotion/react';
import { useState } from 'react';
import SideNavBarPanel from './SideNavBarPanel';

const drawerOverlayCss = css`
  background-color: rgba(0, 0, 0, 0.35);
  position: fixed;
  inset: 0;
`;
const drawerContentCss = css`
  height: 100%;
  width: 228px;

  position: fixed;
  top: 0;
  right: 0;
`;
// const snapPoints = ['180px', 1];
const snapPoints = [`${ window.innerWidth - 232}px`, 1]; //228px + shadow 4px
// const snapPoints = [`${ window.innerWidth - 232 + Math.max(0, (window.innerWidth - 480) / 2) }px`, 1];
// should Resize be handled?

const SideNavBar = () => {
  const [snap, setSnap] = useState<number | string | null>(snapPoints[0]);
  const [open, setOpen] = useState(true);

  const handleSnapClick = () => {
    (snap === 1) ? setSnap(snapPoints[0]) : setSnap(1);
  };

  return (
    <Drawer.Root
      direction='right'
      dismissible={false}
      open={open}
      onOpenChange={setOpen}
      snapPoints={snapPoints}
      activeSnapPoint={snap}
      setActiveSnapPoint={setSnap}
    >
      <Drawer.Portal>
        <Drawer.Overlay onClick={ () => { if (snap === 1) handleSnapClick()}} css={drawerOverlayCss} />
        <Drawer.Content css={drawerContentCss}>
          <Drawer.Title/>
          <SideNavOpenBtn
            onClick={handleSnapClick}
            css={css`
              position: fixed;
              right: 18rem;
              top: 5.4rem;
            `}
          />
          <SideNavBarPanel>
            <SideNavOpenBtn onClick={handleSnapClick} css={css`margin-left: auto;`}/>
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
          </SideNavBarPanel>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default SideNavBar;
