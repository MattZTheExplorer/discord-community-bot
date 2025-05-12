const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('announcement')
    .setDescription('Kirim pengumuman ke channel tertentu')
    .addChannelOption(option =>
      option.setName('channel').setDescription('Channel tujuan').setRequired(true))
    .addStringOption(option =>
      option.setName('message').setDescription('Isi pengumuman').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const channel = interaction.options.getChannel('channel');
    const message = interaction.options.getString('message');

    const embed = new EmbedBuilder()
      .setTitle('Pengumuman!')
      .setDescription(message)
      .setColor(0x00AE86)
      .setTimestamp();

    await channel.send({ embeds: [embed] });
    await interaction.reply({ content: 'Pengumuman berhasil dikirim!', ephemeral: true });
  },
};
