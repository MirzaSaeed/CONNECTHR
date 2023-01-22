const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema({
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "adminAuths",
  },
  employeeName: {
    type: String,
    required: [true, "Please add a Name"],
  },
  date: {
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
  },
});

module.exports = mongoose.model("employeesAttendance", userSchema);
