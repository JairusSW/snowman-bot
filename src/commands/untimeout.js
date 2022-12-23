const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "untimeout",
  Description: "",
  async execute(message, args, Discord, client) {
    const timeUser = message.mentions.members.first();
    const member = `<@${message.author.id}>`;
    const admin = `${message.author.username}`;
    const reason = args.slice(1).join(" ") || "No reason given.";

    if (message.member.permissions.has("TIMEOUT_MEMBERS")) {
      if (!timeUser)
        return message.channel.send(
          `${member}, you did not tell me who to time out`
        );
      if (message.member === timeUser)
        return message.channel.send(`${member}, you can not timeout youself.`);

      const timeEmbed = new EmbedBuilder()
        .setColor(0xff0000)
        .setDescription(
          `
            ✅ ${timeUser.user.tag} has been removed from timeout for. 
            Reason: ${reason}
            `
        )
        .setTimestamp();

      const dmEmbed = new EmbedBuilder()
        .setColor(0xff0000)
        .setDescription(
          `
            ✅ ${timeUser.user.tag} you have been removed from timeout. 
            Reason: ${reason}
            Admin: ${admin}
            `
        )
        .setTimestamp();

      timeUser.timeout(null, reason);

      message.channel.send({ embeds: [timeEmbed] });

      timeUser.send({ embeds: [dmEmbed] }).catch((err) => {
        console.log(`${timeUser}, did not recive the embed.`);
      });
    } else {
      message.channel.send("You are not that powerful...");
    }
  },
};
