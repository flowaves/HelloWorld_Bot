const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("8ball")
        .setDescription("Posez une question et obtenez une réponse de la boule magique 8.")
        .addStringOption(option =>
            option
                .setName("question")
                .setDescription("La question à poser à la boule magique 8.")
                .setRequired(true)
        ),

    async execute(interaction) {
        const responses = [
            "Oui.",
            "Non.",
            "Peut-être.",
            "Demandez à nouveau plus tard.",
            "Certainement.",
            "Je ne pense pas.",
        ];
        const response = responses[Math.floor(Math.random() * responses.length)];
        await interaction.reply(response);
    },
};
