module.exports = {
	async execute(interaction, client) {
		interaction.reply({content: `You want to know the latency? Wow you really are a nerd (${Date.now() - interaction.createdTimestamp}ms)`, ephemeral: true});
	}
}