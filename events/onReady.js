/**
 * @file Ready Event File.
 * @author Naman Vrati
 * @since 1.0.0
 * @version 3.2.2
 */

const { Events, ActivityType } = require("discord.js");

module.exports = {
	name: Events.ClientReady,
	once: true,

	/**
	 * @description Executes when client is ready (bot initialization).
	 * @param {import('../typings').Client} client Main Application Client.
	 */
	async execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		client.user.setStatus('idle');
		client.user.setActivity('rien', { type: ActivityType.Playing });
	},
};
