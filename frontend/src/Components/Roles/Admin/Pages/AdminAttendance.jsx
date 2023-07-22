import axios from "axios";
import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBContainer,
  MDBInput,
  MDBRow,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBTypography,
} from "mdb-react-ui-kit";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import Admin from "../../../Core/Admin";
import AdminSidebar from "../../../Core/AdminSidebar";
import { Loading } from "../../../Core/Loading";
import { BASE_URL } from "../../../../config";
const AdminAttendance = () => {
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

  const [checkInData, setCheckInData] = useState({
    checkIn: "",
  });
  const [checkOutData, setCheckOutData] = useState({
    checkOut: "",
  });
  const { checkIn } = checkInData;
  const { checkOut } = checkOutData;

  const onCheckIn = (e) => {
    setCheckInData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value, //? for key used: name and for value used: value
    }));
  };
  const onCheckOut = (e) => {
    setCheckOutData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value, //? for key used: name and for value used: value
    }));
  };
  const markCheckIn = async (e) => {
    e.preventDefault();
    // ! Fetch API data PUT method
    let response = await axios
      .post(`${BASE_URL}/auth/admin/attendance/checkIn/`, checkInData, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .catch((Error) => alert(JSON.stringify(Error.response.data)));
    if (response) {
      navigate("/auth/admin/attendance");
      setCheckInData({
        checkIn: "",
      });
    }
  };
  const [formData, setFormData] = useState([{}]);

  // ! GET attendance
  const response = async () => {
    await axios
      .get(`${BASE_URL}/auth/admin/attendance/`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => setFormData(res.data));
  };
  const markCheckOut = async (e) => {
    e.preventDefault();
    const checkOutId = localStorage.getItem("checkOutId");
    // ! Fetch API data PUT method
    let response = await axios
      .put(
        `${BASE_URL}/auth/admin/attendance/checkOut/${checkOutId}`,
        checkOutData,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      )
      .catch((Error) => alert(JSON.stringify(Error.response.data)));
    if (response) {
      navigate("/auth/admin/attendance");
      setCheckOutData({
        checkOut: "",
      });
    }
  };
  const getCheckOutID = (e, id) => {
    localStorage.setItem("checkOutId", id);
  };

  // ? get Emlployee List
  const [employee, setEmployee] = useState([{}]);
  let getEmployee = async () => {
    await axios
      .get(`${BASE_URL}/auth/admin/register/`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => setEmployee(res.data));
  };

  // ? Get Employee Id
  const userDetail = async (e, Uid, fname, lname) => {
    localStorage.setItem("Uid", JSON.stringify([Uid, fname, lname]));
    e.preventDefault();
    await axios
      .get(`${BASE_URL}/auth/admin/register/${Uid}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then(navigate(generatePath(`/auth/admin/employeeAttendance/${Uid}`)));
  };
  useEffect(() => {
    isUserAuth();
    response();
    getEmployee();
  }, [formData]);

  return (
    <AdminSidebar>
      <Loading>
        <Admin title="Attendance" />
        <MDBContainer fluid className="fadeIn">
          <MDBRow className="mx-2">
            <MDBCard className="mx-auto ">
              <MDBCardHeader>
                <div className="career-form bg-light col-lg-5  px-4   shadow-4 text-center">
                  <MDBRow className=" d-flex ">
                    <div
                      className="col-md-6 col-lg-6 my-3 text-dark "
                      style={{ fontSize: 18 + "px", padding: 8 + "px" }}
                    >
                      Mark Attendance:
                    </div>
                    <div className="col-md-6 col-lg-6 my-3">
                      <button
                        type="button"
                        className="btn btn-info btn-block btn-lg"
                        data-mdb-toggle="modal"
                        data-mdb-target="#exampleModal1"
                      >
                        Check In
                      </button>
                    </div>
                    <div
                      className="modal"
                      id="exampleModal1"
                      tabIndex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                              Check In
                            </h5>
                            <button
                              type="button"
                              className="btn-close"
                              data-mdb-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <MDBRow className=" modal-body">
                            <div className="col-md-12 col-lg-4 my-3">
                              <label htmlFor="checkIn">
                                Select Date & Time
                              </label>
                            </div>
                            <div className="col-md-12 col-lg-8 my-2">
                              <MDBInput
                                id="checkIn"
                                type="datetime-local"
                                name="checkIn"
                                onChange={onCheckIn}
                                value={checkIn}
                              />
                            </div>
                          </MDBRow>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              data-mdb-dismiss="modal"
                            >
                              Close
                            </button>
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={(e) => markCheckIn(e)}
                            >
                              Mark Attendance
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="modal"
                      id="exampleModal2"
                      tabIndex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                              Check Out
                            </h5>
                            <button
                              type="button"
                              className="btn-close"
                              data-mdb-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <MDBRow className=" modal-body">
                            <div className="col-md-12 col-lg-4 my-3">
                              <label htmlFor="checkIn">
                                Select Date & Time
                              </label>
                            </div>
                            <div className="col-md-12 col-lg-8 my-2">
                              <MDBInput
                                id="checkOut"
                                type="datetime-local"
                                name="checkOut"
                                onChange={onCheckOut}
                                value={checkOut}
                              />
                            </div>
                          </MDBRow>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              data-mdb-dismiss="modal"
                            >
                              Close
                            </button>
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={(e) => markCheckOut(e)}
                            >
                              Mark Attendance
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </MDBRow>
                </div>
                <MDBRow>
                  <MDBTypography
                    tag="h6"
                    className="mt-3 mb-2 text-left"
                    color="primary"
                  >
                    My Attendance
                  </MDBTypography>
                  <MDBTable striped hover className="text-center shadow-4">
                    <MDBTableHead className="table-light text-primary">
                      <tr>
                        <th scope="col">Date</th>

                        <th scope="col">Check In</th>
                        <th scope="col">Check Out</th>
                      </tr>
                    </MDBTableHead>
                    <MDBTableBody className="table-group-divider table-divider-color">
                      {formData &&
                        formData.map((data) => (
                          <tr>
                            <th scope="row">
                              {moment.utc(data.checkIn).format("MMM D, YYYY")}
                            </th>
                            <td>
                              {!data.checkIn
                                ? null
                                : moment(data.checkIn).format("LT")}
                            </td>
                            <td>
                              {!data.checkOut ? (
                                <button
                                  type="button"
                                  className="btn btn-link"
                                  data-mdb-toggle="modal"
                                  data-mdb-target="#exampleModal2"
                                  onClick={(e) => {
                                    getCheckOutID(e, data._id);
                                  }}
                                >
                                  Check Out
                                </button>
                              ) : (
                                moment(data.checkOut).format("LT")
                              )}
                            </td>
                          </tr>
                        ))}
                    </MDBTableBody>
                  </MDBTable>
                </MDBRow>
              </MDBCardHeader>

              <MDBCardBody className=" career-search mb-60">
                <MDBTypography
                  tag="h6"
                  className=" mb-2 text-left"
                  color="primary"
                >
                  Employees Attendance
                </MDBTypography>
                <MDBTable striped hover className="text-center shadow-4">
                  <MDBTableHead className="table-light text-primary">
                    <tr>
                      <th scope="col">Employees</th>

                      <th scope="col">Details</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody className="table-group-divider table-divider-color">
                    {employee &&
                      employee.map((data) => (
                        <tr>
                          <th scope="row">
                            {data.firstName} {data.lastName}
                          </th>
                          <th>
                            <button
                              className="btn btn-link"
                              onClick={(e) => {
                                userDetail(
                                  e,
                                  data._id,
                                  data.firstName,
                                  data.lastName
                                );
                              }}
                            >
                              View Attendance
                            </button>
                          </th>
                        </tr>
                      ))}
                  </MDBTableBody>
                </MDBTable>
              </MDBCardBody>
            </MDBCard>
          </MDBRow>
        </MDBContainer>
      </Loading>
    </AdminSidebar>
  );
};

export default AdminAttendance;
