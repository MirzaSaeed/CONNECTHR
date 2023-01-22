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
} from "mdb-react-ui-kit";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Admin from "../../../Core/Admin";
import AdminSidebar from "../../../Core/AdminSidebar";
import { Loading } from "../../../Core/Loading";

const AdminAttendance = () => {
  const navigate = useNavigate();
  let user = JSON.parse(localStorage.getItem("user"));
  if(!user){
    navigate('*')
  }
  const isUserAuth = async () => {
    const res = await axios
      .get("http://localhost:9000/auth/admin/me/", {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .catch((Error) => alert(JSON.stringify(Error.response.data)));
    if (res.status === 401) {
      navigate("*");
    }
  };
  useEffect(()=>{
    isUserAuth();
  },[]);
  return (
    <AdminSidebar>
      <Loading>
        <Admin title="Attendance" />
        <MDBContainer fluid className="fadeIn">
          <MDBRow className="mx-2">
            <MDBCard className="mx-auto text-center">
              <MDBCardHeader>
                <div className="career-form bg-light col-lg-5  px-4   shadow-4">
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
                          <div className=" modal-body">
                            <MDBRow>
                              <div className="col-md-12 col-lg-4 my-3">
                                <label htmlFor="checkIn">Select Employee</label>
                              </div>
                              <div className="col-md-12 col-lg-8 my-2">
                                <select className="form-control">
                                  <option value="" disabled selected>
                                    Select
                                  </option>
                                  <option value="Islamabad">Muhammad Qasim</option>
                                </select>
                              </div>
                            </MDBRow>
                            <MDBRow>
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
                                />
                              </div>
                            </MDBRow>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              data-mdb-dismiss="modal"
                            >
                              Close
                            </button>
                            <button type="button" className="btn btn-primary">
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
                          <div className=" modal-body">
                            <MDBRow>
                              <div className="col-md-12 col-lg-4 my-3">
                                <label htmlFor="checkIn">Select Employee</label>
                              </div>
                              <div className="col-md-12 col-lg-8 my-2">
                                <select className="form-control">
                                  <option value="" disabled selected>
                                    Select
                                  </option>
                                  <option value="Islamabad">Muhammad Qasim</option>
                                </select>
                              </div>
                            </MDBRow>
                            <MDBRow>
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
                                />
                              </div>
                            </MDBRow>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              data-mdb-dismiss="modal"
                            >
                              Close
                            </button>
                            <button type="button" className="btn btn-primary">
                              Mark Attendance
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </MDBRow>
                </div>
              </MDBCardHeader>
              <MDBCardBody className="career-search mb-60">
                <div
                  className="modal"
                  id="row1"
                  tabIndex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                          Muhammad Qasim
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-mdb-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <MDBCard>
                        <MDBCardBody>
                          <MDBRow className=" modal-body">
                            <MDBTable striped hover className="shadow-4">
                              <MDBTableHead className="table-light ">
                                <tr>
                                  <th scope="col">Date</th>

                                  <th scope="col">Check In</th>
                                  <th scope="col">Check Out</th>
                                </tr>
                              </MDBTableHead>
                              <MDBTableBody className="table-group-divider table-divider-color">
                                <tr>
                                  <th>22-Nov-2022</th>

                                  <td>09:55 AM</td>
                                  <td>06:30 PM</td>
                                </tr>
                                <tr>
                                  <th>21-Nov-2022</th>

                                  <td>10:02 AM</td>
                                  <td>06:25 PM</td>
                                </tr>
                                <tr>
                                  <th>20-Nov-2022</th>

                                  <td>09:53 AM</td>
                                  <td>06:35 PM</td>
                                </tr>
                              </MDBTableBody>
                            </MDBTable>
                          </MDBRow>
                        </MDBCardBody>
                      </MDBCard>

                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-mdb-dismiss="modal"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <MDBTable striped hover className="shadow-4">
                  <MDBTableHead className="table-light text-primary">
                    <tr>
                      <th scope="col">Employees</th>

                      <th scope="col">Details</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody className="table-group-divider table-divider-color">
                    <tr>
                      <th scope="row">Muhammad Qasim</th>
                      <td>
                        <button
                          type="button"
                          className="btn btn-info btn-sm"
                          data-mdb-toggle="modal"
                          data-mdb-target="#row1"
                        >
                          View
                        </button>
                      </td>
                    </tr>
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
