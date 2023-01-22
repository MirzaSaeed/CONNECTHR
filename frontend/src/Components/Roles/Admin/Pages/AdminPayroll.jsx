import React, { useEffect } from "react";
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
import { useNavigate } from "react-router-dom";
import axios from "axios";
const AdminPayroll = () => {
  const navigate = useNavigate();
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
  useEffect(()=>{
    isUserAuth();
  },[]);
  return (
    <AdminSidebar>
      <Loading>
        <Admin title="Payroll" />
        <MDBContainer fluid className="fadeIn">
          <MDBRow className="mx-2">
            <MDBCard>
              <MDBCardHeader>
                <button type="button" className="btn btn-success">
                  Update Payroll Status
                </button>

                <button type="button" className="mx-2 btn btn-secondary">
                  Pending
                </button>
              </MDBCardHeader>
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
                    <tr>
                      <th scope="row">November 2022</th>
                      <td>Muhammad Qasim</td>
                      <td>500$</td>
                      <td style={{color: 'green', fontWeight: 'bold'}}>Delivered</td>
                    </tr>
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
