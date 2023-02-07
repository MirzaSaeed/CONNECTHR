const mongoose = require("mongoose");
const { Schema } = mongoose;
const leaveSchema = new Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "employeeAuths",
  },
  status: {
    type: String,
    enum: ["pending", "approved", "denied"],
    default: "pending",
  },
  approved: {
    type: Boolean,
    default: false,
  },
  denied: {
    type: Boolean,
    default: false,
  },
  from: {
    type: Date,
  },
  to: {
    type: Date,
  },
  reason: {
    type: String,
  },
  type:{
    type: String,
  }
});

module.exports = mongoose.model("employeeLeave", leaveSchema);
