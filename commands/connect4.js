module.exports = {
	async execute(interaction, client) {
		
		gameEmbed = null
		message = interaction
		player1 = '🔴'
		player2 = '🟡'
		
		const challenger = interaction.user;
		const opponent = interaction.options.getUser('opponent')

		interaction.reply({ content: "Started the game!", ephemeral: true })
		
		const board = [
			["⚪", "⚪", "⚪", "⚪", "⚪", "⚪", "⚪"],
			["⚪", "⚪", "⚪", "⚪", "⚪", "⚪", "⚪"],
			["⚪", "⚪", "⚪", "⚪", "⚪", "⚪", "⚪"],
			["⚪", "⚪", "⚪", "⚪", "⚪", "⚪", "⚪"],
			["⚪", "⚪", "⚪", "⚪", "⚪", "⚪", "⚪"],
			["⚪", "⚪", "⚪", "⚪", "⚪", "⚪", "⚪"],
		];

		const renderBoard = (board) => {
			let tempString = "";
			for (const boardSection of board) {
				tempString += `${boardSection.join("")}\n`;
			}

			tempString = tempString.concat("1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣");
			return tempString;
		}

		const initialState = renderBoard(board);

		const initial = {
			title: `${player1} It's your turn, ${interaction.user.username}!`,
			description: initialState,
			footer: {
				text: `${challenger.username} vs ${opponent.username}`
			}
		}
		interaction.channel.send({ embeds: [initial] }).then(gameMessage => {

			gameMessage.react("1️⃣")
			gameMessage.react("2️⃣")
			gameMessage.react("3️⃣")
			gameMessage.react("4️⃣")
			gameMessage.react("5️⃣")
			gameMessage.react("6️⃣")
			gameMessage.react("7️⃣")

			const gameFilter = (reaction, user) => ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣"].includes(reaction.emoji.name) && (user.id === opponent.id || user.id === challenger.id);

			const gameCollector = gameMessage.createReactionCollector({ filter: gameFilter });

			const gameData = [
				{ member: challenger, playerColor: player1 },
				{ member: opponent, playerColor: player2 }
			]

			let player = 0;

			const checkFour = (a, b, c, d) => (a === b) && (b === c) && (c === d) && (a !== "⚪");

			const horizontalCheck = () => {

				for (let i = 0; i < 6; i++) {

					for (let j = 0; j < 4; j++) {
						if (checkFour(board[i][j], board[i][j + 1], board[i][j + 2], board[i][j + 3])) return [
							board[i][j], board[i][j + 1], board[i][j + 2], board[i][j + 3]
						];
					}
				}
			}

			const verticalCheck = () => {
				for (let j = 0; j < 7; j++) {
					for (let i = 0; i < 3; i++) {

						if (checkFour(board[i][j], board[i + 1][j], board[i + 2][j], board[i + 3][j])) return [
							board[i][j], board[i + 1][j], board[i + 2][j], board[i + 3][j]
						]
					}
				}
			}

			const diagonal1 = () => {
				for (let col = 0; col < 4; col++) {
					for (let row = 0; row < 3; row++) {
						if (checkFour(board[row][col], board[row + 1][col + 1], board[row + 2][col + 2], board[row + 3][col + 3])) return [
							board[row][col], board[row + 1][col + 1], board[row + 2][col + 2], board[row + 3][col + 3]
						]
					}
				}
			}

			const diagonal2 = () => {
				for (let col = 0; col < 4; col++) {
					for (let row = 5; row > 2; row--) {
						if (checkFour(board[row][col], board[row - 1][col + 1], board[row - 2][col + 2], board[row - 3][col + 3])) return [
							board[row][col], board[row - 1][col + 1], board[row - 2][col + 2], board[row - 3][col + 3]
						]
					}
				}
			}

			const tieCheck = () => {
				let count = 0;
				for (const el of board) {
					for (const string of el) {
						if (string !== "⚪") count++;
					}
				}
				if (count === 42) return true;
				else return false;
			}

			const checks = [horizontalCheck, verticalCheck, diagonal1, diagonal2];

			gameCollector.on("collect", (reaction, user) => {

				reaction.message.reactions.cache.get(reaction.emoji.name).users.remove(user.id);

				if (user.id === gameData[player].member.id) {

					const openSpaces = [];

					switch (reaction.emoji.name) {
						case "1️⃣":
							for (let i = 5; i > -1; i--) {
								if (board[i][0] === "⚪") openSpaces.push({ i, j: 0 });
							}
							if (openSpaces.length == 0) return interaction.channel.send(`**${gameData[player].member}, that column is already full. Choose another one**`).then(msg1 => msg1.delete({ timeout: 10000 }))
							else board[openSpaces[0].i][openSpaces[0].j] = gameData[player].playerColor;
							break;
						case "2️⃣":
							for (let i = 5; i > -1; i--) {
								if (board[i][1] === "⚪") openSpaces.push({ i, j: 1 });
							}
							if (openSpaces.length == 0) return interaction.channel.send(`**${gameData[player].member}, that column is already full. Choose another one**`).then(msg1 => msg1.delete({ timeout: 10000 }))
							else board[openSpaces[0].i][openSpaces[0].j] = gameData[player].playerColor;
							break;
						case "3️⃣":
							for (let i = 5; i > -1; i--) {
								if (board[i][2] === "⚪") openSpaces.push({ i, j: 2 });
							}
							if (openSpaces.length == 0) return interaction.channel.send(`**${gameData[player].member}, that column is already full. Choose another one**`).then(msg1 => msg1.delete({ timeout: 10000 }))
							else board[openSpaces[0].i][openSpaces[0].j] = gameData[player].playerColor;
							break;
						case "4️⃣":
							for (let i = 5; i > -1; i--) {
								if (board[i][3] === "⚪") openSpaces.push({ i, j: 3 });
							}
							if (openSpaces.length == 0) return interaction.channel.send(`**${gameData[player].member}, that column is already full. Choose another one**`).then(msg1 => msg1.delete({ timeout: 10000 }))
							else board[openSpaces[0].i][openSpaces[0].j] = gameData[player].playerColor;
							break;
						case "5️⃣":
							for (let i = 5; i > -1; i--) {
								if (board[i][4] === "⚪") openSpaces.push({ i, j: 4 });
							}
							if (openSpaces.length == 0) return interaction.channel.send(`**${gameData[player].member}, that column is already full. Choose another one**`).then(msg1 => msg1.delete({ timeout: 10000 }))
							else board[openSpaces[0].i][openSpaces[0].j] = gameData[player].playerColor;
							break;
						case "6️⃣":
							for (let i = 5; i > -1; i--) {
								if (board[i][5] === "⚪") openSpaces.push({ i, j: 5 });
							}
							if (openSpaces.length == 0) return interaction.channel.send(`**${gameData[player].member}, that column is already full. Choose another one**`).then(msg1 => msg1.delete({ timeout: 10000 }))
							else board[openSpaces[0].i][openSpaces[0].j] = gameData[player].playerColor;
							break;
						case "7️⃣":
							for (let i = 5; i > -1; i--) {
								if (board[i][6] === "⚪") openSpaces.push({ i, j: 6 });
							}
							if (openSpaces.length == 0) return interaction.channel.send(`**${gameData[player].member}, that column is already full. Choose another one**`).then(msg1 => msg1.delete({ timeout: 10000 }))
							else board[openSpaces[0].i][openSpaces[0].j] = gameData[player].playerColor;
							break;
					}

					if (tieCheck()) {
						gameMessage.reactions.removeAll()
						const TieEmbed = {
							title: `The game ended, it is a Tie!`,
							description: renderBoard(board),
							footer: {
								text: `${challenger.username} vs ${opponent.username}`
							}
						}
						gameCollector.stop("Tie Game")
						return gameMessage.edit({ embeds: [TieEmbed] })
					}

					for (const func of checks) {

						const data = func();
						if (data) {
							gameMessage.reactions.removeAll()

							const WinEmbed = {
								title: `${gameData[player].member.username} has won the game!`,
								description: renderBoard(board),
								footer: {
									text: `${challenger.username} vs ${opponent.username}`
								}
							}
							gameCollector.stop(`${gameData[player].member.id} won`);
							return gameMessage.edit({ embeds: [WinEmbed] })
						}
					}

					player = (player + 1) % 2;

					const newEmbed = {
						title: `${gameData[player].playerColor} -  It's your turn, ${gameData[player].member.username}!`,
						description: renderBoard(board),
						footer: {
							text: `${challenger.username} vs ${opponent.username}`
						}
					}
					gameMessage.edit({ embeds: [newEmbed] });
				}
			})
		})
	}
}