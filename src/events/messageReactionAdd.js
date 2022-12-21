module.exports = {
  once: false,
  guildOnly: true,
  async execute(client, reaction, user) {
    console.log("Someone reacted!");
    reaction.message.channel.send("Yay for you!");
  },
};
