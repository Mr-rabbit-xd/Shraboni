const { Module } = require("../lib/plugins");
const fs = require("fs");
const path = require("path");
const os = require("os");
const axios = require("axios");
const FormData = require("form-data");

/**
 * ⚠️ WARNING:
 * Public repo / sell করলে API key leak হতে পারে
 */
const OPENAI_API_KEY = "sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxx"; // <-- এখানে তোমার API key বসাও

Module({
  command: "ghibli",
  package: "ai",
  description: "Convert photo into Ghibli-style AI image",
})(async (message) => {
  try {
    const quoted = message.quoted;

    // Must reply to image
    if (!quoted || quoted.type !== "imageMessage") {
      return message.send("_Reply to an image to generate Ghibli-style art_");
    }

    await message.react("⏳");

    // Download image
    const imgBuffer = await quoted.download();
    if (!imgBuffer || !imgBuffer.length) {
      return message.send("_Failed to download image_");
    }

    // Save temp image
    const tempPath = path.join(os.tmpdir(), `ghibli_${Date.now()}.png`);
    fs.writeFileSync(tempPath, imgBuffer);

    // SAFE prompt (Ghibli-inspired, not copyrighted name)
    const prompt =
      "Create a soft anime illustration inspired by Studio Ghibli style, " +
      "warm pastel colors, cinematic lighting, gentle mood, " +
      "hand-drawn look, detailed background, high quality";

    // Prepare form data for OpenAI Image Edit
    const form = new FormData();
    form.append("model", "gpt-image-1");
    form.append("prompt", prompt);
    form.append("image", fs.createReadStream(tempPath));

    // OpenAI request
    const response = await axios.post(
      "https://api.openai.com/v1/images/edits",
      form,
      {
        headers: {
          ...form.getHeaders(),
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        timeout: 120000,
      }
    );

    fs.unlinkSync(tempPath);

    if (
      !response.data ||
      !response.data.data ||
      !response.data.data[0]?.b64_json
    ) {
      return message.send("_Failed to generate Ghibli image_");
    }

    // Convert base64 to buffer
    const outputImage = Buffer.from(
      response.data.data[0].b64_json,
      "base64"
    );

    // Send image
    await message.sendMessage(
      message.jid,
      {
        image: outputImage,
        caption: "✨ Ghibli-style AI Image",
      },
      { quoted: message }
    );

    await message.react("✅");
  } catch (err) {
    console.error("Ghibli Plugin Error:", err);
    await message.react("❌");
    await message.send("_Error while generating Ghibli image_");
  }
});
