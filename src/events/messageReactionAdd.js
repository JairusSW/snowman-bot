const { EmbedBuilder } = require("discord.js");

module.exports = {
  once: false,
  guildOnly: true,
  async execute(client, reaction, user) {
    const message = reaction.message;
    if (reaction.emoji.name !== "⭐") return;
   // if (message.author.id === user.id) return;
    const starboardChannel = "starboard"//await client.db.guilds.get(message.guild.id);
    if (!starboardChannel) return;
    const starChannel = message.guild.channels.cache.find(
      (channel) => channel.name === starboardChannel//.starboardChannel
    );
    if (!starChannel) return;

      const image =
        message.attachments.size > 0
          ? extension(reaction, message.attachments.array()[0].url)
          : "";
      if (image === "" && message.cleanContent.length < 1) return;

    const embed = new EmbedBuilder()
      .setColor(15844367)
      .setDescription(message.cleanContent)
      .setAuthor({ name: message.author.tag, avatar: message.author.displayAvatarURL })
      .setTimestamp(new Date())
      .setFooter({ text: `⭐` });
      if (image) embed.setImage(image);
      await starChannel.send({ embeds: [embed] });
  }
}

function extension(reaction, attachment) {
  const imageLink = attachment.split(".");
  const typeOfImage = imageLink[imageLink.length - 1];
  const image = /(jpg|jpeg|png|gif)/gi.test(typeOfImage);
  if (!image) return "";
  return attachment;
}
