require('dotenv').config();


//Helper function to convert "true"/"false" strings to real boolens
const toBool = (value) => value === "true"

// Owner & Bot Details
global.owner= process.env.OWNER_NUMBER ||"2348162895550"
global.ayomikunv1=process.env.BOT_NAME|| "AYOMIKUN-V1"
global.ownername= process.env.OWNER_NAME || "AYOMIKUN FERANMI"
global.packname= process.env.PACK_NAME || "AYOMIKUN-V1"
global.mode= process.env.MODE || "public"
global.region= process.env.REGION || "NIGERIA"
global.author= process.env.AUTHOR || "AYOMIKUN FERANMI"
global.timezone= process.env.TIME_ZONE || "Africa/Lagos"

// Auto-Features
global.autoTyping= toBool(process.env.AUTO_TYPING);
global.autoRecord= toBool(process.env.AUTO_RECORD);
global.autoViewStatus= toBool(process.env.AUTO_VIEW_STATUS);
global.AUTO_STATUS_REACT= toBool(process.env.AUTO_STATUS_REACT);
global.LEVELUP= toBool(process.env.LEVELUP);
global.ANTIVIEWONCE= toBool(process.env.ANTIVIEWONCE);

global.public= process.env.PUBLIC=== 'true'
// Group & Security Settings

global.ANTIDELETE= toBool(process.env.ANTIDELETE);
global.unavailble= toBool(process.env.UNAVAILABLE);
global.available= toBool(process.env.AVAILABLE);
global.autoreadmessages= toBool(process.env.AUTO_READ_MESSAGES);
global.chatbot= toBool(process.env.CHATBOT);
global.autoreact= toBool(process.env.AUTO_REACT);
global.welcome= toBool(process.env.WELCOME)

//Prefixes & Other Settings
global.prefix= process.env.PREFIX|| '.';
global.autobio= (process.env.AUTO_BIO);
global.ANTI_TAG= (process.env.ANTI_TAG);
global.ANTICALL= (process.env.ANRICALL);
global.antilink= toBool(process.env.ANTILINK);
global.antilinkkick= toBool(process.env.ANTILINK_KICK);
global.antilinkwarn= toBool(process.env.ANTILINK_WARN);

// Messages
global.mess = {
    success: process.env.MESSAGE_SUCCESS || 'Done',
    admin: process.env.MESSAGE_ADMIN || '_*  This Command Can Only Be Used By Group Admins !*_',
    botAdmin: process.env.MESSAGE_BOT_ADMIN || '_*  This Command Can Only Be Used When Bot Becomes Group Admin',
    OnlyOwner: process.env.MESSAGE_OWNER || '_*  This Command Can Only Be Used By My Owner Ayomikun!*_',
    OnlyGroup: process.env.MESSAGE_GROUP || '_*  This Command Can Only Be Used In Group Chat!*_',
    Private: provess.env.MESSAGE_PRIVATE || '_*  This Command Can Only Be Used In Private Chat !*_',
    wait: process.env.MESSAGE_WAIT || '_*Please Wait*_',
    notregistered : process.env.MESSAGE_NOT_REGISTERED || '_*You are not registered in the Bot Database. Please regster first*_',
    premium: process.env.MESSAGE_PREMIUM || '_*"Premium Only" Want Premium? Chat Owner*_',
    endlimit: process.env.MESSAGE_END_LIMIT || '_*Your Daily Limit Has Been Used Up, The Limit Will Be Reset Every 00:00 AM_*',
};

let fs = require('fs')
let file = require.resolve(_filename)
fs.watchFile(file, () => { 
fs.unwatchFile(file)
console.log('Update ${_filename}')
delete require.cache[file]
require(file)
})