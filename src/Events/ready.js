const { Client } = require("discord.js")

module.exports = {
    name: 'ready',
    once: true,
    /**
     * 
     * @param {Client} client 
     */
    run: async (client) => {
        console.log("I am ready")
        client.user.setActivity({name: 'I am being worked on...', type: "WATCHING"})
        client.user.setStatus("dnd")
    }
}