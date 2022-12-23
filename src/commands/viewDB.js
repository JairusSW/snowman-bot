module.exports = {
  name: "viewdb",
  description: "View the database as a whole",
  guildOnly: true,
  cooldown: 3,
  adminOnly: true,
  async execute(message, args) {
    switch (args[0]) {
      case "users": {
        message.channel.send("```\n" + JSON.stringify(await message.client.db.users.toJSON(), null, 2) + "```");  
        break;
      }
      case "guilds": {
        message.channel.send("```\n" + JSON.stringify(await message.client.db.guilds.toJSON(), null, 2) + "```");  
        break;
      }
      default: {
        message.channel.send("Invalid DB name provided!")
      }
    }
  },
};
