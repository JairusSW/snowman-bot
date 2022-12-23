const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "timeout",
  Description: "",
  async execute(message, args, Discord, client) {
    const timeUser = message.mentions.members.first();
    const duraiton = args[1];
    const member = `<@${message.author.id}>`;
    const admin = `${message.author.username}`;

    if (message.member.permissions.has("TIMEOUT_MEMBERS")) {
      if (!timeUser)
        return message.channel.send(
          `${member}, you did not tell me who to time out`
        );
      if (message.member === timeUser)
        return message.channel.send(`${member}, you can not timeout youself.`);
      if (!duraiton)
        return message.channel.send(
          `${member}, you did not tell me how long to timeout ${timeUser}. Please insert a valid time.`
        );
      if (duraiton > 604800)
        return message.channel.send(
          `${member} you can not exseed a timeout of 1 week please enter a valid time in secends.`
        );
      if (isNaN(duraiton)) {
        return message.channel.send(
          `${member}, please enter a valid time, only numbers no other characters.`
        );
      }

      let reason = args.slice(2).join(" ") || "No reason given.";

      const timeEmbed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setDescription(
          `
            ✅ ${timeUser.user.tag} has been put in timeout for ${duraiton} secends. 
            Reason: ${reason}.
            `
        )
        .setTimestamp();

      const dmEmbed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setDescription(
          `
            ✅ ${timeUser.user.tag} you have been put in timeout for ${duraiton} secends. 
            Reason: ${reason}. 
            Admin: ${admin}
            `
        )
        .setTimestamp();

      timeUser.timeout(duraiton * 60000, reason);

      message.channel.send({ embeds: [timeEmbed] });

      timeUser.send({ embeds: [dmEmbed] }).catch((err) => {
        console.log(`${timeUser}, did not recive the embed.`);
      });
    } else {
      message.channel.send("You are not that powerful...");
    }
  },
};
