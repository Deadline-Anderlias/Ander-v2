const logger = require('./utils/log');
const cron = require('node-cron');

module.exports = async ({ api }) => {
  const minInterval = 5;
  let lastMessageTime = 0;
  let messagedThreads = new Set();

  const config = {
    autoRestart: {
      status: false,
      time: 40,
      note: 'To avoid problems, enable periodic bot restarts',
    },
    acceptPending: {
      status: false,
      time: 30,
      note: 'Approve waiting messages after a certain time',
    },
  };

  function autoRestart(config) {
    if (config.status) {
      cron.schedule(`*/${config.time} * * * *`, () => {
        logger('Start rebooting the system!', 'Auto Restart');
        process.exit(1);
      });
    }
  }

  function acceptPending(config) {
    if (config.status) {
      cron.schedule(`*/${config.time} * * * *`, async () => {
        const list = [
          ...(await api.getThreadList(1, null, ['PENDING'])),
          ...(await api.getThreadList(1, null, ['OTHER'])),
        ];
        if (list[0]) {
          api.sendMessage('You have been approved for the queue. (This is an automated message)', list[0].threadID);
        }
      });
    }
  }

  autoRestart(config.autoRestart);
  acceptPending(config.acceptPending);

  // AUTOGREET EVERY 300 MINUTES
  cron.schedule('*/300 * * * *', () => {
    const currentTime = Date.now();
    if (currentTime - lastMessageTime < minInterval) {
      console.log("Skipping message due to rate limit");
      return;
    }
    api.getThreadList(25, null, ['INBOX'], async (err, data) => {
      if (err) return console.error("Error [Thread List Cron]: " + err);
      let i = 0;
      let j = 0;

      async function message(thread) {
        try {
          api.sendMessage({
            body: `◉───────────◉\n𝗔𝗻𝗱𝗲𝗿-𝘃2\n◉───────────◉\n▸𝘔𝘦𝘳𝘤𝘪 𝘱𝘰𝘶𝘳 𝘭'𝘶𝘵𝘪𝘭𝘪𝘴𝘢𝘵𝘪𝘰𝘯 𝘥𝘶 𝘱𝘳𝘰𝘫𝘦𝘵 𝘈𝘯𝘥𝘦𝘳 (Ⓐ𝗇𝗂𝗆𝖾,Ⓝ𝖺𝗏𝗂𝗀𝖺𝗍𝗂𝗈𝗇,Ⓓ𝗈𝗇𝗇𝖾𝗌,Ⓔ𝗑𝗉𝗅𝗈𝗂𝗍𝖺𝗍𝗂𝗈𝗇,Ⓡ𝗈𝖻𝗈𝗍𝗂𝗊𝗎𝖽)◯──────────◯\nfacebook.com/anderlias`
          }, thread.threadID, (err) => {
            if (err) return;
            messagedThreads.add(thread.threadID);

          });
        } catch (error) {
          console.error("Error sending a message:", error);
        }
      }

      while (j < 20 && i < data.length) {
        if (data[i].isGroup && data[i].name != data[i].threadID && !messagedThreads.has(data[i].threadID)) {
          await message(data[i]);
          j++;
          const CuD = data[i].threadID;
          setTimeout(() => {
            messagedThreads.delete(CuD);
          }, 1000);
        }
        i++;
      }
    });
  }, {
    scheduled: true, // Set this to false to turn it off
    timezone: "Asia/Manila"
  });

  // AUTOGREET EVERY 30 MINUTES
  cron.schedule('*/300 * * * *', () => {
    const currentTime = Date.now();
    if (currentTime - lastMessageTime < minInterval) {
      console.log("Skipping message due to rate limit");
      return;
    }
    api.getThreadList(25, null, ['INBOX'], async (err, data) => {
      if (err) return console.error("Error [Thread List Cron]: " + err);
      let i = 0;
      let j = 0;

      async function message(thread) {
        try {
          api.sendMessage({
            body: `ヾ(＾-＾)ノ`
          }, thread.threadID, (err) => {
            if (err) return;
            messagedThreads.add(thread.threadID);

          });
        } catch (error) {
          console.error("Error sending a message:", error);
        }
      }


      while (j < 20 && i < data.length) {
        if (data[i].isGroup && data[i].name != data[i].threadID && !messagedThreads.has(data[i].threadID)) {
          await message(data[i]);
          j++;
          const CuD = data[i].threadID;
          setTimeout(() => {
            messagedThreads.delete(CuD);
          }, 1000);
        }
        i++;
      }
    });
  }, {
    scheduled: true, // Set this to false to turn it off
    timezone: "Asia/Manila"
  });
};
