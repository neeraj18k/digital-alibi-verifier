const CaseLog = require("../models/CaseLog");

const logger = {
  info: async (message, data = {}) => {
    console.log("INFO:", message, data);
    if (data.caseId && data.userId) {
      await CaseLog.create({
        case: data.caseId,
        user: data.userId,
        level: "info",
        message,
      });
    }
  },

  warn: async (message, data = {}) => {
    console.warn("WARN:", message, data);
    if (data.caseId && data.userId) {
      await CaseLog.create({
        case: data.caseId,
        user: data.userId,
        level: "warning",
        message,
      });
    }
  },

  error: async (message, data = {}) => {
    console.error("ERROR:", message, data);
    if (data.caseId && data.userId) {
      await CaseLog.create({
        case: data.caseId,
        user: data.userId,
        level: "alert",
        message,
      });
    }
  },
};

module.exports = logger;

