const express = require("express");
const {
  markAttendance,
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
router.post("/employee/attendance/", markAttendance);
router.get("/employee/attendance/checkIn", getCheckInAttendance);
router.get("/employee/attendance/checkOut", getCheckOutAttendance);

module.exports = router;
