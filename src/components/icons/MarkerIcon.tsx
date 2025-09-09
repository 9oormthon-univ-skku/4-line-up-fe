import type { ComponentProps } from 'react';
import IconStore from '@icons/markerIcon/mk-wine.svg?react';
import IconMarker from '@icons/markerIcon/mk-restaurant.svg?react';
import IconGate from '@icons/markerIcon/mk-star.svg?react';
import IconPhoto from '@icons/markerIcon/mk-camera.svg?react';
import IconFood from '@icons/markerIcon/mk-pizza.svg?react';
import IconSponsor from '@icons/markerIcon/mk-thumb-up.svg?react';

interface MarkerIconProps extends ComponentProps<'div'> {
  categoryId?: number;
}

const icons: {
  [key: number]: React.ReactNode;
} = {
  1: <IconStore />,
  2: <IconMarker />,
  3: <IconGate />,
  4: <IconPhoto />,
  5: <IconFood />,
  6: <IconSponsor />,
};
const MarkerIcon = ({ categoryId = 2, ...props }: MarkerIconProps) => {
  return (
    <div {...props}>
      {Object.prototype.hasOwnProperty.call(icons, categoryId) ? (
        icons[categoryId]
      ) : (
        <IconMarker />
      )}
    </div>
  );
};

export default MarkerIcon;
