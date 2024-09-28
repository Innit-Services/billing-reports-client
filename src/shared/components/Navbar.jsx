import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'boxicons/css/boxicons.min.css';
import '../../assets/styles/flex.css';
import Tooltip from '@mui/material/Tooltip';


const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <div className="leftnav"></div>
        <div className="d-flex align-items-center">
       
        <i class='bx bxs-cog fs-3 me-3'></i>
   
        <Tooltip title="Profile" arrow>
          <i className="bx bx-user-circle fs-3 me-2"></i>
          </Tooltip>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
