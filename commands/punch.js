module.exports = {
	async execute(interaction,client) {
		if (interaction.user.id == 660917925019910144) {
					bep = await client.users.fetch('537784186761641994')
					bep.send({content: "https://th.bing.com/th/id/R.43bc93b0480ae22f135e05bc1a885808?rik=jsc0w%2fJ1G%2fjmDg&pid=ImgRaw&r=0", ephemeral: true})
					interaction.reply({content: "You fistbumped Bep!", ephemeral: true})
				}
				else if (interaction.user.id == 537784186761641994) {
				netherite = await client.users.fetch('660917925019910144');
				netherite.send({content: "https://th.bing.com/th/id/R.43bc93b0480ae22f135e05bc1a885808?rik=jsc0w%2fJ1G%2fjmDg&pid=ImgRaw&r=0", ephemeral: true})
					interaction.reply({content: "You fistbumped Netherite!", ephemeral: true})
				}
	}
}