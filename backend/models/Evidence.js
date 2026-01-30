const mongoose = require("mongoose");

const evidenceSchema = new mongoose.Schema({
  case: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Case",
    required: true,
  },
  type: {
    type: String, // screenshot / document
    default: "screenshot",
  },
  fileUrl: String,
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Evidence", evidenceSchema);
