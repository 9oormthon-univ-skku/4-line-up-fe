// import SideNavBar from '@/components/SideNavBar/SideNavBar';
import SideNavBarMissable from '@/components/SideNavBar/SideNavBarMissable';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <Outlet />
      <SideNavBarMissable />
    </>
  );
};

export default Layout;
