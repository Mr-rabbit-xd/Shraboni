







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
    "STARK-MD~2BsWFJ7L#HAS1ChTDHfZUN-HQxZatcfkqSQC3bowLKdFEY3RO-IM", // add your session id here

  // ================= DATABASE ================= //
  DATABASE_URL: process.env.DATABASE_URL || "",

  // ================= MENU ================= //
  MENU_INFO:
    process.env.MENU_INFO ||
    "𝑸𝒖𝒆𝒆𝒏-𝑺𝒉𝒓𝒂𝒃𝒐𝒏𝒊,*𝑴𝒓-𝒓𝒂𝒃𝒃𝒊𝒕*,https://www.rabbit.zone.id/t3d94d.jpg",
  // name,desc,link,type(image/video/gif)

  THEME: process.env.THEME || "t", // Garfield

  // ================= BOT MODE ================= //
  WORK_TYPE: process.env.WORK_TYPE || "public",
  prefix: process.env.PREFIX || ".",
  BOT_NAME: process.env.BOT_NAME || "𝑸𝒖𝒆𝒆𝒏-𝑺𝒉𝒓𝒂𝒃𝒐𝒏𝒊💞",

  // ================= FEATURES ================= //
  STATUS_REACT: isTrue(process.env.STATUS_REACT) || false,
  AUTOREAD: isTrue(process.env.AUTOREAD) || false,
  AUTOTYPING: isTrue(process.env.AUTOTYPING) || false,
  AUTOREACT: isTrue(process.env.AUTOREACT) || false,
  STATUS_SEEN: isTrue(process.env.STATUS_SEEN) || false,

  // =========================================== //
};
