const child_process = require("child_process");

module.exports = {
  name: "kill-bot",
  description: "Get the ping in milliseconds",
  guildOnly: true,
  cooldown: 3,
  adminOnly: true,
  async execute(message, args) {
    console.log("Killing Bot...");
    await message.channel.send("Killed Bot.");
    process.exit(1);
  },
};
