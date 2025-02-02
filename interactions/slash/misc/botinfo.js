const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('botinfo')
        .setDescription('Affiche des informations sur le bot.'),

    async execute(interaction) {
        const client = interaction.client;

        const botInfoEmbed = new EmbedBuilder()
            .setColor('#0294E1')
            .setTitle(`Informations sur ${client.user.username}`)
            .setDescription(`Bot créé le ${client.user.createdAt.toLocaleDateString()}`)
            .addFields(
                { name: 'ID', value: client.user.id, inline: true },
                { name: 'Version', value: '1.1', inline: true }, // Mettre à jour la version du bot si nécessaire
                { name: 'Développeur', value: `<@1167190271390396517>`, inline: true } // Remplace TonNomDeDéveloppeur par ton nom ou pseudo de développeur
            );

        await interaction.reply({ embeds: [botInfoEmbed] });
    },
};
