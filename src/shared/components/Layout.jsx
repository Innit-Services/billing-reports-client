import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "../../assets/styles/flex.css";
import "../../assets/styles/utils.css";

function Layout() {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded((isExpanded) => !isExpanded);
  };

  return (
    <div className="flex w-screen h-screen">
      <div
        className={`${
            isExpanded ? "w-[13vw]" : "w-[4vw]"
        } transition-all duration-300`}
      >
        <Sidebar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
      </div>
      <div
        className={`h-screen ${
            isExpanded ? "w-[87vw]" : "w-[96vw]"
        } transition-all duration-300`}
      >
        <header className="h-[8vh] bg-white w-full border-b-0 border-gray-400 shadow-lg">
          <Navbar />
        </header>
        <div className="h-[92vh] bg-gray-50">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
