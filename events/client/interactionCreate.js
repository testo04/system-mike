const { Events, InteractionType } = require('discord.js');
const config = require('../../config.json')

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction, client) {
        if (interaction.isChatInputCommand()) {
            const command = interaction.client.commands.get(interaction.commandName);
            if(!command) return interaction.reply({ content: `No command matching ${interaction.commandName} was found.`, ephemeral: true })
            try {
                if(command.owneronly){
                    const owners = config.owners || [];
                    if(!owners.includes(interaction.user.id)) return interaction.reply({ content: `**❌ Only the owner have permission to use this command.**`, ephemeral: true })
                }
                await command.execute(interaction, client)
            } catch (error) {
                interaction.reply({ content: `Error executing ${interaction.commandName}`, ephemeral: true })
                console.error(error)
            }
        }
    }
}