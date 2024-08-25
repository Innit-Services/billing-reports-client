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
        <i
          className="bx bx-chevron-left toggle-btn"
          onClick={toggleSidebar}
        ></i>
      </header>
      <div className="menu-bar">
        <div className="menu">
          <ul className="menu-link">
            <li className="nav-link mb-3">
              <i className="bx bxs-user-circle icon ms-3"></i>
              <span className="name fw-bolder">Welcome User,</span>
              <br />
            </li>
            <li className="nav-link">
              <div className="search-container">
                <i className="bx bx-search icon ms-3 me-2"></i>
                <input
                  type="search"
                  placeholder="search..."
                  className="search-input "
                />
              </div>
            </li>
            
            {menus.filter((menu) => menu.enable).map(getMenuItem)}

            <li className="nav-link align-items-end mt-xxl-5">
              <NavLink to="#">
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
