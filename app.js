const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const authRouter = require("./routes/api/auth");
const dashboardRouter = require("./routes/api/dashboards");
const columnRouter = require("./routes/api/column");
const cardRouter = require("./routes/api/card");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/users", authRouter);

app.use("/api/dashboard", dashboardRouter);

app.use("/api/column", columnRouter);

app.use("/api/card", cardRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found on 3007" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
