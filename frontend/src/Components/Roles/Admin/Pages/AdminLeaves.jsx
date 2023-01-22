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
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Admin from "../../../Core/Admin";
import AdminSidebar from "../../../Core/AdminSidebar";
import { Loading } from "../../../Core/Loading";

const AdminLeaves = () => {
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
        <Admin title="Leave" />
        <MDBContainer fluid className="fadeIn ">
          <MDBRow>
            <MDBCol className="col-lg-8">
              <MDBCard className="text-center">
                <MDBCardBody className="career-search mb-60">
                  <MDBTable striped hover className="shadow-4">
                    <MDBTableHead className="table-light text-primary">
                      <tr>
                        <th scope="col">Employees</th>

                        <th scope="col">Leaves</th>
                      </tr>
                    </MDBTableHead>
                    <MDBTableBody className="table-group-divider table-divider-color">
                      <tr>
                        <th scope="row">Muhammad Qasim</th>
                        <td>2</td>
                      </tr>
                    </MDBTableBody>
                  </MDBTable>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol>
              <MDBCard className="px-3 py-3">
                <MDBCardTitle className="text-primary ">
                  Leave Request
                </MDBCardTitle>
                <MDBCard className="bg-light shadow-4 px-1 py-1">
                  <MDBCardSubTitle
                    className=" pt-2 text-info "
                    style={{ fontWeight: "bold", fontSize: "large" }}
                  >
                    Muhammad Qasim
                  </MDBCardSubTitle>
                  <MDBCardText>
                    <span style={{ fontWeight: "bold" }}>Leave Type: </span>
                    Annual Leaves
                    <br />
                    <span style={{ fontWeight: "bold" }}>Reason: </span>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Dolorum doloremque quaerat perferendis excepturi culpa
                    deserunt, magnam veritatis obcaecati inventore aperiam dicta
                    ipsa illo qui voluptas facere esse cupiditate nihil nisi!{" "}
                    <br />
                    <button className="btn btn-link">
                      <MDBCardLink>Accept </MDBCardLink>
                    </button>
                    <button className="btn btn-link">
                      <MDBCardLink>Reject </MDBCardLink>
                    </button>
                  </MDBCardText>
                </MDBCard>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </Loading>
    </AdminSidebar>
  );
};

export default AdminLeaves;
