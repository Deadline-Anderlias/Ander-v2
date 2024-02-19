const fs = require('fs');
const prefix = global.config.PREFIX;

module.exports.config = {
    name: "prefix",
    version: "1.0.2",
    hasPermssion: 0,
    credits: "Deadline Anderlias",
    description: "prefix",
    usePrefix: "false",
    commandCategory: "system",
    usages: "[nom]",
    cooldowns: 1,
    envConfig: {
        autoUnsend: true,
        delayUnsend: 20
    }
};

module.exports.run = async function ({ api, event }) {
   
    const gifFolderPath = 'ander-bot/commandes/prefix/';

    const gifFiles = fs.readdirSync(gifFolderPath);

    if (gifFiles.length === 0) {
        console.error("gif introuvable.");
        return;
    }

    const randomGif = gifFiles[Math.floor(Math.random() * gifFiles.length)];
    const gifPath = gifFolderPath + randomGif;

    if (fs.existsSync(gifPath)) {
        console.log("envoie du gif...");

        api.sendMessage({
            body: `◉━━━━━━━━━━━◉\n▸𝗣𝗿𝗲𝗳𝗶𝘅: ${global.config.PREFIX} \n𝗨𝘀𝗮𝗴𝗲: ${prefix}𝗁𝖾𝗅𝗉 «𝗇𝗈𝗆 𝖽𝖾 𝗅𝖺 𝖼𝗈𝗆𝗆𝖺𝗇𝖽𝖾»\n▸𝗔𝗱𝗺𝗶𝗻:𝖣𝖾𝖺𝖽𝗅𝗂𝗇𝖾 𝖠𝗇𝖽𝖾𝗋𝗅𝗂𝖺𝗌\n▸𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸: www.facebook.com/anderlias\n◉━━━━━━━━━━━◉`,
            attachment: fs.createReadStream(gifPath),
        }, event.threadID);
    } else {
        console.error("introuvable");
    }
};
  