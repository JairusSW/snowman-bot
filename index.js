const fs = require("fs");
const { Client, Events, GatewayIntentBits, Collection } = require("discord.js");
require("dotenv").config({ path: "./config.env" });

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.commands = new Collection();
const commands = fs.readdirSync("./src/commands").filter(file => file.endsWith(".js"));

for (const file of commands) {
    const commandName = file.split(".")[0];
    const command = require(`./src/commands/${file}`);
    console.log(`Attempting to load command ${commandName}`);
    client.commands.set(commandName, command);
}

client.once(Events.ClientReady, c => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on("messageCreate", (message) => {
    if (!message.content.startsWith(process.env.prefix) || message.author.bot) return;
    const args = message.content.slice(process.env.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    console.log("Command: " + command)
    if (client.commands.has(command)) client.commands.get(command).execute(message, args)
});


client.login(process.env.token);
