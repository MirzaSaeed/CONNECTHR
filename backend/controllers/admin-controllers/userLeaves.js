const asyncHandler = require("express-async-handler");
const { find } = require("../../models/admin-models/userModel");
const userModel = require("../../models/admin-models/userModel");
const leaveModel = require("../../models/employee-models/userLeave");
const employeeModel = require("../../models/employee-models/userModel");

const getLeavesList = asyncHandler(async (req, res) => {
  const isAdmin = await userModel.findById(req.user.id);
  if (isAdmin) {
    const isEmployees = await employeeModel.find({ admin: req.user.id });
    if (isEmployees) {
      const leaves = await leaveModel.find();
      res.send(leaves);
    }
  }
});

module.exports = {
  getLeavesList,
};
