import React, { useEffect, useState } from "react";
import { Loading } from "../../../Core/Loading";
import "../../../../app.css";
import AdminSidebar from "../../../Core/AdminSidebar";
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
import Admin from "../../../Core/Admin";
import {  Link, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
const AttendanceDetail = () => {
  const navigate = useNavigate();
  const emp = JSON.parse(localStorage.getItem("Uid"));
  const id = emp[0];
  const [data, setData] = useState([{}]);

  let user = JSON.parse(localStorage.getItem("user"));
  const isUserAuth = async () => {
    const res = await axios
      .get("http://localhost:9000/auth/admin/me/", {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .catch((Error) => alert("Not Authorized"));

    if (res.status === 401) {
      navigate("*");
    }
  };

  // ? Get Employee attendance
  const response = async () => {
    await axios
      .get(`http://localhost:9000/auth/admin/employeeAttendance/${emp[0]}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => setData(res.data));
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
      .post(`/auth/admin/employeeAttendance/checkIn/${id}`, checkInData, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .catch((Error) => alert(JSON.stringify(Error.response.data)));
    if (response) {
      setCheckInData({
        checkIn: "",
      });
    }
  };

  const markCheckOut = async (e) => {
    e.preventDefault();
    const checkOutId = localStorage.getItem("checkOutId");
    // ! Fetch API data PUT method
    let response = await axios
      .put(
        `/auth/admin/employeeAttendance/checkOut?eid=${emp[0]}&aid=${checkOutId}`,
        checkOutData,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      )
      .catch((Error) => alert(JSON.stringify(Error.response.data)));
    if (response) {
      setCheckOutData({
        checkOut: "",
      });
    }
  };
  const getCheckOutID = (e, id) => {
    localStorage.setItem("checkOutId", id);
  };
  useEffect(() => {
    isUserAuth();
    response();
  }, [data]);
  return (
    <AdminSidebar>
      <Loading>
        <Admin title="Attendance Detail" />
        <MDBContainer fluid className="fadeIn">
          <MDBRow className="mx-2">
            <MDBCard className="mx-auto ">
              <span className="mt-2 mx-3">
                <Link role={"button"} color="primary" to="/auth/admin/attendance">
                  Back
                </Link>
              </span>
              <MDBCardBody className="career-search text-center mb-60">
                <div
                  className="career-form mb-60 bg-light col-lg-5 mb-4 px-4   shadow-4"
                >
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

                <MDBTable striped hover className="shadow-4">
                  <MDBTableHead className="table-light text-primary">
                    <tr>
                      <th scope="col">Date</th>

                      <th scope="col">Check In</th>
                      <th scope="col">Check Out</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody className="table-group-divider table-divider-color">
                    {data &&
                      data.map((data) => (
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
              </MDBCardBody>
            </MDBCard>
          </MDBRow>
        </MDBContainer>
      </Loading>
    </AdminSidebar>
  );
};

export default AttendanceDetail;
