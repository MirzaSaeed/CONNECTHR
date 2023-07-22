import axios from "axios";
import {
  MDBCard,
  MDBCardBody,
  MDBContainer,
  MDBTable,
  MDBTableBody,
  MDBTypography,
} from "mdb-react-ui-kit";
import React, { useState } from "react";
import { useEffect } from "react";
import Admin from "../../../Core/Admin";
import AdminSidebar from "../../../Core/AdminSidebar";
import { Loading } from "../../../Core/Loading";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../../config";
const EmployeeDetail = () => {
  const navigate = useNavigate();
  const Uid = localStorage.getItem("Uid");
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
      .get(`${BASE_URL}/auth/admin/register/${Uid}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => setData(res.data));
  };

  const deleteUser = async (e, id) => {
    await axios
      .delete(`${BASE_URL}/auth/admin/register/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then(localStorage.removeItem("Uid"), navigate("/auth/admin/home"));
  };
  useEffect(() => {
    isUserAuth();

    if (Uid) {
      response();
    }
  }, []);
  return (
    <AdminSidebar>
      <Loading>
        <Admin title="Employee Information" />
        <MDBContainer fluid className="fadeIn">
          <MDBCard className="card ">
            <MDBCardBody>
              <div className="media-body ml-4">
                <MDBTypography tag="h4" className="font-weight-bold mb-0">
                  {data.firstName} {data.lastName}
                </MDBTypography>
                <span className="text-muted font-weight-normal">
                  {data.role}
                </span>
              </div>
              <MDBTable className="table user-view-table m-0">
                <MDBTableBody>
                  <MDBTypography
                    tag="h6"
                    className="mt-3 mb-2 "
                    color="primary"
                  >
                    Personal Information
                  </MDBTypography>
                  <tr>
                    <th>Birthday:</th>
                    <td>
                      {!data.birthday
                        ? null
                        : moment.utc(data.birthday).format("MMM D, YYYY")}
                    </td>
                  </tr>
                  <tr>
                    <th>Gender:</th>
                    <td>{data.gender}</td>
                  </tr>

                  <tr>
                    <th>E-mail:</th>
                    <td>{data.email}</td>
                  </tr>
                  <tr>
                    <th>City:</th>
                    <td>{data.city}</td>
                  </tr>
                  <tr>
                    <th>Contact Number:</th>
                    <td>{data.contactNumber}</td>
                  </tr>
                  <tr>
                    <th>Salary:</th>
                    <td>{data.salary}</td>
                  </tr>

                  <MDBTypography
                    tag="h6"
                    className="mt-3 mb-2 "
                    color="primary"
                  >
                    Social Link
                  </MDBTypography>
                  <tr>
                    <th>LinkedIn:</th>
                    <td>
                      <a href={data.social}>{data.social}</a>
                    </td>
                  </tr>
                </MDBTableBody>
              </MDBTable>
              <button
                type="button"
                className="btn btn-danger my-2"
                onClick={(e) => {
                  deleteUser(e, data._id);
                }}
              >
                Delete Employee
              </button>
            </MDBCardBody>
          </MDBCard>
        </MDBContainer>
      </Loading>
    </AdminSidebar>
  );
};

export default EmployeeDetail;
