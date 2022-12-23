const fs = require("fs");
const file = fs
  .readFileSync("./src/data/hangmanWords.txt")
  .toString()
  .replaceAll(",", "\n");
fs.writeFileSync("./src/data/hangmanWords.txt", file);
