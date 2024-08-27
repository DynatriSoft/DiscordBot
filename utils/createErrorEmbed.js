const { EmbedBuilder } = require('discord.js');

function createErrorEmbed(title, description, color = '#FF4C4C') {
    if (!title) {
        title = 'An error occurred';
    }
    if (!description) {
        description = 'An unexpected error occurred while executing this command. Please try again later.';
    }

    if (title.length > 256) {
        title = `${title.slice(0, 253)}...`;
    }
    if (description.length > 2048) {
        description = `${description.slice(0, 2045)}...`;
    }

    return new EmbedBuilder()
        .setTitle(title)
        .setDescription(description)
        .setColor(color)
        .setTimestamp()
        .setThumbnail('https://s3.dynatrisoft.com/assets/logo/red.png')
        .setFooter({ text: 'DynatriSoft Games', iconURL: 'https://s3.dynatrisoft.com/assets/logo/red.png' });
}

module.exports = { createErrorEmbed };
