import axios from "axios";
import { MDBContainer, MDBInput, MDBRow } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import Admin from "../../../Core/Admin";
import AdminSidebar from "../../../Core/AdminSidebar";
import { Loading } from "../../../Core/Loading";
import { BASE_URL } from "../../../../config";

const UpdateSalary = () => {
  const navigate = useNavigate();
  const userData = JSON.stringify(localStorage.getItem("Uid"));
  const parseIt = JSON.parse(userData);
  const emp = JSON.parse(parseIt);
  const id = emp[0];
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

  const [formData, setFormData] = useState({
    salary: "",
  });
  const { salary } = formData;
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value, //? for key used: name and for value used: value
    }));
  };
  const addPayroll = async (e) => {
    e.preventDefault();
    await axios
      .put(`${BASE_URL}/auth/admin/payroll/updateSalary/${id}`, formData, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => navigate(generatePath(`/auth/admin/home`)));
  };
  useEffect(() => {
    isUserAuth();
  }, []);
  return (
    <AdminSidebar>
      <Loading>
        <Admin title="Update Salary" />
        <MDBContainer fluid className="fadeIn">
          <div className="tab-pane" id="settings">
            <form>
              <MDBRow className="mb-3">
                <div className="col-md-12 col-lg-6 ">
                  <MDBInput
                    id="salary"
                    type="number"
                    name="salary"
                    placeholder="Type new Salary"
                    value={salary}
                    onChange={onChange}
                  />
                </div>
              </MDBRow>

              <button
                className="btn btn-primary"
                onClick={(e) => {
                  addPayroll(e);
                }}
              >
                Update Salary
              </button>
            </form>
          </div>
        </MDBContainer>
      </Loading>
    </AdminSidebar>
  );
};

export default UpdateSalary;
