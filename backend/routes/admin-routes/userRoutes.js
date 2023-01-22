const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  updateInformation,
  loggedInuser,
} = require("../../controllers/admin-controllers/userController");
const {
  adminProtect,
  employeeProtect,
} = require("../../middleware/authMiddleware");

router.post("/admin/register", registerUser);
router.put("/admin/register/:id", adminProtect,updateInformation);
router.post("/admin/login", loginUser);
router.get("/admin/me", adminProtect, loggedInuser);

module.exports = router;
