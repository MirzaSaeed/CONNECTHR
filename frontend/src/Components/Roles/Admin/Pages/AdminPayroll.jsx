import React, { useEffect, useState } from "react";
import { Loading } from "../../../Core/Loading";
import "../../../../app.css";
import AdminSidebar from "../../../Core/AdminSidebar";
import {
  MDBCard,
  MDBCardBody,
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
const AdminPayroll = () => {
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

  // ! GET Leaves
  const [formData, setFormData] = useState([{}]);
  let response = async () => {
    await axios
      .get(`${BASE_URL}/auth/admin/register/`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => setFormData(res.data));
  };

  const userDetail = async (e, Uid, fname, lname) => {
    localStorage.setItem("Uid", JSON.stringify([Uid, fname, lname]));
    e.preventDefault();
    await axios
      .get(`${BASE_URL}/auth/admin/register/${Uid}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then(navigate(generatePath(`/auth/admin/payroll/${Uid}`)));
  };
  useEffect(() => {
    isUserAuth();
    response();
  }, []);
  return (
    <AdminSidebar>
      <Loading>
        <Admin title="Payroll" />
        <MDBContainer fluid className="fadeIn">
          <MDBRow className="mx-2">
            <MDBCard>
              <span className="mt-3 mx-2">
                <Link role={"button"} color="primary" to="/auth/admin/home">
                  Back
                </Link>
              </span>
              <MDBCardBody className="text-center">
                <MDBTable striped hover className="shadow-4">
                  <MDBTableHead className="table-light text-primary">
                    <tr>
                      <th scope="col">Date</th>
                      <th scope="col">Name</th>
                      <th scope="col">Salary</th>
                      <th scope="col">Action</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody className="table-group-divider table-divider-color">
                    {formData &&
                      formData.map((data) => (
                        <tr>
                          <th scope="row">
                            {moment.utc(data.month).format("D MMM, YYYY")}
                          </th>
                          <th>
                            {data.firstName} {data.lastName}
                          </th>
                          <th>{data.salary}</th>
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
                              View Detail
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

export default AdminPayroll;
