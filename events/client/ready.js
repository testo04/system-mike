const { Client , Events  , ActivityType} = require("discord.js");
const connectToDatabase = require('../../Database/connection')

module.exports = {
    name: Events.ClientReady,
    once: true,
        /**
     * @param {Client} client
     */
    async execute(client) {
        // ================ Streaming ================
        client.user.setActivity({
            type: ActivityType.Watching,
            name : 'PSH ON TOP !',
          });
        // =========================================
        // ===> bdl "Streaming" b : Listening / Playing / Watching

      client.user.setStatus("dnd"); // tnjm tbdlou : idle / dnd / online / invisible
        console.log(`Logged in as: ${client.user.tag}`)
        connectToDatabase();
    }
}