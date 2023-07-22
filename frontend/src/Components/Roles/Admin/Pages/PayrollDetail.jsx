import React, { useEffect, useState } from "react";
import { Loading } from "../../../Core/Loading";
import "../../../../app.css";
import AdminSidebar from "../../../Core/AdminSidebar";
import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBContainer,
  MDBRow,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from "mdb-react-ui-kit";
import Admin from "../../../Core/Admin";
import { generatePath, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { BASE_URL } from "../../../../config";

const PayrollDetail = () => {
  const navigate = useNavigate();
  const emp = JSON.parse(localStorage.getItem("Uid"));
  const [data, setData] = useState([{}]);

  let user = JSON.parse(localStorage.getItem("user"));
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
  const response = async () => {
    await axios
      .get(`${BASE_URL}/auth/admin/payroll/${emp[0]}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => setData(res.data));
  };

  const updatePayroll = async (e, pid) => {
    e.preventDefault();
    await axios.put(
      `${BASE_URL}/auth/admin/payroll/update?eid=${emp[0]}&pid=${pid}`,
      null,
      {
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );
  };

  const getUserID = async (e) => {
    e.preventDefault();
    navigate(generatePath(`/auth/admin/payroll/add/${emp[0]}`));
  };
  const getEmpId = async (e) => {
    e.preventDefault();
    navigate(generatePath(`/auth/admin/payroll/salary/update/${emp[0]}`));
  };

  useEffect(() => {
    isUserAuth();
    response();
  }, [data]);
  return (
    <AdminSidebar>
      <Loading>
        <Admin title="Payroll Detail" />
        <MDBContainer fluid className="fadeIn">
          <MDBRow className="mx-2">
            <MDBCard>
              <span className="mt-2 mx-3">
                <Link role={"button"} color="primary" to="/auth/admin/payroll">
                  Back
                </Link>
              </span>
              <MDBCardHeader>
                <Link to="/auth/admin/payroll/add">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={(e) => {
                      getUserID(e);
                    }}
                  >
                    Add Payroll
                  </button>
                </Link>
                <Link to="/auth/admin/payroll/salary/update">
                  <button
                    type="button"
                    className="btn btn-primary mx-2"
                    onClick={(e) => {
                      getEmpId(e);
                    }}
                  >
                    Update Salary
                  </button>
                </Link>
              </MDBCardHeader>
              <MDBCardBody className="text-center">
                <MDBTable striped hover className="shadow-4">
                  <MDBTableHead className="table-light text-primary">
                    <tr>
                      <th scope="col">Date</th>
                      <th scope="col">Name</th>
                      <th scope="col">Salary</th>
                      <th scope="col">Status & Actions</th>
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
                            <th className="">
                              <button className="btn btn-link text-danger">
                                {data.status}
                              </button>
                              <button
                                className="btn btn-link"
                                onClick={(e) => {
                                  updatePayroll(e, data._id);
                                }}
                              >
                                Update
                              </button>
                            </th>
                          ) : data.status === "approved" ? (
                            <th className="">
                              <button className="btn btn-link text-success">
                                Delivered
                              </button>
                            </th>
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
    </AdminSidebar>
  );
};

export default PayrollDetail;
