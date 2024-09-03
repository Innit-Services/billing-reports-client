import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Searchbar from "./SearchBar";
import "../../assets/styles/flex.css";
import "../../assets/styles/utils.css";

function Layout() {
  return (
    <div className="flex w-screen h-screen bg-white-400">
      <div className="w-[13vw] ">
        <Sidebar></Sidebar>
      </div>
      <div className="h-screen w-[87vw]">
        <header className="h-[8vh] bg-white border-b-2 border-gray-400 w-full ">
          <Navbar></Navbar>
        </header>
        <div className="h-[92vh] bg-gray-50 w-full">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
    // </>
  );
}

export default Layout;
