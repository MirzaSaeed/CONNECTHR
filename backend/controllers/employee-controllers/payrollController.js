const asyncHandler = require("express-async-handler");
const employeeModel = require("../../models/employee-models/userModel");
const employeePayroll = require("../../models/employee-models/payrollModel");

const getPayroll = asyncHandler(async (req, res) => {
  const isEmployee = await employeeModel.findById(req.user.id);
  if (isEmployee) {
    const getSalaries = await employeePayroll.find({employee: req.user.id});
    res.status(201).json(getSalaries);
  } else {
    res.status(401).json("Not Authorized");
  }
});

module.exports = {
  getPayroll,
};
