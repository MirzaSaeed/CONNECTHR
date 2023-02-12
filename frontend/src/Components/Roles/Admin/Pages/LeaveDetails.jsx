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
const LeaveDetail = () => {
  const navigate = useNavigate();
  const emp = JSON.parse(localStorage.getItem("Uid"));
  const [data, setData] = useState([{}]);

  let user = JSON.parse(localStorage.getItem("user"));
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
  const response = async () => {
    await axios
      .get(`http://localhost:9000/auth/admin/leaves/${emp[0]}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => setData(res.data));
  };

  const approveLeave = async (e, pid) => {
    e.preventDefault();
    await axios.put(
      `/auth/admin/leave/approve?eid=${emp[0]}&pid=${pid}`,
      null,
      {
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );
  };
  const deniedLeave = async (e, pid) => {
    e.preventDefault();
    await axios.put(`/auth/admin/leave/denied?eid=${emp[0]}&pid=${pid}`, null, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
  };
  useEffect(() => {
    isUserAuth();
  }, []);
  useEffect(() => {
    response();
  }, [data]);
  return (
    <AdminSidebar>
      <Loading>
        <Admin title="Leave Detail" />
        <MDBContainer fluid className="fadeIn">
          <MDBRow className="mx-2">
            <MDBCard>
            <span className="mt-3 mx-2">
                  <Link role={"button"} color="primary" to="/auth/admin/leaves">
                    Back
                  </Link>
                </span>
              <MDBCardBody>
                
                <div className="text-center">
                  <MDBTable striped hover className="shadow-4">
                    <MDBTableHead className="table-light text-primary">
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">From</th>
                        <th scope="col">To</th>
                        <th scope="col">Reason</th>
                        <th scope="col">Status & Actions</th>
                      </tr>
                    </MDBTableHead>
                    <MDBTableBody className="table-group-divider table-divider-color">
                      {data &&
                        data.map((data) => (
                          <tr>
                            <th scope="row">{data.name}</th>
                            <th>
                              {" "}
                              {moment.utc(data.from).format("D MMM, YYYY")}
                            </th>
                            <th>
                              {" "}
                              {moment.utc(data.to).format("D MMM, YYYY")}
                            </th>
                            <th>{data.reason}</th>

                            {data.status === "pending" ? (
                              <th className="">
                                <button className="btn btn-link text-danger">
                                  {data.status}
                                </button>
                                <button
                                  className="btn btn-link"
                                  onClick={(e) => {
                                    approveLeave(e, data._id);
                                  }}
                                >
                                  Approve
                                </button>{" "}
                                <button
                                  className="btn btn-link"
                                  onClick={(e) => {
                                    deniedLeave(e, data._id);
                                  }}
                                >
                                  Reject
                                </button>
                              </th>
                            ) : data.status === "approved" ? (
                              <th className="text-success">Approved</th>
                            ) : data.status === "rejected" ? (
                              <th className="text-warning">Rejected</th>
                            ) : null}
                          </tr>
                        ))}
                    </MDBTableBody>
                  </MDBTable>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBRow>
        </MDBContainer>
      </Loading>
    </AdminSidebar>
  );
};

export default LeaveDetail;
