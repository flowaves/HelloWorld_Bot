const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("embed")
        .setDescription("Créer un message embed.")
        .addStringOption(option =>
            option
                .setName("title")
                .setDescription("Le titre de l'embed.")
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName("description")
                .setDescription("La description de l'embed.")
                .setRequired(true)
        ),

    async execute(interaction) {
        const title = interaction.options.getString("title");
        const description = interaction.options.getString("description");

        const embed = new EmbedBuilder()
            .setColor('#0294E1')
            .setTitle(title)
            .setDescription(description);

        await interaction.reply({ embeds: [embed] });
    },
};
