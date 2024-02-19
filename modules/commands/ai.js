const { Hercai } = require('hercai');
const herc = new Hercai();

// Fonction pour changer la police d'écriture
function transformText(text) {
  const replacements = {
    a: "𝘢",
    b: "𝘣",
    c: "𝘤",
    d: "𝘥",
    e: "𝘦",
    f: "𝘧",
    g: "𝘨",
    h: "𝘩",
    i: "𝘪",
    j: "𝘫",
    k: "𝘬",
    l: "𝘭",
    m: "𝘮",
    n: "𝘯",
    o: "𝘰",
    p: "𝘱",
    q: "𝘲",
    r: "𝘳",
    s: "𝘴",
    t: "𝘵",
    u: "𝘶",
    v: "𝘷",
    w: "𝘸",
    x: "𝘹",
    y: "𝘺",
    z: "𝘻",
    // Ajoutez d'autres remplacements au besoin
  };

  const transformedText = text.toLowerCase().split('').map(char => {
    const replacement = replacements[char];
    return replacement !== undefined ? replacement : char;
  }).join('');

  return transformedText;
}

module.exports.config = {
  name: 'ai',
  version: '1.1.0',
  hasPermssion: 0,
  credits: 'Deadline Anderlias',
  description: 'chatgpt',
  usePrefix: false,
  commandCategory: 'chatbots',
  usages: 'Ai [prompt]',
  cooldowns: 5,
};

module.exports.run = async function({ api, event, args }) {
  const prompt = args.join(' ');

  try {
    if (!prompt) {
      api.sendMessage('🟢- 𝖵𝖾𝗎𝗂𝗅𝗅𝖾𝗓 𝗌𝖺𝗂𝗌𝗂𝗋 𝗏𝗈𝗍𝗋𝖾 𝖽𝖾𝗆𝖺𝗇𝖽𝖾\n\n •𝘘𝘶𝘪 𝘦𝘴𝘵 𝗍𝗈𝗇 𝖼𝗋é𝖺𝗍𝖾𝗎𝗋? ', event.threadID, event.messageID);
      api.setMessageReaction('😍', event.messageID, () => { }, true);
    } else if (prompt.toLowerCase().includes("comment ton créateur") ||
      prompt.toLowerCase().includes("anderlias") ||
      prompt.toLowerCase().includes("qui deadline") ||
      prompt.toLowerCase().includes("qui t'as")) {
      api.sendMessage('𝘑𝘦 𝘴𝘶𝘪𝘴 𝘈𝘯𝘥𝘦𝘳 𝘶𝘯𝘦 𝘐𝘈 𝘤𝘰𝘥𝘦𝘳 𝘱𝘢𝘳 𝘋𝘦𝘢𝘥𝘭𝘪𝘯𝘦 𝘈𝘯𝘥𝘦𝘳𝘭𝘪𝘢𝘴, 𝘪𝘭 𝘮𝘢 𝘱𝘳𝘰𝘨𝘳𝘢𝘮𝘮𝘦𝘳 𝘱𝘰𝘶𝘳 𝘳𝘦𝘱𝘰𝘯𝘥𝘳𝘦 à 𝘷𝘰𝘴 𝘣𝘦𝘴𝘰𝘪𝘯𝘴 𝘴𝘱é𝘤𝘪𝘧𝘪𝘲𝘶𝘦. 𝘙𝘦𝘵𝘳𝘰𝘶𝘷𝘦𝘳 𝘭𝘦 𝘤𝘰𝘮𝘱𝘵𝘦 𝘍𝘢𝘤𝘦𝘣𝘰𝘰𝘬 𝘥𝘦 𝘮𝘰𝘯 𝘤𝘳é𝘢𝘵𝘦𝘶𝘳 𝘴𝘶𝘳 www.facebook.com/anderlias .', event.threadID, event.messageID);
      api.setMessageReaction('', event.messageID, () => { }, true);
    } else {
      api.setMessageReaction('🧠', event.messageID, () => { }, true);
      const response = await herc.question({ model: 'v2', content: prompt });
      const transformedResponse = transformText(response.reply);
      api.sendMessage('\n━━━━━━━━━━━\n\n🟢 𝗔𝗻𝗱𝗲𝗿-𝘃2\n\n━━━━━━━━━━━\n\n' + transformedResponse, event.threadID, event.messageID);
      api.setMessageReaction('', event.messageID, () => { }, true);
    }
  } catch (error) {
    api.sendMessage('🔴 ' + error, event.threadID, event.messageID);
    api.setMessageReaction('⚠️', event.messageID, () => { }, true);
  }
};