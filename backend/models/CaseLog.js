const mongoose = require("mongoose");

const caseLogSchema = new mongoose.Schema(
  {
    case: { type: mongoose.Schema.Types.ObjectId, ref: "Case" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    level: { type: String, enum: ["info", "warning", "alert"], default: "info" },
    message: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("CaseLog", caseLogSchema);
