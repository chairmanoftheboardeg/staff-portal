import { REST, Routes, SlashCommandBuilder } from "discord.js";

const TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
// If you only want the command in one server, set GUILD_ID and use Routes.applicationGuildCommands
const GUILD_ID = process.env.GUILD_ID || null;

const commands = [
  new SlashCommandBuilder()
    .setName('login')
    .setDescription('Get a one-time code to sign into the EGR Staff Hub (use in DM with the bot).')
    .toJSON()
];

const rest = new REST({ version: '10' }).setToken(TOKEN);

try {
  if (GUILD_ID) {
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands });
    console.log("Registered guild commands.");
  } else {
    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
    console.log("Registered global commands (may take up to 1h).");
  }
} catch (e) {
  console.error(e);
}
