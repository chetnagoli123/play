const fs = require("fs");
const QRCode = require("qrcode");

// Get the site URL from environment variable
const url = process.env.PAGE_URL;

if (!url) {
  console.error("Error: PAGE_URL environment variable not set.");
  process.exit(1);
}

const outputFile = "qr-code.png";

QRCode.toFile(
  outputFile,
  url,
  { errorCorrectionLevel: "H" }, // High correction level = scannable even if slightly blurred
  (err) => {
    if (err) {
      console.error("Error generating QR code:", err);
      process.exit(1);
    }
    console.log(`✅ QR code successfully generated for ${url}`);
    console.log(`Saved as: ${outputFile}`);
  }
);
