const { SlashCommandBuilder, AttachmentBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('sendpicture')
    .setDescription('Kirim gambar ke channel tertentu')
    .addChannelOption(option =>
      option.setName('channel').setDescription('Channel tujuan').setRequired(true))
    .addAttachmentOption(option =>
      option.setName('gambar').setDescription('Gambar yang ingin dikirim').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const channel = interaction.options.getChannel('channel');
    const gambar = interaction.options.getAttachment('gambar');

    const attachment = new AttachmentBuilder(gambar.url);

    await channel.send({ content: `Gambar dari ${interaction.user.tag}:`, files: [attachment] });
    await interaction.reply({ content: 'Gambar berhasil dikirim!', ephemeral: true });
  },
};
