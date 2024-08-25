import {useState,React} from "react";
import '../../assets/styles/sidebar.css';
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen((open)=>!open);
    };

    return (
        <nav className={`sidebar ${isOpen ? '' : 'close'}`}>
            <header>
                <i className='bx bx-chevron-left toggle-btn' onClick={toggleSidebar}></i>
            </header>
            <div className="menu-bar">
                <div className="menu">
                    <ul className="menu-link">
                        <li className="nav-link mb-3">
                            <i className='bx bxs-user-circle icon ms-3'></i>
                            <span className="name fw-bolder">Welcome User,</span><br />
                        </li>
                        <li className="nav-link">
                            <div className="search-container">
                                <i className='bx bx-search icon ms-3 me-2'></i>
                                <input type="search" placeholder="search..." className="search-input "
                                 />
                            </div>
                        </li>
                        <li className="nav-link"><NavLink to="/"><i className='bx bx-home-alt icon'></i><span className="text nav-text stext">Dashboard</span></NavLink></li>
                        <li className="nav-link"><NavLink to=""><i className='bx bx-bell icon'></i><span className="text nav-text stext">Notification</span></NavLink></li>
                        <li className="nav-link"><NavLink to="/employees"><i className='bx bx-bell icon'></i><span className="text nav-text stext">Employees</span></NavLink></li>
                        <li className="nav-link"><NavLink to="viewclient"><i className='bx bxs-group icon'></i><span className="text nav-text stext">Client</span></NavLink></li>
                        <li className="nav-link"><NavLink to="/department"><i className='bx bx-pie-chart-alt icon'></i><span className="text nav-text stext">Department</span></NavLink></li>
                        <li className="nav-link"><NavLink to="#"><i className='bx bx-user-check icon'></i><span className="text nav-text stext">Attendance</span></NavLink></li>
                        <li className="nav-link"><NavLink to="#"><i className='bx bx-bar-chart-alt-2 icon'></i><span className="text nav-text stext">Payroll</span></NavLink></li>
                        <li className="nav-link"><NavLink to="#"><i className='bx bx-help-circle icon'></i><span className="text nav-text stext">Help & Support</span></NavLink></li>
                        <li className="nav-link align-items-end mt-xxl-5"><NavLink to="#"><i className='bx bx-log-out icon'></i><span className="text nav-text stext">Log out</span></NavLink></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Sidebar;
