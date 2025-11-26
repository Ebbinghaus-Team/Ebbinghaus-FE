import { Outlet } from 'react-router-dom';
import Header from '../components/feature/Header';
import Footer from '../components/feature/Footer';

export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
