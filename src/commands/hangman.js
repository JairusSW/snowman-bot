const fs = require("fs");
const hangmanWords = fs.readFileSync("./src/data/hangmanWords.txt").toString().split("\n");
module.exports = {
  name: "hangman",
  description: "",
  guildOnly: true,
  cooldown: 3,
  async execute(message, args) {
    console.log(hangmanWords)
      const word = hangmanWords[(Math.random() * hangmanWords.length) >> 1].toLowerCase();
    console.log(`Word: ${word}`);
      const hangmanStatus = "- ".repeat(word.length).split(" ").slice(0, word.length);
      hangmanStatus.pop();
      hangmanStatus.push("-");
      console.log(`Status: ${hangmanStatus}`);
      const statusMessage = await message.channel.send(hangmanStatus.join(" "));
      const listener = message.client.on("messageCreate", (guess) => {
          if (guess.author.id != message.author.id) return;
          guess.delete();
          guess = guess.content.trim().toLowerCase();
        if (guess.startsWith(message.client.prefix)) {
            listener.destroy();
            message.channel.send("Game ended. You used a command.")
            return;
        }
        if (guess.length == 1 && word.includes(guess)) {
            for (let i = 0; i < word.length; i++) {
                if (word[i] == guess) {
                    hangmanStatus[i] = guess;
                }
            }
            //message.channel.send("You guessed correctly");
            if (!hangmanStatus.includes("-")) {
                message.channel.send("You won!");
                listener.destroy();
                return;
            }
            statusMessage.edit(hangmanStatus.join(" "));
        } else if (guess.length == word.length && guess == word) {
            message.channel.send("You won!");
            listener.destroy();
            return;
        } else {
            statusMessage.edit("Invalid Guess");
            setTimeout(() => {
                statusMessage.edit(hangmanStatus.join(" "));
            }, 1000);
           // message.channel.send(hangmanStatus.join(" "));
        }
      })
  }
};
