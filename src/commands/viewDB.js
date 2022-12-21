module.exports = {
    name: 'viewdb',
    description: 'View the database as a whole',
    guildOnly: true,
    cooldown: 3,
    adminOnly: true,
    async execute(message, args) {
        console.log("See db")
        console.log("Database: " + JSON.stringify(message.client.db.statsGlobal.toJSON(), null, 2))
        message.channel.send(JSON.stringify(message.client.db.statsGlobal.toJSON(), null, 2))
    }
}