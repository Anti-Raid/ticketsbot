const { readdirSync } = require('fs');
const { join } = require('path');
const filePath = join(__dirname, '..', 'Commands');

module.exports.run = (client) => {
	for (const cmd of readdirSync(filePath).filter(cmdFile => cmdFile.endsWith('.js'))) {
		const command = require(`${filePath}/${cmd}`);
		// eslint-disable-next-line no-inline-comments
		if (command.data?.name/* means the command is from new handler */) client.commands.set(command.data.name, command);
	}
};