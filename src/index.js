// const client = require("./Handler/Client")
// const bot = new client();
// bot._start()

const {Client, Collection, Intents} = require("discord.js")
const client = new Client({intents: [Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Intents.FLAGS.GUILD_INTEGRATIONS,
    Intents.FLAGS.GUILD_WEBHOOKS,
    Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MESSAGE_TYPING],
});
const config = require("./config");
client.commands = new Collection();
client.events = new Collection();
client.config = config;
const { readdirSync } = require('fs');
const { join } = require('path');
const loadersPath = join(__dirname, 'Handler');
const mongoose = require("mongoose")

for (const loaderFile of readdirSync(loadersPath).filter(cmdFile => cmdFile.endsWith('.js'))) {
	const loader = require(`${loadersPath}/${loaderFile}`);
	loader.run(client);
}


client.login(config.bot.token);