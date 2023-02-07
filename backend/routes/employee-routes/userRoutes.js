const express = require("express");
const {
  markCheckInAttendance,markCheckOutAttendance,
  getCheckInAttendance,
  getCheckOutAttendance,
} = require("../../controllers/employee-controllers/userAttendance");
const router = express.Router();
const {
  registerUser,
  loginUser,
  loggedInuser,
  getEmployees,
  getEmployee,
  deleteEmployee,
  updateEmployee,
} = require("../../controllers/employee-controllers/userController");
const { applyLeave, getLeavesList } = require("../../controllers/employee-controllers/userLeave");
const {
  adminProtect,
  employeeProtect,
} = require("../../middleware/authMiddleware");

router.post("/employee/register", adminProtect, registerUser);
router.get("/employee/register", adminProtect, getEmployees);
router.get("/employee/register/:id", adminProtect, getEmployee);
router.put("/employee/register/:id", employeeProtect, updateEmployee);
router.delete("/employee/register/:id", adminProtect, deleteEmployee);
router.post("/employee/login", loginUser);
router.get("/employee/me", employeeProtect, loggedInuser);

// ? Attendance Routes
router.post("/employee/attendance/checkIn",employeeProtect, markCheckInAttendance);
router.post("/employee/attendance/checkOut",employeeProtect, markCheckOutAttendance);
router.get("/employee/attendance/checkIn",employeeProtect, getCheckInAttendance);
router.get("/employee/attendance/checkOut",employeeProtect ,getCheckOutAttendance);

// ? leave Routes
router.post("/employee/leaves/apply",employeeProtect, applyLeave);
router.get("/employee/leaves",employeeProtect, getLeavesList);

module.exports = router;
