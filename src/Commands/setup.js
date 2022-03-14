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
    run: async (interaction) => {
        const data = guild.findOne({ guildID: interaction.guild.id})
      const filter = (m) => {
          return m.author.id === interaction.user.id;
      }
      const collector = await interaction.channel.createMessageCollector({
          filter,
          max: 1,
        time: 30000
      });
      interaction.reply({embeds: [new MessageEmbed().setColor("ORANGE").setTitle('Setup your server').setDescription('Please provide a category ID where to create your tickets!\n> You have 30 seconds\n\nType \`cancel\` to cancel setup')]})
      collector.on("collect", (collected) => {
          console.log(collected)
          if(collected.content.toLowerCase() === `cancel`) {
              collector.stop("User cancelled...");
              return interaction.channel.send({content: 'Cancelled setup...'});
          } else {
              if(!interaction.guild.channels.cache.get(collected.content)) return interaction.channel.send({content: 'Please provide valid category ID!'})
              if(data) {
                  data.TicketCategoryID = collected.content;
                //   data.save();
              }
            }
        })
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
    }
}