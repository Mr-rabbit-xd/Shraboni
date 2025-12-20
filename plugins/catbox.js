const { Module } = require("../lib/plugins");
const fs = require("fs");
const path = require("path");
const os = require("os");
const axios = require("axios");
const FormData = require("form-data");

// ==================== URL UPLOADER PLUGIN ====================

Module({
  command: "url",
  package: "converter",
  description: "Upload media and return URL only",
})(async (message) => {
  try {
    const quotedMsg = message.quoted || message;
    const mimeType = quotedMsg.content?.mimetype || quotedMsg.type;

    if (!mimeType) return;

    const supportedTypes = [
      "imageMessage",
      "videoMessage",
      "audioMessage",
      "documentMessage",
      "stickerMessage",
    ];

    if (!supportedTypes.includes(quotedMsg.type)) return;

    // Download media
    const mediaBuffer = await quotedMsg.download();
    if (!mediaBuffer || !mediaBuffer.length) return;

    // Temp file
    const tempFilePath = path.join(
      os.tmpdir(),
      `catbox_${Date.now()}`
    );
    fs.writeFileSync(tempFilePath, mediaBuffer);

    // Extension detect
    let extension = ".bin";
    const mime = quotedMsg.content?.mimetype || "";

    if (mime.includes("image/jpeg")) extension = ".jpg";
    else if (mime.includes("image/png")) extension = ".png";
    else if (mime.includes("image/gif")) extension = ".gif";
    else if (mime.includes("image/webp")) extension = ".webp";
    else if (mime.includes("video/mp4")) extension = ".mp4";
    else if (mime.includes("video/mkv")) extension = ".mkv";
    else if (mime.includes("audio/mpeg")) extension = ".mp3";
    else if (mime.includes("audio/wav")) extension = ".wav";
    else if (mime.includes("audio/ogg")) extension = ".ogg";
    else if (quotedMsg.content?.fileName)
      extension = path.extname(quotedMsg.content.fileName) || ".bin";

    const fileName = `file_${Date.now()}${extension}`;

    // FormData
    const form = new FormData();
    form.append("reqtype", "fileupload");
    form.append("fileToUpload", fs.createReadStream(tempFilePath), fileName);

    // Upload to Catbox
    const response = await axios.post(
      "https://catbox.moe/user/api.php",
      form,
      {
        headers: form.getHeaders(),
        timeout: 30000,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      }
    );

    fs.unlinkSync(tempFilePath);

    if (!response.data || response.data.includes("error")) return;

    // ===== HIDE CATBOX COMPLETELY =====
    const originalUrl = response.data.trim();
    const onlyFileName = originalUrl.split("/").pop();

    // FINAL URL (User will see ONLY this)
    const finalUrl = `https://www.rabbit.zone.id/${onlyFileName}`;

    // Send ONLY URL
    await message.send(finalUrl);

  } catch (err) {
    console.error("URL upload error:", err);
  }
});
