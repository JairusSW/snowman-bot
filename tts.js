import needle from "needle";
import fs from "fs"
import { fileTypeFromBuffer } from "file-type"
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
needle.post("https://cxl-services.appspot.com/proxy?url=https://us-central1-texttospeech.googleapis.com/v1beta1/text:synthesize&token=03AD1IbLBO3t7aQYTHLy_Novl2K6PIf-KJL3faxzjgbukk4ZklerCnef83uaQbS-PjWNCzCKf2-DZdSMns5UUiKVIGFE9htSzz9IwXEMAREqy2yV1zvi94ZtbQYn9rmo9f8UPq_aS25HfZpjCU9YFcuMeecO7jliQ7hJn_rdpJ_MupAM1tdqf29R8x0FRdITXw7PGYA1piUfMLpSGk3DQhHu9gE-jXAgw4b_jlQsEODJKMKNYrlJTWo61Pl_hpqT1SAuYxelq-5bJVFZKIhaH6PvipRpRUZHqpc6x5EvZTFIwExqWa2ws3t2CR-I9gAJbqwe3-nidFDA7meME9LitrTBegBasHv7shERAayPWvQi9jsOlwIdS_EnHWz8yFkoBnOnlS6LYU9WPYkgiiKabZZmkJtc_oPIR9cNsS59l8zbDy0dQ0Bj3gt0k-iKmrwBjpImd6X4WNOXdbxiawwouTmUpZ19h9dqJlJeEMmFKgIcxTANm9tOTRD6yGZSk3XoXj-lBfBQIs2g66XWC2sMxdnm-RsC009E0oKA", JSON.stringify({
    "audioConfig": {
        "audioEncoding": "OGG_OPUS",
        "effectsProfileId": [
            "headphone-class-device"
        ],
        "pitch": 0,
        "speakingRate": 1
    },
    "input": {
        "text": "Google Cloud Text-to-Speech enables developers to synthesize natural-sounding speech with 100+ voices, available in multiple languages and variants. It applies DeepMind’s groundbreaking research in WaveNet and Google’s powerful neural networks to deliver the highest fidelity possible. As an easy-to-use API, you can create lifelike interactions with your users, across many applications and devices."
    },
    "voice": {
        "languageCode": "en-US",
        "name": "en-US-Neural2-J"
    }
}), {
    headers: {
        "Accept-Encoding": "identity",
        "Content-Type": "application/json; charset=utf-8"
    }
}, async (err, res, body) => {
    if (err) return console.log(err);
    const buffer = Buffer.from(body.audioContent, "base64")
    console.log(await fileTypeFromBuffer(buffer))
    fs.writeFileSync("./test.ogg", buffer)
})