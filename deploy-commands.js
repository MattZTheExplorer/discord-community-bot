const { REST, Routes } = require('discord.js');
const fs = require('fs');
require('dotenv').config();

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

const CLIENT_ID = '1369051233398165616';
const GUILD_ID = '1357444446412865768';

(async () => {
  try {
    console.log('Mendaftarkan slash commands...');
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands });
    console.log('Semua slash commands berhasil didaftarkan!');
  } catch (error) {
    console.error(error);
  }
})();
