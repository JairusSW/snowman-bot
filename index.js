const fs = require("fs");
const { Client, Events, GatewayIntentBits, Collection } = require("discord.js");
require("dotenv").config({ path: "./config.env" });

const client = new Client({
    intents: [
        ...GatewayIntentBits
    ]
});

client.commands = new Collection();
const commands = fs.readdirSync("./src/commands").filter(file => file.endsWith(".js"));
const events = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
for (const file of commands) {
    const commandName = file.split(".")[0];
    const command = require(`./src/commands/${file}`);
    console.log(`Attempting to load command ${commandName}`);
    client.commands.set(commandName, command);
}

for (const ev of events) {
    const eventName = ev.split(".")[0];
    const eventFunc = require(`./src/events/${ev}`);
    console.log(`Attempting to load event ${eventName}`);
    if (!eventFunc.once) {
        client.on(eventName, (a, b, c) => {
            console.log("Event was triggered.")
            eventFunc.execute(client, a, b, c);
        });
    } else {
        client.once(eventName, (a, b, c) => {
            console.log("Event was triggered.")
            eventFunc.execute(client, a, b, c);
        });
    }
}

client.on("messageCreate", (message) => {
    if (!message.content.startsWith(process.env.prefix) || message.author.bot) return;
    const args = message.content.slice(process.env.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    console.log("Command: " + command)
    if (client.commands.has(command)) client.commands.get(command).execute(message, args)
});

client.login(process.env.token);
