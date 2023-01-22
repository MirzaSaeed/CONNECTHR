import { MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import React from "react";
import { Link } from "react-router-dom";
import "./Error.css";

const Error = () => {
  return (
    <div className="d-flex align-content-center justify-content-center fadeIn m-auto">
      <MDBTypography tag="section">
        <div
          className="px-4 py-5 px-md-5 text-center text-lg-start"
          style={{ backgroundColor: "#FFFFFF" }}
        >
          <MDBContainer>
            <MDBRow tag="div" className=" gx-lg-5">
              <MDBTypography tag="div" className="col-lg-6 mb-5 mb-lg-0">
                <MDBTypography
                  tag="h1"
                  className="my-3 display-3 fw-bold ls-tight"
                >
                  <MDBTypography tag="span" className="text-primary">
                    Employee
                  </MDBTypography>
                  <br />
                  <MDBTypography tag="span">Management System</MDBTypography>
                </MDBTypography>
                <MDBTypography tag="p" style={{ backgroundColor: "#FFFFFF" }}>
                  A distributive system that helps managers and employees to
                  work together and accurately monitor, access, manage, and
                  efficiently utilize the working hours for better business
                  growth.
                </MDBTypography>
              </MDBTypography>
              <MDBTypography tag="div" className="col-lg-6 mb-5 mb-lg-0">
                <h1 className="text-danger">404 ERROR!</h1>
                <h2>UH OH! You're lost.</h2>
                <p>
                  The page you are looking for does not exist. How you got here
                  is a mystery. But you can click the button below to go back to
                  the homepage.
                </p>
                <Link to="/">
                  <button class="btn btn-primary">HOME</button>
                </Link>
              </MDBTypography>
            </MDBRow>
          </MDBContainer>
        </div>
      </MDBTypography>
    </div>
  );
};

export default Error;
