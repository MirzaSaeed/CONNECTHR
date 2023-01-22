import Register from "./Components/Core/Register";
import StarterPage from "./Components/Core/StarterPage";
import AdminAttendance from "./Components/Roles/Admin/Pages/AdminAttendance";
import AdminLeaves from "./Components/Roles/Admin/Pages/AdminLeaves";
import AdminPayroll from "./Components/Roles/Admin/Pages/AdminPayroll";
import AdminProfile from "./Components/Roles/Admin/Pages/AdminProfile";
import EditAdminProfile from "./Components/Roles/Admin/Pages/EditAdminProfile";
import EditEmployeeProfile from "./Components/Roles/Employee/Pages/EditEmployeeProfile";
import EmployeeAttendance from "./Components/Roles/Employee/Pages/EmployeeAttendance";
import EmployeeLeaves from "./Components/Roles/Employee/Pages/EmployeeLeaves";
import EmployeePayroll from "./Components/Roles/Employee/Pages/EmployeePayroll";
import EmployeeProfile from "./Components/Roles/Employee/Pages/EmployeeProfile";
import Error from "./Components/Errors/Error";

const Routing = [
  {
    path: "/",
    element: <StarterPage />,
  },
  {
    path: "/auth/admin/register",
    element: <Register />,
  },
  {
    path: "/auth/employee/home",
    element: <EmployeeProfile />,
  },
  {
    path: "/auth/employee/settings",
    element: <EditEmployeeProfile />,
  },
  {
    path: "/auth/employee/attendance",
    element: <EmployeeAttendance />,
  },
  {
    path: "/auth/employee/payroll",
    element: <EmployeePayroll />,
  },
  {
    path: "/auth/employee/leaves",
    element: <EmployeeLeaves />,
  },
  {
    path: "/auth/admin/profile",
    element: <AdminProfile />,
  },
  {
    path: "/auth/admin/settings",
    element: <EditAdminProfile />,
  },
  {
    path: "/auth/admin/attendance",
    element: <AdminAttendance />,
  },
  {
    path: "/auth/admin/payroll",
    element: <AdminPayroll />,
  },
  {
    path: "/auth/admin/leaves",
    element: <AdminLeaves />,
  },
  {
    path: "*",
    element: <Error />,
  },
];

export { Routing };
