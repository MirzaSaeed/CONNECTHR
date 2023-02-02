const express = require("express");
const asyncHandler = require("express-async-handler");

// * POST Request
// * Post /auth/employee/attendance
const markAttendance = asyncHandler(async (req, res) => {
    
  res.json({ message: "Attendance Marking" });
});

// * GET Request
// * Get /auth/employee/attendance/checkIn
const getCheckInAttendance = asyncHandler(async (req, res) => {
    res.json({ message: "CheckIn Attendance" });
  });

  // * GET Request
// * Get /auth/employee/attendance/checkIn
const getCheckOutAttendance = asyncHandler(async (req, res) => {
    res.json({ message: "CheckOut Attendance" });
  });
module.exports = {
  markAttendance,getCheckInAttendance,getCheckOutAttendance
};
