const fs = require('fs');

module.exports.config = {
    name: "join",
    eventType: ['log:subscribe'],
    version: "1.0.0",
    credits: "Deadline Anderlias",
    description: "NOTIFICATION",
};

module.exports.run = async function ({ api, event, Users }) {
    if (event.logMessageData.addedParticipants && Array.isArray(event.logMessageData.addedParticipants) &&
        event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
        // Le bot rejoint un groupe
        let botGifPath = 'ander-bot/événement/join/';

        if (fs.existsSync(botGifPath)) {
            console.log("Envoi du gif...");

            // Changer le pseudo du bot
            api.changeNickname(`${global.config.BOTNAME}`, event.threadID);

            api.sendMessage({
                body: `𝗔𝗻𝗱𝗲𝗿: 𝗆𝗂𝗌𝖾 𝖾𝗇 𝗃𝗈𝗎𝗋 𝖽𝖺𝗇𝗌 𝗅𝖺 𝖻𝖺𝗌𝖾 𝖽𝖾 𝖽𝗈𝗇𝗇ée\n\n🟢- 𝖡𝗈𝗍 𝖼𝗈𝗇𝗇𝖾𝖼té 𝗌𝗎𝗋 𝗅𝖾 𝗀𝗋𝗈𝗎𝗉𝖾 \n\n◯───────────◯\n𝗣𝗿𝗲𝗳𝗶𝘅: ${global.config.PREFIX} \n𝗔𝗱𝗺𝗶𝗻: ${config.DESIGN.Admin}\n𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸: ${global.config.FACEBOOK}`,
                attachment: fs.createReadStream("ander-bot/événement/join/join1.gif"),
            }, event.threadID);
        } else {
            console.error("...");
        }
    } else {
        // Autre utilisateur rejoignant le groupe
        let gifFolderPath = 'ander-bot/événement/join/';
        let gifFiles = fs.readdirSync(gifFolderPath);

        if (gifFiles.length === 0) {
            console.error("GIF INTROUVABLE.");
            return;
        }

        // Sélectionner un GIF aléatoire dans le dossier
        let randomGif = gifFiles[Math.floor(Math.random() * gifFiles.length)];
        let gifPath = gifFolderPath + randomGif;

        if (fs.existsSync(gifPath)) {
            console.log("ENVOI DU GIF...");

            // Utiliser await pour obtenir le nom de l'utilisateur de manière asynchrone
            let name = global.data.userName.get(event.logMessageData.leftParticipantFbId) || await Users.getNameUser(event.logMessageData.leftParticipantFbId);

            let formPush = {
                body: `𝘉𝘪𝘦𝘯𝘷𝘦𝘯𝘶𝘦 ${name} 𝘥𝘢𝘯𝘴 𝘭𝘦 𝘨𝘳𝘰𝘶𝘱𝘦!\n\n◉───────────◉\n🟢- 𝘉𝘰𝘵 𝘮𝘢𝘥𝘦 𝘣𝘺 𝘋𝘦𝘢𝘥𝘭𝘪𝘯𝘦 𝘈𝘯𝘥𝘦𝘳𝘭𝘪𝘢𝘴 -> facebook.com/anderlias\n◉───────────◉`,
                attachment: fs.createReadStream(gifPath),
            };

            api.sendMessage(formPush, event.threadID);
        } else {
            console.error("GIF inconnu");
        }
    }
};

function getCurrentSession() {
    let getHours = new Date().getHours();
    return (getHours < 3 ? "minuit" : getHours < 8 ? "tôt le matin" : getHours < 12 ? "midi" : getHours < 17 ? "après-midi" : getHours < 23 ? "soir" : "minuit");
}