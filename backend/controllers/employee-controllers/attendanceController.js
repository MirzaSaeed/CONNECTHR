const express = require("express");
const asyncHandler = require("express-async-handler");
const attendanceModel = require("../../models/employee-models/attendanceModel");
const employeeModel = require("../../models/employee-models/userModel");

// * POST Request
// * Post /auth/employee/attendance
const markCheckInAttendance = asyncHandler(async (req, res) => {
  const user = await employeeModel.findById(req.user.id);
  if (!user) {
    res.status(400).json({ message: "User Not Found" });
  } else {
    const { checkIn } = req.body;
    if (!checkIn) {
      res.status(400).json("ERROR! Please add Attendace Date & Time");
    }
    const mark = await attendanceModel.create({
      checkIn,
      employee: req.user.id,
      admin: req.user.id,
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
const getAttendance = asyncHandler(async (req, res) => {
  const attendance = await attendanceModel.find({ employee: req.user.id });
  res.status(200).json(attendance);
});

// * POST Request
// * Post /auth/employee/attendance
const markCheckOutAttendance = asyncHandler(async (req, res) => {
  // const pId = req.params.id;
  const isEmployee = await employeeModel.findById(req.user.id);
  if (isEmployee) {
    const { checkOut } = req.body;

    const mark = await attendanceModel.findByIdAndUpdate(req.params.id, {
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
};
