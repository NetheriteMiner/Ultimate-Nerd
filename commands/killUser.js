const mobs = ["Blaze", "Cave Spider", "Chicken Jockey", "Creeper", "Drowned", "Elder Guardian", "Ender Dragon", "Enderman", "Endermite", "Evoker", "Ghast", "Giant", "Goat", "Guardian", "Hoglin", "Husk", "Iron Golem", "Llama", "Magma Cube", "Phantom", "Piglin", "Piglin Brute", "Pillager", "Ravager", "Shulker", "Silverfish", "Skeleton", "Skeleton Horseman", "Slime", "Spider", "Spider Jockey", "Stray", "The Killer Bunny", "Vex", "Vindicator", "Warden", "Witch", "Wither", "Wither Skeleton", "Wolf", "Zoglin", "Zombie", "Zombie Villager", "Zombified Piglin"]



module.exports = {
	async execute(interaction, client) {
		target = interaction.member.guild.members.cache.get(interaction.targetId).user
		let mob = mobs[Math.floor(Math.random()*mobs.length)]
		const messages = [`was shot by ${mob}`, `was pummeled by ${mob}`, `was pricked to death`, `was pricked to death whilst trying to escape ${mob}`, "drowned", `drowned whilst trying to escape ${mob}`, "experienced kinetic energy", `experienced kinetic energy whilst trying to escape ${mob}`, "blew up", `was blown up by ${mob}`, 'was killed by [Intentional Game Design](https://bugs.mojang.com/browse/MCPE-28723)', `hit the ground too hard`, `hit the ground too hard whilst trying to escape ${mob}`, 'fell from a high place', 'fell off a ladder', 'fell off some vines', 'fell off some weeping vines', 'fell off some twisting vines', 'fell off scaffolding', 'fell while climbing', 'was impaled on a stalagmite', `was impaled on a stalagmite whilst fighting ${mob}`, 'was squashed by a falling anvil', `was squashed by a falling anvil whilst fighting ${mob}`, 'was squahed by a falling block', 'was skewered by a falling stalactite', `was skewered by a falling stalactite whilst fighting ${mob}`, 'went up in flames', `walked into fire whilst fighting ${mob}`, 'went off with a bang', `went off with a bang due to a firework from Crossbow by ${mob}`, 'tried to swim in lava', `tried to swim in lava to escape ${mob}`, 'was struck by lightning', `was struck by lightning whilst fighting ${mob}`, 'discovered the floor was lava', `walked into danger zone due to ${mob}`, 'was killed by magic', `was killed by magic whilst trying to escape ${mob}`, `was killed by ${mob} using magic`, 'froze to death', `was frozen to death by ${mob}`, `was slain by ${mob}`, `was fireballed by ${mob}`, 'was stung to death', 'was shot by a skull from Wither', 'was obliterated by a sonically-charged shriek', `was obliterated by a sonically-charged shriek whilst trying to escape ${mob}`, 'starved to death', `starved to death whilst fighting ${mob}`, 'suffocated in a wall', `suffocated in a wall whilst fighting ${mob}`, 'was squished too much', `was squashed by ${mob}`, 'was poked to death by a sweet berry bush', `was poked to death by a sweet berry bush whilst trying to escape ${mob}`, `was killed trying to hurt ${mob}`, `was impaled by ${mob}`, 'fell out of the world', `didn't want to live in the same world as ${mob}`, 'withered away', `withered away whilst fighting ${mob}`, 'died', `died because of ${mob}`]
		let message = messages[Math.floor(Math.random()*messages.length)]
		if (target.username === "Ultimate Nerd") {
			interaction.reply(`If you wish to defeat me, train for another ${Math.floor(Math.random()*1000)+2} years`)
		}
		else {
			interaction.reply(`${target.username} ${message}`)
		}
	}
}