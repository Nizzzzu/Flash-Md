const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT09DVVc4Tm9yQkFhZEdkU3g5OFErVzVGSjZYWTg0Tm9WU2hiNkhaN0Ywdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYUtmT29yV3JuTTFQZ0VlVTIwcDIzM2YzZ0ttQ0FRVExZbWJpTVV5WDZCaz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVSWwrNUdscXVINmJBV0p0Wm9WWUVkRm5GNGxXTmpLc1lRLy91bE1LR1U0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJTmorRUNjVExMa3pld2ZNUHpYT2R3bTJGdFE3YVZjcWJNQUpsd2lodDNvPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVGQ2FqNU5TdG5HR1M3Z2NDcFV1M1krcHAxem03ZndacVJSUzJ1TVVjMlU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJqNVBPbG9ZS01BU3J3aVh4WS9icUc5bDhyRmpERnBqTzRrRWxENjNjQjQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR0tid2QzTUJlTGpISkJTRWxxbEZ1dGdCSkgvOXAvaC9jR2VOZTZMVitsND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOVdYR2psSHROdFZGY2FpM3dSRWhuS29YZGszK05QTW9rRUd3dDdBZ3kzUT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjNpRndEVjdxZ2JWRUpsc3BDdWhVQVJFWlVLb2lTZVZLQ3J5VGJTSk83Nmdtc2pTMm5va0Z1UFBUVnpIYmtSMUZTbWxKMUZ0T3N0ZFZZdk5jTmxSSmdRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6OTcsImFkdlNlY3JldEtleSI6InlrNm9QQ0FEM05ES0xEdTI3WlNodDVycDFEbXVyeGMrYkxKUlRvUnJxbW89IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IldSUG04VDZTUzNpcDV6bUowbWlLSXciLCJwaG9uZUlkIjoiNTk1Nzk0ZTMtOTMxYi00NzJkLWEyNzQtYjI0NjA5Nzc2Y2EwIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IldnSWt0K2RZMWFUVFlMSm03QzN5YVBaOElJdz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJES09aTDVMVWFTZ2lGU20xZ2lCb1gyN0w1TDg9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiSkgxQlJGVjEiLCJtZSI6eyJpZCI6Ijk0Nzc5OTAwMjg1OjExQHMud2hhdHNhcHAubmV0IiwibmFtZSI6IsaYyarOt8miICDwkLChIOG0gCDKnyDJqiDRgyDwkKSgICDwk4WHXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG7jgY3jg7Mg44Oe44Oq44KEIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNQbjV3NFlDRUkrcW5yUUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJoNnJsRkhHQ3pIN3NVNVJOTGRNYjJucVhVQ0pFUXIxcnBNaXMwaU5WSjBVPSIsImFjY291bnRTaWduYXR1cmUiOiJJR084VTJiSTk4c0h3RjN4LzRabXFtbklFVE9aTjg4RzAwdEdoWUh0dUFSdGYzdzI2M1FDMysvOFF4TWRDOStDZjhscFBzQmhqRU5ET1dVaElvVmhCZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiWHhGc2RxcE5FRkJFMmd3c2JYQWE3bEVyMXlNMlp5YWg3Z2F1TnRFRFNOT0hXWWdsczNCS1NrdWZXaW93eE82aTEydFVaRDM4STVlWHhIRmQxNWFEamc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI5NDc3OTkwMDI4NToxMUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJZZXE1UlJ4Z3N4KzdGT1VUUzNURzlwNmwxQWlSRUs5YTZUSXJOSWpWU2RGIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIwMTYxNTY0fQ==',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "France King",
    OWNER_NUMBER : process.env.OWNER_NUMBER || "254105915061", 
             
    AUTO_VIEW_STATUS: process.env.AUTO_VIEW_STATUS || "on",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "on",
CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_SAVE_STATUS: process.env.AUTO_SAVE_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'FLASH-MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_MESSAGE || "on",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'off',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
