// scripts/generate-icons.mjs
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Uses sharp (fast, best for icons)
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, "..");
const input = path.join(projectRoot, "public", "images", "logo.png");
const outDir = path.join(projectRoot, "public", "icons");

const sizes = [
  16, 32, 48, 72, 96, 128, 144, 152, 180, 192, 256, 384, 512,
];

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

async function main() {
  if (!fs.existsSync(input)) {
    console.error(`Missing: ${input}`);
    process.exit(1);
  }

  ensureDir(outDir);

  // Standard icons
  for (const s of sizes) {
    const out = path.join(outDir, `icon-${s}x${s}.png`);
    await sharp(input)
      .resize(s, s, { fit: "contain", background: { r: 11, g: 14, b: 16, alpha: 1 } })
      .png({ compressionLevel: 9 })
      .toFile(out);
    console.log("created", out);
  }

  // Maskable icons (padding keeps it safe in Android mask shapes)
  for (const s of [192, 512]) {
    const out = path.join(outDir, `icon-maskable-${s}x${s}.png`);
    const pad = Math.round(s * 0.12);

    // Create a padded canvas then center the logo inside
    const resized = await sharp(input)
      .resize(s - pad * 2, s - pad * 2, { fit: "contain", background: { r: 11, g: 14, b: 16, alpha: 1 } })
      .png()
      .toBuffer();

    await sharp({
      create: {
        width: s,
        height: s,
        channels: 4,
        background: { r: 11, g: 14, b: 16, alpha: 1 },
      },
    })
      .composite([{ input: resized, left: pad, top: pad }])
      .png({ compressionLevel: 9 })
      .toFile(out);

    console.log("created", out);
  }

  console.log("\nDone. Icons are in /public/icons");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
