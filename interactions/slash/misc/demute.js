const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("unmute")
        .setDescription("Réactiver le son d'un utilisateur sur le serveur.")
        .addUserOption(option =>
            option
                .setName("user")
                .setDescription("L'utilisateur à réactiver.")
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName("reason")
                .setDescription("La raison de la réactivation.")
                .setRequired(false)
        ),

    async execute(interaction) {
        const user = interaction.options.getUser("user");
        const reason = interaction.options.getString("reason") || "Aucune raison fournie.";
        const member = await interaction.guild.members.fetch(user.id);

        if (member) {
            if (!interaction.member.permissions.has("MUTE_MEMBERS")) {
                return interaction.reply({
                    content: "Vous n'avez pas la permission de réactiver le son des membres.",
                    ephemeral: true,
                });
            }

            try {
                await member.voice.setMute(false, reason);
                const unmuteEmbed = new EmbedBuilder()
                    .setColor("Red")
                    .setTitle("Utilisateur réactivé")
                    .setDescription(`**${user.tag}** a été réactivé.`)
                    .addFields({ name: "Raison", value: reason });

                await interaction.reply({ embeds: [unmuteEmbed] });
            } catch (error) {
                console.error("Error unmuting member:", error);
                await interaction.reply({
                    content: "Une erreur est survenue lors de la tentative de réactiver cet utilisateur.",
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
