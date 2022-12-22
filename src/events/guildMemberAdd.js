module.exports = {
  once: false,
  guildOnly: true,
  async execute(client, member) {
    (await client.channels.fetch("1055122091227230281") || await client.channels.fetch("1055274938367492187")).send(
      `Hello <@${member.id}> glad you joined ${member.guild.name}!!`
    );
  },
};
