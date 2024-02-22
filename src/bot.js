require("dotenv").config();

const { TOKEN } = process.env;
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const fs = require("fs");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});
client.commands = new Collection();
client.commandArray = [];

const functionFolders = fs.readdirSync("./src/functions");
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of functionFiles)
    require(`./functions/${folder}/${file}`)(client);
}

client.handleEvents();
client.handleCommands();
client.login(TOKEN);

client.on("guildMemberAdd", async (guildMember) => {
  try {
    let welcomeRole = guildMember.guild.roles.cache.find(
      (role) => role.name === "Verified Member"
    );
    if (welcomeRole) {
      console.log("Found the welcome role:", welcomeRole.name);
      await guildMember.roles.add(welcomeRole);
      console.log("Role added successfully.");
    } else {
      console.log("Welcome role not found!");
    }

    const welcomeMessage = `Hey <@${guildMember.user.id}>, Welcome to the Cerebral Corner!\nHope you enjoy your time :)`;
    const channel = client.channels.cache.get("1209580114879184978");

    if (channel) {
      await channel.send(welcomeMessage);
      console.log("Welcome message sent successfully.");
    } else {
      console.log("Welcome channel not found!");
    }
  } catch (error) {
    console.error("Error occurred while sending welcome message:", error);
  }
});

client.on("guildMemberRemove", async (guildMember) => {
  try {
    const LeavingMessage = `<@${guildMember.user.id}> has just run away from all the fun we have!`;
    const channel = client.channels.cache.get("1209580114879184978");

    if (channel) {
      await channel.send(LeavingMessage);
      console.log("Leaving message sent successfully.");
    } else {
      console.log("Leaving channel not found!");
    }
  } catch (error) {
    console.error("Error occurred while sending leaving message:", error);
  }
});
