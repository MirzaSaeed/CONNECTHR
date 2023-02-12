const express = require("express");
const {
  markCheckInAttendance,
  markCheckOutAttendance,
  getCheckInAttendance,
  getCheckOutAttendance,
} = require("../../controllers/employee-controllers/attendanceController");
const router = express.Router();
const {
  loginUser,
  loggedInuser,
  updateEmployee,
} = require("../../controllers/employee-controllers/userController");
const {
  applyLeave,
  getLeavesList,
} = require("../../controllers/employee-controllers/leaveController");
const {
  getPayroll,
} = require("../../controllers/employee-controllers/payrollController");
const { employeeProtect } = require("../../middleware/authMiddleware");


// ? Authentication
router.post("/employee/login", loginUser);
router.get("/employee/me", employeeProtect, loggedInuser);

// ? Update Employee Information
router.put("/employee/register/:id", employeeProtect, updateEmployee);

// ? Attendance Routes
router.post(
  "/employee/attendance/checkIn",
  employeeProtect,
  markCheckInAttendance
);
router.post(
  "/employee/attendance/checkOut",
  employeeProtect,
  markCheckOutAttendance
);
router.get(
  "/employee/attendance/checkIn",
  employeeProtect,
  getCheckInAttendance
);
router.get(
  "/employee/attendance/checkOut",
  employeeProtect,
  getCheckOutAttendance
);

// ? leave Routes
router.post("/employee/leaves/apply", employeeProtect, applyLeave);
router.get("/employee/leaves", employeeProtect, getLeavesList);

// ? Payroll Routes
router.get("/employee/payroll", employeeProtect, getPayroll);

module.exports = router;
