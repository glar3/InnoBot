const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("embed")
    .setDescription("Returns an embed."),
  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setTitle(`Who am I?`)
      .setDescription(`To be detailed soon...`)
      .setColor(0x18e1ee)
      .setImage(client.user.displayAvatarURL())
      .setThumbnail(client.user.displayAvatarURL())
      .setTimestamp(Date.now())
      .setAuthor({
        url: `https://glar3.github.io`,
        iconURL: interaction.user.displayAvatarURL(),
        name: interaction.user.tag,
      })
      .setFooter({
        iconURL: client.user.displayAvatarURL(),
        text: client.user.tag,
      })
      .setURL(`https://glar3.github.io`)
      .addFields([
        {
          name: `Interest`,
          value: `Something you like`,
          inline: true,
        },
        {
          name: `Interest`,
          value: `Something you like`,
          inline: true,
        },
      ]);

    await interaction.reply({ embeds: [embed] });
  },
};
