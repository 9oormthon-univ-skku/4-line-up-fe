import SideNavBar from '@/components/SideNavBar/SideNavBar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <Outlet />
      <SideNavBar />
    </>
  );
};

export default Layout;
