import React from "react";
import { Loading } from "../../../Core/Loading";
import User from "../../../Core/User";
import "../../../../app.css";
import EmployeeSidebar from "../../../Core/EmployeeSidebar";
import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCardSubTitle,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from "mdb-react-ui-kit";
const EmployeePayroll = () => {
  return (
    <EmployeeSidebar>
      <Loading>
        <User title="Payroll" />
        <MDBContainer fluid className="fadeIn">
          <MDBRow className="mx-2">
            <MDBCard className="mx-auto ">
              <MDBCardHeader>
                <MDBCardSubTitle className="btn btn-link">
                  <span style={{ fontSize: 18 + "px", textTransform: 'capitalize'}}>
                    Salary Slip{"  "}
                  </span>
                  <MDBIcon style={{ fontSize: 22 + "px" }} fas icon="print" />
                </MDBCardSubTitle>
              </MDBCardHeader>
              <MDBCardBody className="text-center">
                <MDBTable striped hover className="shadow-4">
                  <MDBTableHead className="table-light text-primary">
                    <tr>
                      <th scope="col">Month</th>

                      <th scope="col">Salary</th>
                      <th scope="col">Status</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody className="table-group-divider table-divider-color">
                    <tr>
                      <td>June</td>
                      <td>20000</td>
                      <td style={{ color: "green", fontWeight: "bold" }}>
                        Delivered
                      </td>
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

export default EmployeePayroll;
