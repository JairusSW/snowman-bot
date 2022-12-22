const fs = require("fs");
const ReziDB = require("rezidb");
const cleverbot = require('cleverbot-free');
//const Chatbot = require("discord-chatbot")
const { Client, Events, GatewayIntentBits, Collection } = require("discord.js");
require("dotenv").config({ path: "./config.env" });

const adminIDs = [600700584038760448, 890576956054188083];

//const chatbot = new Chatbot({ name: "Snowman", gender: "Male" });

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
        GatewayIntentBits.MessageContent,
    ],
});

client.prefix = process.env.prefix;

client.conversation = [];

client.db = {
    statsGlobal: new ReziDB({
        name: "statsGlobal",
        path: "./database",
        cluster: false,
        cache: false,
    }),
};

client.hangman = new Map();

client.commands = new Collection();
const commands = fs
    .readdirSync("./src/commands")
    .filter((file) => file.endsWith(".js"));
const events = fs
    .readdirSync("./src/events")
    .filter((file) => file.endsWith(".js"));
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
            eventFunc.execute(client, a, b, c);
        });
    } else {
        client.once(eventName, (a, b, c) => {
            eventFunc.execute(client, a, b, c);
        });
    }
}

client.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    // Inject code into messageCreate for hangman utility. Maybe make a wrapper for this later?
    if (client.hangman.size) {
        for (let i = 0; i < client.hangman.size; i++) {
            if (client.hangman.has(message.author.id)) {
                client.hangman.get(message.author.id)(message.content.trim().toLowerCase());
                message.delete();
            }
        }
    }

    const globalStats = client.db.statsGlobal;

    const userStats = (await globalStats.get(message.author.id)) || {
        messagesSent: 0,
        commandsUsed: 0,
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
    const args = message.content
        .slice(process.env.prefix.length)
        .trim()
        .split(/ +/g);
    const command = args.shift().toLowerCase();
    if (client.commands.has(command)) {
        const commandFunc = client.commands.get(command);
        userStats.commandsUsed++;
        await globalStats.set(message.author.id, userStats);
        if (commandFunc.isAdmin && !adminIDs.includes(message.author.id)) {
            message.channel.send("You lowly weeb. You can't do this boi. :(((((");
        } else {
            commandFunc.execute(message, args);
        }
    }
});

client.login(process.env.token);

let lastMessage = 0;

client.on("messageCreate", message => {
    if (message.author.bot) return;
    console.log(message.content)
    if (message.content.trimStart().startsWith(client.prefix)) return;
    if (client.hangman.has(message.author.id)) return;
    if (!message.content.trimStart().startsWith(`<@${client.user.id}>`)) return;
    if (((Date.now() - lastMessage) < 5000) && lastMessage !== 0) {
        lastMessage = Date.now();
        message.channel.send(`<@${message.author.id}>, Slow down!`);
        return;
    }
    lastMessage = Date.now();
    let text = message.content.slice(message.content.indexOf(">") + 1 || 0);

    cleverbot(text, client.conversations).then(res => {
        client.conversation.push(text);
        client.conversation.push(res);
        client.conversation = client.conversation.slice(0, 10);
        message.channel.send(`<@${message.author.id}>, ${res}`);

    }).catch(err => {
        console.log(`The AI could not compute`);
    });
})