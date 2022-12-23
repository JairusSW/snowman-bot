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

			const user2 = await getUserFromMention(args[0], message) || message.author

			const user3 = await getUserFromMention(args[1], message) || message.author
			
			
			const image = await new DIG.Podium().getImage(user1.displayAvatarURL({ dynamic: false, format: 'png' }).replace('webp', 'png'), user2.displayAvatarURL({ dynamic: false, format: 'png' }).replace('webp', 'png'), user3.displayAvatarURL({ dynamic: false, format: 'png' }).replace('webp', 'png'), user1.username, user2.username, user3.username).catch(err => {
				message.channel.send('there was an error');
			})

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
	if (!mention) return;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1)

		if (mention.startsWith('!')) {
			mention = mention.slice(1)
		}

		return;

	}
}