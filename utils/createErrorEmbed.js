const { EmbedBuilder } = require('discord.js');

function createErrorEmbed(title, description, color = '#FF0000') {
    if (!title) {
        title = 'An error occurred';
    }
    if (!description) {
        description = 'An error occurred while executing this command. Please try again later.';
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
        .setFooter({ text: 'An error occurred', iconURL: 'https://example.com/error-icon.png' });
}

module.exports = { createErrorEmbed };
