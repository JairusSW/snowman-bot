const cleverbot = require("cleverbot-free");
async function cleanAIChat(data, conversation) {
  if (data.includes("marry") || data.includes("love")) {
    conversation = [];
    const response = await cleverbot(text, conversation);
    response = cleanAIChat(response);
    conversation.push(data);
    conversation.push(response);
  }
}
