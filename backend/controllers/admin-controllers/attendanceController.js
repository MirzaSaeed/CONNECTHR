const asyncHandler = require("express-async-handler");
const attendanceModel = require("../../models/admin-models/attendanceModel");
const employeeAttendanceModel = require("../../models/employee-models/attendanceModel");
const adminModel = require("../../models/admin-models/userModel");
const employeeModel = require("../../models/employee-models/userModel");

// * POST Request
// * Post /auth/admin/attendance
const markCheckInAttendance = asyncHandler(async (req, res) => {
  const user = await adminModel.findById(req.user.id);
  if (!user) {
    res.status(400).json({ message: "User Not Found" });
  } else {
    const { checkIn } = req.body;
    if (!checkIn) {
      res.status(400).json("ERROR! Please add Attendace Date & Time");
    } else {
      const mark = await attendanceModel.create({
        checkIn,
        admin: req.user.id,
      });
      if (mark) {
        res.status(201).json({
          checkIn,
        });
      }
    }
  }
});

// * GET Request
// * Get /auth/admin/attendance/checkIn
const getAttendance = asyncHandler(async (req, res) => {
  const attendance = await attendanceModel.find({ admin: req.user.id });
  res.status(200).json(attendance);
});

// * PUT Request
// * PUT /auth/admin/attendance
const markCheckOutAttendance = asyncHandler(async (req, res) => {
  // const pId = req.params.id;
  const isAdmin = await adminModel.findById(req.user.id);
  if (isAdmin) {
    const { checkOut } = req.body;

    const mark = await attendanceModel.findByIdAndUpdate(req.params.id, {
      checkOut,
    });
    res.status(200).json(mark);
  } else {
    res.status(401).json("Not Authorized");
  }
});

// * Employee Attendance
// * GET Request
// * Get /auth/admin/employeeAttendance
const getEmployeeAttendanceById = asyncHandler(async (req, res) => {
  const isEmployee = await employeeAttendanceModel.find({
    employee: req.params.id,
  });
  if (!isEmployee) {
    res.status(401).json("Not Authorized");
  }
  res.status(201).json(isEmployee);
});

// * POST Request
// * Post /auth/admin/employeeAttendance/checkIn
const markCheckInEmployeeAttendance = asyncHandler(async (req, res) => {
  const user = await employeeModel.find({ employee: req.params.id });
  if (!user) {
    res.status(400).json({ message: "User Not Found" });
  } else {
    const { checkIn } = req.body;
    if (!checkIn) {
      res.status(400).json("ERROR! Please add Attendace Date & Time");
    } else {
      const mark = await employeeAttendanceModel.create({
        checkIn,
        employee: req.params.id,
        admin: req.user.id,
      });
      if (mark) {
        res.status(201).json({
          checkIn,
        });
      }
    }
  }
});

// * PUT Request
// * PUT /auth/admin/employeeAttendance/checkOut
const markCheckOutEmployeeAttendance = asyncHandler(async (req, res) => {
  const eId = req.query.eid;
  const aId = req.query.aid;
  // const pId = req.params.id;
  const isEmployee = await employeeModel.findById(eId);
  if (isEmployee) {
    const { checkOut } = req.body;

    const mark = await employeeAttendanceModel.findByIdAndUpdate(aId, {
      checkOut,
    });
    res.status(200).json(mark);
  } else {
    res.status(401).json("Not Authorized");
  }
});

module.exports = {
  markCheckInAttendance,
  markCheckOutAttendance,
  getAttendance,
  getEmployeeAttendanceById,
  markCheckInEmployeeAttendance,
  markCheckOutEmployeeAttendance,
};
