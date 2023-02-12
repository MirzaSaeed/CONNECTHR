const mongoose = require("mongoose");
const { Schema } = mongoose;
const attendanceSchema = new Schema({
  admin: {
    type: Schema.Types.ObjectId,
    required: true,
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

module.exports = mongoose.model("adminAttendance", attendanceSchema);
