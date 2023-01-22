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
import React from "react";
import EmployeeSidebar from "../../../Core/EmployeeSidebar";
import { Loading } from "../../../Core/Loading";
import User from "../../../Core/User";

const EmployeeAttendance = () => {
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
                            <button type="button" className="btn btn-primary">
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
                    <tr>
                      <th scope="row">Calender</th>
                      <td>Time Unit</td>
                      <td>Time Unit</td>
                    </tr>
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
