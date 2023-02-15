const express = require("express");
const {
  markCheckInAttendance,
  markCheckOutAttendance,
  getAttendance,
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
router.put(
  "/employee/attendance/checkOut/:id",
  employeeProtect,
  markCheckOutAttendance
);
router.get(
  "/employee/attendance/",
  employeeProtect,
  getAttendance
);


// ? leave Routes
router.post("/employee/leaves/apply", employeeProtect, applyLeave);
router.get("/employee/leaves", employeeProtect, getLeavesList);

// ? Payroll Routes
router.get("/employee/payroll", employeeProtect, getPayroll);

module.exports = router;
