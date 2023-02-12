const asyncHandler = require("express-async-handler");
const adminModel = require("../../models/admin-models/userModel");
const employeeModel = require("../../models/employee-models/userModel");
const employeePayroll = require("../../models/employee-models/userPayroll");

const addPayroll = asyncHandler(async (req, res) => {
  const isAdmin = await adminModel.findById(req.user.id);
  if (isAdmin) {
    const user = await employeeModel.findById(req.params.id);
    const { name, salary, month } = req.body;
    const addPayroll = await employeePayroll.create({
      status: "pending",
      month,
      name,
      employee: req.params.id,
      admin: req.user.id,
      salary: user.salary,
    });
    if (!addPayroll) {
      res.status(400).json("Please Add all fields");
    }
    res.status(200).json({
      month,
      name: name,
      salary,
    });
  } else {
    res.status(401).json("Not Authorized");
  }
});

const updatePayroll = asyncHandler(async (req, res) => {
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

    const updatePayroll = await employeePayroll.findByIdAndUpdate(pId, {
      status: "approved",
      approved: isApproved,
    });
    res.status(200).json(updatePayroll);
  } else {
    res.status(401).json("Not Authorized");
  }
});

const getPayroll = asyncHandler(async (req, res) => {
  const isAdmin = await adminModel.findById(req.user.id);
  if (isAdmin) {
    const getSalaries = await employeePayroll.find();
    res.status(201).json(getSalaries);
  } else {
    res.status(401).json("Not Authorized");
  }
});

const getPayrollById = asyncHandler(async (req, res) => {
  const isEmployee = await employeePayroll.find({ employee: req.params.id });
  if (!isEmployee) {
    res.status(401).json("Not Authorized");
  }
  res.status(201).json(isEmployee);
});

const updateSalary = asyncHandler(async (req, res) => {
  const getUser = await employeeModel.findById(req.params.id);
  if (!getUser) {
    res.status(400).json("employee not found");
    throw new Error("User not found");
  }
  const { salary } = req.body;

  const updateUser = await employeeModel.findByIdAndUpdate(req.params.id, {
    salary,
  });
  res.status(200).json(updateUser);
});

module.exports = {
  getPayroll,
  getPayrollById,
  updatePayroll,
  updateSalary,
  addPayroll,
};
