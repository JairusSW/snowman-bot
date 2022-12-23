module.exports = {
  name: "stats",
  description: "View the database as a whole",
  guildOnly: true,
  cooldown: 3,
  async execute(message, args) {
    const userData = await message.client.db.users.get(message.author.id);
    if (!userData) {
      message.channel.send("You are not signed up for statistics! Use the command `signup` to enable this!");
      return
    }
    message.channel.send(
      `Your users:\nMessages Sent: ${userData.stats.messages.sent}\nCommands Used: ${userData.stats.commands.sent}`
    );
  },
};
