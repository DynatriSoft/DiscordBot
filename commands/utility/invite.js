const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    category: 'utility',
    data: new SlashCommandBuilder()
        .setName('invite')
        .setDescription('Provides an invite link to join this server.'),
    async execute(interaction) {
        const inviteEmbed = new EmbedBuilder()
            .setColor(0x0099ff)
            .setTitle('Join Our Server!')
            .setDescription('Click the link below to join our server and be a part of the DynatriSoft community!')
            .setThumbnail('https://s3.dynatrisoft.com/assets/logo/red.png')
            .addFields(
                { name: 'Why Join?', value: 'Be part of an amazing community, stay updated with the latest news, and much more!' },
                { name: 'Invite Link', value: '[Join Now](https://r.dynatrisoft.com/s/discord)', inline: true },
            )
            .setFooter({ text: 'Powered by DynatriSoft', iconURL: 'https://s3.dynatrisoft.com/assets/logo/black.png' })
            .setTimestamp();

        await interaction.reply({ embeds: [inviteEmbed] });
    },
};
