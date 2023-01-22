import React from "react";
import "./CSS/Sidebar.css";
import { Link, useNavigate } from "react-router-dom";
import { MDBListGroup, MDBTypography } from "mdb-react-ui-kit";

const AdminSidebar = ({ children }) => {
  const navigate = useNavigate();
  let token = JSON.parse(localStorage.getItem("user"));
  if(!token){
    navigate("*");
    
  }
  return (
    <div className="wrapper d-flex align-items-stretch">
      <nav id="sidebar">
        <div className="p-4 pt-3">
          <MDBTypography tag="h1" style={{ fontSize: 26 + "px" }}>
            <span className="text-primary">Employee</span> Management System
          </MDBTypography>
          <MDBListGroup className="list-unstyled components mb-5">
            <li>
              <Link to="/auth/admin/home">Dashboard</Link>
            </li>
            <li>
              <Link to="/auth/admin/profile">Profile</Link>
            </li>
            <li>
              <Link to="/auth/admin/attendance">Attendance</Link>
            </li>
            <li>
              <Link to="/auth/admin/leaves">Leaves</Link>
            </li>
            <li>
              <Link to="/auth/admin/payroll">Payroll</Link>
            </li>
          </MDBListGroup>
        </div>
      </nav>

      <div id="content" className="my-1 mx-1">
        {children}
      </div>
    </div>
  );
};

export default AdminSidebar;
