import { Outlet } from 'react-router-dom';
import Navbar from '../Components/Navbar';
export default function BaseLayout({ children }) {
  return (
    <div className="flex flex-col justify-between ">
      <Navbar />
      {children || <Outlet />}
    </div>
  );
}
