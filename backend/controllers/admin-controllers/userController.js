const asyncHandler = require("express-async-handler");
const userModel = require("../../models/admin-models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secret } = require("../../middleware/errorMiddleware");

// * POST Request
// * Post /auth/admin/register
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
    companyName,
    companyURL,
    branchName,
    totalEmployees,
    city,
    zipcode,
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
      companyName ||
      companyURL ||
      branchName ||
      totalEmployees ||
      city ||
      zipcode
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
    companyName,
    companyURL,
    branchName,
    totalEmployees,
    city,
    zipcode,
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
      companyName: user.companyName,
      companyURL: user.companyURL,
      branchName: user.branchName,
      totalEmployees: user.totalEmployees,
      city: user.city,
      zipcode: user.zipcode,
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

const getUserData = asyncHandler(async (req, res) => {});

// * POST Request
// * Post /auth/admin/login
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
    res.status(400).json("ERROR: Invalid User Credentials");
    throw new Error("Invalid User Credentials");
  }
});

// * GET Request
// * Get /auth/admin/me
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
  });
});

const updateInformation = asyncHandler(async (req, res) => {
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
    role,
    password,
    contactNumber,
    companyName,
    companyURL,
    branchName,
    totalEmployees,
    zipcode,
  } = req.body;

  // ! Hash Password for secure user authentication
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const updateUser = await userModel.findByIdAndUpdate(req.params.id, {
      firstName,
      lastName,
      gender,
      birthday,
      city,
      role,
      email,
      password: hashedPassword,
      contactNumber,
      companyName,
      companyURL,
      branchName,
      totalEmployees,
      zipcode,
  });
  res.status(200).json(updateUser);
});

// * Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, secret, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  updateInformation,
  loggedInuser,
  loginUser,
};
