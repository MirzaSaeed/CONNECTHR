const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema({
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "adminAuths",
  },
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
  city: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "Please add a Password"],
  },
  contactNumber: {
    type: String,
  },
  salary: {
    type: Number,
    required: [true, "Please add a salary"],
  },
  social: { type: String },
  date: {
    type: Date,
    required: true,
  },
  checkIn: {
    type: Date,
    required: true,
    trim: true,
  },
  checkOut: {
    type: Date,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model("employeeAuths", userSchema);
