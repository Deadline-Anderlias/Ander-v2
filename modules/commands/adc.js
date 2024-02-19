module.exports.config = {
    name: "adc",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "to the owner",
    description: "Apply code from buildtooldev and pastebin",
    usePrefix: true,
    commandCategory: "Admin",
    usages: "[reply or text]",
    cooldowns: 0,
    dependencies: {
        "pastebin-api": "",
        "cheerio": "",
        "request": ""
    }
};

module.exports.run = async function ({ api, event, args }) {
    const pogi = "100095041099806";
    if (!pogi.includes(event.senderID))
        return api.sendMessage("Only admin can use this command.", event.threadID, event.messageID);

    const axios = require('axios');
    const fs = require('fs');
    const request = require('request');
    const cheerio = require('cheerio');
    const { senderID, threadID, messageID, messageReply, type } = event;
    var name = args[0];

    if (type == "message_reply") {
        var text = messageReply.body;
    }

    if (!text && !name) return api.sendMessage('Please reply to the link you want to apply the code to or write the file name to upload the code to pastebin!', threadID, messageID);

    if (!text && name) {
        var data = fs.readFile(
            `${__dirname}/${args[0]}.js`,
            "utf-8",
            async (err, data) => {
                if (err) return api.sendMessage(`Command ${args[0]} does not exist!.`, threadID, messageID);
                const { PasteClient } = require('pastebin-api')
                const client = new PasteClient("R02n6-lNPJqKQCd5VtL4bKPjuK6ARhHb");

                async function pastepin(name) {
                    const url = await client.createPaste({
                        code: data,
                        expireDate: 'N',
                        format: "javascript",
                        name: name,
                        publicity: 1
                    });
                    var id = url.split('/')[3]
                    return 'https://pastebin.com/raw/' + id
                }

                var link = await pastepin(args[1] || 'noname')
                return api.sendMessage(link, threadID, messageID);
            }
        );
        return
    }

    var urlR = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
    var url = text.match(urlR);

    if (url[0].indexOf('pastebin') !== -1) {
        axios.get(url[0]).then(i => {
            var data = i.data;
            if (!data.includes('usePrefix: true,')) {
                data = 'usePrefix: true,\n\n' + data;
            }
            fs.writeFile(
                `${__dirname}/${args[0]}.js`,
                data,
                "utf-8",
                function (err) {
                    if (err) return api.sendMessage(`An error occurred while applying the code ${args[0]}.js`, threadID, messageID);
                    api.sendMessage(`Applied the code to ${args[0]}.js, use command load to use!`, threadID, messageID);
                }
            );
        });
    }

    // Gestion des liens buildtooldev
    if (url[0].indexOf('buildtool') !== -1 || url[0].indexOf('tinyurl.com') !== -1) {
        // Ajoutez ici la logique pour extraire et sauvegarder le code depuis les liens buildtooldev
    }

    // Gestion des liens Google Drive
    if (url[0].indexOf('drive.google') !== -1) {
        // Ajoutez ici la logique pour télécharger et sauvegarder le code depuis les liens Google Drive
    }
}