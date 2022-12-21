module.exports = {
    once: false,
    guildOnly: true,
    async execute(client, member) {
       (await client.channels.fetch("1055122022067343453")).send(`To bad <@${member.id}> has left ${member.guild.name}!! 😭😭😭😭😭😭😭😭`); 
    }
}