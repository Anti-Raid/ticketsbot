const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { bot } = require('./src/config.js');
const fs = require('fs');
const deploy = process.argv[2];

const commands = [];
const commandFiles = fs.readdirSync('./src/Commands').filter(file => file.endsWith('.js'));
console.log(commandFiles)

const clientId = '951558218046382163';
const guildId = '822794927754706975';

for (const file of commandFiles) {
	const command = require(`./src/Commands/${file}`);
	if (command.data) commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(bot.token);

(async () => {
	try {
		if (deploy == 'deploy') {
			await rest.put(
				Routes.applicationCommands(clientId),
				{ body: commands },
			);
		} else {
			await rest.put(
				Routes.applicationGuildCommands(clientId, guildId),
				{ body: commands },
			);
		}
	} catch (error) {
		console.error(error);
	}
})();