module.exports = {
  once: true,
  guildOnly: true,
  async execute(client) {
    console.log(`Ready! Logged in as ${client.user.tag}`);
    console.log("I have returned!!!! 😁");
    (await client.channels.fetch("1055122091227230281")).send("I am Alive!!!!");
  },
};
