const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("kick")
        .setDescription("Expulser un utilisateur du serveur.")
        .addUserOption(option =>
            option
                .setName("user")
                .setDescription("L'utilisateur à expulser.")
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName("reason")
                .setDescription("La raison de l'expulsion.")
                .setRequired(false)
        ),

    async execute(interaction) {
        const user = interaction.options.getUser("user");
        const reason = interaction.options.getString("reason") || "Aucune raison fournie.";
        const member = await interaction.guild.members.fetch(user.id);

        if (member) {
            if (!interaction.member.permissions.has("KICK_MEMBERS")) {
                return interaction.reply({
                    content: "Vous n'avez pas la permission d'expulser des membres.",
                    ephemeral: true,
                });
            }

            try {
                await member.kick(reason);
                const kickEmbed = new EmbedBuilder()
                    .setColor("Red")
                    .setTitle("Utilisateur expulsé")
                    .setDescription(`**${user.tag}** a été expulsé du serveur.`)
                    .addFields({ name: "Raison", value: reason });

                await interaction.reply({ embeds: [kickEmbed] });
            } catch (error) {
                console.error("Error kicking member:", error);
                await interaction.reply({
                    content: "Une erreur est survenue lors de la tentative d'expulser cet utilisateur.",
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
