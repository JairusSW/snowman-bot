const fs = require("fs");
const hangmanWords = fs
  .readFileSync("./src/data/hangmanWords.txt")
  .toString()
  .split("\n");
module.exports = {
  name: "hangman",
  description: "",
  guildOnly: true,
  cooldown: 3,
  async execute(message, args) {
    const guildData = await message.client.db.guilds.get(message.guild.id);
    const word =
      hangmanWords[(Math.random() * hangmanWords.length) >> 1].toLowerCase();
    const hangmanStatus = "- "
      .repeat(word.length)
      .split(" ")
      .slice(0, word.length);
    for (let i = 0; i < word.length; i++) {
      if (word[i] == " ") hangmanStatus[i] = " ";
    }
    hangmanStatus.pop();
    hangmanStatus.push("-");
    console.log(word);
    const statusMessage = await message.channel.send(hangmanStatus.join(" "));
    message.client.hangman.set(message.author.id, async (guess) => {
      if (guess.startsWith(guildData.prefix)) {
        message.channel.send("Game ended. You used a command.");
        message.client.hangman.delete(message.author.id);
        return;
      }
      if (guess.length == 1 && word.includes(guess)) {
        for (let i = 0; i < word.length; i++) {
          if (word[i] == guess) {
            hangmanStatus[i] = guess;
          }
        }
        console.log(hangmanStatus.join(" "));
        if (!hangmanStatus.includes("-")) {
          await message.channel.send("You won!");
          statusMessage.edit(hangmanStatus.join(" ")).catch();
          message.client.hangman.delete(message.author.id);
          return;
        }
        statusMessage.edit(hangmanStatus.join(" "));
      } else if (guess.length == word.length && guess == word) {
        await message.channel.send("You won!");
        await statusMessage.edit(word.split("").join(" ")).catch();
        message.client.hangman.delete(message.author.id);
        return;
      } else {
        statusMessage.edit("Invalid Guess");
        setTimeout(() => {
          statusMessage.edit(hangmanStatus.join(" ")).catch();
        }, 1000);
      }
    });
  },
};
