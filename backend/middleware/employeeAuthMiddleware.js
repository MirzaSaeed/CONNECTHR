const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const secret = process.env.SECRET_KEY
const userModel = require("../models/employee-models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // * Get Token from Header
      token = req.headers.authorization.split(" ")[1];

      // ! Verify Token
      const decoded = jwt.verify(token, secret);

      // * Get user from token id is in payload/data
      req.user = await userModel.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.log(error);
      res.status(401); // ! 401 is  for not Authorized
      throw new Error("Not Authorized");
    }
  }
  // * if there is no token
  if (!token) {
    res.status(401);
    throw new Error("Not Authorized, No Token");
  }
});

module.exports = {
  protect,
};
