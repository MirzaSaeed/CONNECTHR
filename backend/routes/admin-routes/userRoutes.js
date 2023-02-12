const express = require("express");
const router = express.Router();
const {
  registerAdmin,
  loginUser,
  updateInformation,
  loggedInuser,
} = require("../../controllers/admin-controllers/userController");
const {
  getLeavesList,
  getLeavesById,
  approveLeave,
  deniedLeave,
} = require("../../controllers/admin-controllers/leaveController");
const {
  addPayroll,
  updatePayroll,
  getPayroll,
  getPayrollById,
  updateSalary
} = require("../../controllers/admin-controllers/payrollController");
const { adminProtect } = require("../../middleware/authMiddleware");
const {
  registerUser,
  getEmployees,
  getEmployee,
  deleteEmployee,
  updateEmployee,
} = require("../../controllers/employee-controllers/userController");

// ? Authentication
router.post("/admin/login", loginUser);
router.get("/admin/me", adminProtect, loggedInuser);

// ? Employee Lists Dashboard
router.post("/admin/addEmployee", adminProtect, registerUser);
router.post("/admin/register", registerAdmin);

router.get("/admin/register", adminProtect, getEmployees);
router.get("/admin/register/:id", adminProtect, getEmployee);
router.delete("/admin/register/:id", adminProtect, deleteEmployee);
router.put("/admin/register/:id", adminProtect, updateInformation);

// ? leave Routes
router.get("/admin/leaves", adminProtect, getLeavesList);
router.get("/admin/leaves/:id", adminProtect, getLeavesById);
router.put("/admin/leave/approve", adminProtect, approveLeave);
router.put("/admin/leave/denied", adminProtect, deniedLeave);

// ? Payroll Routes
router.post("/admin/payroll/add/:id", adminProtect, addPayroll);
router.put("/admin/payroll/update/", adminProtect, updatePayroll);
router.get("/admin/payroll", adminProtect, getPayroll);
router.get("/admin/payroll/:id", adminProtect, getPayrollById);
router.put("/admin/payroll/updateSalary/:id", adminProtect, updateSalary);

module.exports = router;
