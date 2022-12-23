module.exports = {
  name: "cleardb",
  description: "View the database as a whole",
  guildOnly: true,
  cooldown: 3,
  adminOnly: true,
  async execute(message, args) {
    await message.client.db.users.clear();
    message.channel.send("DB Cleared!");
  },
};
