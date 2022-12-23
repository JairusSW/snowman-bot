module.exports = {
  name: "prefix",
  description: "Set custom prefix",
  guildOnly: true,
  cooldown: 3,
  guildAdminOnly: true,
  async execute(message, args) {
    if (args.length < 1) {
      message.channel.send("You didn't provide a prefix!");
    } else if (args[0].length > 1) {
      message.channel.send("Prefix can't be more than one character long.");
    } else {
      const guildData = await message.client.db.guilds.get(message.guild.id);
      guildData.prefix = args[0];
      await message.client.db.guilds.set(message.guild.id, guildData);
      message.channel.send("Prefix set to: " + args[0]);
    }
  },
};
