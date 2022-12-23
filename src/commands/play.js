const { EmbedBuilder } = require("discord.js");
const play = require("play-dl");
const {
  createAudioPlayer,
  NoSubscriberBehavior,
  createAudioResource,
  joinVoiceChannel,
  VoiceConnectionStatus,
  AudioPlayerStatus,
  getVoiceConnection,
} = require("@discordjs/voice");
const fs = require("fs");
module.exports = {
  name: "play",
  description: "View the database as a whole",
  guildOnly: true,
  cooldown: 3,
  async execute(message, args) {
    const { channel } = message.member.voice;

    if (!channel) {
      message.channel.send("Enter a voice channel");
    }

    if (!message.client.voiceConnection)
      message.client.voiceConnection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
      });

    const stream = await play.stream(args[0]);

    const resource = createAudioResource(stream.stream, {
      inputType: stream.type,
    });
    if (message.client.voicePlayer) {
      message.client.voicePlayer.stop();
    }
    message.client.voicePlayer = createAudioPlayer({
      behaviors: {
        noSubscriber: NoSubscriberBehavior.Play,
      },
    });
    message.client.voicePlayer.play(resource);
    message.client.voiceConnection.subscribe(message.client.voicePlayer);
  },
};
