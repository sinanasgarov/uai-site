#!/usr/bin/env node
/*
 * Downloads the 37 Unsplash images listed in IMAGES.md into dist/images/.
 *
 * Run from anywhere, from the repo root:
 *
 *     node tools/download-images.js
 *
 * (Node v18+ needed for global fetch; nothing else — no npm install, no
 * external dependencies, only built-in modules: https, fs, path.)
 *
 * Safe to re-run: already-downloaded files (present, non-empty) are
 * skipped, so if it's interrupted partway (network drop, Ctrl-C) just run
 * it again and it picks up where it left off.
 *
 * Does NOT resize, recompress or convert anything — the width is already
 * baked into each URL's `w=` parameter (1600 for banners, 800 for cards,
 * matching where each image is actually used), so what lands on disk is
 * exactly what the site should ship.
 */
"use strict";
const fs = require("fs");
const path = require("path");
const https = require("https");

const OUT_DIR = path.join(__dirname, "..", "dist", "images");
const DELAY_MS = 350; // pause between requests so we don't hammer Unsplash
const MAX_REDIRECTS = 5;
const TIMEOUT_MS = 30000;

// Source of truth: IMAGES.md, all 37 rows. Entries 25 and 31 point at the
// same Unsplash photo (industrialHall / metalStructure share one source
// image at the same 800px width) — see dedupe logic in main().
const ENTRIES = [
  { n: 1, file: "hero-port-terminal.jpg", url: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1600&q=80&fm=jpg&fit=crop" },
  { n: 2, file: "aerial-container-terminal.jpg", url: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?w=1600&q=80&fm=jpg&fit=crop" },
  { n: 3, file: "gantry-cranes-vessel.jpg", url: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1600&q=80&fm=jpg&fit=crop" },
  { n: 4, file: "freight-truck-highway.jpg", url: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&q=80&fm=jpg&fit=crop" },
  { n: 5, file: "warehouse-aisle-racking.jpg", url: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80&fm=jpg&fit=crop" },
  { n: 6, file: "warehouse-high-bay.jpg", url: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&q=80&fm=jpg&fit=crop" },
  { n: 7, file: "cookware-pans-surface.jpg", url: "https://images.unsplash.com/photo-1583778176476-4a8b02a64c01?w=800&q=80&fm=jpg&fit=crop" },
  { n: 8, file: "workers-packing-cartons.jpg", url: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&q=80&fm=jpg&fit=crop" },
  { n: 9, file: "laptop-notebook-desk.jpg", url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80&fm=jpg&fit=crop" },
  { n: 10, file: "open-plan-office.jpg", url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80&fm=jpg&fit=crop" },
  { n: 11, file: "meeting-reviewing-documents.jpg", url: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80&fm=jpg&fit=crop" },
  { n: 12, file: "commercial-documents.jpg", url: "https://images.unsplash.com/photo-1578894381163-e72c17f2d45f?w=800&q=80&fm=jpg&fit=crop" },
  { n: 13, file: "handshake-across-table.jpg", url: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1600&q=80&fm=jpg&fit=crop" },
  { n: 14, file: "domestic-kitchen-cookware.jpg", url: "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=1600&q=80&fm=jpg&fit=crop" },
  { n: 15, file: "hotel-guest-bedroom.jpg", url: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=800&q=80&fm=jpg&fit=crop" },
  { n: 16, file: "cast-iron-cookware-pot.jpg", url: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=800&q=80&fm=jpg&fit=crop" },
  { n: 17, file: "electrician-distribution-panel.jpg", url: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1600&q=80&fm=jpg&fit=crop" },
  { n: 18, file: "processor-mainboard.jpg", url: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&q=80&fm=jpg&fit=crop" },
  { n: 19, file: "circuit-board-closeup.jpg", url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80&fm=jpg&fit=crop" },
  { n: 20, file: "hard-disk-assembly.jpg", url: "https://images.unsplash.com/photo-1601737487795-dab272f52420?w=800&q=80&fm=jpg&fit=crop" },
  { n: 21, file: "industrial-plant-pipework.jpg", url: "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1600&q=80&fm=jpg&fit=crop" },
  { n: 22, file: "laboratory-technicians.jpg", url: "https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=800&q=80&fm=jpg&fit=crop" },
  { n: 23, file: "earthmoving-excavation-site.jpg", url: "https://images.unsplash.com/photo-1517089596392-fb9a9033e05b?w=1600&q=80&fm=jpg&fit=crop" },
  { n: 24, file: "robotic-arm-production-line.jpg", url: "https://images.unsplash.com/photo-1567789884554-0b844b597180?w=1600&q=80&fm=jpg&fit=crop" },
  { n: 25, file: "empty-industrial-hall.jpg", url: "https://images.unsplash.com/photo-1565610222536-ef125c59da2e?w=800&q=80&fm=jpg&fit=crop" },
  { n: 26, file: "construction-site-workers.jpg", url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80&fm=jpg&fit=crop" },
  { n: 27, file: "modern-commercial-building.jpg", url: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&q=80&fm=jpg&fit=crop" },
  { n: 28, file: "finished-building-facade.jpg", url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&fm=jpg&fit=crop" },
  { n: 29, file: "steel-reinforcement-mat.jpg", url: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1600&q=80&fm=jpg&fit=crop" },
  { n: 30, file: "welder-sparks.jpg", url: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80&fm=jpg&fit=crop" },
  { n: 31, file: "steel-columns-roof-trusses.jpg", url: "https://images.unsplash.com/photo-1565610222536-ef125c59da2e?w=800&q=80&fm=jpg&fit=crop" },
  { n: 32, file: "manufacturing-facility-interior.jpg", url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1600&q=80&fm=jpg&fit=crop" },
  { n: 33, file: "engineer-technical-drawings.jpg", url: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80&fm=jpg&fit=crop" },
  { n: 34, file: "wind-turbines.jpg", url: "https://images.unsplash.com/photo-1487875961445-47a00398c267?w=800&q=80&fm=jpg&fit=crop" },
  { n: 35, file: "solar-panel-array.jpg", url: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80&fm=jpg&fit=crop" },
  { n: 36, file: "formwork-civil-works-site.jpg", url: "https://images.unsplash.com/photo-1516216628859-9bccecab13ca?w=800&q=80&fm=jpg&fit=crop" },
  { n: 37, file: "notebook-pen-desk.jpg", url: "https://images.unsplash.com/photo-1518481612222-68bbe828ecd1?w=800&q=80&fm=jpg&fit=crop" },
];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function formatSize(bytes) {
  if (bytes < 1024) return bytes + " B";
  return (bytes / 1024).toFixed(1) + " KB";
}

// GETs a URL to a temp file, following redirects, resolving with the
// number of bytes written. Rejects (without leaving a partial file behind)
// on any HTTP error status, network error, or timeout.
function fetchToFile(url, destPath, redirectsLeft) {
  return new Promise((resolve, reject) => {
    const tmpPath = destPath + ".part";
    const req = https.get(url, { timeout: TIMEOUT_MS }, (res) => {
      const status = res.statusCode || 0;

      if (status >= 300 && status < 400 && res.headers.location) {
        res.resume(); // discard this response body
        if (redirectsLeft <= 0) {
          reject(new Error("too many redirects"));
          return;
        }
        const nextUrl = new URL(res.headers.location, url).toString();
        fetchToFile(nextUrl, destPath, redirectsLeft - 1).then(resolve, reject);
        return;
      }

      if (status !== 200) {
        res.resume();
        reject(new Error("HTTP " + status));
        return;
      }

      const out = fs.createWriteStream(tmpPath);
      let bytes = 0;
      res.on("data", (chunk) => { bytes += chunk.length; });
      res.pipe(out);
      out.on("finish", () => {
        out.close(() => {
          fs.renameSync(tmpPath, destPath);
          resolve(bytes);
        });
      });
      out.on("error", (err) => {
        fs.unlink(tmpPath, () => {});
        reject(err);
      });
    });

    req.on("timeout", () => {
      req.destroy(new Error("timed out after " + TIMEOUT_MS + "ms"));
    });
    req.on("error", (err) => {
      fs.unlink(tmpPath, () => {});
      reject(err);
    });
  });
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  // Group by URL so a photo shared by two entries (25 and 31 — same
  // Unsplash source, same 800px width) is fetched once and copied to
  // every filename that needs it, per the task's instruction not to
  // double-download.
  const byUrl = new Map();
  for (const entry of ENTRIES) {
    if (!byUrl.has(entry.url)) byUrl.set(entry.url, []);
    byUrl.get(entry.url).push(entry);
  }

  let downloaded = 0;
  let skipped = 0;
  const failed = [];
  let index = 0;
  const total = ENTRIES.length;

  for (const [url, group] of byUrl) {
    const primary = group[0];
    const primaryPath = path.join(OUT_DIR, primary.file);
    const alreadyHave = fs.existsSync(primaryPath) && fs.statSync(primaryPath).size > 0;

    index += 1;
    const label = "[" + String(index).padStart(2, "0") + "/" + total + "] " + primary.file;

    if (alreadyHave) {
      const size = fs.statSync(primaryPath).size;
      console.log(label + " — SKIPPED (already exists, " + formatSize(size) + ")");
      skipped += 1;
    } else {
      try {
        const bytes = await fetchToFile(url, primaryPath, MAX_REDIRECTS);
        console.log(label + " — downloaded (" + formatSize(bytes) + ")");
        downloaded += 1;
      } catch (err) {
        console.log(label + " — ERROR: " + err.message);
        failed.push({ n: primary.n, file: primary.file, url, error: err.message });
      }
      await sleep(DELAY_MS);
    }

    // Copy to any additional filenames sharing this same source image.
    for (const dup of group.slice(1)) {
      index += 1;
      const dupLabel = "[" + String(index).padStart(2, "0") + "/" + total + "] " + dup.file;
      const dupPath = path.join(OUT_DIR, dup.file);
      if (fs.existsSync(dupPath) && fs.statSync(dupPath).size > 0) {
        console.log(dupLabel + " — SKIPPED (already exists, " + formatSize(fs.statSync(dupPath).size) + ")");
        skipped += 1;
        continue;
      }
      if (fs.existsSync(primaryPath) && fs.statSync(primaryPath).size > 0) {
        fs.copyFileSync(primaryPath, dupPath);
        console.log(dupLabel + " — copied from " + primary.file + " (same source photo, no extra download)");
        downloaded += 1;
      } else {
        console.log(dupLabel + " — ERROR: source download (" + primary.file + ") failed, nothing to copy");
        failed.push({ n: dup.n, file: dup.file, url, error: "source file missing (" + primary.file + " failed)" });
      }
    }
  }

  console.log("");
  console.log("=== Summary ===");
  console.log("Downloaded: " + downloaded);
  console.log("Skipped (already present): " + skipped);
  console.log("Failed: " + failed.length);
  if (failed.length) {
    failed.forEach((f) => console.log("  #" + f.n + " " + f.file + " — " + f.error + "  (" + f.url + ")"));
    process.exitCode = 1;
  } else {
    console.log("");
    console.log("All images present in " + OUT_DIR);
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exitCode = 1;
});
