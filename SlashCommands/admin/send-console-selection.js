const { SlashCommandBuilder, ChatInputCommandInteraction, Client, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('send-console-selection').setDescription('Shows For you bot ping').addChannelOption(option => option.setName('channel').setDescription('mention the channel').setRequired(false)),owneronly : true,
    /**
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        const {options} = interaction
        let channel = options.getChannel('channel') || interaction.channel;
        let embed = new EmbedBuilder()
                            .setTitle(` 🕹️ Console Selection`) // you can change it 
                            .setDescription(`Reaction To Role To Gain Acces`) // you can change it 
                            .setThumbnail(interaction.guild.iconURL({dynamic : true}))
                            .setColor('Blue')
                            .setAuthor({name : interaction.guild.name , iconURL : interaction.guild.iconURL({dynamic : true})});

        let row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                    .setCustomId('console_select_ps5')
                    .setLabel('PS5')
                    .setEmoji('🎮')
                    .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                    .setCustomId('console_select_ps4')
                    .setLabel('PS4')
                    .setEmoji('🎮')
                    .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
                    .setCustomId('console_select_ps3')
                    .setLabel('PS3')
                    .setEmoji('🎮')
                    .setStyle(ButtonStyle.Danger),
            new ButtonBuilder()
                    .setCustomId('console_select_ps2')
                    .setLabel('PS2')
                    .setEmoji('🎮')
                    .setStyle(ButtonStyle.Secondary),
        )
        const row2 = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                .setCustomId('console_select_psp')
                .setLabel('PSP')
                .setEmoji('🕹️')
                .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                .setCustomId('console_select_vita')
                .setLabel('VITA')
                .setEmoji('🕹️')
                .setStyle(ButtonStyle.Secondary),
        )

        await interaction.reply({content : `✅` , ephemeral : true})
        await channel.send({embeds : [embed] , components : [row , row2]})

    }
}