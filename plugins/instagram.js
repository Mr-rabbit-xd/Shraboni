const { Module } = require("../lib/plugins");
const axios = require("axios");

Module({
  command: "insta",
  package: "downloader",
  description: "Download Instagram video",
})(async (message, args) => {
  try {
    const igUrl = args[0];

    if (!igUrl || !igUrl.includes("instagram.com")) {
      return message.send(
        "❌ _Provide a valid Instagram link_\n\nExample:\n.ig https://www.instagram.com/reel/xxxxx"
      );
    }

    await message.react("⏳");

    // API call
    const apiUrl =
      "https://api-aswin-sparky.koyeb.app/api/downloader/igdl?url=" +
      encodeURIComponent(igUrl);

    const { data } = await axios.get(apiUrl, { timeout: 30000 });

    if (!data || !data.status || !data.data || !data.data.length) {
      return message.send("❌ _Failed to fetch Instagram media_");
    }

    // First media item
    const media = data.data[0];

    if (media.type !== "video" || !media.url) {
      return message.send("❌ _No video found in this link_");
    }

    // Send video directly
    await message.sendMessage(
      message.jid,
      {
        video: { url: media.url },
        mimetype: "video/mp4",
      },
      { quoted: message }
    );

    await message.react("✅");
  } catch (err) {
    console.error("Instagram Downloader Error:", err);
    await message.react("❌");
    await message.send("_Failed to download Instagram video_");
  }
});
