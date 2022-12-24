const { EmbedBuilder } = require("discord.js");
const songLength = require("../util/songLength");
const play = require("play-dl");
const {
  createAudioPlayer,
  NoSubscriberBehavior,
  createAudioResource,
  joinVoiceChannel,
  AudioPlayerStatus
} = require("@discordjs/voice");
module.exports = {
  name: "play",
  description: "Play a song from youtube, soundcloud, or spotify",
  usage: "[song | url]",
  guildOnly: true,
  cooldown: 3,
  async execute(message, args) {
    let nowPlaying;
    const { channel } = message.member.voice;

    if (!channel) {
      message.channel.send("Enter a voice channel");
      return;
    }

    if (!message.client.voiceConnection) {
      message.client.voiceConnection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
      });
    }

    const searchData = (await play.search(args.join(" "), {
      limit: 1
    }))[0];

    if (!searchData) {
      message.channel.send("Could not find video!");
      return;
    }

    let queueData = message.client.musicQueue.get(message.guild.id);

    if (!queueData) {
      queueData = {
        queue: [{
          name: searchData.description,
          duration: searchData.durationInSec,
          image: searchData.thumbnails[0].url
        }],
        options: {
          shuffle: false,
          loop: false,
          volume: 75
        },
        queuePosition: -1,
        durationStart: Date.now(),
        controlMessage: null
      };
      message.client.musicQueue.set(message.guild.id, queueData);

      message.client.voicePlayer = message.client.voicePlayer ? message.client.voicePlayer : createAudioPlayer({
        behaviors: {
          noSubscriber: NoSubscriberBehavior.Play,
        },
      });

      message.client.voicePlayer.on(AudioPlayerStatus.Idle, async () => {
        nowPlaying = new EmbedBuilder()
          .setTitle(searchData.description)
          .setDescription(`Playing Now.
      Length: ${songLength(searchData.durationInSec)}
      Quality: 96kbps
      Position: [${songLength((Date.now() - message.client.musicQueue.get(message.guild.id).durationStart) * 1000)}/${songLength(searchData.durationInSec)}]`)
          .setColor(0xff0000)
          .setTimestamp()
          .setFooter({ text: message.author.username })
        if (queueData.queue[queueData.queuePosition]) {
          queueData.queuePosition++;
          console.log(queueData)
          nowPlaying.setImage(queueData.queue[queueData.queuePosition].image)
          message.channel.send({ embeds: [nowPlaying] });
          message.client.musicQueue.set(message.guild.id, queueData);
        }

        const stream = await play.stream(searchData.url);

        const resource = createAudioResource(stream.stream, {
          inputType: stream.type,
        });

        /*if (message.client.voicePlayer) {
          message.client.voicePlayer.stop();
        }*/

        message.client.voicePlayer.play(resource);
        // message.client.voiceConnection.unsubscribe();
        message.client.voiceConnection.subscribe(message.client.voicePlayer);
        
        if (!queueData.controlMessage) {
          const control = await message.author.send({ embeds: [nowPlaying] });

          await Promise.all([
            control.react("▶"),
            control.react("⏸"),
            control.react("⏪"),
            control.react("⏩"),
            control.react("🔄"),
            control.react("🔀"),
            control.react("🔊"),
            control.react("🔉"),
            control.react("🔈")
          ]);

          message.client.reactions.set(control.id, {
            emojis: ["▶", "⏸", "⏪", "⏩", "🔄", "🔀", "🔊", "🔉", "🔈"],
            execute: (emoji) => {
              console.log("Recieved Emoji: " + emoji)
              switch (emoji) {
                case "▶": {
                  console.log("Unpause!")
                  message.client.voicePlayer.unpause();
                  break;
                }
                case "⏸": {
                  console.log("Pause!")
                  message.client.voicePlayer.pause();
                  break;
                }
                case "⏪": {
                  console.log("Skip Backwards!")
                  queueData.queuePosition--;
                  message.client.voicePlayer.emit(AudioPlayerStatus.Idle);
                }
                case "⏩": {
                  console.log("Skip Forward!")
                  queueData.queuePosition++;
                  message.client.voicePlayer.emit(AudioPlayerStatus.Idle);
                }
              }
            }
          });
          queueData.controlMessage = true;
        }
      });
      message.client.voicePlayer.emit(AudioPlayerStatus.Idle);

    } else {
      queueData.queue.push({
        name: searchData.description,
        duration: searchData.durationInSec,
        image: searchData.thumbnails[0].url
      })
      queueData.durationStart = Date.now();
      message.client.musicQueue.set(message.guild.id, queueData);
    }
  },
};
