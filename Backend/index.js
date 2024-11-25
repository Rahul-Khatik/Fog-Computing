const express = require("express");
const { exec } = require("child_process");
const cors = require("cors");
const app = express();
const port = 8083;

app.use(cors());
app.use(express.json());

app.post("/run-architecture", (req, res) => {
  const { architecture, numRequests } = req.body;

  const architectureFiles = {
    1: "architecture1.js",
    2: "architecture2.js",
    3: "architecture3.js",
  };

  const script = architectureFiles[architecture];

  const env = {
    ...process.env,
    NUM_REQUESTS: numRequests || 200, // Default to 200 if not provided
  };

  if (!script) {
    return res.status(400).json({ error: "Invalid architecture" });
  }

  exec(`node ${script}`, { env }, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing script: ${error.message}`);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (stderr) {
      console.error(`Script error: ${stderr}`);
    }

    console.log(`Script output: ${stdout}`);
    res.status(200).json({
      message: "Script executed successfully",
      output: stdout,
      error: stderr,
    });
  });
});

app.listen(port, () => {
  console.log(`API server listening at http://localhost:${port}`);
});
