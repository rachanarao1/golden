// index.js

const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors({ origin: "https://rachanarao1.github.io" }));
app.use(express.json());

app.post("/api/trigger-deploy", (req, res) => {
  const { vm_type } = req.body;

  if (!vm_type) {
    return res.status(400).json({ error: "vm_type is required" });
  }

  console.log(`Deployment requested for: ${vm_type}`);

  // Replace this with real logic to trigger deployment (AWS, GitHub API, etc.)
  res.json({ message: `Deployment started for ${vm_type}` });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Deployment service running on port ${PORT}`);
});
