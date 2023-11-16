const Database = require("@replit/database")
const db = new Database();
module.exports = {
	async execute(interaction, client) {
		if (interaction.options.getString('update') == null) {
					db.get("video").then(url => {
						interaction.reply({ content: url, ephemeral: true });
					});
				} else {
					if (interaction.user.id == 537784186761641994) {
						db.set("video", interaction.options.getString('update')).then(() => { interaction.reply("Updated video!") });
					} else {
						interaction.reply({ content: "You don't have permissions to change that! L", ephemeral: true })
					}
				}
	}
}