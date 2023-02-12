const express = require("express");
const asyncHandler = require("express-async-handler");
const attendanceModel = require("../../models/employee-models/userAttendance");
const employeeModel = require("../../models/employee-models/userModel");

// * POST Request
// * Post /auth/employee/attendance
const markCheckInAttendance = asyncHandler(async (req, res) => {
  const user = await employeeModel.findById(req.user.id);
  if (!user) {
    res.status(400).json({ message: "User Not Found" });
  } else {
    const { date, checkIn } = req.body;
    if (!(date || checkIn)) {
      res.status(400).json("ERROR! Please add Attendace Date & Time");
    }
    const mark = await attendanceModel.create({
      checkIn,
      employee: req.user.id,
    });
    if (mark) {
      res.status(201).json({
        checkIn,
      });
    }
  }
});

// * GET Request
// * Get /auth/employee/attendance/checkIn
const getCheckInAttendance = asyncHandler(async (req, res) => {
  const attendance = await attendanceModel.find({ employee: req.user.id});
  res.status(200).json(attendance);
});

// * POST Request
// * Post /auth/employee/attendance
const markCheckOutAttendance = asyncHandler(async (req, res) => {
  const user = await employeeModel.findById(req.user.id);
  if (!user) {
    res.status(400).json({ message: "User Not Found" });
  } else {
    const { date, checkOut } = req.body;
    if (!(date || checkOut)) {
      res.status(400).json("ERROR! Please add Attendace Date & Time");
    }
    const mark = await attendanceModel.create({
      checkOut,
      employee: req.user.id,
    });
    if (mark) {
      res.status(201).json({
        checkOut,
      });
    }
  }
  res.json({ message: "Attendance Marking" });
});

// * GET Request
// * Get /auth/employee/attendance/checkOut
const getCheckOutAttendance = asyncHandler(async (req, res) => {
  const attendance = await attendanceModel.find({ employee: req.user.id});
  res.status(200).json(attendance);
});
module.exports = {
  markCheckInAttendance,
  markCheckOutAttendance,
  getCheckInAttendance,
  getCheckOutAttendance,
};
