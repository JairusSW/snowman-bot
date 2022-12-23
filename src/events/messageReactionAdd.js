const { EmbedBuilder } = require("discord.js");

module.exports = {
  once: false,
  guildOnly: true,
  async execute(client, reaction, user) {
    console.log("Creating Starboard!");
    const message = reaction.message;
    if (reaction.emoji.name !== "⭐") return;
   // if (message.author.id === user.id) return;
    const starboardChannel = "starboard"//await client.db.guilds.get(message.guild.id);
    //if (!starboardChannel) return;
    const starChannel = message.guild.channels.cache.find(
      (channel) => channel.name === starboardChannel//.starboardChannel
    );
    if (!starChannel) return;
    console.log("Star channel found!")

    const fetchedMessages = await starChannel.messages.fetch({ limit: 100 });

    const stars = fetchedMessages.find(
      (m) =>
        m.embeds[0].footer.text.startsWith("⭐") &&
        m.embeds[0].footer.text.endsWith(message.id)
    );

    if (stars) {
      console.log("Editing starboard")
      const star = /^\⭐\s([0-9]{1,3})\s\|\s([0-9]{17,20})/.exec(
        stars.embeds[0].footer.text
      );

      const foundStar = stars.embeds[0];

      const image =
        message.attachments.size > 0
          ? await extension(reaction, message.attachments.array()[0].url)
          : "";

      const embed = new EmbedBuilder()
        .setColor(foundStar.color)
        .setDescription(foundStar.description)
        .setAuthor({ name: message.author.tag, avatar: message.author.displayAvatarURL })
        .setTimestamp(new Date())
        .setFooter({ text: `⭐ ${parseInt(star[1]) + 1} | ${message.id}` })
       // .setImage(image);

      const starMsg = await starChannel.messages.fetch(stars.id);

      await starMsg.edit({ embeds: [embed] });
    }

    if (!stars) {
      console.log("Sending new starboard")
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
        .setFooter({ text: `⭐ 1 | ${message.id}` })
        //.setImage(image);
      await starChannel.send({ embeds: [embed] });
    }
  }
}

function extension(reaction, attachment) {
  const imageLink = attachment.split(".");
  const typeOfImage = imageLink[imageLink.length - 1];
  const image = /(jpg|jpeg|png|gif)/gi.test(typeOfImage);
  if (!image) return "";
  return attachment;
}
