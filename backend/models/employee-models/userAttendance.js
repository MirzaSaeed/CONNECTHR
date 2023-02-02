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
 
});

module.exports = mongoose.model("employeesAttendance", userSchema);
