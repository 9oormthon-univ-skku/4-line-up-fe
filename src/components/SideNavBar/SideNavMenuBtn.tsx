import { colors, fonts, shadows } from '@/styles/styles';
import { css } from '@emotion/react';
import HomeIcon from '@icons/home.svg?react';
import BellIcon from '@icons/bell.svg?react';
import ClockIcon from '@icons/clock.svg?react';
import MapIcon from '@icons/map.svg?react';
import { Link } from 'react-router-dom';

interface SideNavMenuBtnProps {
  selected?: boolean;
  to: 'home' | 'notice' | 'timetable' | 'map';
  text: string;
}

const Icons: { [key: string]: React.ReactNode } = {
  home: <HomeIcon />,
  notice: <BellIcon />,
  timetable: <ClockIcon />,
  map: <MapIcon />,
};

const selectedCss = css`
  background-color: ${colors.primary20};
  svg rect {
    fill: ${colors.primary20};
  }
`;

const SideNavMenuBtn = ({
  selected = false,
  to,
  text,
}: SideNavMenuBtnProps) => {
  return (
    <Link
      to={to}
      css={[
        css`
          height: 6rem;
          width: 196px;
          display: flex;
          align-items: center;
          padding-right: 24px;
          gap: 8px;
          overflow: hidden;
          border-radius: 3rem;
          border: 2px solid ${colors.primary};
          background-color: ${colors.white};
          ${shadows.dropBottom};
          svg {
            height: 5.6rem;
            width: 5.6rem;
            color: ${colors.primary};
            ${shadows.dropCenter};
          }
          div {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            ${fonts.body_md};
          }
        `,
        selected && selectedCss,
      ]}
    >
      {Icons[to]}
      <div>{text}</div>
    </Link>
  );
};
export default SideNavMenuBtn;
