const fetch = require('node-fetch')
function getFact(type, number) {
	if (number == null) {
		return fetch("http://numbersapi.com/random/" + type + "?json").then(res => { return res.json() }).then(data => { return data["text"] })
	} else {
		return fetch("http://numbersapi.com/" + number + "/" + type + "?json&notfound=floor").then(res => { return res.json() }).then(data => { return data["text"] })
	}
}

// Prep above, command below
module.exports = {
	async execute(interaction, client) {
		getFact(interaction.options.getString('type'), interaction.options.getInteger('number'))
		.then(async fact => {
			await interaction.editReply({content: fact, ephemeral: true })
		})
	}
}