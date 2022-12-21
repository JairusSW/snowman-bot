module.exports = {
  name: "seeDB",
  description: "View the database as a whole",
  guildOnly: true,
  cooldown: 3,
  async execute(message, args) {
    console.log("See db");
    console.log(
      "Database: " +
        JSON.stringify(await message.client.db.statsGlobal.toJSON(), null, 2)
    );
    message.channel.send(
      JSON.stringify(await message.client.db.statsGlobal.toJSON(), null, 2)
    );
  },
};
