const { EmbedBuilder } = require("discord.js");
const Weather = require("weather-js");

module.exports = {
  name: "weather",
  description: "Used to get the weather of a place",
  execute(message, args, Discord, weather) {
    const city = args[0];

    Weather.find(
      { search: args.join(" "), degreeType: "F" },
      function (error, result) {
        if (error) return message.channel.send("error");
        if (!city)
          return message.channel.send(
            "You didn't enter the name of the place of which you want to get the weather."
          );

        if (result === undefined || result.length === 0)
          return message.channel.send("You didn't specify a valid location");

        let current = result[0].current;
        let location = result[0].location;

        const embed = new EmbedBuilder()
          .setTitle(`Showing the Weather Info for ${current.observationpoint}`)
          .setDescription(current.skytext)
          .setThumbnail(current.imageUrl)
          .setColor(0x0099ff)
          .setTimestamp()
          .setDescription(
            `
        Temperature: ${current.temperature} *F
        Wind Speed: ${current.winddisplay} 
        Humidity: ${current.humidity}%
        Timezone: UTC${location.timezone}
        Feels like: ${current.feelslike} *F
        Condition: ${current.skytext}
        `
          )
          .setFooter({ text: "Weather Command" });

        message.channel.send({ embeds: [embed] });
      }
    );
  },
};
