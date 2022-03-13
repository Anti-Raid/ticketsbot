const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction, MessageEmbed } = require('discord.js');

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
    }
}