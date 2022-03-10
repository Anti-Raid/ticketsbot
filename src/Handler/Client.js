const {Collection, Intents, Client} = require("discord.js")
const config = require("../config")
const command = require("./Command")
const event = require("./Event")

module.exports = class AntiRaidTickets extends Client {
    constructor(options = {}) {
        super({
            intents: [Intents.FLAGS.GUILDS,
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
                allowedMentions: {
                    parse: ["user", "roles"],
                    repliedUser: true
                }
        });

        this.commands = new Collection();
        this.events = new Collection();
        this.config = config;
    }
    LoadHandlers() {
        command.run(this);
        event.run(this)
    }
    _start() {
        this.LoadHandlers();
        this.login(this.config.bot.token);
    }
}