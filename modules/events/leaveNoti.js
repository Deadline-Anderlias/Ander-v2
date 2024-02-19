const fs = require('fs');

module.exports.config = {
    name: "leave",
    eventType: ["log:unsubscribe"],
    version: "2.0.0",
    credits: "Deadline Anderlias",// Ne pas changer le nom de l'auteur ou la prochaine mise à jour les scripts seront crypte r, Merci
    description: "...",
};

module.exports.run = async function ({ api, event, Users, Threads }) {
    if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;

    const { threadID } = event;
    const data = global.data.threadData.get(parseInt(threadID)) || (await Threads.getData(threadID)).data;
    const name = global.data.userName.get(event.logMessageData.leftParticipantFbId) || await Users.getNameUser(event.logMessageData.leftParticipantFbId);
    const type = (event.author == event.logMessageData.leftParticipantFbId) ? "𝘢 𝘲𝘶𝘪𝘵𝘵𝘦𝘳 𝘭𝘦 𝘨𝘳𝘰𝘶𝘱𝘦" : "𝘧𝘶𝘵 𝘴𝘶𝘱𝘱𝘳𝘪𝘮𝘦𝘳 𝘱𝘢𝘳 𝘶𝘯 𝘢𝘥𝘮𝘪𝘯";
    let msg, formPush;

    if (typeof data.customLeave === "undefined") {
        msg = "◯───────────◯\n{name}  \n◯───────────◯\n🔴-{type}\n\n 𝘗𝘰𝘶𝘴𝘴𝘪𝘦𝘳𝘦 𝘵𝘶 𝘳𝘦𝘥𝘦𝘷𝘪𝘦𝘯𝘥𝘳𝘢𝘴 𝘱𝘰𝘶𝘴𝘴𝘪𝘦𝘳𝘦 𝘦𝘵 𝘵𝘰𝘯 â𝘮𝘦 𝘥é𝘭𝘪𝘷𝘳ée 𝘳𝘦𝘵𝘰𝘶𝘳𝘯𝘦𝘳𝘢𝘴 𝘥𝘢𝘯𝘴 𝘭𝘦𝘴 𝘧𝘭𝘢𝘮𝘮𝘦𝘴 𝘢𝘳𝘥𝘦𝘯𝘵𝘦𝘴!\n𝘭𝘢𝘵𝘶𝘮!";
    } else {
        msg = data.customLeave;
    }

    msg = msg.replace(/\{name}/g, name).replace(/\{type}/g, type);

    // Chemin vers le dossier des GIFs
    const gifFolderPath = 'ander-bot/événement/leave/';

    // Liste des fichiers GIF dans le dossier
    const gifFiles = fs.readdirSync(gifFolderPath);

    // Sélectionner un GIF aléatoire
    const randomGif = gifFiles[Math.floor(Math.random() * gifFiles.length)];

    // Construire le chemin complet du GIF
    const gifPath = gifFolderPath + randomGif;

    // Envoyer le message avec le GIF
    formPush = {
        body: msg,
        attachment: fs.createReadStream(gifPath),
    };

    return api.sendMessage(formPush, threadID);
};