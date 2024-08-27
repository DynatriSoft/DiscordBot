import {SlashCommandBuilder} from 'discord.js';

module.exports = {
    category: 'utility',
    data: new SlashCommandBuilder()
        .setName('reload')
        .setDescription('Reloads a command.')
        .addStringOption((option: { setName: (arg0: string) => { (): any; new(): any; setDescription: { (arg0: string): { (): any; new(): any; setRequired: { (arg0: boolean): any; new(): any; }; }; new(): any; }; }; }) =>
            option.setName('command')
                .setDescription('The command to reload.')
                .setRequired(true)),
    async execute(interaction: { options: { getString: (arg0: string, arg1: boolean) => string; }; client: { commands: { get: (arg0: any) => any; delete: (arg0: any) => void; set: (arg0: any, arg1: any) => void; }; }; reply: (arg0: string) => any; }) {
        const commandName = interaction.options.getString('command', true).toLowerCase();
        const command = interaction.client.commands.get(commandName);

        if (!command) {
            return interaction.reply(`There is no command with name \`${commandName}\`!`);
        }

        delete require.cache[require.resolve(`../${command.category}/${command.data.name}.js`)];

        try {
            interaction.client.commands.delete(command.data.name);
            const newCommand = require(`../${command.category}/${command.data.name}.js`);
            interaction.client.commands.set(newCommand.data.name, newCommand);
            await interaction.reply(`Command \`${newCommand.data.name}\` was reloaded!`);
        } catch (error) {
            console.error(error);
            await interaction.reply(`There was an error while reloading a command \`${command.data.name}\``);
        }
    },
};