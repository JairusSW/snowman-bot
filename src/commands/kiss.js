const DIG = require('discord-image-generation')
const { EmbedBuilder, AttachmentBuilder } = require('discord.js')

module.exports = {
	name: 'podium',
	description: 'Create RIP Image',
	cooldown: 1,
	guildOnly: true,
	async execute(message, args) {
		
		try {
			
			
            const user1 = message.author

			const user2 = await getUserFromMention(args[0], message)

			const user3 = await getUserFromMention(args[1], message)

            if (user2 == null || user3 == null) return message.channel.send('Please Mention 2 users.')

			
			
			const image = await new DIG.Podium().getImage(user1.displayAvatarURL({ dynamic: false, format: 'png' }), user2.displayAvatarURL({ dynamic: false, format: 'png' }), user3.displayAvatarURL({ dynamic: false, format: 'png' }), user1.username, user2.username, user3.username).replace('webp', 'png');

			let attachment = new AttachmentBuilder(image)
			
			message.channel.send({ files: [attachment] });

		} catch (err) {

			console.log(err)

			const Unavaliable = new EmbedBuilder()
			.setTitle('Something Happened.')
			.setColor(0xFF0000)
			.setTimestamp()
			.setFooter(message.author.username)

			message.channel.send({ embeds: [Unavaliable] })

		}
	
	}

}

function getUserFromMention(mention, message) {
	if (!mention) return message.channel.send('Please tag a user :)');

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1)

		if (mention.startsWith('!')) {
			mention = mention.slice(1)
		}

		return message.client.users.cache.get(mention)

	}
}