import axios from "axios";
import {
  MDBCard,
  MDBCardBody,
  MDBContainer,
  MDBRow,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { generatePath, Link, useNavigate } from "react-router-dom";
import Admin from "../../../Core/Admin";
import AdminSidebar from "../../../Core/AdminSidebar";
import { Loading } from "../../../Core/Loading";

const AdminLeaves = () => {
  const navigate = useNavigate();
  let user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    navigate("*");
  }
  const isUserAuth = async () => {
    const res = await axios
      .get("http://localhost:9000/auth/admin/me/", {
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
      .get(`/auth/admin/register/`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => setFormData(res.data));
  };

  const userDetail = async (e, Uid, fname, lname) => {
    localStorage.setItem("Uid", JSON.stringify([Uid, fname, lname]));
    e.preventDefault();
    await axios
      .get(`http://localhost:9000/auth/admin/register/${Uid}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then(navigate(generatePath(`/auth/admin/leaves/${Uid}`)));
  };
  useEffect(() => {
    isUserAuth();
    response();
  }, []);

  return (
    <AdminSidebar>
      <Loading>
        <Admin title="Leaves" />
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
                      <th scope="col">Name</th>
                      <th scope="col">Action</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody className="table-group-divider table-divider-color">
                    {formData &&
                      formData.map((data) => (
                        <tr>
                          <th>
                            {data.firstName} {data.lastName}
                          </th>
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

export default AdminLeaves;
