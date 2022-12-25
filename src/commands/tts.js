const needle = require("needle");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const {
    createAudioPlayer,
    NoSubscriberBehavior,
    createAudioResource,
    joinVoiceChannel,
    AudioPlayerStatus,
    StreamType
} = require("@discordjs/voice");
const { Readable } = require("stream");

module.exports = {
    name: "tts",
    description: "Speak using Google's Text-To-Speech API",
    usage: "[text]",
    aliases: ["speak"],
    guildOnly: true,
    cooldown: 3,
    async execute(message, args) {
        const { channel } = message.member.voice;

        if (!channel) {
            message.channel.send("Enter a voice channel");
            return;
        }
        needle.post(process.env.ttsHost, JSON.stringify({
            input: { text: args.join(" ") },
            voice: {
                languageCode: "en - US",
                name: "en-US-Standard-J",
                ssmlGender: "NEUTRAL",
            },
            audioConfig: {
                audioEncoding: "OGG_OPUS",
                "effectsProfileId": [
                    "large-home-entertainment-class-device"
                ],
                speakingRate: 1,
                pitch: -1.5,
                sampleRateHertz: "28000"
            }
        }), {
            headers: {
                "Accept-Encoding": "identity",
                "Content-Type": "application/json; charset=utf-8"
            }
        }, async (err, res, body) => {
            if (err) return console.log(err);
            const buffer = Buffer.from(body.audioContent, "base64");

            message.client.voiceConnection = joinVoiceChannel({
                channelId: channel.id,
                guildId: channel.guild.id,
                adapterCreator: channel.guild.voiceAdapterCreator,
            });

            message.client.voicePlayer = createAudioPlayer({
                behaviors: {
                    noSubscriber: NoSubscriberBehavior.Play,
                },
            });
            
            const resource = createAudioResource(Readable.from(buffer), {
                inputType: StreamType.OggOpus,
            });
            await message.client.voiceConnection.subscribe(message.client.voicePlayer);
            message.client.voicePlayer.play(resource);
        })
    },
};
