const asyncHandler = require("express-async-handler");
const adminModel = require("../../models/admin-models/userModel");
const employeeModel = require("../../models/employee-models/userModel");
const leaveModel = require("../../models/employee-models/userLeave");

const getLeavesList = asyncHandler(async (req, res) => {
  const isAdmin = await userModel.findById(req.user.id);
  if (isAdmin) {
    const getLeaves = await leaveModel.find();
    res.status(201).json(getLeaves);
  } else {
    res.status(401).json("Not Authorized");
  }
});
const getLeavesById = asyncHandler(async (req, res) => {
  const isEmployee = await leaveModel.find({ employee: req.params.id });
  if (!isEmployee) {
    res.status(401).json("Not Authorized");
  }
  res.status(201).json(isEmployee);
});

const approveLeave = asyncHandler(async (req, res) => {
  const eId = req.query.eid;
  const pId = req.query.pid;
  const isAdmin = await adminModel.findById(req.user.id);
  if (isAdmin) {
    const isUser = await employeeModel.findById(eId);
    if (!isUser) {
      res.status(400).json("employee not found");
      throw new Error("User not found");
    }
    const isApproved = true;

    const approveLeave = await leaveModel.findByIdAndUpdate(pId, {
      status: "approved",
      approved: isApproved,
    });
    res.status(200).json(approveLeave);
  } else {
    res.status(401).json("Not Authorized");
  }
});

const deniedLeave = asyncHandler(async (req, res) => {
  const eId = req.query.eid;
  const pId = req.query.pid;
  const isAdmin = await adminModel.findById(req.user.id);
  if (isAdmin) {
    const isUser = await employeeModel.findById(eId);
    if (!isUser) {
      res.status(400).json("employee not found");
      throw new Error("User not found");
    }
    const isDenied = true;

    const deniedLeave = await leaveModel.findByIdAndUpdate(pId, {
      status: "rejected",
      denied: isDenied,
    });
    res.status(200).json(deniedLeave);
  } else {
    res.status(401).json("Not Authorized");
  }
});
module.exports = {
  getLeavesList,
  approveLeave,
  deniedLeave,
  getLeavesById,
};
