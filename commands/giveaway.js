const { GiveawaysManager } = require('@burakys/giveaways')

// Prep above, command below
module.exports = {
	async execute(interaction, client) {
		this.client = client
		const manager = new GiveawaysManager(client, {
			storage: './giveaways.json',
			default: {
				botsCanWin: false,
				embedColor: '#1ABC9C',
				embedColorEnd: '#FF0000',
				reaction: '🎉'
			}
		});
		client.giveawaysManager = manager;
		switch (interaction.options.getSubcommand()) {
			case 'start':
				const duration = interaction.options.getString('end');
				const winnerCount = 1
				const prize = interaction.options.getString('prize');
				const ms = require('ms');

				client.giveawaysManager.start(client.channels.cache.get('948342102771781642'), {
					duration: ms(duration),
					winnerCount,
					prize,
					messages: {
						winMessage: 'Congratulations, {winners}! You won **{this.prize}**!'
					}
				}).then((gData) => {
					console.log(gData); //Uncomment for debug
				});
				interaction.reply({ content: "Created giveaway!", ephemeral: true })
				break;
			case 'end':
				const messageId = interaction.options.getString('id');
				client.giveawaysManager.end(messageId).then(() => {
					interaction.reply({ content: 'Success! Giveaway ended!', ephemeral: true });
				}).catch((err) => {
					interaction.reply({content: `An error has occurred, please check and try again.\n\`${err}\``, ephemeral: true});
				});
				break;
		}
	}
}