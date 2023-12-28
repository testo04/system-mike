const { SlashCommandBuilder, ChatInputCommandInteraction, Client } = require('discord.js');
const levelSchema = require('../../Database/Schema/level');
const canvafy = require("canvafy");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('level').setDescription('Shows your level or level any member').addUserOption(option => option.setName('user').setDescription('mention the user').setRequired(false)),owneronly : false,
    /**
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        await interaction.deferReply();
        let user = interaction.options.getUser('user') || interaction.user;
        let member = interaction.options.getMember('user') || interaction.member;

        let data = await levelSchema.findOne({Guild : interaction.guild.id , User : user.id}); // the data of user
        if(!data)return interaction.reply({content : `this user doesn't have any xp !` , ephemeral : true})

        const user_rank = await levelSchema.countDocuments({ // the user rank in the guild
            Guild: interaction.guild.id,
            XP: { $gt: data.XP },
        }) + 1;

        const requiredXP = parseInt(data.LEVEL) * parseInt(data.LEVEL) * 20 + 20; // the required xp to next level

        console.log("member status" , member.presence?.status)

        const rank_card = await new canvafy.Rank()
        .setAvatar(user.displayAvatarURL({ forceStatic: true, extension: "png" }))
        .setBackground("image", "https://media.discordapp.net/attachments/1188445927539753031/1189631200625709197/Design_sans_titre_11.png?ex=659edd64&is=658c6864&hm=39bf0a9a9b66f45456158b15c6018958390e7a19c4de1f6b5dc4793a61f2a696&=&format=webp&quality=lossless&width=1062&height=375")
        .setUsername(user.username)
        .setBarColor('#2043b0')
        .setBorder("#2043b0")
        //.setStatus(member.presence?.status)
        .setLevel(data.LEVEL)
        .setRank(user_rank)
        .setCurrentXp(data.XP)
        .setRequiredXp(requiredXP)
        .build();

            await interaction.editReply({
                files : [{
                    attachment : rank_card,
                    name : `rank-${user.id}.png`
                }]
            }) 

    }
}