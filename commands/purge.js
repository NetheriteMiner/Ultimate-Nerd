module.exports = {
	async execute(interaction, client) {
		amount = interaction.options.getInteger('amount');
		if (amount > 100) {
			interaction.reply({content: "Messages to delete must be 100 or less! (Discord's restriction, not mine :/)", ephemeral: true})
		}
		interaction.channel.bulkDelete(amount);
		interaction.reply({content: `Deleted the last ${amount} messages`, ephemeral: true})
	}
}