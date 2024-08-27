const { SlashCommandBuilder } = require('discord.js');
const { inspect } = require('util');

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
            return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
        }

        const command = interaction.options.getString('command', true);

        if (!command) {
            return interaction.reply('Please provide a command to run.');
        }

        try {
            let result = await eval(command);

            if (typeof result !== 'string') {
                result = inspect(result, { depth: 0 });
            }

            if (result.length > 2000) {
                result = result.slice(0, 2000) + '...';
            }

            await interaction.reply({ content: `\`\`\`js\n${result}\n\`\`\``, ephemeral: true });
        } catch (error) {
            console.error('Error executing eval:', error);

            let errorMessage = error.message || error.toString();

            if (errorMessage.length > 2000) {
                errorMessage = errorMessage.slice(0, 2000) + '...';
            }

            await interaction.reply({ content: `Error while running the command:\n\`\`\`${errorMessage}\`\`\``, ephemeral: true });
        }
    },
};