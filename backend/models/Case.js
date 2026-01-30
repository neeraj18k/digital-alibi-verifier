const mongoose = require("mongoose");

const caseSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    claim: { type: String, required: true },
    timeRange: {
      start: { type: Date, required: true },
      end: { type: Date, required: true },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Case", caseSchema);
