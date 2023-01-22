import { MDBSpinner } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";

export const Loading = ({ children }) => {
  
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <>
      {loading ? (
        <div
          className="d-flex align-item-center justify-content-center"
          style={{ paddingTop: 25 + "%" }}
        >
          <MDBSpinner
            color="primary"
            style={{ width: 3 + "rem", height: 3 + "rem" }}
          >
            <span className="visually-hidden">Loading...</span>
          </MDBSpinner>
        </div>
      ) : (
        children
      )}
    </>
  );
};
