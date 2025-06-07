import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router'; // Usa 'react-router-dom'!

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen sticky top-0 bg-blue-100">
      {/* Navbar */}
      <Navbar />

      {/* Content below navbar */}
      <div className="flex flex-1 h-[calc(100vh-64px)] bg-blue-100">
        {/* Sidebar (sticky) */}
        <Sidebar />

        {/* Scrollable routed content */}
        <main className="flex-1 p-6 overflow-y-auto h-full no-scrollbar ml-[45px] md:pl-0">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      {/* <Footer /> */}
    </div>
  );
}
