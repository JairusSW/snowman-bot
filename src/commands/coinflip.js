const { EmbedBuilder } = require("discord.js");
module.exports = {
  name: "coinflip",
  description: "View the database as a whole",
  guildOnly: true,
  cooldown: 3,
  async execute(message, args) {
    if (!args.length) {
      const noAmount = new EmbedBuilder()
        .setTitle(`You must specify an amount!`)
        .setColor(0x0099ff)
        .setTimestamp()
        .setFooter({ text: message.author.username });
      message.channel.send({ embeds: [noAmount] });
      return;
    }
    const userData = await message.client.db.users.get(
      message.author.id + message.guild.id
    );
    if (!userData) {
      message.channel.send(
        "You are not signed up for statistics! Use the command `signup` to enable this!"
      );
      return;
    }

    if (Math.random() < 0.5) {
      userData.levels.coins += parseInt(args[0]);
      const coinflipEmbed = new EmbedBuilder()
        .setTitle(`You won!`)
        .setThumbnail(
          message.author.avatarURL({ dynamic: false, format: "png" })
        )
        .setColor(0x0099ff)
        .setTimestamp()
        .setDescription(`+${args[0]} coins`)
        .setFooter({ text: message.author.username });
      message.channel.send({ embeds: [coinflipEmbed] });
      await message.client.db.users.set(
        message.author.id + message.guild.id,
        userData
      );
    } else {
      userData.levels.coins -= parseInt(args[0]);
      const coinflipEmbed = new EmbedBuilder()
        .setTitle(`You lost!`)
        .setThumbnail(
          message.author.avatarURL({ dynamic: false, format: "png" })
        )
        .setColor(0x0099ff)
        .setTimestamp()
        .setDescription(`-${args[0]} coins`)
        .setFooter({ text: message.author.username });
      message.channel.send({ embeds: [coinflipEmbed] });
      await message.client.db.users.set(
        message.author.id + message.guild.id,
        userData
      );
    }
  },
};
