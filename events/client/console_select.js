const {
  Events,
  InteractionType,
  ChatInputCommandInteraction,
  Client,
} = require("discord.js");
const config = require("../../config.json");

module.exports = {
  name: Events.InteractionCreate,
  /**
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    try {
        if (interaction.customId == "console_select_ps5") {
            //----------------- PS5 ROLE --------------------//
            if (interaction.member.roles.cache.has(config.console_selection.ps5_role)) {
              //The user doesn't have a PS5 role, so the bot will remove them one.
              await interaction.member.roles.remove(
                config.console_selection.ps5_role
              );
              await interaction.reply({
                content: `⛔ Removed the <@&${config.console_selection.ps5_role}> role from you`,
                ephemeral: true,
              });
            } else {
              // The user doesn't have a PS5 role, so the bot will give them one.
              await interaction.member.roles.add(config.console_selection.ps5_role);
              await interaction.reply({
                content: `✅ Gave you <@&${config.console_selection.ps5_role}> role`,
                ephemeral: true,
              });
            }
          } else if (interaction.customId == "console_select_ps4") {
            //----------------- PS4 ROLE --------------------//
            if (interaction.member.roles.cache.has(config.console_selection.ps4_role)) {
              //The user doesn't have a PS4 role, so the bot will remove them one.
              await interaction.member.roles.remove(
                config.console_selection.ps4_role
              );
              await interaction.reply({
                content: `⛔ Removed the <@&${config.console_selection.ps4_role}> role from you`,
                ephemeral: true,
              });
            } else {
              // The user doesn't have a PS4 role, so the bot will give them one.
              await interaction.member.roles.add(config.console_selection.ps4_role);
              await interaction.reply({
                content: `✅ Gave you <@&${config.console_selection.ps4_role}> role`,
                ephemeral: true,
              });
            }
          } else if (interaction.customId == "console_select_ps3") {
            //----------------- PS3 ROLE --------------------//
            if (interaction.member.roles.cache.has(config.console_selection.ps3_role)) {
              //The user doesn't have a PS3 role, so the bot will remove them one.
              await interaction.member.roles.remove(
                config.console_selection.ps3_role
              );
              await interaction.reply({
                content: `⛔ Removed the <@&${config.console_selection.ps3_role}> role from you`,
                ephemeral: true,
              });
            } else {
              // The user doesn't have a PS3 role, so the bot will give them one.
              await interaction.member.roles.add(config.console_selection.ps3_role);
              await interaction.reply({
                content: `✅ Gave you <@&${config.console_selection.ps3_role}> role`,
                ephemeral: true,
              });
            }
          } else if (interaction.customId == "console_select_ps2") {
            //----------------- PS2 ROLE --------------------//
            if (interaction.member.roles.cache.has(config.console_selection.ps2_role)) {
              //The user doesn't have a PS2 role, so the bot will remove them one.
              await interaction.member.roles.remove(
                config.console_selection.ps2_role
              );
              await interaction.reply({
                content: `⛔ Removed the <@&${config.console_selection.ps2_role}> role from you`,
                ephemeral: true,
              });
            } else {
              // The user doesn't have a PS2 role, so the bot will give them one.
              await interaction.member.roles.add(config.console_selection.ps2_role);
              await interaction.reply({
                content: `✅ Gave you <@&${config.console_selection.ps2_role}> role`,
                ephemeral: true,
              });
            }
          }else if (interaction.customId == "console_select_psp") {
              //----------------- PSP ROLE --------------------//
              if (interaction.member.roles.cache.has(config.console_selection.psp_role)) {
                //The user doesn't have a PS2 role, so the bot will remove them one.
                await interaction.member.roles.remove(
                  config.console_selection.psp_role
                );
                await interaction.reply({
                  content: `⛔ Removed the <@&${config.console_selection.psp_role}> role from you`,
                  ephemeral: true,
                });
              } else {
                // The user doesn't have a PS2 role, so the bot will give them one.
                await interaction.member.roles.add(config.console_selection.psp_role);
                await interaction.reply({
                  content: `✅ Gave you <@&${config.console_selection.psp_role}> role`,
                  ephemeral: true,
                });
              }
            }else if (interaction.customId == "console_select_vita") {
              //----------------- PSP ROLE --------------------//
              if (interaction.member.roles.cache.has(config.console_selection.vita_role)) {
                //The user doesn't have a PS2 role, so the bot will remove them one.
                await interaction.member.roles.remove(
                  config.console_selection.vita_role
                );
                await interaction.reply({
                  content: `⛔ Removed the <@&${config.console_selection.vita_role}> role from you`,
                  ephemeral: true,
                });
              } else {
                // The user doesn't have a PS2 role, so the bot will give them one.
                await interaction.member.roles.add(config.console_selection.vita_role);
                await interaction.reply({
                  content: `✅ Gave you <@&${config.console_selection.vita_role}> role`,
                  ephemeral: true,
                });
              }
            }
    } catch (error) {
        console.log(error)
        interaction.reply({
            content : `Make sure my role is higher than the role you want give / remove it!`,
            ephemeral : true
        })
    }
  },
};
