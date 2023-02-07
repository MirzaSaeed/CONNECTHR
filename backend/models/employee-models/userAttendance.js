const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "employeeAuths",
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
