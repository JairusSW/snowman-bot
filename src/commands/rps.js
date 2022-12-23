const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "rps",
  Description: "",
  execute(message, args, Discord) {
    const pick = ["rock", "paper", "scissors"];
    let response = pick[Math.floor(Math.random() * pick.length)];

    let choice = args.slice(0).join(" ");
    if (!choice)
      return message.channel.send("Please enter a choice after the command :)");
    if (!pick.includes(choice))
      return message.channel.send("Please enter a valid choice.");

    console.log(`Me: ${response}`);

    if (choice == "rock" && response == "rock") {
      const rpsEmbed = new EmbedBuilder().setColor(0x0099ff).setDescription(`
            **Your Choice:** ${choice}      
            **My Choice:** ${response} 
            **Result:** Tie. 
            `);
      message.channel.send({ embeds: [rpsEmbed] });
    }
    if (choice == "rock" && response == "paper") {
      const rpsEmbed = new EmbedBuilder().setColor(0x0099ff).setDescription(`
            **Your Choice:** ${choice}      
            **My Choice:** ${response} 
            **Result:** I Win!. 
            `);
      message.channel.send({ embeds: [rpsEmbed] });
    }
    if (choice == "rock" && response == "scissors") {
      const rpsEmbed = new EmbedBuilder().setColor(0x0099ff).setDescription(`
            **Your Choice:** ${choice}      
            **My Choice:** ${response} 
            **Result:** You Win! 
            `);
      message.channel.send({ embeds: [rpsEmbed] });
    }

    if (choice == "paper" && response == "paper") {
      const rpsEmbed = new EmbedBuilder().setColor(0x0099ff).setDescription(`
            **Your Choice:** ${choice}      
            **My Choice:** ${response} 
            **Result:** Tie. 
            `);
      message.channel.send({ embeds: [rpsEmbed] });
    }
    if (choice == "paper" && response == "rock") {
      const rpsEmbed = new EmbedBuilder().setColor(0x0099ff).setDescription(`
            **Your Choice:** ${choice}      
            **My Choice:** ${response} 
            **Result:** You WIn!
            `);
      message.channel.send({ embeds: [rpsEmbed] });
    }
    if (choice == "paper" && response == "scissors") {
      const rpsEmbed = new EmbedBuilder().setColor(0x0099ff).setDescription(`
            **Your Choice:** ${choice}      
            **My Choice:** ${response} 
            **Result:** I Win!
            `);
      message.channel.send({ embeds: [rpsEmbed] });
    }

    if (choice == "scissors" && response == "scissors") {
      const rpssEmbed = new EmbedBuilder().setColor(0x0099ff).setDescription(`
            **Your Choice:** ${choice}      
            **My Choice:** ${response} 
            **Result:** Tie. 
            `);
      message.channel.send({ embeds: [rpssEmbed] });
    }
    if (choice == "scissors" && response == "rock") {
      const rpssEmbed = new EmbedBuilder().setColor(0x0099ff).setDescription(`
            **Your Choice:** ${choice}      
            **My Choice:** ${response} 
            **Result:** I Win! 
            `);
      message.channel.send({ embeds: [rpssEmbed] });
    }
    if (choice == "scissors" && response == "paper") {
      const rpssEmbed = new EmbedBuilder().setColor(0x0099ff).setDescription(`
            **Your Choice:** ${choice}      
            **My Choice:** ${response} 
            **Result:** You Win!
            `);
      message.channel.send({ embeds: [rpssEmbed] });
    }
  },
};
