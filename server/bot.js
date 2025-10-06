import { Client, GatewayIntentBits, Partials, Events, REST, Routes, SlashCommandBuilder } from "discord.js";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

// ===== ENV =====
const {
  DISCORD_TOKEN,
  DISCORD_CLIENT_ID,
  GUILD_ID,
  APPS_SCRIPT_URL,
  APPS_SCRIPT_BOT_SECRET
} = process.env;

// Quick guard
function need(name) { if (!process.env[name]) { console.error(`❌ Missing env: ${name}`); process.exit(1); } }
["DISCORD_TOKEN","DISCORD_CLIENT_ID","GUILD_ID","APPS_SCRIPT_URL","APPS_SCRIPT_BOT_SECRET"].forEach(need);

// ===== CLIENT =====
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: [Partials.Channel]
});

// Hardening: never crash silently
process.on("unhandledRejection", (r)=>console.error("UNHANDLED", r));
process.on("uncaughtException", (e)=>console.error("UNCAUGHT", e));

// ===== AUTO REGISTER /login IN THE GUILD =====
async function registerCommands() {
  const rest = new REST({ version: "10" }).setToken(DISCORD_TOKEN);
  const commands = [
    new SlashCommandBuilder().setName("login").setDescription("Get a one-time code (use in DM with the bot).").toJSON()
  ];
  await rest.put(Routes.applicationGuildCommands(DISCORD_CLIENT_ID, GUILD_ID), { body: commands });
  console.log("✅ Registered /login for guild", GUILD_ID);
}

// ===== HELPERS =====
async function createOtp(discord_id, discord_username, avatar_url) {
  const res = await fetch(APPS_SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type":"application/json" },
    body: JSON.stringify({
      method: "createLoginOtp",
      secret: APPS_SCRIPT_BOT_SECRET,
      discord_id,
      discord_username,
      avatar_url
    })
  });
  const j = await res.json().catch(()=>null);
  return j;
}

// ===== EVENTS =====
client.once(Events.ClientReady, async () => {
  console.log(`✅ Bot online as ${client.user.tag}`);
  try {
    await registerCommands();
  } catch (e) {
    console.error("⚠️ Command register failed:", e);
  }
  // Sanity ping
  try {
    const r = await fetch(APPS_SCRIPT_URL + "?method=ping").then(r=>r.json());
    console.log("ℹ️ Apps Script ping:", r);
  } catch (e) {
    console.error("⚠️ Apps Script ping failed:", e);
  }
});

client.on(Events.InteractionCreate, async (i) => {
  try {
    if (!i.isChatInputCommand()) return;
    if (i.commandName !== "login") return;

    // Force DM usage for privacy
    if (i.inGuild()) {
      await i.reply({ content: "Please DM me and run `/login` here.", ephemeral: true });
      return;
    }

    // Confirm member of your guild
    const guild = await client.guilds.fetch(GUILD_ID);
    const member = await guild.members.fetch(i.user.id).catch(() => null);
    if (!member) {
      await i.reply({ content: "You must be a member of the EGR server to log in.", ephemeral: true });
      return;
    }

    const discord_id = i.user.id;
    const username = i.user.username + (i.user.discriminator && i.user.discriminator !== "0" ? `#${i.user.discriminator}` : "");
    const avatar = i.user.avatar ? `https://cdn.discordapp.com/avatars/${discord_id}/${i.user.avatar}.png` : "";

    const j = await createOtp(discord_id, username, avatar);
    if (!j?.ok) {
      console.error("createLoginOtp error:", j);
      await i.reply({ content: `Cannot issue code: ${j?.error || "Unknown error"}`, ephemeral: true });
      return;
    }

    await i.reply({ content: "✅ Your code was sent via DM.", ephemeral: true });
    await i.user.send(
      `**EGR Staff Hub — One-Time Code**\n\n` +
      `Your code: \`${j.otp}\`\n` +
      `Expires in 5 minutes.\n\n` +
      `Open https://staff.emiratesgrouproblox.link and enter the code to sign in.`
    );
  } catch (err) {
    console.error("Interaction error:", err);
    try { await i.reply({ content: "Unexpected error, please try again.", ephemeral: true }); } catch {}
  }
});

// ===== GO =====
client.login(DISCORD_TOKEN);
