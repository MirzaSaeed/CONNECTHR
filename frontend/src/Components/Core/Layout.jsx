import {
  MDBContainer,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import React from "react";

const Layout = ({ children }) => {
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
                    Welcome to!
                  </MDBTypography>
                  <br />
                  <MDBTypography tag="span">
                    Employee Management System
                  </MDBTypography>
                </MDBTypography>
                <MDBTypography tag="p" style={{ backgroundColor: "#FFFFFF" }}>
                  A distributive system that helps managers and employees to
                  work together and accurately monitor, access, manage, and
                  efficiently utilize the working hours for better business
                  growth.
                </MDBTypography>
              </MDBTypography>
              <MDBTypography tag="div" className="col-lg-4 mb-5 mb-lg-0">
                {children}
              </MDBTypography>
            </MDBRow>
          </MDBContainer>
        </div>
      </MDBTypography>
    </div>
  );
};

export default Layout;
