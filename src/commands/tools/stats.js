const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stats")
    .setDescription("Returns Statistics about the Server"),
  async execute(interaction, client) {
    try {
      const guild = interaction.guild;
      if (!guild) {
        await interaction.reply({
          content: "This command can only be used in a server.",
          ephemeral: true,
        });
        return;
      }

      const Members = interaction.guild.memberCount;
      const totalBots = interaction.guild.members.cache.filter(
        (member) => !member.user.bot
      ).size;
      const totalMembers = Members - totalBots;

      await interaction.reply({
        content: `Total number of members in the server: ${totalMembers}\nTotal number of bots in the server: ${totalBots}`,
      });
    } catch (error) {
      console.error("Error executing stats command:", error);
      await interaction.reply({
        content: "An error occurred while executing the command.",
        ephemeral: true,
      });
    }
  },
};
