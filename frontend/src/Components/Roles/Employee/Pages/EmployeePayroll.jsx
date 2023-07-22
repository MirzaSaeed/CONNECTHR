import React, { useEffect, useState } from "react";
import { Loading } from "../../../Core/Loading";
import User from "../../../Core/User";
import "../../../../app.css";
import EmployeeSidebar from "../../../Core/EmployeeSidebar";
import {
  MDBCard,
  MDBCardBody,
  MDBContainer,
  MDBRow,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { BASE_URL } from "../../../../config";

const EmployeePayroll = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([{}]);

  let user = JSON.parse(localStorage.getItem("user"));
  const isUserAuth = async () => {
    const res = await axios
      .get(`${BASE_URL}/auth/employee/me/`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .catch((Error) => alert(JSON.stringify(Error.response.data)));
    if (res.status === 401) {
      navigate("*");
    }
  };
  const response = async () => {
    await axios
      .get(`${BASE_URL}/auth/employee/payroll/`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => setData(res.data));
  };
  useEffect(() => {
    isUserAuth();
    response();
  }, [data]);

  return (
    <EmployeeSidebar>
      <Loading>
        <User title="Payroll" />
        <MDBContainer fluid className="fadeIn">
          <MDBRow className="mx-2">
            <MDBCard className="mx-auto ">
              {/* <MDBCardHeader>
                <MDBCardSubTitle className="btn btn-link">
                  <span style={{ fontSize: 18 + "px", textTransform: 'capitalize'}}>
                    Salary Slip{"  "}
                  </span>
                  <MDBIcon style={{ fontSize: 22 + "px" }} fas icon="print" />
                </MDBCardSubTitle>
              </MDBCardHeader> */}
              <MDBCardBody className="text-center">
                <MDBTable striped hover className="shadow-4">
                  <MDBTableHead className="table-light text-primary">
                    <tr>
                      <th scope="col">Date</th>
                      <th scope="col">Name</th>
                      <th scope="col">Salary</th>
                      <th scope="col">Status</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody className="table-group-divider table-divider-color">
                    {data &&
                      data.map((data) => (
                        <tr>
                          <th scope="row">
                            {moment.utc(data.month).format("D MMM, YYYY")}
                          </th>
                          <th>{data.name}</th>
                          <th>{data.salary}</th>

                          {data.status === "pending" ? (
                            <th className="text-danger">Pending</th>
                          ) : data.status === "approved" ? (
                            <th className="text-success">Delivered</th>
                          ) : null}
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

export default EmployeePayroll;
