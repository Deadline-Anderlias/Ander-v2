module.exports.config = {
  name: "help",
  version: "1.0.2",
  hasPermission: 0,
  credits: "Yan Maglinte x Anderlias",
  description: "Guide",
  usePrefix: true,
  commandCategory: "guide",
  usages: "[Voir les Commandes]",
  cooldowns: 5,
  envConfig: {
		autoUnsend: true,
		delayUnsend: 60
	}
};

module.exports.languages = {
  fr: {
    moduleInfo:
      "「 %1 」\n%2\n\n❯ 𝖴𝗍𝗂𝗅𝗂𝗌𝖺𝗍𝗂𝗈𝗇: %3\n❯ 𝖢𝖺𝗍é𝗀𝗈𝗋𝗂𝖾: %4\n❯ 𝖳𝖾𝗆𝗉𝗌: %5 𝗌𝖾𝖼𝗈𝗇𝖽𝖾(𝗌)\n❯ 𝖯𝖾𝗋𝗆𝗂𝗌𝗌𝗂𝗈𝗇: %6\n\n» 𝖼𝗋é𝖺𝗍𝖾𝗎𝗋 %7 ",
    helpList:
      `◉ 𝗅𝖾 𝖻𝗈𝗍 𝖼𝗈𝗆𝗉𝗍𝖾 %1 𝖼𝗈𝗆𝗆𝖺𝗇𝖽𝖾𝗌 %2 𝖼𝖺𝗍é𝗀𝗈𝗋𝗂𝖾𝗌 𝗉𝗈𝗎𝗋 𝗅𝖾 𝗆𝗈𝗆𝖾𝗇𝗍 🌫️`,
    guideList:
      `◉ 𝗎𝗍𝗂𝗅𝗂𝗌𝖾𝗓 %1${this.config.name} ‹𝗰𝗼𝗺𝗺𝗮𝗻𝗱𝗲› 𝗉𝗈𝗎𝗋 𝖺𝗉𝗉𝗋𝖾𝗇𝖽𝗋𝖾 𝗌𝗈𝗇 𝗎𝗍𝗂𝗅𝗂𝗌𝖺𝗍𝗂𝗈𝗇!\n◉ 𝖴𝗍𝗂𝗅𝗂𝗌𝖾𝗓 %1${this.config.name} ‹𝗽𝗮𝗴𝗲› 𝗉𝗈𝗎𝗋 𝗏𝗈𝗂𝗋 𝗎𝗇𝖾 𝖺𝗎𝗍𝗋𝖾 𝗅𝗂𝗌𝗍𝖾!`,
    user: "User",
    adminGroup: "Admin group",
    adminBot: "Admin bot",
  },
};


module.exports.handleEvent = function ({ api, event, getText }) {
  const { commands } = global.client;
  const { threadID, messageID, body } = event;  

  if (!body || typeof body == "undefined" || body.indexOf("help") != 0)
    return;
  const splitBody = body.slice(body.indexOf("help")).trim().split(/\s+/);
  if (splitBody.length == 1 || !commands.has(splitBody[1].toLowerCase())) return;
  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
  const command = commands.get(splitBody[1].toLowerCase());
  const prefix = threadSetting.hasOwnProperty("PREFIX")
    ? threadSetting.PREFIX
    : global.config.PREFIX;
  return api.sendMessage(
    getText(
      "moduleInfo",
      command.config.name,
      command.config.description,
      `${prefix}${command.config.name} ${
        command.config.usages ? command.config.usages : ""
      }`,
      command.config.commandCategory,
      command.config.cooldowns,
      command.config.hasPermission === 0
        ? getText("user")
        : command.config.hasPermission === 1
        ? getText("adminGroup")
        : getText("adminBot"),
      command.config.credits
    ),
    threadID,
    messageID
  );
};

module.exports.run = async function ({ api, event, args, getText }) {
  const { commands } = global.client;
  const { threadID, messageID } = event;
  const command = commands.get((args[0] || "").toLowerCase());
  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
  const { autoUnsend, delayUnsend } = global.configModule[this.config.name];
  const prefix = threadSetting.hasOwnProperty("PREFIX")
    ? threadSetting.PREFIX
    : global.config.PREFIX;

  if (!command) {
    const commandList = Array.from(commands.values());
    const categories = new Set(commandList.map((cmd) => cmd.config.commandCategory.toLowerCase()));
    const categoryCount = categories.size;

    const categoryNames = Array.from(categories);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(categoryNames.length / itemsPerPage);

    let currentPage = 1;
    if (args[0]) {
      const parsedPage = parseInt(args[0]);
      if (
        !isNaN(parsedPage) &&
        parsedPage >= 1 &&
        parsedPage <= totalPages
      ) {
        currentPage = parsedPage;
      } else {
        return api.sendMessage(
          `🔴-𝖵𝗈𝗎𝗌 𝖽𝖾𝗏𝖾𝗓 𝖼𝗁𝗈𝗂𝗌𝗂𝗋 𝖾𝗇𝗍𝗋𝖾 𝗅𝖺 𝗉𝖺𝗀𝖾 1 𝗌𝗎𝗋 ${totalPages} `,
          threadID,
          messageID
        );
      }
    }
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const visibleCategories = categoryNames.slice(startIdx, endIdx);

    let msg = "";
    for (let i = 0; i < visibleCategories.length; i++) {
      const category = visibleCategories[i];
      const categoryCommands = commandList.filter(
        (cmd) =>
          cmd.config.commandCategory.toLowerCase() === category
      );
      const commandNames = categoryCommands.map((cmd) => cmd.config.name);
      const numberFont = [
        "❶",
        "❷",
        "❸",
        "❹",
        "❺",
        "❻",
        "❼",
        "❽",
        "❾",
        "❿",
      ];
      msg += `╭❮ ${numberFont[i]} ❯─❍ ${
        category.charAt(0).toUpperCase() + category.slice(1)
      }\n╰─➣ ✰${commandNames.join(", ")}\n\n`;
    }

    const numberFontPage = [
      "❶",
      "❷",
      "❸",
      "❹",
      "❺",
      "❻",
      "❼",
      "❽",
      "❾",
      "❿",
      "⓫",
      "⓬",
      "⓭",
      "⓮",
      "⓯",
      "⓰",
      "⓱",
      "⓲",
      "⓳",
      "⓴",
    ];
    msg += `╭ ──────── ╮
│ 𝗉𝖺𝗀𝖾 ${numberFontPage[currentPage - 1]} 𝗌𝗎𝗋 ${
      numberFontPage[totalPages - 1]
    } │\n╰ ──────── ╯\n`;
    msg += getText("helpList", commands.size, categoryCount, prefix);

    const axios = require("axios");
    const fs = require("fs-extra");
    const imgP = [];
    const img = [
      "https://i.imgur.com/qWnSseL.jpg",
      
    ];
    const path = __dirname + "/cache/help.jpg";
    const rdimg = img[Math.floor(Math.random() * img.length)];

    const { data } = await axios.get(rdimg, {
      responseType: "arraybuffer",
    });

    fs.writeFileSync(path, Buffer.from(data, "utf-8"));
    imgP.push(fs.createReadStream(path));
    const config = require("./../../config.json")
    const msgg = {
  body: `╭──────────╮\n│𝗰𝗼𝗺𝗺𝗮𝗻𝗱𝗲𝘀 𝗰𝗮𝘁𝗲𝗴𝗼𝗿𝗶𝗲𝘀│\n╰──────────╯\n‣A𝖽𝗆𝗂𝗇 ${config.DESIGN.Admin}\n\n` + msg + `\n➣ 𝗉𝖺𝗀𝖾𝗌 ❨${totalPages}❩\n` + `\n╭ ──── ╮\n│ 𝗔𝗡𝗗𝗘𝗥 │\n╰ ──── ╯\n` + getText("guideList", config.PREFIX),
  attachment: imgP,
};

    const sentMessage = await api.sendMessage(msgg, threadID, messageID);

    if (autoUnsend) {
      setTimeout(async () => {
        await api.unsendMessage(sentMessage.messageID);
      }, delayUnsend * 1000);
    }
  } else {
    return api.sendMessage(
      getText(
        "moduleInfo",
        command.config.name,
        command.config.description,
        `${prefix}${command.config.name} ${
          command.config.usages ? command.config.usages : ""
        }`,
        command.config.commandCategory,
        command.config.cooldowns,
        command.config.hasPermission === 0
          ? getText("user")
          : command.config.hasPermission === 1
          ? getText("adminGroup")
          : getText("adminBot"),
        command.config.credits
      ),
      threadID, messageID
    );
  }
};