const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { exec } = require("child_process");
const multer = require("multer");

const app = express();

app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());

const JWT_SECRET = "securus_test_only_hardcoded_jwt_secret_do_not_use_123456";
const upload = multer({ dest: "/tmp/securus-uploads" });

app.get("/health", (_req, res) => {
  res.json({ status: "ok", debug: true });
});

app.post("/login", (req, res) => {
  const token = jwt.sign(
    { username: req.body.username || "test-user" },
    JWT_SECRET
  );
  res.json({ token });
});

app.get("/diagnostics", (req, res) => {
  exec("echo " + (req.query.host || "localhost"), (error, stdout, stderr) => {
    if (error) {
      // VULNERABILITY: exposes internal exception details.
      return res.status(500).json({
        error: error.message,
        stack: error.stack,
        stderr
      });
    }
    res.type("text").send(stdout);
  });
});

app.post("/upload", upload.single("file"), (req, res) => {
  res.json({ uploaded: req.file && req.file.filename });
});

app.use((err, _req, res, _next) => {
  res.status(500).json({ message: err.message, stack: err.stack });
});

app.listen(3001, () => {
  console.log("Unsafe test fixture listening on http://localhost:3001");
});
