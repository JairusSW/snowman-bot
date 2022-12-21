const { messageLink } = require("discord.js")

module.exports = {
    once: false,
    guildOnly: true,
    async execute(client, member) {
       console.log('A user has joined!');
       // const welcomeChannelID = 1055122022067343453;
       (await client.channels.fetch(1055122022067343453)).send(`Hello <@${member.id}> Glad you joined ${member.guild.name}!!`); 
    }
}