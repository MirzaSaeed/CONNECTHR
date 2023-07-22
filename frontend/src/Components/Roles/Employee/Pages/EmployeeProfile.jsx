import axios from "axios";
import {
  MDBCard,
  MDBCardBody,
  MDBContainer,
  MDBTable,
  MDBTableBody,
  MDBTypography,
} from "mdb-react-ui-kit";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeSidebar from "../../../Core/EmployeeSidebar";
import { Loading } from "../../../Core/Loading";
import User from "../../../Core/User";
import "../CSS/Employee Profile.css";
import { BASE_URL } from "../../../../config";
const EmployeeProfile = () => {
  const navigate = useNavigate();
  let user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    navigate("*");
  }
  const [data, setData] = useState([{}]);
  const isUserAuth = async () => {
    const res = await axios
      .get(`${BASE_URL}/auth/employee/me/`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .catch((err) => alert(JSON.stringify(err.response.data)));
    if (res.status === 401) {
      navigate("*");
    }
  };
  const response = async () => {
    await axios
      .get(`${BASE_URL}/auth/employee/me/`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => setData(res.data));
  };

  useEffect(() => {
    isUserAuth();
    response();
  }, []);

  return (
    <EmployeeSidebar>
      <Loading>
        <User title="Profile" />
        <MDBContainer fluid>
          <MDBCard className="card mb-4">
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
                    <th>City:</th>
                    <td>{data.city}</td>
                  </tr>
                  <tr>
                    <th>E-mail:</th>
                    <td>{data.email}</td>
                  </tr>
                  <tr>
                    <th>Phone:</th>
                    <td>{data.contactNumber}</td>
                  </tr>

                  <MDBTypography
                    tag="h6"
                    className="mt-3 mb-2 "
                    color="primary"
                  >
                    Socail Link
                  </MDBTypography>
                  <tr>
                    <th>Linkedin:</th>
                    <td>
                      <a href={data.social}>{data.social}</a>
                    </td>
                  </tr>
                </MDBTableBody>
              </MDBTable>
            </MDBCardBody>
          </MDBCard>
        </MDBContainer>
      </Loading>
    </EmployeeSidebar>
  );
};

export default EmployeeProfile;
