/**
 * @file Ready Event File.
 * @author Naman Vrati
 * @since 1.0.0
 * @version 3.2.2
 */

const { Events } = require("discord.js");

module.exports = {
	name: Events.ClientReady,
	once: true,

	/**
	 * @description Executes when client is ready (bot initialization).
	 * @param {import('../typings').Client} client Main Application Client.
	 */
	async execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);

		try {
			// Set the bot's status
			await client.user.setPresence({
				activities: [{ name: 'fait maison', type: 'PLAYING' }],
				status: 'online',
			});
			console.log("Bot status set to 'fait maison'");
		} catch (error) {
			console.error("Error setting bot status:", error);
		}
	},
};
