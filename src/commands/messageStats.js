module.exports = {
    name: 'stats',
    description: 'View the database as a whole',
    guildOnly: true,
    cooldown: 3,
    async execute(message, args) {
        const userData = await message.client.db.statsGlobal.get(message.author.id);
        message.channel.send(`Your Stats:\nMessages Sent: ${userData.messagesSent}\nCommands Used: ${userData.commandsUsed}`)
    }
}