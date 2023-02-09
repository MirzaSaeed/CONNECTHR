import axios from "axios";
import {
  MDBCard,
  MDBCardBody,
  MDBCardLink,
  MDBCardSubTitle,
  MDBCardText,
  MDBCardTitle,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from "mdb-react-ui-kit";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
      .catch((Error) => alert(JSON.stringify(Error.response.data)));
    if (res.status === 401) {
      navigate("*");
    }
  };

  // ! GET Leaves
  const [formData, setFormData] = useState([{}]);
  let response = async () => {
    await axios
      .get(`/auth/admin/leaves/`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => setFormData(res.data));
  };

  useEffect(() => {
    isUserAuth();
    response();
  }, []);

  return (
    <AdminSidebar>
      <Loading>
        <Admin title="Leave" />
        <MDBContainer fluid className="fadeIn ">
          <MDBRow>
            <MDBCol className="col-lg-12">
              <MDBCard className="text-center">
                <MDBCardBody className="career-search mb-60">
                  <MDBTable striped hover className="shadow-4">
                    <MDBTableHead className="table-light text-primary">
                      <tr>
                        <th scope="col">Employee Name</th>

                        <th scope="col">Leave Type</th>
                        <th scope="col">Leave from</th>
                        <th scope="col">Leave To</th>
                        <th scope="col">Reason</th>
                        <th scope="col">Status & Action</th>
                      </tr>
                    </MDBTableHead>
                    <MDBTableBody className="table-group-divider table-divider-color">
                      {formData &&
                        formData.map((data) => (
                          <tr>
                            <th scope="row">{data.name}</th>
                            <th>{data.type}</th>
                            <td>
                              {moment.utc(data.from).format("D MMM, YYYY")}
                            </td>
                            <td>{moment.utc(data.to).format("D MMM, YYYY")}</td>
                            <td>{data.reason}</td>
                            {data.status === "pending" ? (
                              <th className="">
                                <button className="btn btn-link text-danger">
                                  {data.status}
                                </button>{" "}
                                <button className="btn btn-link">
                                  Approve
                                </button>
                                <button className="btn btn-link">Reject</button>
                              </th>
                            ) : data.status === "approved" ? (
                              <th className="">
                                <button className="btn btn-link text-success">
                                  {data.status}
                                </button>
                              </th>
                            ) : (
                              <th className="">
                                <button className="btn btn-link text-warning">
                                  {data.status}
                                </button>
                              </th>
                            )}

                            <th></th>
                          </tr>
                        ))}
                    </MDBTableBody>
                  </MDBTable>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </Loading>
    </AdminSidebar>
  );
};

export default AdminLeaves;
