const express = require("express");
const multer = require("multer");
const fs = require("fs");
const auth = require("../middleware/auth");
const Case = require("../models/Case");
const Event = require("../models/Event");
const Verdict = require("../models/Verdict");
const { produceEvent } = require("../kafka/producer");

const router = express.Router();

/* ================= FILE UPLOAD CONFIG ================= */
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = "uploads/evidence";
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 },
});

/* ================= CREATE CASE ================= */
router.post("/create", auth, async (req, res) => {
  try {
    const { claim, timeRange } = req.body;

    const newCase = await Case.create({
      user: req.user._id,
      claim,
      timeRange: {
        start: new Date(timeRange.start),
        end: new Date(timeRange.end),
      },
    });

    res.status(201).json(newCase);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ================= SCREENSHOT UPLOAD ================= */
router.post("/:id/evidence/upload", auth, upload.single("file"), async (req, res) => {
  try {
    const caseId = req.params.id;

    const caseDoc = await Case.findOne({ _id: caseId, user: req.user._id });
    if (!caseDoc) return res.status(404).json({ message: "Case not found" });

    const fileUrl = `/uploads/evidence/${req.file.filename}`;

    // 1️⃣ Screenshot stored
    await Event.create({
      caseId,
      type: "screenshot",
      timestamp: new Date(),
      data: {
        fileUrl,
        name: req.file.originalname,
      },
    });

    // 2️⃣ Simulated app activity from screenshot
    const extractedTime = new Date("2026-01-30T09:05:00");

    await Event.create({
      caseId,
      type: "app_activity",
      timestamp: extractedTime,
      data: {
        source: "Instagram Screenshot",
        action: "User active on Instagram",
      },
    });

    // 3️⃣ Simulated location clue
    await Event.create({
      caseId,
      type: "location_clue",
      timestamp: extractedTime,
      data: {
        place: "Bangalore",
        source: "Screenshot text",
      },
    });

    res.json({ message: "Screenshot analyzed and timeline updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ================= NETWORK EVENT VIA KAFKA ================= */
router.post("/:id/network/log", auth, async (req, res) => {
  try {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    await produceEvent({
      caseId: req.params.id,
      type: "network",
      timestamp: new Date(),
      data: { ip, agent: req.headers["user-agent"] },
    });

    res.json({ message: "Network activity sent to Kafka" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ================= TIMELINE ================= */
router.get("/:id/timeline", auth, async (req, res) => {
  const events = await Event.find({ caseId: req.params.id }).sort({ timestamp: 1 });
  res.json(events);
});

/* ================= VERDICT ================= */
router.get("/:id/verdict", auth, async (req, res) => {
  try {
    const caseId = req.params.id;

    const caseDoc = await Case.findOne({ _id: caseId, user: req.user._id });
    if (!caseDoc) return res.status(404).json({ message: "Case not found" });

    let verdict = await Verdict.findOne({ caseId });
    if (verdict) return res.json(verdict);

    const events = await Event.find({
      caseId,
      timestamp: { $gte: caseDoc.timeRange.start, $lte: caseDoc.timeRange.end },
    });

    const hasActivity = events.length > 0;

    verdict = await Verdict.create({
      caseId,
      result: hasActivity ? "FALSE" : "TRUE",
      reason: hasActivity
        ? "Digital evidence contradicts the alibi"
        : "No contradicting digital evidence found",
      confidence: hasActivity ? 88 : 72,
    });

    res.json(verdict);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ================= CASE DETAILS ================= */
router.get("/:id", auth, async (req, res) => {
  const caseDoc = await Case.findOne({ _id: req.params.id, user: req.user._id });
  res.json(caseDoc);
});

/* ================= ALL CASES ================= */
router.get("/", auth, async (req, res) => {
  const cases = await Case.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(cases);
});

module.exports = router;
