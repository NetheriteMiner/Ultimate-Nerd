const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers, GatewayIntentBits.MessageContent] });
const { startReminders } = require('./commands/reminders.js');
const token = "TOKEN"
const { keepAlive } = require("./api")
const { exec } = require('node:child_process')
packageJson = require('./package.json')
version = packageJson.version
ableToLogIn = false
// process.on('uncaughtException', function(err) {
// 	console.log('Caught and Logged Error:\n'+err);
// })

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
	client.user.setPresence({ activities: [{ name: `Ultimate Nerd ${version}` }], status: 'online'});
	startReminders(client)
	ableToLogIn = true
});

const ezMessages = ["Doing a bamboozle fren.", "I need help, teach me how to play!", "Let's be friends instead of fighting okay?", "I had something to say, then I forgot it.", "ILY<3", "I enjoy long walks on the beach and playing Hypixel.", "Hello everyone! I'm an innocent player who loves everything Hypixel.", "Can you paint with all the colors of the wind?", "When I saw the guy with a potion I knew there was trouble brewing.", "Sometimes I sing soppy love songs in the car.", "Blue is greener than purple for sure.", "What happens if I add chocolate milk to macaroni and cheese?", "Anybody else really like Rick Astley?", "You're a great person! Do you want to play some Hypixel games with me?", "I love the way your hair glistens in the light.", "In my free time I like to watch cat videos on youtube.", "Wait... This isn't what I typed!", "If the world in Minecraft is infinite....how can the sun revolve around it?", "When nothing is right, go left.", "I need help, teach me how to play!", "Hey Helper, how play game?", "Your personality shines brighter than the sun.", "Behold, the great and powerful, my magnificent and almighty nemesis!", "Please go easy on me, this is my first game!", "Your Clicks per second are godly. :O", "I sometimes try to say bad things and then this happens :(", "I like pineapple on my pizza.", "Why can't the Ender Dragon read a book? Because he always starts at the End.", "I heard you like minecraft, so I built a computer so you can minecraft, while minecrafting in your minecraft.", "You are very good at this game friend.", "Pineapple doesn't go on pizza!", "I have really enjoyed playing with you! <3", "I like Minecraft pvp but you are truly better than me!", "Pls give me doggo memes!", "Maybe we can have a rematch?", "I like to eat pasta, do you prefer nachos?", "With great power... comes a great electricity bill!"];

//Interactions
client.on('interactionCreate', async interaction => {
	if (interaction.type === 2) {
		if (interaction.commandName == "Kill User") {
			command = require('./commands/killUser.js');
		}
		else {
			command = require(`./commands/${interaction.commandName}.js`)
		}
		if (interaction.commandName == 'yt' || interaction.commandName == 'trivia') {
			await interaction.deferReply({ephemeral: true})
		}
		command.execute(interaction, client);
	}
	else if (interaction.type === 3) {
		if (interaction.customId == "verify") {
			role = interaction.guild.roles.cache.find(role => role.id == "849998622279336007")
			target = interaction.member
			target.roles.add(role)
			interaction.reply({content: "Verified", ephemeral: true})
		}
		else if (interaction.customId == "update") {
			role = interaction.guild.roles.cache.find(role => role.id == "872544565419184178")
			target = interaction.member
			if (interaction.member._roles.includes('872544565419184178')) {
				target.roles.remove(role)
				interaction.reply({content: "Removed Update Notifications from you!", ephemeral: true})
			}
			else {
				target.roles.add(role)
				interaction.reply({content: "Added Update Notifications to you!", ephemeral: true})
			}
		}
		else if (interaction.customId.endsWith("memes") || interaction.customId.endsWith("media") || interaction.customId.endsWith("another")) {
			button = require('./commands/meme.js')
			button.button(interaction, client)
		}
		else {
			button = require('./commands/yt.js')
			button.button(interaction, client);
		}
	}
});
badChannels = [
	"806336164037394463", //Chat 1
	"822613863576371210", //Chat 2
	"822613896291418113", //Chat 3
	"824778804672200754", //VC Chat
	"886749298782527519", //Debate
	"824090813783998494", //Garlic bread
	"824091102441242624", //Counting
	"882306817231835136", //L
]
//Automod
client.on('messageCreate', async message => {
	isBadChannel = badChannels.indexOf(message.channelid)
	if (isBadChannel == -1) {isBadChannel = false}
	else {isBadChannel = true }
	for (i in message.embeds) {
		if (message.embeds[i].type == "image" && isBadChannel==true) {
			message.delete();
		}
	}
	
	// Ez stuff
	if (message.content == "ez" && message.guild.id == '806335754682236980') {
		message.delete();
		webhook = await message.guild.channels.createWebhook({
			channel: message.channel,
			name: message.author.username,
			avatar: `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png`
		})
		await webhook.send(ezMessages[Math.floor(Math.random()*ezMessages.length)]);
		webhook.delete();
	}

	// Dad stuff
	let checkEasterEggs = function(text) {
		switch (text.toLowerCase()) {
			case 'dad':
				return "No you're not, silly!"
			case 'mom':
				return "Hi honey, I'm Dad!"
			case 'tler':
				return "Hi a terrible person, I'm Dad!"
			case 'ultimate nerd':
				return "**T͞H̰̥͡E̞̝̕R҉͇̩̻E̵̥̞ ̻C̺̜͎A̠̤̗Ṇ̙͕ ̘̖̜Ò̲N͎̥͡L̲͔̜Y̹͞ͅ ̜̝̱B͍̤ͅE̶̞̱ ̵O̼͖N͓E҉̱͕̳**"
			case 'robotop':
				return "Hi OG, I'm Dad!"
			case 'netherite':
				return "Hi Dad, I'm Ultimate Nerd!"
			case 'netheriteminer':
				return "Hi Dad, I'm Ultimate Nerd!"
			case 'slightly below average nerd':
				return "Hi Brother, I'm Dad!"
			case 'sba nerd':
				return "Hi Brother, I'm Dad!"
			case 'colon':
				return "Who? Anyways, I'm Dad!"
			case 'your dad':
				return "Among us."
			case 'joe biden':
				return "Jooooooooe Biden\nwake up"
		}
		return 0
	}
	dadRegex = /(?<!.)((I('|‘|’|')m )|(Im ))(.*)/is
	content = message.content.match(dadRegex)
	if (content) {
		content = content[5]
		eggs = checkEasterEggs(content)
		if (eggs == 0) {
			message.channel.send(`Hi ${content}, I'm Dad!`)
		}
		else {
			message.channel.send(eggs)
		}
	}
	
	if (message.content.includes("https://discord.com/")) {
		const regex = /https:\/\/discord.com\/channels\/\d+\/(\d*)\/(\d*)/;
		response = regex.exec(message.content)
		channelId = response[1]
		messageId = response[2]
		channel = client.channels.cache.get(channelId)
		foundMessage = await channel.messages.fetch(messageId)
		webhookObject = await message.guild.channels.createWebhook({
			channel: message.channel,
			name: foundMessage.author.username,
			avatar: `https://cdn.discordapp.com/avatars/${foundMessage.author.id}/${foundMessage.author.avatar}.png`
		})
		await webhookObject.send(foundMessage.content);
		await webhookObject.delete();
	}
});
// Give role on join
client.on('guildMemberAdd', async member => {
	guild = member.guild
	role = guild.roles.cache.find(role => role.id == "850115329098383370")
	target = member
	target.roles.add(role)
})

// Send message when member leaves server
client.on('guildMemberRemove', async member => {
	channel = client.channels.cache.get('848320343214784532');
	joined = Math.floor(member.joinedTimestamp / 1000)
	embed = {
		color: 0xff0000,
		title: 'Member Left',
		author: {
			name: member.user.username,
			icon_url: `https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.png`
		},
		description: `${member.nickname ? member.nickname : member.user.username}#${member.user.discriminator}`,
		fields: [
			{
				name: 'Role Count',
				value: member._roles.length.toString()
			},
			{
				name: 'Bot or Human',
				value: member.user.bot ? 'Bot' : 'Human',
			},
			{
				name: 'Joined',
				value: `<t:${joined}:R>`,
			}
		],
		timestamp: new Date()
	}
	channel.send({ embeds: [embed] })
})

// Send message when message deleted
client.on('messageDelete', async message => {
	if (message.author.bot == true) { return; }
	if (message.content.includes("ez")) { return; }
	if (message.guild.id != "806335754682236980") { return; }
	channel = client.channels.cache.get('848320343214784532');
	msgCreated = Math.floor(message.createdTimestamp/1000)
	attachmentCount = message.attachments.size
	attachments = ""
	for (attachment of message.attachments) {
		attachments += attachment[1].url+"\n"
	}
	
	embed = {
		color: 0xffff00,
		title: 'Message Deleted',
		author: {
			name: message.author.username,
			icon_url: `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png`
		},
		description: `${message.author.username}#${message.author.discriminator}`,
		fields: [
			{
				name: 'Message Created',
				value: `<t:${msgCreated}:R>`
			},
			{
				name: 'Channel',
				value: `<#${message.channelId}>`
			},
		],
		timestamp: new Date()
	}
	if (message.content != "") {
		embed.fields.push({
			name: 'Message',
			value: `${message.content}`,
		})
	}
	if (attachmentCount > 0) {
		embed.fields.push({
			name: 'Attachments',
			value: `Count: ${attachmentCount}\nLinks: ${attachments}`
		})
	}
	channel.send({embeds: [embed]})
})

client.on('debug', function(info) {
	if (info == "Preparing to connect to the gateway...") {
		setTimeout(function(){
			if (ableToLogIn == false) {
				console.log("Executing order kill 1...")
				exec('kill 1', (err, output) => {
					if (err) {
						console.log(`Could not execute kill 1: ${err}`)
						return
					}
				})
			}
			else {
				console.log("Logged in, so cancelling kill 1")
			}
		}, 20000)
	}
})
keepAlive()
client.login(token);
