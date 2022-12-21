module.exports = {
    name: 'clear',
    description: "",
    async execute(message, args) {
        
                
        if (message.member.permissions.has("MANAGE_MESSAGES")){ 
            if(!args[0]) return message.reply("Please enter the amount of messages you want to clear!");
            if(isNaN(args[0])) return message.reply("Please enter a real number!");
    
            if(args[0] > 99) return message.reply("You can't enter a number greater then 99!");
            if(args[0] < 1) return message.reply("You must enter a number greater then 0!");
    
            await message.channel.messages.fetch({limit: ++args[0]}).then(messages =>{
                message.channel.bulkDelete(messages); 
                message.channel.send(`<@${message.author.id}> You just deleated messages...I hope you meant to do so. Message deleting in 2 seconds.`)
                .then(msg => {
                    setTimeout(() => msg.delete(), 2000)
                  })
                  .catch(); 
            });
        } else {
             return message.channel.send('You do not have the right permttions to preform this command. Message deleting in 2 seconds.')
             .then(msg => {
                setTimeout(() => msg.delete(), 2000)
              })
              .catch();
        }
    }   
    
}

// Add extra 