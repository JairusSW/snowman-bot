module.exports = {
  name: "ban",
  description: "Ban a user from the sever",
  usage: "[@user]",
  execute(message, args) {
    if (message.member.permissions.has("BAN_MEMBERS")) {
      const member = message.mentions.users.first();
      if (member) {
        const memberTarget = message.guild.members.cache.get(member.id);
        memberTarget.ban();
        message.channel
          .send("The user you taged has been banned!")
          .then((msg) => {
            setTimeout(() => msg.delete(), 2000);
          })
          .catch();
      } else {
        message.channel
          .send("You could not ban the member, please mention them to ban.")
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
