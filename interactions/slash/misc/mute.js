const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("mute")
        .setDescription("Rendre muet un utilisateur sur le serveur.")
        .addUserOption(option =>
            option
                .setName("user")
                .setDescription("L'utilisateur à rendre muet.")
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName("reason")
                .setDescription("La raison du mute.")
                .setRequired(false)
        ),

    async execute(interaction) {
        const user = interaction.options.getUser("user");
        const reason = interaction.options.getString("reason") || "Aucune raison fournie.";
        const member = await interaction.guild.members.fetch(user.id);

        if (member) {
            if (!interaction.member.permissions.has("MUTE_MEMBERS")) {
                return interaction.reply({
                    content: "Vous n'avez pas la permission de rendre muet des membres.",
                    ephemeral: true,
                });
            }

            try {
                await member.voice.setMute(true, reason);
                const muteEmbed = new EmbedBuilder()
                    .setColor("Yellow")
                    .setTitle("Utilisateur rendu muet")
                    .setDescription(`**${user.tag}** a été rendu muet.`)
                    .addFields({ name: "Raison", value: reason });

                await interaction.reply({ embeds: [muteEmbed] });
            } catch (error) {
                console.error("Error muting member:", error);
                await interaction.reply({
                    content: "Une erreur est survenue lors de la tentative de rendre muet cet utilisateur.",
                    ephemeral: true,
                });
            }
        } else {
            await interaction.reply({
                content: "L'utilisateur n'est pas dans le serveur.",
                ephemeral: true,
            });
        }
    },
};
