const { Guild, MessageEmbed } = require("discord.js");
const {capitalize} = require("../Utils/Functions")
module.exports = {
    name: "guildCreate",
    /**
     * 
     * @param {Guild} guild 
     */
    run: async (guild) => {
        console.log(guild.members.cache.reduce((a,b) => a + b.memberCount, 0))
        const embed = new MessageEmbed()
        .setColor("GREEN")
        .setTitle('Joined a Server')
        .setThumbnail(guild.iconURL({dynamic: true}))
        .addField('Owner', (await guild.client.users.fetch(guild.ownerId)).username, true)
        .addField('Members', guild.memberCount.toString(), true)
        .addField('Features', `× ${guild.features.map(x => capitalize(x)).join(", ").toString()}`)
        .addField('Verified', guild.verified ? "Yes" : "No", true)
        .addField('Partnered With Discord Inc.', guild.partnered ? "Yes" : "No", true)
        guild.client.channels.cache.get(guild.client.config.server.channels.guild).send({embeds: [embed]})
    }
}