import { useState, React } from "react";
import "../../assets/styles/sidebar.css";
import { NavLink } from "react-router-dom";
import { menus } from "../constants/application.constants";

/* with increasing application menus, this function will update for nested level menus */
const getMenuItem = (menu) => {
  return (
    <li className="nav-link">
      <NavLink to={menu.route}>
        <i className={`bx icon ${menu.icon}`}></i>
        <span className="text nav-text stext">{menu.label}</span>
      </NavLink>
    </li>
  );
};

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen((open) => !open);
  };

  return (
    <nav className={`sidebar ${isOpen ? "" : "close"}`}>
      <header>
                <i className='bx bx-menu toggle-btn fs-2 mb-2 mt-2 d-flex justify-content-end ' onClick={toggleSidebar}></i>
            </header>
      <div className="menu-bar">
        <div className="menu">
          <ul className="menu-link">
           
           
            
            {menus.filter((menu) => menu.enable).map(getMenuItem)}

            <li className="nav-link align-items-end mt-xxl-5">
              <NavLink to="/signin">
                <i className="bx bx-log-out icon"></i>
                <span className="text nav-text stext">Log out</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
