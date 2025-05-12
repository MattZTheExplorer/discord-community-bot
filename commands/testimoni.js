const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('testimoni')
    .setDescription('Kirim testimoni transaksi')
    .addChannelOption(option =>
      option.setName('channel').setDescription('Channel tujuan').setRequired(true))
    .addStringOption(option =>
      option.setName('pesan').setDescription('Isi testimoni').setRequired(true))
    .addAttachmentOption(option =>
      option.setName('gambar').setDescription('Bukti gambar transaksi (optional)')) // ini diletakkan terakhir!
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const channel = interaction.options.getChannel('channel');
    const pesan = interaction.options.getString('pesan');
    const gambar = interaction.options.getAttachment('gambar');

    const embed = new EmbedBuilder()
      .setTitle('Testimoni MattZTheExplorer')
      .setDescription(pesan)
      .setFooter({ text: 'Dari: ${interaction.user.tag}', iconURL: interaction.user.displayAvatarURL() })
      .setColor(0x2ecc71)
      .setTimestamp();

    if (gambar) {
      embed.setImage(gambar.url);
    }

    await channel.send({ embeds: [embed] });
    await interaction.reply({ content: 'Testimoni berhasil dikirim!', ephemeral: true });
  },
};