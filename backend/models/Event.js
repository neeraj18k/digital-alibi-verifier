const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    caseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Case",
      required: true,
    },
    type: {
      type: String,
      enum: [
        "screenshot",
        "app_activity",
        "location_clue",
        "network"
      ],
      required: true,
    },
    timestamp: {
      type: Date,
      required: true,
      default: Date.now
    },
    data: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true }
);

eventSchema.index({ caseId: 1, timestamp: 1 });

module.exports = mongoose.model("Event", eventSchema);
