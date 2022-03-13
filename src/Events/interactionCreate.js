const { CommandInteraction } = require("discord.js");

module.exports = {
    name: "interactionCreate",
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    run: async (interaction) => {
        if(interaction.isCommand()) {
            if (!interaction.client.commands.has(interaction.commandName)) return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            const command = interaction.client.commands.get(interaction.commandName);
            const check = interaction.client.guilds.cache.get(interaction.client.config.server.id).members.cache.get(interaction.user.id).roles.cache.get(interaction.client.config.server.roles.dev);
            if(command.ownerOnly && !check) return interaction.reply({content: ":x: This command is restricted to AntiRaid Developers"})
            command.run(interaction)
        }
    }
}