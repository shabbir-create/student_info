const path = require("path");
const fs = require("fs");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const apiRoutes = require("./routes/api");

const app = express();
const port = Number(process.env.PORT || 4000);
const frontendDist = path.resolve(__dirname, "../../frontend/dist");

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "student-portal-api", rollNumber: process.env.ROLL_NUMBER || "1234" });
});

app.use("/api", apiRoutes);

if (fs.existsSync(frontendDist)) {
  app.use(express.static(frontendDist));
  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api")) {
      return next();
    }
    return res.sendFile(path.join(frontendDist, "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Student Portal server running at http://localhost:${port}`);
});
