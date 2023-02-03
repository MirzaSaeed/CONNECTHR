const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema({
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "adminAuths",
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "employeeAuths",
  },
  date: {
    type: Date,
  },
  checkIn: {
    type: Date,
    trim: true,
  },
  checkOut: {
    type: Date,
    trim: true,
  },
});

module.exports = mongoose.model("employeesAttendance", userSchema);
