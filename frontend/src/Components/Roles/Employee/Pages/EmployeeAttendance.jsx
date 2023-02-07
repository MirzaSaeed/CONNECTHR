import axios from "axios";
import {
  MDBCard,
  MDBCardBody,
  MDBContainer,
  MDBInput,
  MDBRow,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from "mdb-react-ui-kit";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeSidebar from "../../../Core/EmployeeSidebar";
import { Loading } from "../../../Core/Loading";
import User from "../../../Core/User";

const EmployeeAttendance = () => {
  const navigate = useNavigate();
  let user = JSON.parse(localStorage.getItem("user"));
  const isUserAuth = async () => {
    const res = await axios
      .get("http://localhost:9000/auth/employee/me/", {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .catch((Error) => alert(JSON.stringify(Error.response.data)));
    if (res.status === 401) {
      navigate("*");
    }
  };
  useEffect(() => {
    isUserAuth();
    response();
  }, []);
  const [checkInData, setCheckInData] = useState({
    checkIn: "",
  });
  const [checkOutData, setCheckOutData] = useState({
    checkOut: "",
  });
  const { date, checkIn } = checkInData;
  const {  checkOut } = checkOutData;

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
      .post(`/auth/employee/attendance/checkIn/`, checkInData, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .catch((Error) => alert(JSON.stringify(Error.response.data)));
    if (response) {
      alert("Attendance Marked");
      navigate("/auth/employee/attendance");
      setCheckInData({
        checkIn: "",
      });
    }
  };
  const [formData, setFormData] = useState([{}]);

  // ! GET attendance
  const response = async () => {
    await axios
      .get("http://localhost:9000/auth/employee/attendance/checkIn/", {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => setFormData(res.data));
  };
  const markCheckOut = async (e) => {
    e.preventDefault();
    // ! Fetch API data PUT method
    let response = await axios
      .post(`/auth/employee/attendance/checkOut/`, checkOutData, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .catch((Error) => alert(JSON.stringify(Error.response.data)));
    if (response) {
      alert("Attendance Marked");
      navigate("/auth/employee/attendance");
      setCheckOutData({
        checkOut: "",
      });
    }
  };
  return (
    <EmployeeSidebar>
      <Loading>
        <User title="Attendance" />
        <MDBContainer fluid className="fadeIn">
          <MDBRow className="mx-2">
            <MDBCard className="mx-auto text-center">
              <MDBCardBody className="career-search mb-60">
                <div
                  action="#"
                  className="career-form mb-60 bg-light col-lg-5 mb-4 px-4   shadow-4"
                >
                  <MDBRow className=" d-flex ">
                    <div
                      className="col-md-6 col-lg-4 my-3 text-dark "
                      style={{ fontSize: 18 + "px", padding: 8 + "px" }}
                    >
                      Mark Attendance:
                    </div>
                    <div className="col-md-6 col-lg-4 my-3">
                      <button
                        type="button"
                        className="btn btn-info btn-block btn-lg"
                        data-mdb-toggle="modal"
                        data-mdb-target="#exampleModal1"
                      >
                        Check In
                      </button>
                    </div>
                    <div className="col-md-6 col-lg-4 my-3">
                      <button
                        type="button"
                        className="btn btn-info btn-block btn-lg"
                        data-mdb-toggle="modal"
                        data-mdb-target="#exampleModal2"
                      >
                        Check Out
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
                              <label htmlFor="checkIn">Select Date</label>
                            </div>
                            <div className="col-md-12 col-lg-8 my-2">
                              <MDBInput
                                className="col-lg-4"
                                id="checkIn"
                                type="date"
                                name="date"
                                onChange={onCheckIn}
                                value={date}
                              />
                            </div>
                            <div className="col-md-12 col-lg-4 my-3">
                              <label htmlFor="checkIn">Select Time</label>
                            </div>
                            <div className="col-md-12 col-lg-8 my-2">
                              <MDBInput
                                id="checkIn"
                                type="time"
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

                <MDBTable striped hover className="shadow-4">
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
                              : moment.utc(data.checkIn).format("LT")}
                          </td>
                          <td>
                            {!data.checkOut
                              ? null
                              : moment.utc(data.checkOut).format("LT")}
                          </td>
                        </tr>
                      ))}
                  </MDBTableBody>
                </MDBTable>
              </MDBCardBody>
            </MDBCard>
          </MDBRow>
        </MDBContainer>
      </Loading>
    </EmployeeSidebar>
  );
};

export default EmployeeAttendance;
