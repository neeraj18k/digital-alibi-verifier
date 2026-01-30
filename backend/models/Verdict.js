const mongoose = require("mongoose");

const verdictSchema = new mongoose.Schema(
  {
    caseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Case",
      required: true,
      unique: true,
    },
    result: String,
    reason: String,
    confidence: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Verdict", verdictSchema);
