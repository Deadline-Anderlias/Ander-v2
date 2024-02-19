  exports.config = {
name: '4k',
version: '0.0.1',
hasPermssion: 0,
credits: 'DC-Nam',
description: 'image 4k',
usePrefix: false,
commandCategory: 'image',
usages: '[image]',
cooldowns: 3

};

let eta = 3;

exports.run = async o=> {

  let send = msg => o.api.sendMessage(msg, o.event.threadID, o.event.messageID);


  if (o.event.type != 'message_reply')return asend(`🔴- 𝘝𝘦𝘶𝘪𝘭𝘭𝘦𝘻 𝘳𝘦𝘱𝘳𝘦𝘯𝘥𝘳𝘦 𝘱𝘢𝘳 𝘶𝘯𝘦 𝘱𝘩𝘰𝘵𝘰 !

`);

  send(`🟢-𝘌𝘯 𝘤𝘰𝘶𝘳𝘴... ${o.event.messageReply.attachments.length} image (${o.event.messageReply.attachments.length*eta}s)`);


  let stream = [];

  let exec_time = 0;

  for (let i of o.event.messageReply.attachments)try {

    let res = await require('axios').get(encodeURI(`https://nams.live/upscale.png?{"image":"${i.url}","model":"4x-UltraSharp"}`), {

      responseType: 'stream',

    });


    exec_time+=+res.headers.exec_time;

    eta = res.headers.exec_time/1000<<0;

    res.data.path = 'tmp.png';

    stream.push(res.data);

  } catch (e) {};


  send({

    body: `🟢 𝘦𝘧𝘧𝘦𝘤𝘵𝘶𝘦𝘳! (${exec_time/1000<<0}s)`,

    attachment: stream,

  });

};