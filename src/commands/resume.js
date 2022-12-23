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
  name: "resume",
  description: "View the database as a whole",
  guildOnly: true,
  cooldown: 3,
  async execute(message, args) {
    const { channel } = message.member.voice;

      message.client.voicePlayer.unpause();
  },
};
