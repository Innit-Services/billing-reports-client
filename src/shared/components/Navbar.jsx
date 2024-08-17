import React from "react";

const Navbar=()=>{
    return (
        <nav className="navbar">
          <div className="leftnav"></div>
          <div className="d-flex align-items-center">
            <i className="bx bx-user-circle fa-2x icon"></i>
            <span className="ms-2 me-5">Profile</span>
          </div>
        </nav>
    );
}
export default Navbar;
