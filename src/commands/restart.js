const child_process = require("child_process");

module.exports = {
    name: "restart",
    description: "Get the ping in milliseconds",
    guildOnly: true,
    cooldown: 3,
    adminOnly: true,
    async execute(message, args) {
        console.log("Restarting Bot...");
        message.channel.send("Restarting Bot.");
        process.on("exit", function () {
            child_process.spawn(
                process.argv.shift(),
                process.argv,
                {
                    cwd: process.cwd(),
                    detached: false,
                    stdio: "inherit"
                }
            );
        });
        process.exit(1);
    },
};
