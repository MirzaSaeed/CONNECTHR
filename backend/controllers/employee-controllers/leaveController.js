const express = require("express");
const asyncHandler = require("express-async-handler");
const leaveModel = require("../../models/employee-models/leaveModel");
const employeeModel = require("../../models/employee-models/userModel");

// * POST Request
// * Post /auth/employee/leave/apply
const applyLeave = asyncHandler(async (req, res) => {
  const user = await employeeModel.findById(req.user.id);
  const nam = `${user.firstName} ${user.lastName}`;
  if (!user) {
    res.status(400).json({ message: "User Not Found" });
  } else {
    const { from, to, reason, type } = req.body;
    if (!(from || to || reason || type)) {
      res.status(400).json("ERROR! Please add Leave Reasoning Details");
    } else {
      const applied = await leaveModel.create({
        from,
        to,
        reason,
        type,
        admin: req.user.admin,
        status: "pending",
        employee: req.user.id,
        name: nam,
      });
      if (applied) {
        res
          .status(201)
          .send({
            from,
            to,
            reason,
            type,
            status: "pending",
            employee: req.user.id,
            name: nam,
            admin: req.user.id,
          });
      }
    }
  }
});

// * GET Request
// * Get /auth/employee/leave
const getLeavesList = asyncHandler(async (req, res) => {
  const list = await leaveModel.find({ employee: req.user.id });
  res.status(200).json(list);
});

module.exports = {
  applyLeave,
  getLeavesList,
};
