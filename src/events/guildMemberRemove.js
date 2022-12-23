module.exports = {
  once: false,
  guildOnly: true,
  async execute(client, member) {
    (
      (await client.channels.fetch("1055122091227230281")) ||
      (await client.channels.fetch("1055274938367492187"))
    ).send(
      `To bad <@${member.id}> has left ${member.guild.name}!! 😭😭😭😭😭😭😭😭`
    );
  },
};
