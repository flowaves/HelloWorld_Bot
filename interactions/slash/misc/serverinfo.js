const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Affiche des informations sur le serveur.'),

    async execute(interaction) {
        const guild = interaction.guild;

        const serverInfoEmbed = new EmbedBuilder()
            .setColor('#0294E1')
            .setTitle(`Informations sur le serveur ${guild.name}`)
            .setDescription(`Serveur créé le ${guild.createdAt.toLocaleDateString()}`)
            .addFields(
                { name: 'Membres', value: guild.memberCount.toString(), inline: true },
                { name: 'Région', value: guild.preferredLocale.toUpperCase(), inline: true },
                { name: 'Owner', value: guild.ownerId, inline: true }
            );

        await interaction.reply({ embeds: [serverInfoEmbed] });
    },
};
