import axios from "axios";
import { MDBContainer } from "mdb-react-ui-kit";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Admin = (prop) => {
  const navigate = useNavigate();
  let user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    navigate("*");
  }
  const handleLogOut = (e) => {
    localStorage.removeItem("user");
    navigate("/");
  };
  const [data, setData] = useState([{}]);
  const response = async () => {
    await axios
      .get("http://localhost:9000/auth/admin/me/", {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then(
        (res) => setData(res.data),
        (res) => {
          if (res.status === 401) {
            navigate("*");
          }
        }
      )
      .catch((Error) => alert(JSON.stringify(Error.response.data)));
  };
  useEffect(() => {
    response();
  }, []);
  return (
    <MDBContainer fluid className="mb-lg-2">
      <ul className="navbar-nav flex-row d-flex d-md-flex justify-content-between">
        <li
          className="nav-item me-3 me-lg-1"
          style={{ paddingTop: 7 + "px", fontWeight: 600 }}
        >
          {prop.title}
        </li>
        <li className="nav-item me-3 me-lg-1">
          <span
            className="dropdown-toggle nav-link d-sm-flex align-items-sm-center hidden-arrow"
            id="navbarDropdownMenuAvatar"
            role="button"
            data-mdb-toggle="dropdown"
            aria-expanded="false"
          >
            <strong className="d-none d-sm-block ms-1 text-dark">
              {data.lastName}
            </strong>
          </span>
          <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="navbarDropdownMenuAvatar"
          >
            <li>
              <Link to="/auth/admin/profile" className="dropdown-item">
                My profile
              </Link>
            </li>
            <li>
              <Link to="/auth/admin/settings" className="dropdown-item">
                Settings
              </Link>
            </li>
            <li
              className="dropdown-item"
              onClick={(e) => handleLogOut(e)}
              style={{ cursor: "pointer" }}
            >
              Logout
            </li>
          </ul>
        </li>
      </ul>
    </MDBContainer>
  );
};

export default Admin;
