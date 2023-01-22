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

const AdminProfile = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([{}]);
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
  const response = async () => {
    await axios
    .get("/auth/admin/me/", {
      headers: { Authorization: `Bearer ${user.token}` },
    })
    .then((res) => setData(res.data));
  };
  
  useEffect(() => {
    isUserAuth();
    response();
  }, []);
  console.log();
  return (
    <AdminSidebar>
      <Loading>
        <Admin title="Profile" />
        <MDBContainer fluid>
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
                    <td>{moment.utc(data.birthday).format("MMM D, YYYY")}</td>
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
                    <th>Contact Number:</th>
                    <td>{data.contactNumber}</td>
                  </tr>
                  <MDBTypography
                    tag="h6"
                    className="mt-3 mb-2 "
                    color="primary"
                  >
                    Company Information
                  </MDBTypography>
                  <tr>
                    <th>Company Name:</th>
                    <td>{data.companyName}</td>
                  </tr>
                  <tr>
                    <th>Company URL:</th>
                    <td>
                      <a href={data.companyURL}>{data.companyURL}</a>
                    </td>
                  </tr>
                  <tr>
                    <th>Branch Name:</th>
                    <td>{data.branchName}</td>
                  </tr>
                  <tr>
                    <th>No. of Employees</th>
                    <td>{data.totalEmployees}</td>
                  </tr>
                  <MDBTypography
                    tag="h6"
                    className="mt-3 mb-2 "
                    color="primary"
                  >
                    Address Details
                  </MDBTypography>
                  <tr>
                    <th>City:</th>
                    <td>{data.city}</td>
                  </tr>
                  <tr>
                    <th>Zip Code:</th>
                    <td>{data.zipcode}</td>
                  </tr>
                </MDBTableBody>
              </MDBTable>
            </MDBCardBody>
          </MDBCard>
        </MDBContainer>
      </Loading>
    </AdminSidebar>
  );
};

export default AdminProfile;
