const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: "name",
    description: "",
    guildOnly: true,
    cooldown: 3,
    adminOnly: true,
    async execute(message, args) {

        const embed = new EmbedBuilder
        .setColor(0x0099FF)
        .setTitle('Title for Embed')
        .setDescription('Set description')
        .setDescription(`
        Message here
        message here
        `)
        .setTimestamp()
        .setAuhor(`<@message.author.id>`)
    }
}