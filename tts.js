const needle = require("needle");
const fs = require("fs")
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
needle.post("https://spencer.circuitmess.com:8443/tts/v1/text:synthesize", JSON.stringify({
        input: { text: "Hello there!" },
        voice: {
            languageCode: "en - US",
            name: "en-US-Neural2-J",
            ssmlGender: "NEUTRAL",
        },
        audioConfig: {
            audioEncoding: "MP3",
            speakingRate: 0.96,
            pitch: 1,
            sampleRateHertz: "32000"
        }
    })/*
    file: `"{ 'input': { 'text': '%.*s' },"
						   "'voice': {"
						   "'languageCode': 'en-US',"
						   "'name': 'en-US-Standard-D',"
						   "'ssmlGender': 'NEUTRAL'"
						   "}, 'audioConfig': {"
						   "'audioEncoding': 'MP3',"
						   "'speakingRate': 0.96,"
						   "'pitch': 5.5,"
						   "'sampleRateHertz': 16000"
						   "}}"`*/
, {
    headers: {
        "Accept-Encoding": "identity",
        "Content-Type": "application/json; charset=utf-8"
    }
}, (err, res, body) => {
    if (err) return console.log(err);
    fs.writeFileSync("./test.mp3", Buffer.from(body.audioContent, "base64"))
})