import { Outlet } from "react-router";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function AppLayout() {
  return (
    <div className="w-dvw min-h-dvh h-fit bg-gray-900 text-purple-100 flex flex-col justify-start items-center reg-text">
      <NavBar />
      <main className="w-full flex-1 flex flex-col items-center px-6 py-3">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default AppLayout;
