const mongoose = require("mongoose");
const { Schema } = mongoose;
const attendanceSchema = new Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "employeeAuths",
  },
  admin: {
    type: Schema.Types.ObjectId,
    ref: "adminAuths",
  },
  checkIn: {
    type: Date,
    trim: true,
  },
  checkOut: {
    trim: true,
    type: Date,
  },
});

module.exports = mongoose.model("employeesAttendance", attendanceSchema);
