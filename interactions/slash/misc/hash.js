const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const crypto = require("crypto");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("hash")
        .setDescription("Hasher une chaîne de caractères.")
        .addStringOption(option =>
            option
                .setName("input")
                .setDescription("La chaîne de caractères à hasher.")
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName("algorithm")
                .setDescription("L'algorithme de hachage à utiliser.")
                .setRequired(false)
                .addChoices(
                    { name: "SHA-256", value: "sha256" },
                    { name: "SHA-512", value: "sha512" },
                    { name: "MD5", value: "md5" }
                )
        ),

    async execute(interaction) {
        const input = interaction.options.getString("input");
        const algorithm = interaction.options.getString("algorithm") || "sha256";
        const hash = crypto.createHash(algorithm).update(input).digest("hex");

        const hashEmbed = new EmbedBuilder()
            .setColor("#0294E1")
            .setTitle("Hash généré")
            .setDescription(`Hash de "${input}" avec l'algorithme ${algorithm} \`${hash}\``);

        await interaction.reply({ embeds: [hashEmbed] });
    },
};
