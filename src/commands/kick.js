module.exports = {
  name: "kick",
  description: "",
  execute(message, args) {
    if (message.member.permissions.has("KICK_MEMBERS")) {
      const member = message.mentions.users.first();
      if (member) {
        const memberTarget = message.guild.members.cache.get(member.id);
        memberTarget.kick();
        message.channel
          .send("The user you taged has been kicked!")
          .then((msg) => {
            setTimeout(() => msg.delete(), 2000);
          })
          .catch();
      } else {
        message.channel
          .send("You could not kick the member, please mention them to kick.")
          .then((msg) => {
            setTimeout(() => msg.delete(), 2000);
          })
          .catch();
      }
    } else {
      message.channel
        .send("You do not have the right permittions to use this command.")
        .then((msg) => {
          setTimeout(() => msg.delete(), 2000);
        })
        .catch();
    }
  },
};
