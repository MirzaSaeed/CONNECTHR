const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema({
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "adminAuths",
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  gender: { type: String, enum: ["Male", "Female"] },
  birthday: {
    type: Date,
    trim: true,
  },
  role: {
    type: String,
  },
  email: {
    type: String,
  },
  city: {
    type: String,
  },
  password: {
    type: String,
  },
  contactNumber: {
    type: String,
  },
  salary: {
    type: Number,
  },
  social: { type: String },
  leaves: [
    {
      type: Schema.Types.ObjectId,
      ref: "employeeLeave",
    },
  ],
});

module.exports = mongoose.model("employeeAuths", userSchema);
