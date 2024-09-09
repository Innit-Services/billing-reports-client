import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/styles/flex.css';
import '../../assets/styles/navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-light">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <div className="leftnav"></div>
        <div className="d-flex align-items-center">
          <i className="bx bx-user-circle fs-3 me-2"></i>
          <span className="fw-bold">Hello, User</span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
