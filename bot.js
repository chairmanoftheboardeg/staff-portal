import { Client, GatewayIntentBits, Partials, Events } from "discord.js";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const {
  DISCORD_TOKEN,
  DISCORD_CLIENT_ID,
  GUILD_ID,
  APPS_SCRIPT_URL,
  APPS_SCRIPT_BOT_SECRET
} = process.env;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: [Partials.Channel]
});

client.once(Events.ClientReady, () => {
  console.log(`✅  Bot online as ${client.user.tag}`);
});

client.on(Events.InteractionCreate, async (i) => {
  try {
    if (!i.isChatInputCommand() || i.commandName !== "login") return;

    // ask to use in DM
    if (i.inGuild()) {
      await i.reply({ content: "Please DM me and run `/login` here.", ephemeral: true });
      return;
    }

    // ensure they’re in your guild
    const guild = await client.guilds.fetch(GUILD_ID);
    const member = await guild.members.fetch(i.user.id).catch(() => null);
    if (!member) {
      await i.reply({ content: "You must be in the EGR server to log in.", ephemeral: true });
      return;
    }

    const discord_id = i.user.id;
    const username = i.user.username;
    const avatar = i.user.avatar ? `https://cdn.discordapp.com/avatars/${discord_id}/${i.user.avatar}.png` : "";

    // ask Apps Script to create code
    const res = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        method: "createLoginOtp",
        secret: APPS_SCRIPT_BOT_SECRET,
        discord_id,
        discord_username: username,
        avatar_url: avatar
      })
    });
    const j = await res.json();
    if (!j.ok) return i.reply({ content: `Cannot issue code: ${j.error}`, ephemeral: true });

    const otp = j.otp;
    await i.reply({ content: "✅  Your code was sent via DM.", ephemeral: true });
    await i.user.send(
      `**EGR Staff Hub — One-Time Code**\n\n` +
      `Your code: \`${otp}\`\nExpires in 5 minutes.\n\n` +
      `Visit https://staff.emiratesgrouproblox.link to sign in.`
    );
  } catch (err) {
    console.error(err);
    try { await i.reply({ content: "Error, try again later.", ephemeral: true }); } catch {}
  }
});

client.login(DISCORD_TOKEN);