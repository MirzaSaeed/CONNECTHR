import React from "react";
import "./CSS/Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div
      className="container-fluid just fixed-top"
      style={{ paddingLeft: 0 + "px", paddingRight: 0 + "px" }}
    >
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid justify-content-between">
          <div className="d-flex">
            <Link
              className="navbar-brand me-2 mb-1 d-flex align-items-center"
              style={{ color: "#3b71ca" }}
              to="/employee/home"
            >
              Employee Management System
            </Link>
          </div>

          <ul className="navbar-nav flex-row d-none d-md-flex">
            <li className="nav-item me-3 me-lg-1 active">
              <Link
                className="nav-link"
                aria-current="page"
                to="/employee/home"
              >
                Profile
              </Link>
            </li>

            <li className="nav-item me-3 me-lg-1">
              <Link className="nav-link" to="/employee/attendance">
                Attendance
              </Link>
            </li>

            <li className="nav-item me-3 me-lg-1">
              <Link className="nav-link" to="/employee/payroll">
                Payroll
              </Link>
            </li>

            <li className="nav-item me-3 me-lg-1">
              <Link className="nav-link" to="/employee/leaves">
                Leaves
              </Link>
            </li>
          </ul>

          <ul className="navbar-nav flex-row">
            <li className="nav-item me-3 me-lg-1">
              <span
                className="dropdown-toggle nav-link d-sm-flex align-items-sm-center hidden-arrow"
                id="navbarDropdownMenuAvatar"
                role="button"
                data-mdb-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                  className="rounded-circle"
                  height="25"
                  alt="Black and White Portrait of a Man"
                  loading="lazy"
                />
                <strong className="d-none d-sm-block ms-1">MIRZA SAEED</strong>
              </span>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdownMenuAvatar"
              >
                <li>
                  <Link to="/employee/profile" className="dropdown-item">
                    My profile
                  </Link>
                </li>
                <li>
                  <Link to="/employee/Settings" className="dropdown-item">
                    Settings
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/">
                    Logout
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
