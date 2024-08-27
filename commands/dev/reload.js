const { SlashCommandBuilder } = require('discord.js');
const {createErrorEmbed} = require("../../utils/createErrorEmbed.js");

module.exports = {
    category: 'dev',
    data: new SlashCommandBuilder()
        .setName('reload')
        .setDescription('Reloads a command.')
        .addStringOption(option =>
            option.setName('command')
                .setDescription('The command to reload.')
                .setRequired(true)),
    async execute(interaction) {
        const allowedUsers = process.env.DEVELOPER ? process.env.DEVELOPER.split(',') : [];

        if (!allowedUsers.includes(interaction.user.id)) {
            const errorEmbed = createErrorEmbed('Forbidden', 'You do not have permission to use this command.');
            return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }

        const commandName = interaction.options.getString('command', true).toLowerCase();
        if (!commandName) {
            const errorEmbed = createErrorEmbed('Error Reloading Command', 'Please provide a command to reload.');
            return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }

        const command = interaction.client.commands.get(commandName);
        if (!command) {
            const errorEmbed = createErrorEmbed('Command Not Found', `There is no command with name \`${commandName}\`!`);
            return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }

        delete require.cache[require.resolve(`../${command.category}/${command.data.name}.js`)];

        try {
            await interaction.client.commands.delete(command.data.name);
            const newCommand = require(`../${command.category}/${command.data.name}.js`);
            await interaction.client.commands.set(newCommand.data.name, newCommand);
            await interaction.reply(`Command \`${newCommand.data.name}\` was reloaded!`);
        } catch (error) {
            let errorMessage = error.message || error.toString();
            const errorEmbed = createErrorEmbed('Error Executing Command', `\`\`\`${errorMessage}\`\`\``);
            await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }
    },
};