require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { connectDB } = require("./config/db");
const { initProducer } = require("./kafka/producer");
const { startConsumer } = require("./kafka/consumer");

const authRoutes = require("./routes/auth");
const caseRoutes = require("./routes/cases");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();
initProducer();
startConsumer();

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/cases", caseRoutes);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
