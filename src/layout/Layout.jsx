import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router'; // Usa 'react-router-dom'!

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Content below navbar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar (sticky) */}
        <Sidebar />

        {/* Scrollable routed content */}
        <main className="flex-1 p-6 overflow-y-auto h-[calc(100vh-64px)] no-scrollbar">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      {/* <Footer /> */}
    </div>
  );
}
