const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  updateInformation,
  loggedInuser,
} = require("../../controllers/admin-controllers/userController");
const {
  getLeavesList,
} = require("../../controllers/admin-controllers/userLeaves");
const {
  adminProtect,
  employeeProtect,
} = require("../../middleware/authMiddleware");

router.post("/admin/register", registerUser);
router.put("/admin/register/:id", adminProtect, updateInformation);
router.post("/admin/login", loginUser);
router.get("/admin/me", adminProtect, loggedInuser);

// ? leave Routes
router.get("/admin/leaves",adminProtect, getLeavesList);

module.exports = router;
