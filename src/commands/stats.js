const { EmbedBuilder } = require("discord.js");
module.exports = {
  name: "stats",
  description: "View the database as a whole",
  guildOnly: true,
  cooldown: 3,
  async execute(message, args) {
    const userData = await message.client.db.users.get(
      message.author.id + message.guild.id
    );
    if (!userData) {
      message.channel.send(
        "You are not signed up for statistics! Use the command `signup` to enable this!"
      );
      return;
    }
    const statsEmbed = new EmbedBuilder()
      .setTitle(`Statistics`)
      .setThumbnail(message.author.avatarURL({ dynamic: false, format: "png" }))
      .setColor(0x0099ff)
      .setTimestamp()
      .setDescription(
        `
        Coins: ${userData.levels.coins}
        Experience: ${userData.levels.xp}
        Level: ${userData.levels.level}
        Health: ${userData.levels.health}
        Wins: ${userData.levels.loss}
        Loss: ${userData.levels.loss}

        `
      )
      .setFooter({ text: message.author.username });
    message.channel.send({ embeds: [statsEmbed] });
  },
};
