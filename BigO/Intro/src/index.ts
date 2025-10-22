import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the public folder
const staticPath = path.join(__dirname, "../public");

// Serve static files
app.use(express.static(staticPath));

// Serve index.html at root
app.get("/", (req, res) => {
  res.sendFile(path.join(staticPath, "index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});