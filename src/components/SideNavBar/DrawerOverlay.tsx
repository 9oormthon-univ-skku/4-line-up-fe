import { css, keyframes } from '@emotion/react';
import React, { useEffect, useState } from 'react';

const drawerOverlayCss = css`
  background-color: rgba(0, 0, 0, 0.35);
  position: fixed;
  inset: 0;
  height: 100lvh;
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

interface DrawerOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  visible: boolean;
}

/**
 *  Custom Overlay - due to the 'pseudo-closing' and modal=false Drawer.
 *  */
const DrawerOverlay = ({ visible, ...props }: DrawerOverlayProps) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (visible) {
      setOpen(true);
    } else {
      timeoutId = setTimeout(() => setOpen(false), 195);
    }

    return () => {
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
    };
  }, [visible]);

  if (!open) {
    return null;
  }

  return (
    <div
      css={[
        drawerOverlayCss,
        css`
          animation: ${visible ? fadeIn : fadeOut} 0.2s ease-out;
        `,
      ]}
      onClick={props.onClick}
    />
  );
};

export default DrawerOverlay;
