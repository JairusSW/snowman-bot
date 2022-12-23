const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'serverinfo',
    Description: '',
    execute(message, args, Discord) {
        const created = message.guild.createdAt.toDateString();
        const owner = `<@${message.guild.ownerId}>` ;
        const region = message.guild.preferredLocale;
        const server = message.guild.name;
        const channels = message.guild.channels.cache.size;
        const voice = message.guild.channels.cache.filter(channel => channel.type === 'GUILD_VOICE').size;
        const cat = message.guild.channels.cache.filter(channel => channel.type === "GUILD_CATEGORY").size;
        const roles = message.guild.roles.cache.size;
        const onlinemembers = message.guild.members.cache.filter(m => m.presence?.status === "online").size;
        const dndmembers = message.guild.members.cache.filter(m => m.presence?.status === "dnd").size;
        const idleemembers = message.guild.members.cache.filter(m => m.presence?.status === "idle").size;
        const nonoffline = onlinemembers + dndmembers + idleemembers;
        const description = message.guild.description || ('No server description');
        const emoji = message.guild.emojis;
        const bans = message.guild.bans.cache.size || 'This server has no bans.'

        
        const memberCount = message.guild.members.cache.filter(member => !member.user.bot).size;
        const totalCount = message.guild.memberCount;
        const botCount = message.guild.members.cache.filter(member => member.user.bot).size;
        const emojis = [] || 'This server has not custom emojis'
        for (const emoji of message.guild.emojis.cache.values()) {
            emoji.animated ? emojis.push(`<a:${emoji.name}:${emoji.id}>`) : emojis.push(`<:${emoji.name}:${emoji.id}>`);
        } 


        const serverEmbed = new EmbedBuilder()
        .setColor(0x0099FF)
        
        .setTitle(`${server}`)
        .setThumbnail(message.guild.iconURL({dynamic: true}))
        .setTimestamp()
        .setDescription(`
        **Serverinfo:**

        **General:**
        - Name: ${server}
        - Owner: ${owner}
        - Region: ${region}
        - Created: ${created}
        
        **Members:**
        - Members: ${memberCount}
        - Bots: ${botCount}
        - Total: ${totalCount}
        - Online Members: ${nonoffline - botCount}

        **Channels:**
        - Text: ${channels - voice}
        - Voice: ${voice}
        - Chategories: ${cat}

        **Utility:**
        - Roles: ${roles}
        - Custom Emoji's: ${emojis.join(" ")}

        - Bans: ${bans}

        `)
     
        .setFooter({ text: message.author.username})
    message.channel.send({ embeds: [serverEmbed] });
         
}
}