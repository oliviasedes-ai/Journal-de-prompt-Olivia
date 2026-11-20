import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const HOST = "0.0.0.0";

app.use((req, res, next) => {
  if (req.path === "/server.js" || req.path === "/package.json" || req.path === "/package-lock.json") {
    return res.status(404).end();
  }
  next();
});

app.use(
  express.static(__dirname, {
    setHeaders(res, filePath) {
      if (filePath.endsWith(".webmanifest")) {
        res.setHeader("Content-Type", "application/manifest+json; charset=utf-8");
      }
    },
  })
);

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, HOST, () => {
  console.log(`Journal de prompts listening on http://${HOST}:${PORT}`);
});
