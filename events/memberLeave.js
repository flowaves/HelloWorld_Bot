const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'guildMemberRemove',
    execute(member) {
        const logChannelId = '1167200840155660412'; 
        const logChannel = member.guild.channels.cache.get(logChannelId);

        if (!logChannel) {
            console.error('Le salon de logs n\'est pas valide.');
            return;
        }

        const embed = new EmbedBuilder()
            .setColor('#e74c3c')
            .setTitle('Membre parti')
            .setDescription(`${member.user.tag} a quitté le serveur.`)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .addFields(
                { name: 'ID', value: `${member.id}`, inline: true },
                { name: 'Parti le', value: new Date().toLocaleString(), inline: true }
            )
            .setTimestamp();

        logChannel.send({ embeds: [embed] });
    },
};
