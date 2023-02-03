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
      date,
      checkIn,
      employee: req.user.id,
      name: req.user.firstName,
    });
    if (mark) {
      res.status(201).json({
        date: date,
        checkIn,
      });
    }
  }
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
      date,
      checkOut,
      employee: req.user.id,
      name: req.user.firstName,
    });
    if (mark) {
      res.status(201).json({
        date: date,
        checkOut,
      });
    }
  }
  res.json({ message: "Attendance Marking" });
});
// * GET Request
// * Get /auth/employee/attendance/checkIn
const getCheckInAttendance = asyncHandler(async (req, res) => {
  const getAttendance = await attendanceModel.find({
    employee: req.user.id,
  });
  res.status(201).json(getAttendance);
});

// * GET Request
// * Get /auth/employee/attendance/checkIn
const getCheckOutAttendance = asyncHandler(async (req, res) => {
  res.json({ message: "CheckOut Attendance" });
});
module.exports = {
  markCheckInAttendance,
  markCheckOutAttendance,
  getCheckInAttendance,
  getCheckOutAttendance,
};
