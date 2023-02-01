import React, { useEffect, useState } from "react";
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBInput,
  MDBBtn,
  MDBTypography,
  MDBCard,
  MDBCardBody,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import "../../app.css";
import { Loading } from "./Loading";
import Layout from "./Layout";
import axios from "axios";

const StarterPage = () => {
  const navigate = useNavigate();
  let token = JSON.parse(localStorage.getItem("user"));
  const [basicActive, setBasicActive] = useState("admin");
  const isUserAuth = async () => {
    const res = await axios
      .get("http://localhost:9000/auth/admin/me/", {
        headers: { Authorization: `Bearer ${token.token}` },
      })
      .catch((Error) => alert(JSON.stringify(Error.response.data)));
    if (res.status === 200) {
      navigate("/auth/admin/home");
    }
  };
  useEffect(() => {
    isUserAuth();
  }, []);
  const handleBasicClick = (value) => {
    if (value === basicActive) {
      return;
    }

    setBasicActive(value);
  };
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  console.log(formData);
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value, //? for key used: name and for value used: value
    }));
  };
  const adminSubmit = async (e) => {
    e.preventDefault();

    // ! Fetch API data
    let response = await axios
      .post("http://localhost:9000/auth/admin/login/", formData)
      .catch((Error) => alert(JSON.stringify(Error.response.data)));
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
      alert("login Successful");
      navigate("/auth/admin/home");
      setFormData({
        email: "",
        password: "",
      });
    }
  };
  const employeeSubmit = async (e) => {
    e.preventDefault();

    // ! Fetch API data
    let response = await axios
      .post("http://localhost:9000/auth/employee/login/", formData)
      .catch((Error) => alert(JSON.stringify(Error.response.data)));
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
      alert("login Successful");
      navigate("/auth/employee/home");
      setFormData({
        email: "",
        password: "",
      });
    }
  };

  return (
    <Loading>
      <Layout>
        <MDBCard>
          <MDBCardBody className="py-5 px-md-5">
            <MDBTypography tag="h6">Login as:</MDBTypography>
            <MDBTabs justify pills className="mb-2">
              <MDBTabsItem>
                <MDBTabsLink
                  onClick={() => handleBasicClick("admin")}
                  active={basicActive === "admin"}
                >
                  Admin
                </MDBTabsLink>
              </MDBTabsItem>
              <MDBTabsItem>
                <MDBTabsLink
                  onClick={() => handleBasicClick("employee")}
                  active={basicActive === "employee"}
                >
                  Employee
                </MDBTabsLink>
              </MDBTabsItem>
            </MDBTabs>
            <MDBTabsContent>
              <MDBTabsPane show={basicActive === "admin"}>
                <form onSubmit={adminSubmit}>
                  <MDBInput
                    className="mb-4"
                    type="email"
                    name="email"
                    value={email}
                    onChange={onChange}
                    label="Email Address"
                  />
                  <MDBInput
                    className="mb-4"
                    type="password"
                    label="Password"
                    name="password"
                    value={password}
                    onChange={onChange}
                  />
                  <button
                    type="submit"
                    className="btn btn-primary btn-block mb-4"
                  >
                    Sign in
                  </button>
                  <div className="text-center">
                    <p>
                      Not Registered?{" "}
                      <Link to="/auth/admin/register">Sign Up</Link>
                    </p>
                  </div>
                </form>
              </MDBTabsPane>
              <MDBTabsPane show={basicActive === "employee"}>
                <form onSubmit={employeeSubmit}>
                  <MDBInput
                    className="mb-4"
                    type="email"
                    name="email"
                    value={email}
                    onChange={onChange}
                    label="Email Address"
                  />
                  <MDBInput
                    className="mb-4"
                    type="password"
                    label="Password"
                    name="password"
                    value={password}
                    onChange={onChange}
                  />
                  <button
                    type="submit"
                    className="btn btn-primary btn-block mb-4"
                  >
                    Sign in
                  </button>
                </form>
              </MDBTabsPane>
              <MDBTabsPane></MDBTabsPane>
            </MDBTabsContent>
          </MDBCardBody>
        </MDBCard>
      </Layout>
    </Loading>
  );
};
export default StarterPage;
