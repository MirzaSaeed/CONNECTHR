const mongoose = require("mongoose");
const { Schema } = mongoose;
const attendanceSchema = new Schema({
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
  },
});

module.exports = mongoose.model("employeesAttendance", attendanceSchema);
