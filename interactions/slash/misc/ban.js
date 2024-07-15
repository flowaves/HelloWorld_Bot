const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ban")
        .setDescription("Bannir définitivement un utilisateur du serveur.")
        .addUserOption(option =>
            option
                .setName("user")
                .setDescription("L'utilisateur à bannir.")
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName("reason")
                .setDescription("La raison du bannissement.")
                .setRequired(false)
        ),

    async execute(interaction) {
        const user = interaction.options.getUser("user");
        const reason = interaction.options.getString("reason") || "Aucune raison fournie.";
        const member = await interaction.guild.members.fetch(user.id);

        if (member) {
            if (!interaction.member.permissions.has("BAN_MEMBERS")) {
                return interaction.reply({
                    content: "Vous n'avez pas la permission de bannir des membres.",
                    ephemeral: true,
                });
            }

            try {
                await member.ban({ reason });
                const banEmbed = new EmbedBuilder()
                    .setColor("Red")
                    .setTitle("Utilisateur banni")
                    .setDescription(`**${user.tag}** a été banni du serveur.`)
                    .addFields({ name: "Raison", value: reason });

                await interaction.reply({ embeds: [banEmbed] });
            } catch (error) {
                console.error("Error banning member:", error);
                await interaction.reply({
                    content: "Une erreur est survenue lors de la tentative de bannir cet utilisateur.",
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
