const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('takerole')
    .setDescription('Kirim embed untuk pengambilan role')
    .addChannelOption(option =>
      option.setName('channel').setDescription('Channel tujuan').setRequired(true))
    .addRoleOption(option =>
      option.setName('role').setDescription('Role yang bisa diambil').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const channel = interaction.options.getChannel('channel');
    const role = interaction.options.getRole('role');

    const embed = new EmbedBuilder()
      .setTitle('Ambil Role')
      .setDescription(`Klik tombol di bawah ini untuk mengambil role <@&${role.id}>.`)
      .setColor(0x3498DB);

    const button = new ButtonBuilder()
      .setCustomId(`getrole_${role.id}`)
      .setLabel('Ambil Role')
      .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder().addComponents(button);

    await channel.send({ embeds: [embed], components: [row] });
    await interaction.reply({ content: 'Pesan role sudah dikirim!', ephemeral: true });
  },
};
