const fs = require("fs");
const ReziDB = require("rezidb");
const { Client, Events, GatewayIntentBits, Collection } = require("discord.js");
require("dotenv").config({ path: "./config.env" });

const adminIDs = [600700584038760448, 890576956054188083];

const client = new Client({
    intents: [
        GatewayIntentBits.AutoModerationConfiguration,
        GatewayIntentBits.AutoModerationExecution,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildScheduledEvents,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent
    ]
});

client.db = {
    statsGlobal: new ReziDB({
        name: "statsGlobal",
        path: "./database",
        cluster: false,
        cache: false
    })
}

client.commands = new Collection();
const commands = fs.readdirSync("./src/commands").filter(file => file.endsWith(".js"));
const events = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
for (const file of commands) {
    const command = require(`./src/commands/${file}`);
    console.log(`Attempting to load command ${command.name}`);
    client.commands.set(command.name, command);
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

client.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    const globalStats = client.db.statsGlobal;

    const userStats = await globalStats.get(message.author.id) || {
        messagesSent: 0,
        commandsUsed: 0
    };
    /*
        {
            messagesSent: 0,
            commandsUsed: 0
        }
    */
    if (!message.content.startsWith(process.env.prefix)) {
        userStats.messagesSent++;
        await globalStats.set(message.author.id, userStats);
        return;
    }
    const args = message.content.slice(process.env.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    if (client.commands.has(command)) {
        const commandFunc = client.commands.get(command);
        userStats.commandsUsed++;
        await globalStats.set(message.author.id, userStats);
        if (commandFunc.isAdmin && !adminIDs.includes(message.author.id)) {
            message.channel.send("You lowly weeb. You can't do this boi. :(((((")
        } else {
            commandFunc.execute(message, args);
        }
    }
});

client.login(process.env.token);
