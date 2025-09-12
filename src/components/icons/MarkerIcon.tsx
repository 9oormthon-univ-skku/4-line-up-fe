import type { ComponentProps } from 'react';
import IconStage from '@icons/markerIcon/mk-basketball.svg?react';
import IconBooth from '@icons/markerIcon/mk-flag.svg?react';
import IconGate from '@icons/markerIcon/mk-run.svg?react';
import IconStop from '@icons/markerIcon/mk-bus.svg?react';
import IconShop from '@icons/markerIcon/mk-store.svg';
import IconPub from '@icons/markerIcon/mk-wine.svg?react';
import IconGoods from '@icons/markerIcon/mk-shirt.svg?react';
import IconFood from '@icons/markerIcon/mk-restaurant.svg?react';
import IconToilet from '@icons/markerIcon/mk-toilet.svg?react';
import IconPhoto from '@icons/markerIcon/mk-camera.svg?react';
import IconTrash from '@icons/markerIcon/mk-trash.svg?react';

interface MarkerIconProps extends ComponentProps<'div'> {
  categoryId?: number;
}

const icons: {
  [key: number]: React.ReactNode;
} = {
  1: <IconStage />,
  2: <IconBooth />,
  3: <IconGate />,
  4: <IconStop />,
  5: <IconShop />,
  6: <IconPub />,
  7: <IconGoods />,
  8: <IconFood />,
  9: <IconToilet />,
  10: <IconPhoto />,
  11: <IconTrash />
};
const MarkerIcon = ({ categoryId = 2, ...props }: MarkerIconProps) => {
  return (
    <div {...props}>
      {Object.prototype.hasOwnProperty.call(icons, categoryId) ? (
        icons[categoryId]
      ) : (
        <IconBooth />
      )}
    </div>
  );
};

export default MarkerIcon;
