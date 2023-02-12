import { React } from "react";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import EmployeeProfile from "./Components/Roles/Employee/Pages/EmployeeProfile";
import EditEmployeeProfile from "./Components/Roles/Employee/Pages/EditEmployeeProfile";
import EmployeeAttendance from "./Components/Roles/Employee/Pages/EmployeeAttendance";
import EmployeePayroll from "./Components/Roles/Employee/Pages/EmployeePayroll";
import EmployeeLeaves from "./Components/Roles/Employee/Pages/EmployeeLeaves";
import EditAdminProfile from "./Components/Roles/Admin/Pages/EditAdminProfile";
import AdminPayroll from "./Components/Roles/Admin/Pages/AdminPayroll";
import AdminAttendance from "./Components/Roles/Admin/Pages/AdminAttendance";
import AdminProfile from "./Components/Roles/Admin/Pages/AdminProfile";
import AdminLeaves from "./Components/Roles/Admin/Pages/AdminLeaves";
import { Route, Routes, useNavigate } from "react-router-dom";
import StarterPage from "./Components/Core/StarterPage";
import Register from "./Components/Core/Register";
import Dashboard from "./Components/Roles/Admin/Pages/Dashboard";
import Error from "./Components/Errors/Error";
import AddEmployee from "./Components/Roles/Admin/Pages/AddEmployee";
import EmployeeDetail from "./Components/Roles/Admin/Pages/EmployeeDetail";
import AddPayrollDetail from "./Components/Roles/Admin/Pages/AddPayrollDetail";
import PayrollDetail from "./Components/Roles/Admin/Pages/PayrollDetail";
import LeaveDetail from "./Components/Roles/Admin/Pages/LeaveDetails";
import UpdateSalary from "./Components/Roles/Admin/Pages/UpdateSalary";

function App(props) {
  return (
    <Routes>
      <Route path="/" element={<StarterPage />} />
      <Route path="/auth/admin/register" element={<Register />} />
      <Route path="/auth/employee/home" element={<EmployeeProfile />} />
      <Route path="/auth/employee/settings" element={<EditEmployeeProfile />} />
      <Route
        path="/auth/employee/attendance"
        element={<EmployeeAttendance />}
      />
      <Route path="/auth/employee/payroll" element={<EmployeePayroll />} />
      <Route path="/auth/employee/leaves" element={<EmployeeLeaves />} />
      <Route path="/auth/admin/home" 
      element={<Dashboard />}>
      </Route>
      <Route path="/auth/admin/profile" element={<AdminProfile />} />
      <Route path="/auth/admin/settings" element={<EditAdminProfile />} />
      <Route path="/auth/admin/attendance" element={<AdminAttendance />} />
      <Route path="/auth/admin/payroll" element={<AdminPayroll />} />
      <Route path="/auth/admin/leaves" element={<AdminLeaves />} />
      <Route path="/auth/admin/leaves/:id" element={<LeaveDetail />} />
      <Route path="/auth/admin/addEmployee" element={<AddEmployee />} />
      <Route path="/auth/admin/:id" element={<EmployeeDetail />} />
      <Route path="/auth/admin/payroll/add/:id" element={<AddPayrollDetail />} />
      <Route path="/auth/admin/payroll/:id" element={<PayrollDetail />} />
      <Route path="/auth/admin/payroll/salary/update/:id" element={<UpdateSalary />} />
      <Route path="*" element={<Error />} />

    </Routes>
  );
}

export default App;
