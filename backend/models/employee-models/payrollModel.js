const mongoose = require("mongoose");
const { Schema } = mongoose;
const payrollSchema = new Schema({
  admin: {
    type: Schema.Types.ObjectId,
    ref: "adminAuths",
  },
  employee: {
    type: Schema.Types.ObjectId,
    ref: "employeeAuths",
  },
  salary: {
    type: String,
  },
  status: {
    type: String,
    enum: ["pending", "approved"],
    default: "pending",
  },
  approved: {
    type: Boolean,
    default: false,
  },
name:{
  type: String
},

  month: {
    type: Date,
  },
});

module.exports = mongoose.model("employeePayroll", payrollSchema);
