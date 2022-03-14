const { Guild, MessageEmbed } = require("discord.js");
const functions = require("../Utils/Functions")
module.exports = {
    name: "guildCreate",
    /**
     * 
     * @param {Guild} guild 
     */
    run: async (guild) => {
        const embed = new MessageEmbed()
        .setColor("GREEN")
        .setThumbnail(guild.iconURL({dynamic: true}))
        .addField('Owner', (await guild.client.users.fetch(guild.ownerId)).username, true)
        .addField('Member Count', guild.members.cache.filter(u => !u.bot).size.toString(), true)
        .addField('Bot Count', guild.members.cache.filter(u => u.bot).size.toString(), true)
        .addField('Total Count', guild.memberCount.toString(), true)
        .addField('Features', `× ${guild.features.map(x => functions.capitalize(x)).join(", ").toString()}`)
        .addField('Verified', guild.verified ? "Yes" : "No", true)
        .addField('Partnered With Discord Inc.', guild.partnered ? "Yes" : "No", true)
        guild.client.channels.cache.get(guild.client.config.server.channels.guild).send({embeds: [embed]})
    }
}