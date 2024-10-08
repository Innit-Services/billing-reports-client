import React from "react";
import "../../assets/styles/sidebar.css";
import { NavLink } from "react-router-dom";
import { menus } from "../constants/application.constants";

const getMenuItem = (menu) => (
  <li className="nav-link">
    <NavLink to={menu.route}>
      <i className={`bx icon ${menu.icon}`}></i>
      <span className="text nav-text fs-6">{menu.label}</span>
    </NavLink>
  </li>
);

const Sidebar = ({ isExpanded, toggleSidebar }) => {
  return (
    <nav className={`sidebar ${isExpanded ? "" : "close"}`}>
      <header>
                <i className='bx bx-menu toggle-btn fs-2 mb-2 mt-2 d-flex justify-content-end ' onClick={toggleSidebar}></i>
            </header>
      <div className="menu-bar">
        <div className="menu">
          <ul className="menu-link text-white">
            {menus.filter((menu) => menu.enable).map(getMenuItem)}
            <li className="nav-link align-items-end absolute bottom-8">
              <NavLink to="/signin">
                <i className="bx bx-log-out icon"></i>
                <span className="text nav-text fs-6">Log out</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;