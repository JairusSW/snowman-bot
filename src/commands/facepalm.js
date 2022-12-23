const DIG = require("discord-image-generation");
const { EmbedBuilder, AttachmentBuilder } = require("discord.js");

module.exports = {
  name: "facepalm",
  description: "Create RIP Image",
  cooldown: 1,
  guildOnly: true,
  async execute(message, args) {
    try {
      const user =
        (await getUserFromMention(args[0], message)) || message.author;
      //console.log(user.displayAvatarURL({ dynamic: false, format: 'png' }))
      const image = await new DIG.Facepalm().getImage(
        user
          .displayAvatarURL({ dynamic: false, format: "png" })
          .replace("webp", "png")
      );

      let attachment = new AttachmentBuilder(image);

      message.channel.send({ files: [attachment] });
    } catch (err) {
      console.log(err);

      const Unavaliable = new EmbedBuilder()
        .setTitle("Something Happened.")
        .setColor(0xff0000)
        .setTimestamp()
        .setFooter(message.author.username);

      message.channel.send({ embeds: [Unavaliable] });
    }
  },
};

function getUserFromMention(mention, message) {
  if (!mention) return; // message.channel.send('Please tag a user :)');

  if (mention.startsWith("<@") && mention.endsWith(">")) {
    mention = mention.slice(2, -1);

    if (mention.startsWith("!")) {
      mention = mention.slice(1);
    }

    return message.client.users.cache.get(mention);
  }
}
