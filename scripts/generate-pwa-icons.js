// scripts/generate-pwa-icons.js
/* Generates PWA icons from /public/images/logo.png into /public/icons/
   Requires: npm i -D sharp
*/
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const SRC = path.join(process.cwd(), "public", "images", "logo.png");
const OUT_DIR = path.join(process.cwd(), "public", "icons");

const sizes = [
  16, 32, 48, 64, 72, 96, 128, 144, 152, 180, 192, 256, 384, 512,
];

async function main() {
  if (!fs.existsSync(SRC)) {
    throw new Error(`Missing source logo: ${SRC}`);
  }
  fs.mkdirSync(OUT_DIR, { recursive: true });

  // Standard icons
  for (const s of sizes) {
    const out = path.join(OUT_DIR, `icon-${s}.png`);
    await sharp(SRC).resize(s, s, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(out);
  }

  // Maskable (padding so it survives Android masks)
  for (const s of [192, 512]) {
    const out = path.join(OUT_DIR, `icon-${s}-maskable.png`);
    const pad = Math.round(s * 0.12);
    await sharp(SRC)
      .resize(s - pad * 2, s - pad * 2, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .extend({
        top: pad,
        bottom: pad,
        left: pad,
        right: pad,
        background: { r: 11, g: 14, b: 16, alpha: 1 }, // #0b0e10
      })
      .png()
      .toFile(out);
  }

  console.log("✅ PWA icons generated in /public/icons");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
