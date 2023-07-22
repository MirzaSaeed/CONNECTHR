import axios from "axios";
import { MDBContainer, MDBInput, MDBRow } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Admin from "../../../Core/Admin";
import AdminSidebar from "../../../Core/AdminSidebar";
import { Loading } from "../../../Core/Loading";
import { BASE_URL } from "../../../../config";
const AddEmployee = () => {
  const navigate = useNavigate();
  let user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    navigate("*");
  }
  const isUserAuth = async () => {
    const res = await axios
      .get(`${BASE_URL}/auth/admin/me/`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .catch((Error) => alert("Not Authorized"));
    if (res.status === 401) {
      navigate("*");
    }
  };
  useEffect(() => {
    isUserAuth();
  }, []);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    password: "",
    salary: "",
  });
  const { firstName, lastName, email, role, password, salary } = formData;
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value, //? for key used: name and for value used: value
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isUserAuth) {
      // ! Fetch API data
      let response = await axios
        .post(`${BASE_URL}/auth/admin/addEmployee/`, formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        })
        .catch((Error) => alert("Not Authorized"));

      if (response) {
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          role: "",
          password: "",
          salary: "",
        });
        navigate("/auth/admin/home");
      }
    }
  };
  return (
    <AdminSidebar>
      <Loading>
        <Admin title="Add Employee" />
        <MDBContainer fluid className="fadeIn">
          <div className="tab-pane" id="settings">
            <form onSubmit={handleSubmit}>
              <MDBRow className="mb-3">
                <div className="col-md-12 col-lg-6 ">
                  <MDBInput
                    id="fname"
                    type="text"
                    name="firstName"
                    label="First Name"
                    value={firstName}
                    onChange={onChange}
                  />
                </div>
                <div className="col-md-12 col-lg-6 ">
                  <MDBInput
                    id="lname"
                    type="text"
                    name="lastName"
                    label="Last Name"
                    value={lastName}
                    onChange={onChange}
                  />
                </div>
              </MDBRow>
              <MDBRow className="mb-3">
                <div className="col-md-12 col-lg-6 ">
                  <MDBInput
                    id="Position"
                    type="text"
                    name="role"
                    label="Position"
                    value={role}
                    onChange={onChange}
                  />
                </div>
                <div className="col-md-12 col-lg-6 ">
                  <MDBInput
                    id="password"
                    type="password"
                    name="password"
                    label="Password"
                    value={password}
                    onChange={onChange}
                  />
                </div>
              </MDBRow>
              <MDBRow className="mb-3">
                <div className="col-md-12 col-lg-6 ">
                  <MDBInput
                    id="email"
                    type="email"
                    name="email"
                    label="Email Address"
                    value={email}
                    onChange={onChange}
                  />
                </div>
                <div className="col-md-12 col-lg-6 ">
                  <MDBInput
                    id="salary"
                    type="number"
                    name="salary"
                    label="Salary"
                    value={salary}
                    onChange={onChange}
                  />
                </div>
              </MDBRow>
              <button className="btn btn-primary">Add Employee</button>
            </form>
          </div>
        </MDBContainer>
      </Loading>
    </AdminSidebar>
  );
};

export default AddEmployee;
