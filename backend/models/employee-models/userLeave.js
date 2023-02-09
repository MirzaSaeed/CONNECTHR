const mongoose = require("mongoose");
const { Schema } = mongoose;
const leaveSchema = new Schema({
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
  type: {
    type: String,
  },
  name: {
    type: String,
  },
  employee: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "employeeAuths",
  },
});

module.exports = mongoose.model("employeeLeave", leaveSchema);
