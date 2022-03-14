const { Client } = require("discord.js")
const ascii = require("ascii-table")
const t = new ascii("AntiRaid Tickets")
const mongoose = require("mongoose")

module.exports = {
    name: 'ready',
    once: true,
    /**
     * 
     * @param {Client} client 
     */
    run: async (client) => {
        const connectstates = {
            0: "Disconnected",
            1: "Connected",
            2: "Connecting",
            3: "Disconnecting",
            99: "Uninitialized"
        }
        mongoose.connect(client.config.bot.mongo_url, {
        }, err => {
            t.setHeading('Connection', 'Statistics')
            t.addRow("Client", client.user.username)
            t.addRow("MongoDB", connectstates[require("mongoose").connection.readyState])
            t.addRow("Commands", client.commands.size)
            t.addRow("Events", client.events.size)
            t.addRow('Users', client.guilds.cache.reduce((a,b) => a + b.memberCount, 0))
            t.addRow('Servers', client.guilds.cache.size)
            console.log(t.toString())
            client.user.setActivity({name: 'I am being worked on...', type: "WATCHING"})
            client.user.setStatus("dnd")
        });
    }
}