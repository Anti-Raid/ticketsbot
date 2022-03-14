const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction, MessageEmbed } = require('discord.js');
const guild = require("../Models/Guild")

module.exports = {
    data: new SlashCommandBuilder()
    .setName('setup')
    .setDescription('Setup Ticket system in your server'),
    ownerOnly: false,
    permissions: {
        user: ["MANAGE_GUILD"],
    },
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    run: (interaction) => {
        interaction.reply({content: 'test'})
        const data = guild.findOne({ guildID: interaction.guild.id}, async (data) => {
            if(!data) {
                new guild({
                    guildID: interaction.guild.id,
                    TicketCategoryID: 'String',
                    StaffRoleID: 'String',
                    LogChannelID: 'String',
                }).save()
                interaction.fetchReply();
                interaction.channel.send({content: 'Created schema'})
            }
        });
    }
}