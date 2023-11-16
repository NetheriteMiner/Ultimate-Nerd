fetch = require('node-fetch')
sources = ["http://www.reddit.com/r/memes/.json", "http://www.reddit.com/r/dankmemes/.json", "http://www.reddit.com/r/programmerhumor/.json"]
module.exports = {
	async execute(interaction, client) {
		res = fetch('http://www.reddit.com/r/memes/.json')
		res.then(response => {
			return response.json()
		}).then(value => {
			memeCount = (value.data.children.length)-1
			meme = (value.data.children[Math.round(Math.random()*memeCount)].data)
			interaction.reply({
				content: `${meme.title}\n${meme.url}`,
				ephemeral: true,
				components: [
					{
						type: 1,
						components: [
							{
								type: 2,
								label: "Post to #memes",
								style: 3,
								custom_id: `${interaction.user.id}_${meme.url}_memes`
							},
							{
								type: 2,
								label: "Post to #media",
								style: 1,
								custom_id: `${interaction.user.id}_${meme.url}_media`
							},
							{
								type: 2,
								label: "Another!",
								style: 2,
								custom_id: `another`
							}
						]
					}
				]
			});
		}).catch(error => {
			console.log("Error:")
			console.log(error)
		})
	},
	async button(interaction, client) {
		if (interaction.customId == "another") {
			res = fetch('http://www.reddit.com/r/memes/.json')
			res.then(response => {
				return response.json()
			}).then(value => {
				memeCount = (value.data.children.length)-1
				meme = (value.data.children[Math.round(Math.random()*memeCount)].data)
				interaction.reply({
					content: `${meme.title}\n${meme.url}`,
					ephemeral: true,
					components: [
						{
							type: 1,
							components: [
								{
									type: 2,
									label: "Post to #memes",
									style: 3,
									custom_id: `${interaction.user.id}_${meme.url}_memes`
								},
								{
									type: 2,
									label: "Post to #media",
									style: 1,
									custom_id: `${interaction.user.id}_${meme.url}_media`
								},
								{
									type: 2,
									label: "Another!",
									style: 2,
									custom_id: `another`
								}
							]
						}
					]
				});
			}).catch(error => {
				console.log("Error:")
				console.log(error)
			})
		}
		else {
			params = interaction.customId.split("_")
			channelToSend = ""
			if (params[2] == "memes") {
				channelToSend = client.channels.cache.get('806336335748661250')
			}
			else {
				channelToSend = client.channels.cache.get('813206509378207774')
			}
			user = await client.users.fetch(params[0])
			message = `${user.username} found a meme: ${params[1]}`
			posted = await channelToSend.send(message)
			console.log(posted)
			interaction.reply({content: `[Posted](<https://discord.com/channels/${posted.guildId}/${posted.channelId}/${posted.id}>)!`, ephemeral: true})
		}
	}
}