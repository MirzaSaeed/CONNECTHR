import {
  MDBCard,
  MDBCardBody,
  MDBContainer,
  MDBRow,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBTextArea,
} from "mdb-react-ui-kit";
import React from "react";
import EmployeeSidebar from "../../../Core/EmployeeSidebar";
import { Loading } from "../../../Core/Loading";
import User from "../../../Core/User";

const EmployeeLeaves = () => {
  return (
    <EmployeeSidebar>
      <Loading>
        <User title="Leave" />
        <MDBContainer fluid className="fadeIn">
          <MDBRow className="mx-2">
            <MDBCard className="mx-auto text-center">
              <MDBCardBody className="career-search mb-60">
                <div className="career-form mb-60 bg-light col-lg-4 mb-4   shadow-4">
                  <MDBRow className="row d-flex ">
                    <div
                      className="col-md-6 col-lg-6 my-3 text-dark "
                      style={{ fontSize: 18 + "px", padding: 8 + "px" }}
                    >
                      Apply for Leave:
                    </div>
                    <div className="col-md-6 col-lg-5 my-3">
                      <button
                        type="button"
                        className="btn btn-info btn-block btn-lg"
                        data-mdb-toggle="modal"
                        data-mdb-target="#exampleModal"
                      >
                        Apply
                      </button>
                      <div
                        className="modal"
                        id="exampleModal"
                        tabIndex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog modal-dialog-centered">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5
                                className="modal-title"
                                id="exampleModalLabel"
                              >
                                Applying for Leave
                              </h5>
                              <button
                                type="button"
                                className="btn-close"
                                data-mdb-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div className="modal-body">
                              <form>
                                <select className="form-control">
                                  <option defaultValue="" disabled select>
                                    Select Leave Type
                                  </option>
                                  <option value="Annual Leave">
                                    Annual Leave
                                  </option>
                                  <option value="Casual Leave">
                                    Casual Leave
                                  </option>
                                  <option value="Sick Leave">Sick Leave</option>
                                  <option value="Maternity Leave">
                                    Maternity Leave
                                  </option>
                                  <option value="Paternity Leave">
                                    Paternity Leave
                                  </option>
                                  <option value="Compensatory off">
                                    Compensatory off
                                  </option>
                                  <option value="Marriage Leave">
                                    Marriage Leave
                                  </option>
                                  <option value="Leave Without Pay">
                                    Leave Without Pay
                                  </option>
                                  <option value="Bereavement Leave">
                                    Bereavement Leave
                                  </option>
                                </select>
                                <MDBTextArea
                                  className="md-4 mt-3"
                                  label="Reason"
                                  id="textAreaExample"
                                  rows={4}
                                />
                              </form>
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
                                Submit
                              </button>
                            </div>
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
                      <th scope="col">Leave Type</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody className="table-group-divider table-divider-color">
                    <tr>
                      <th scope="row">Calender</th>
                      <td>Type of Leave</td>
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

export default EmployeeLeaves;
