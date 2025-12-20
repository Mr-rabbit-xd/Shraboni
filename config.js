const fs = require("fs");
const path = require("path");
const envPath = path.join(__dirname, "config.env");

if (fs.existsSync(envPath)) {
  require("dotenv").config({ path: envPath });
}

const isTrue = (x) => String(x).toLowerCase() === "true";

module.exports = {
  // ================= SESSION ================= //
  SESSION_ID:
    process.env.SESSION_ID ||
    "𓂃ᷱ᪳𝘅_𝗸𝗶𝗿𝗮_𝐁𓋜𝐓≈qbyeh282^☁️",

  // ================= MENU ================= //
  MENU_INFO:
    process.env.MENU_INFO ||
    "𝐐𝐔𝐄𝐄𝐍-𝐒𝐇𝐑𝐀𝐁𝐎𝐍𝐈,https://www.rabbit.zone.id/tgwheu.jpg",

  THEME: process.env.THEME || "t",

  // ================= BOT MODE ================= //
  WORK_TYPE: process.env.WORK_TYPE || "private",
  prefix: process.env.PREFIX || ".",
  BOT_NAME: process.env.BOT_NAME || "𝐐𝐮𝐞𝐞𝐧-𝐒𝐡𝐫𝐚𝐛𝐨𝐧𝐢",

  // ================= OWNER ================= //
  OWNER_NAME: process.env.OWNER_NAME || "𝑴𝒓-𝒓𝒂𝒃𝒃𝒊𝒕",

  // ================= FEATURES ================= //
  STATUS_REACT: isTrue(process.env.STATUS_REACT) || false,
  AUTOREAD: isTrue(process.env.AUTOREAD) || false,
  AUTOTYPING: isTrue(process.env.AUTOTYPING) || false,
  AUTOREACT: isTrue(process.env.AUTOREACT) || false,
  STATUS_SEEN: isTrue(process.env.STATUS_SEEN) || false,
};
