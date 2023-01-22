const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "Please add a First Name"],
  },
  lastName: {
    type: String,
    required: [true, "Please add a Last Name"],
  },
  gender: { type: String, enum: ["Male", "Female"] },
  birthday: {
    type: Date,
    required: [true, "Please add Date of Birth"],
    trim: true,
  },
  role: {
    type: String,
    required: [true, "Please add a role position"],
  },
  email: {
    type: String,
    required: [true, "Please add an Email"],
  },
  password: {
    type: String,
    required: [true, "Please add a Password"],
  },
  contactNumber: {
    type: String,
    required: [true, "Please add a contact number"],
  },
  companyName: {
    type: String,
    required: [true, "Please add a company name"],
  },
  companyURL: {
    type: String,
    required: [true, "Please add a url"],
  },
  branchName: {
    type: String,
    required: [true, "Please add a branch name"],
  },
  totalEmployees: {
    type: Number,
    required: [true, "Please add total employee"],
  },
  city: {
    type: String,
    required: [true, "Please add a city name"],
  },
  zipcode: {
    type: Number,
    required: [true, "Please add a zipcode"],
  },
});

module.exports = mongoose.model("adminAuths", userSchema);
