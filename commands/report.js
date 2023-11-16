module.exports = {
	async execute(interaction, client) {
		//Tell the user their report was sent
				await interaction.reply({ content: "Report sent!", ephemeral: true })
				interaction.followUp({ content: "You sent: " + interaction.options.getString('message'), ephemeral: true })

				//Actually send the report (user is NetheriteMiner)
				global.netherite = await client.users.fetch('660917925019910144');

				netherite.send("New Report! " + interaction.options.getString('message'));
				netherite.send("Sent from " + interaction.user.username + "#" + interaction.user.discriminator)
	}
}