const { SlashCommandBuilder } = require('discord.js');
const { inspect } = require('util');
const {createErrorEmbed} = require("../../utils/createErrorEmbed.js");

module.exports = {
    category: 'dev',
    data: new SlashCommandBuilder()
        .setName('eval')
        .setDescription('Run a command.')
        .addStringOption(option =>
            option.setName('command')
                .setDescription('The command to run,')
                .setRequired(true)),
    async execute(interaction) {
        const allowedUsers = process.env.DEVELOPER ? process.env.DEVELOPER.split(',') : [];

        if (!allowedUsers.includes(interaction.user.id)) {
            const errorEmbed = createErrorEmbed('Forbidden', 'You do not have permission to use this command.');
            return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }

        const command = interaction.options.getString('command', true);

        if (!command) {
            const errorEmbed = createErrorEmbed('Error Reloading Command', 'Please provide a command to run.');
            return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }

        try {
            if (command.includes('process.env')) {
                throw new Error('Access to process.env is not allowed.');
            }
            if (command.includes('client.token')) {
                throw new Error('Access to client token is not allowed.');
            }
            if (command.includes('client.user.token')) {
                throw new Error('Access to client user token is not allowed.');
            }
            if (command.includes('client.user.email')) {
                throw new Error('Access to client user email is not allowed.');
            }
            if (command.includes('client.user.password')) {
                throwg new Error('Access to client user password is not allowed.');
            }
            if (command.includes('error:test')) {
                throw new Error('Test error');
            }
            let result = await eval(command);

            if (typeof result !== 'string') {
                result = inspect(result, { depth: 0 });
            }

            if (result.length > 2000) {
                result = result.slice(0, 2000) + '...';
            }

            await interaction.reply({ content: `\`\`\`js\n${result}\n\`\`\``, ephemeral: true });
        } catch (error) {
            let errorMessage = error.message || error.toString();
            const errorEmbed = createErrorEmbed('Error Executing Command', `\`\`\`${errorMessage}\`\`\``);
            await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }
    },
};