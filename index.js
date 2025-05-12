const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
  partials: [Partials.Channel],
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  client.commands.set(command.data.name, command);
}

client.once('ready', () => {
  console.log(`${client.user.tag} is online!`);
});

client.on('interactionCreate', async interaction => {
  if (interaction.isChatInputCommand()) {
    const command = client.commands.get(interaction.commandName);
    if (!command) return;
    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'Terjadi error saat menjalankan command.', ephemeral: true });
    }
  } else if (interaction.isButton()) {
    const [action, roleId] = interaction.customId.split('_');
    if (action === 'getrole') {
      const role = interaction.guild.roles.cache.get(roleId);
      if (!role) return interaction.reply({ content: 'Role tidak ditemukan.', ephemeral: true });

      const member = interaction.member;
      if (member.roles.cache.has(roleId)) {
        await member.roles.remove(roleId);
        await interaction.reply({ content: `Role <@&${roleId}> telah dihapus dari kamu.`, ephemeral: true });
      } else {
        await member.roles.add(roleId);
        await interaction.reply({ content: `Role <@&${roleId}> telah diberikan kepadamu.`, ephemeral: true });
      }
    }
  }
});

client.login(process.env.TOKEN);
