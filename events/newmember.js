const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'guildMemberAdd',
    execute(member) {
        const channelId = '1167200840155660412';
        const channel = member.guild.channels.cache.get(channelId);
        if (!channel) return;

        const embed = new EmbedBuilder()
            .setColor('#3498db')
            .setTitle(`Bienvenue, ${member.user.username} !`)
            .setDescription('Nous sommes ravis de t\'accueillir sur notre serveur Discord !')
            .setImage(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
            .setFooter({ text: 'Nous espérons que tu passeras un bon moment ici !' })
            .setTimestamp();

        channel.send({ embeds: [embed] });
    },
};


