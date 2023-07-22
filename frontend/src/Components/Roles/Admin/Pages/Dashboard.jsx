import axios from "axios";
import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBContainer,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import Admin from "../../../Core/Admin";
import AdminSidebar from "../../../Core/AdminSidebar";
import { Loading } from "../../../Core/Loading";
import { generatePath, Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../../config";
export default function Dashboard() {
  const navigate = useNavigate();
  let user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    navigate("*");
  }
  const [alert, setAlert] = useState(true);
  const [data, setData] = useState([{}]);
  const [verify, setVerify] = useState([{}]);

  const isUserAuth = async () => {
    const res = await axios
      .get(`${BASE_URL}/auth/admin/me/`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .catch((Error) => alert(JSON.stringify(Error.response.data)));
    if (res.status === 401) {
      navigate("*");
    }
  };
  const response = async () => {
    await axios
      .get(`${BASE_URL}/auth/admin/me/`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => setVerify(res.verify));
    setAlert(true);
  };

  const getData = async () => {
    await axios
      .get(`${BASE_URL}/auth/admin/register/`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => setData({ users: res.data }));
  };
  const userDetail = async (e, Uid) => {
    localStorage.setItem("Uid", Uid);
    e.preventDefault();
    await axios
      .get(`${BASE_URL}/auth/admin/register/${Uid}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then(navigate(generatePath(`/auth/admin/${Uid}`)));
  };
  useEffect(() => {
    isUserAuth();
    response();
    getData();
    const timeId = setTimeout(() => {
      // After 2 seconds set the show value to false
      setAlert(false);
    }, 2000);
    return () => {
      clearTimeout(timeId);
    };
  }, []);

  return (
    <AdminSidebar>
      <Loading>
        {/* {alert ? (
          <Alert
            style={{
              zIndex: 2,
              position: "absolute",
              marginLeft: 1300 + "px",
              marginTop: 10 + "px",
            }}
            severity="success"
          >
            <AlertTitle>User is Authorized</AlertTitle>Welcome {data.firstName}{" "}
            {data.lastName}
          </Alert>
        ) : (
          <></> */}
        {/* )} */}
        <Admin title="Dashboard" />
        <MDBContainer fluid className="fadeIn">
          <MDBCard>
            <MDBCardHeader className="">
              <Link to="/auth/admin/addEmployee">
                <button type="button" className="btn btn-info">
                  Add Employee
                </button>
              </Link>
            </MDBCardHeader>
            <MDBCardBody>
              <MDBTable className="table align-middle mb-0 bg-white">
                <MDBTableHead className="bg-light text-primary">
                  <tr>
                    <th>Name</th>
                    <th>Position</th>
                    <th>Salary</th>
                    <th>Actions</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {data.users &&
                    data.users.map((user) => (
                      <tr>
                        <td key={user.uniqueid}>
                          <div className="d-flex align-items-center">
                            <div className="ms-3">
                              <p className="fw-bold mb-1">
                                {user.firstName} {user.lastName}
                              </p>
                              <p className="text-muted mb-0">{user.email}</p>
                            </div>
                          </div>
                        </td>

                        <td key={user.uniqueid}>{user.role}</td>
                        <td key={user.uniqueid}>{user.salary}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-link btn-sm btn-rounded text-primary"
                            onClick={(e) => {
                              userDetail(e, user._id);
                            }}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                </MDBTableBody>
              </MDBTable>
            </MDBCardBody>
          </MDBCard>
        </MDBContainer>
      </Loading>
    </AdminSidebar>
  );
}
