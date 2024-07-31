const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("userinfo")
        .setDescription("Obtenir des informations sur un utilisateur.")
        .addUserOption(option =>
            option
                .setName("user")
                .setDescription("L'utilisateur à propos duquel obtenir des informations.")
                .setRequired(true)
        ),

    async execute(interaction) {
        const user = interaction.options.getUser("user");
        const member = await interaction.guild.members.fetch(user.id);

        const embed = new EmbedBuilder()
            .setColor('#0294E1')
            .setTitle(`Informations sur ${user.tag}`)
            .setThumbnail(user.avatarURL())
            .addFields(
                { name: "ID", value: user.id, inline: true },
                { name: "Tag", value: user.tag, inline: true },
                { name: "Compte créé le", value: new Date(user.createdTimestamp).toLocaleDateString(), inline: true },
                { name: "Rejoint le", value: new Date(member.joinedTimestamp).toLocaleDateString(), inline: true }
            );

        await interaction.reply({ embeds: [embed] });
    },
};
