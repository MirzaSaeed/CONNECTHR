const asyncHandler = require("express-async-handler");
const userModel = require("../../models/employee-models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secret } = require("../../middleware/errorMiddleware");
const adminModel = require("../../models/admin-models/userModel");

// * POST Request
// * Post /auth/employee/register
const registerUser = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    gender,
    role,
    birthday,
    email,
    password,
    contactNumber,
    salary,
  } = req.body;

  if (
    !(
      firstName ||
      lastName ||
      gender ||
      role ||
      birthday ||
      email ||
      password ||
      contactNumber ||
      salary
    )
  ) {
    res.status(400).json("ERROR: Please Add all the field");
    throw new Error("Please Add all the field");
  }

  // ? Check if user Exist
  const userExist = await userModel.findOne({ email });
  if (userExist) {
    res.status(400).json("User already exists");
    throw new Error("User already exists");
  }

  // ! Hash Password for secure user authentication
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // ? Create User/ Register User
  const user = await userModel.create({
    firstName,
    lastName,
    gender,
    role,
    birthday,
    email,
    password: hashedPassword,
    contactNumber,
    salary,
    admin: req.user.id,
  });
  if (user) {
    res.status(201).json({
      _id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender,
      role: user.role,
      birthday: user.birthday,
      email: user.email,
      contactNumber: user.contactNumber,
      salary: user.salary,
    });
  } else {
    res.status(400).json("Invalid User Data");
    throw new Error("Invalid User Data");
  }
});

// * GET Request
// * Get /auth/employee/register
const getEmployees = asyncHandler(async (req, res) => {
  const getUsers = await userModel.find({ admin: req.user.id });
  res.status(200).json(getUsers);
});

// * GET Request
// * Get /auth/employee/register/id;
const getEmployee = asyncHandler(async (req, res) => {
  const getUsers = await userModel.findById((admin = req.params.id));

  res.status(200).json(getUsers);
});

// * POST Request
// * Post /auth/employee/login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // ? Check for User Email
  const user = await userModel.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      lastName: user.lastName,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json("Invalid User Credentials");
    throw new Error("Invalid User Credentials");
  }
});

// * GET Request
// * Get /auth/employee/me
const loggedInuser = asyncHandler(async (req, res) => {
  const {
    _id,
    firstName,
    lastName,
    gender,
    role,
    birthday,
    email,
    contactNumber,
    companyName,
    companyURL,
    branchName,
    totalEmployees,
    city,
    zipcode,
    social,
  } = await userModel.findById(req.user.id);
  res.status(200).json({
    id: _id,
    firstName,
    lastName,
    gender,
    role,
    birthday,
    email,
    contactNumber,
    companyName,
    companyURL,
    branchName,
    totalEmployees,
    city,
    zipcode,
    social,
  });
});

const updateEmployee = asyncHandler(async (req, res) => {
  const getUser = await userModel.findById(req.params.id);
  if (!getUser) {
    res.status(400).json("employee not found");
    throw new Error("User not found");
  }
  const {
    firstName,
    lastName,
    gender,
    birthday,
    city,
    email,
    password,
    contactNumber,
    social,
  } = req.body;

  // ! Hash Password for secure user authentication
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const updateUser = await userModel.findByIdAndUpdate(req.params.id, {
    firstName,
    lastName,
    gender,
    city,
    birthday,
    email,
    password: hashedPassword,
    contactNumber,
    social,
  });
  res.status(200).json(updateUser);
});

// * DELETE Request
// * Delete / auth/employee/register
const deleteEmployee = asyncHandler(async (req, res) => {
  const employee = await userModel.findById(req.params.id);
  if (!employee) {
    res.status(400).json("User not found");
    throw new Error("User not found");
  }
  const user = await adminModel.findById(req.user.id);
  // * check for user
  if (!user) {
    res.status(401).json("User not found");
    throw new Error("User not found");
  }
  // * Make sure the logged in user matches to authentication
  if (user.id === employee.admin) {
    res.status(401).json("User not authorized");
    throw new Error("User not authorized");
  }
  employee.remove();
  res.status(200).json({ id: req.params.id });
});


// * Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, secret, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  updateEmployee,
  deleteEmployee,
  getEmployees,
  getEmployee,
  loggedInuser,
  loginUser,
};
