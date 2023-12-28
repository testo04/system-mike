const express = require("express");
const app = express();
app.get("/", (req, res) => {
  res.send("Hello Express app!");
});
app.listen(3000, () => {
  console.log("server started");
});
const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const canvafy = require("canvafy");
const {
  token,
  prefix,
  levels_room,
  welcome_room,
  guild_id,
  voice_channels,
} = require("./config.json");
const client = new Client({
  intents: 131071,
});
const { readdirSync } = require("node:fs");
readdirSync("./handlers").forEach((handler) => {
  require(`./handlers/${handler}`)(client);
});
require("./level");

module.exports.Client = client;

setInterval(async() => {
  try {
    const guild = await client.guilds.fetch(guild_id); // put your guild id
    // 1️⃣ VOICE 1 ---- MEMBERS COUNT -----
    const voiceChannelUsers = await guild.channels.cache.get(voice_channels.users); // get the users voice channel
    const memberCount = await guild.memberCount; // get the guild members count
    console.log(memberCount)
    if (voiceChannelUsers && voiceChannelUsers.type == 2) {
      await voiceChannelUsers.setName(`Users : ${memberCount}`);
      console.log("interval users runs")
    } else {
      console.log("Users Voice channel not found.");
    }
  } catch (error) {
    console.error("Error updating Voices channels count:", error);
  }
}, 2_500);

setInterval(async() => {
  const guild = await client.guilds.fetch(guild_id); // put your guild id
      // 2️⃣ VOICE 2 ---- MEMBERS STATUS COUNT -----
      const voiceChannelStatus = await guild.channels.cache.get(voice_channels.status); // get the status voice channel
      const onlineUsers = await guild.members.cache.filter(
        (member) => member.presence?.status === "online"
      ).size ?? 0; // online members count
      const dndUsers = await guild.members.cache.filter(
        (member) => member.presence?.status === "dnd"
      ).size ?? 0; // dnd members count
      const idleUsers = await guild.members.cache.filter(
        (member) => member.presence?.status === "idle"
      ).size ?? 0; // idle members count
      if (voiceChannelStatus && voiceChannelStatus.type == 2) {
        //--------- update members status -----------------//
        await voiceChannelStatus.setName(`🟢${onlineUsers} ⛔${dndUsers} 🌙${idleUsers}`);
        console.log("interval status runs")
      } else {
        console.log("Voice channel not found.");
      }
}, 2_500);

setInterval(async() => {
  const guild = await client.guilds.fetch(guild_id); // put your guild id
       // 3️⃣ VOICE 3 ---- DATE -----
       const voiceChannelDate = await guild.channels.cache.get(voice_channels.date); // get the date voice channel
       const date = new Date().toLocaleString("en-US", {
         weekday: "long",
         month: "short",
         day: "numeric",
       }); // get the date
       if (voiceChannelDate && voiceChannelDate.type == 2) {
         //--------- update date -----------------//
         await voiceChannelDate.setName(`📅 ${date}`);
         console.log("interval date runs")
       } else {
         console.log("Voice channel not found.");
       } 
}, 2_500);

//nodejs-events
process.on("unhandledRejection", (e) => {
  console.log(e);
});
process.on("uncaughtException", (e) => {
  console.log(e);
});
process.on("uncaughtExceptionMonitor", (e) => {
  console.log(e);
});

//====================== ---------- LEVEL SYSTEM ---------- =============================//

const levelSchema = require("./Database/Schema/level");

client.on("messageCreate", async (message) => {
  if (!message.guild || message.author.bot) return;
  let data = await levelSchema.findOne({
    Guild: message.guild.id,
    User: message.author.id,
  });
  if (!data) {
    data = await levelSchema.create({
      Guild: message.guild.id,
      User: message.author.id,
    });
  }

  const give = 1;
  const requiredXP = parseInt(data.LEVEL) * parseInt(data.LEVEL) * 20 + 20;

  if (data.LEVEL >= 30) return;
  if (data.XP + give >= requiredXP) {
    data.XP += parseInt(give);
    data.LEVEL += parseInt(1);
    await data.save();

    if (!message.channel) return;

    // The user gets a role when the level is upgraded.

    // if (data.LEVEL == 1) {
    //   await message.member.roles.add("1076843750401261568");
    // } else if (data.LEVEL == 2) {
    //   await message.member.roles.add("1076843749084250133");
    // } else if (data.LEVEL == 3) {
    //   await message.member.roles.add("1076843746504753214");
    // } else if (data.LEVEL == 4) {
    //   await message.member.roles.add("1076843746504753214");
    // } else if (data.LEVEL == 5) {
    //   await message.member.roles.add("1076843745229668456");
    // } else if (data.LEVEL == 6) {
    //   await message.member.roles.add("1076843743904272474");
    // } else if (data.LEVEL == 7) {
    //   await message.member.roles.add("1076843742746640495");
    // } else if (data.LEVEL == 8) {
    //   await message.member.roles.add("1076843741211545600");
    // } else if (data.LEVEL == 9) {
    //   await message.member.roles.add("1076843740141994184");
    // } else if (data.LEVEL == 10) {
    //   await message.member.roles.add("1076843738971783259");
    // } else if (data.LEVEL == 11) {
    //   // level 11 + silver trophy
    //   await message.member.roles.add("1076843734307709050");
    //   await message.member.roles.add("920779784697565215");
    // } else if (data.LEVEL == 12) {
    //   await message.member.roles.add("1076843718713290752");
    // } else if (data.LEVEL == 13) {
    //   await message.member.roles.add("1076843737805770844");
    // } else if (data.LEVEL == 14) {
    //   await message.member.roles.add("1076843736438411446");
    // } else if (data.LEVEL == 15) {
    //   await message.member.roles.add("1076843735343706142");
    // } else if (data.LEVEL == 16) {
    //   await message.member.roles.add("1076843733485637782");
    // } else if (data.LEVEL == 17) {
    //   await message.member.roles.add("1076843730054684763");
    // } else if (data.LEVEL == 18) {
    //   await message.member.roles.add("1076845803039105065");
    // } else if (data.LEVEL == 19) {
    //   await message.member.roles.add("1076845803949260870");
    // } else if (data.LEVEL == 20) {
    //   await message.member.roles.add("1076845805169807360");
    // } else if (data.LEVEL == 21) {
    //   // level 21 + gold trophy
    //   await message.member.roles.add("1076845806734282833");
    //   await message.member.roles.add("920779627088183297");
    // } else if (data.LEVEL == 22) {
    //   await message.member.roles.add("1076845807749304360");
    // } else if (data.LEVEL == 23) {
    //   await message.member.roles.add("1076845809020190800");
    // } else if (data.LEVEL == 24) {
    //   await message.member.roles.add("1076845810337198100");
    // } else if (data.LEVEL == 25) {
    //   await message.member.roles.add("1076845811540955256");
    // } else if (data.LEVEL == 26) {
    //   await message.member.roles.add("1076845812686000298");
    // } else if (data.LEVEL == 27) {
    //   await message.member.roles.add("1076845813910749204");
    // } else if (data.LEVEL == 28) {
    //   await message.member.roles.add("1076845815169024150");
    // } else if (data.LEVEL == 29) {
    //   await message.member.roles.add("1076845816540569600");
    // } else if (data.LEVEL == 30) {
    //   // level 21 + platinum trophy
    //   await message.member.roles.add("920780032346050580");
    //   await message.member.roles.add("1076845817635274762");
    // }

    const level_up = await new canvafy.LevelUp()
      .setAvatar(message.author.displayAvatarURL({ dynamic: true }))
      .setBackground(
        "image",
        "https://media.discordapp.net/attachments/1188445927539753031/1189632122634379264/Design_sans_titre_12.png?ex=659ede40&is=658c6940&hm=4eb894a6c6e78606d8575302ec23cfa5f2cfbd076e19ec50acb9cfd5e6f0ef3f&=&format=webp&quality=lossless&width=750&height=187"
      )
      .setUsername(message.author.username)
      .setBorder("#000000")
      .setAvatarBorder("#0f2847")
      .setOverlayOpacity(0.7)
      .setLevels(parseInt(data.LEVEL - 1), parseInt(data.LEVEL))
      .build();

    await client.channels.cache
      .get(levels_room)
      .send({
        content: `🎊 <@${message.author.id}> new level up !`,
        files: [
          {
            attachment: level_up,
            name: `levelup-${message.author.id}.png`,
          },
        ],
      })
      .catch((err) => {
        console.log("err in sending level up message", err);
      });
  } else {
    data.XP += parseInt(give);
    data.save();
  }
});

//====================== ---------- WELCOME ---------- =============================//
client.on("guildMemberAdd", async (member) => {
  let channel = await client.channels.cache.get(welcome_room);
  let banner;
  if (member.user.bannerURL() !== null) {
    banner = member.user.bannerURL({ dynamic: true, size: 2048 });
  } else if (
    member.user.hexAccentColor !== undefined &&
    member.user.hexAccentColor !== null
  ) {
    banner = `https://serux.pro/rendercolour?hex=${member.user.hexAccentColor.replace(
      /#/g,
      ""
    )}&height=200&width=512`;
  } else {
    banner = null;
  }

  const invites = await member.guild.invites.fetch();
  const invite = invites.find((inv) => inv.uses > 0 && inv.inviter);
  let inviter_id = invite ? `<@${invite.inviter.id}>` : "`not found`";

  let embed = new EmbedBuilder()
    .setTitle("welcome to the server !")
    .setDescription(
      `** > Hello <@${member.id}>, welcome to ${member.guild.name} enjoy your stay\n\n> Username : \n${member.user.username}\n> Invited by : \n${inviter_id}\n> Invite used : \n||${invite.code}||\n> You're Member\n\`${member.guild.memberCount}\`\n> Server Rules\n<#1189295676455137330>\n> Support Channel\n<#1189297429061832794> **`
    )
    .setThumbnail(member.user.avatarURL({ dynamic: true }))
    .setColor("DarkBlue")
    .setImage(banner);
  let row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setLabel("Youtube")
      .setStyle(ButtonStyle.Link)
      .setEmoji("1189854466439135233")
      .setURL(`https://www.youtube.com/@PSHomebrewOfficial`),
    new ButtonBuilder()
      .setLabel("TikTok")
      .setStyle(ButtonStyle.Link)
      .setEmoji("1189854463171776652")
      .setURL(`https://www.tiktok.com/@pshomebrewofficial`),
    new ButtonBuilder()
      .setLabel("Twitter")
      .setStyle(ButtonStyle.Link)
      .setEmoji("1189854458767736832")
      .setURL(`https://twitter.com/PSHomebrewNews`),
    new ButtonBuilder()
      .setLabel("Instagram")
      .setStyle(ButtonStyle.Link)
      .setEmoji("1189921127179485184")
      .setURL(`https://www.instagram.com/pshofficial_`)
  );
  await channel.send({
    embeds: [embed],
    content: `<@${member.id}>`,
    components: [row],
  });
});

//====================== ---------- SERVER STATICS ---------- =============================//
async function updateMemberCount() {
  try {
    const guild = await client.guilds.fetch(guild_id); // put your guild id

    // 1️⃣ VOICE 1 ---- MEMBERS COUNT -----
    const voiceChannelUsers = guild.channels.cache.get(voice_channels.users); // get the users voice channel
    const memberCount = await guild.memberCount; // get the guild members count
    console.log(memberCount)
    if (voiceChannelUsers && voiceChannelUsers.type === 2) {
      voiceChannelUsers.setName(`Users : ${memberCount}`);
      console.log("Member count updated.");
    } else {
      console.log("Users Voice channel not found.");
    }

    // 2️⃣ VOICE 2 ---- MEMBERS STATUS COUNT -----
    const voiceChannelStatus = guild.channels.cache.get(voice_channels.status); // get the status voice channel
    const onlineUsers = guild.members.cache.filter(
      (member) => member.presence?.status === "online"
    ).size ?? 0; // online members count
    const dndUsers = guild.members.cache.filter(
      (member) => member.presence?.status === "dnd"
    ).size ?? 0; // dnd members count
    const idleUsers = guild.members.cache.filter(
      (member) => member.presence?.status === "idle"
    ).size ?? 0; // idle members count
    if (voiceChannelStatus && voiceChannelStatus.type === 2) {
      //--------- update members status -----------------//
      voiceChannelStatus.setName(`🟢${onlineUsers} ⛔${dndUsers} 🌙${idleUsers}`);
      console.log("Users status count updated.");
    } else {
      console.log("Voice channel not found.");
    }

    // 3️⃣ VOICE 3 ---- DATE -----
    const voiceChannelDate = guild.channels.cache.get(voice_channels.date); // get the date voice channel
    const date = new Date().toLocaleString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    }); // get the date
    if (voiceChannelDate && voiceChannelDate.type === 2) {
      //--------- update date -----------------//
      voiceChannelDate.setName(`📅 ${date}`);
      console.log("Users status count updated.");
    } else {
      console.log("Voice channel not found.");
    }
  } catch (error) {
    console.error("Error updating member count:", error);
  }
}

client.login(token);
