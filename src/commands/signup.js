module.exports = {
  name: "signup",
  description: "View the database as a whole",
  guildOnly: true,
  cooldown: 3,
  adminOnly: true,
  async execute(message, args) {
    const userData = await message.client.db.users.get(
      message.author.id + message.guild.id
    );
    if (userData) {
      message.channel.send("You are already signed up!");
      return;
    }
    await message.client.db.users.set(message.author.id + message.guild.id, {
      stats: {
        messages: {
          sent: 0,
        },
        commands: {
          sent: 0,
        },
      },
      levels: {
        xp: 0,
        coins: 1000,
        level: 1,
        health: 100,
        items: [],
        wins: 0,
        loss: 0,
      },
    });

    message.channel.send("Signed up!");
  },
};
