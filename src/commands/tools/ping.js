const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Returns Pong!"),
  async execute(interaction, client) {
    try {
      const message = await interaction.deferReply({
        fetchReply: true,
      });

      const newMessage = `API Latency: ${client.ws.ping}\nClient Ping: ${
        message.createdTimestamp - interaction.createdTimestamp
      }`;
      await interaction.editReply({
        content: newMessage,
      });
    } catch (error) {
      console.error("Error executing ping command:", error);
      await interaction.reply({
        content: "An error occurred while executing the command.",
        ephemeral: true,
      });
    }
  },
};
