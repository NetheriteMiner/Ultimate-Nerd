const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const token = process.env['token']
const CLIENT_ID = process.env['client_id']

const commands = [
	{
		name: 'latency',
		description: 'Attempts to find delay between discord and the bot'
	},
	{
		name: 'about',
		description: 'Returns information about the bot and its creator'
	},
	{
		name: 'video',
		description: `Want a link to Bep's newest video? Straight from discord?! Sure`,
		options: [
			{
				name: 'update',
				description: 'Change the video that gets sent dynamically',
				required: false,
				type: 3
			}
		]
	},
	{
		name: 'report',
		description: `Bug report? Anonymous message? Report it!`,
		options: [
			{
				name: "message",
				description: "Your message to send",
				required: true,
				type: 3
			}
		]
	},
	{
		name: "giveaway",
		description: "Yay! Free stuff! (Admin only)",
		options: [
			{
				name: "start",
				description: "Create a giveaway",
				type: 1,
				options: [
					{
						name: "prize",
						description: "The reward you are giving away",
						type: 3,
						required: true
					},
					{
						name: "end",
						description: "How long it should last for (in milliseconds, sorry)",
						type: 3,
						required: true
					}
				]
			},
			{
				name: "end",
				description: "End the existing giveaway early",
				type: 1,
				options: [
					{
						name: "id",
						description: "The ID of the giveaway message",
						type: 3,
						required: true
					}
				]
			}
		]
	},
	{
		name: 'yt',
		description: 'YouTube shenanigans!',
		options: [
			{
				name: "play",
				description: "Play music from YouTube! Hope I don\'t get a cease and desist letter from Google.",
				type: 1,
				options: [
					{
						name: 'link',
						description: 'The link to the YouTube video',
						type: 3,
						required: true
					}
				]
			},
			{
				name: 'manage',
				description: 'Change how the bot is currently playing back audio',
				type: 1,
				options: [
					{
						name: 'action',
						description: 'What to do?',
						type: 3,
						required: true,
						choices: [
							{
								name: 'pause',
								value: 'pause'
							},
							{
								name: 'unpause',
								value: 'unpause'
							},
							{
								name: 'disconnect',
								value: 'stop'
							},
							{
								name: 'skip',
								value: 'skip'
							},
							{
								name: 'clear',
								value: 'clear'
							},
							{
								name: 'loop',
								value: 'loop'
							},
							{
								name: 'reset',
								value: 'reset'
							}
						]
					}
				]
			},
			{
				name: "queue",
				description: "List the current queue",
				type: 1,
				options: [
					{
						name: 'skip',
						description: 'Skip to a specific song!',
						type: 4,
						required: false
					}
				]
			}
		]
	},
	{
		name: 'purge',
		description: 'Mass remove a certain amount of messages',
		options: [
			{
				name: "amount",
				description: "The amount of messages you want to remove",
				type: 4,
				required: true
			}
		]
	},
	{
		name: 'kill',
		description: 'Random deaths from Minecraft mobs! (Visible to everyone)',
		options: [
			{
				name: 'name',
				description: 'Another person to subject to dying in Minecraft',
				required: false,
				type: 6
			}
		]
	},
	{
		name: 'Kill User',
		type: 2
	},
	{
		name: 'quote',
		description: 'Request an iconic quote (Visible to everyone)',
	},
	{
		name: 'help',
		description: "Some commands won't always be completely clear with how to use them so this exists",
		options: [
			{
				name: 'command',
				description: 'The command to get more info on',
				type: 3,
				required: true,
				choices: [
					{
						name: 'YouTube',
						value: 'yt'
					}
				]
			}
		]
	},
	{
		name: 'meme',
		description: 'Get a random meme from reddit!'
	},
	{
		name: "trivia",
		description: "Get random trivia information",
		options: [
			{
				name: "type",
				description: "The type of trivia to get back",
				type: 3,
				required: true,
				choices: [
					{
						name: "trivia",
						value: "trivia"
					},
					{
						name: "year",
						value: "year"
					},
					{
						name: "date",
						value: "date"
					},
					{
						name: "math",
						value: "math"
					}
				]
			},
			{
				name: "number",
				description: "Optional specific number, lowest valid if invalid number",
				type: 4,
				required: false
			}
		]
	},
	{
		name: 'connect4',
		description: 'Play connect 4 with a friend!',
		options: [
			{
				name: "opponent",
				description: "The player to play against",
				type: 6
			}
		]
	}
];

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationCommands(CLIENT_ID),
			{ body: commands }
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();