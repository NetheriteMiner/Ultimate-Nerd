const ytdl = require('ytdl-core');
const ytpl = require('ytpl')
const {
	AudioPlayerStatus,
	StreamType,
	createAudioPlayer,
	createAudioResource,
	joinVoiceChannel,
} = require('@discordjs/voice');
const api = require('../api.js')
const player = createAudioPlayer();
var queue = [];
var nameQueue = [];
let loopQueue = [];
let loopNameQueue = [];
let loop = false;
var state = "";
const ytubes = require('ytubes')
let failedToGetAllInfo = false;
process.on('uncaughtException', function(err) {
	console.log(err);
})
let nowPlaying = "";
let curLink = "";


player.on('stateChange', (oldState, newState) => {
	//console.log(`Audio player transitioned from ${oldState.status} to ${newState.status}`);
	state = newState.status
});

module.exports = {
	async execute(interaction, client) {
		subcommand = interaction.options.getSubcommand()
		if (subcommand == "play") {
			realPlay = function(url) {
				global.connection = joinVoiceChannel({
					channelId: interaction.member.voice.channel.id,
					guildId: interaction.member.guild.id,
					adapterCreator: interaction.member.guild.voiceAdapterCreator
				});
				global.stream = ytdl(url, { filter: 'audioonly' });
				global.resource = createAudioResource(stream, { inputType: StreamType.Arbitrary });
				player.play(resource);
				connection.subscribe(player);
			}
			loadPlaylist = async function(url) {
				id = await ytpl.getPlaylistID(url)
				list = await ytpl(id);
				await interaction.editReply({content: `Loading playlist ${list.title}, please wait...`, ephemeral: true});
				for (video of list.items) {
					queue.push(video.shortUrl);
					nameQueue.push(video.title);
				}
				api.update(2, nameQueue)
				return true;
			}
			const link = interaction.options.getString('link');
			if (link.includes("dQw4w9WgXcQ")) { await interaction.editReply(":clown:\n" + interaction.member.user.toString() + " tried to rickroll people!") }
			try {
				isPlaylist = await loadPlaylist(link)
			}
			catch {
				isPlaylist = false;
			}
			isVideo = false;
			if (ytdl.validateURL(link) == true) { isVideo = true }
			if (isVideo == false && isPlaylist == false) {
				if (link.slice(0, 5) === "LIST-") {
					actualLink = link.slice(5)
					playlists = await ytubes.getPlaylist(actualLink, {max: 10});
					playlistList = "**PLAYLIST SEARCH**\n";
					for (i = 0; i < playlists.length; i++) {
						playlistList+=`${i+1}. ${playlists[i].title}\n`
						if (typeof playlists[i].id === "undefined") {
							failedToGetAllInfo = true;
						}
					}
					if (failedToGetAllInfo == true) {
						interaction.editReply({content: "I was unable to get the information of every playlist, so the search cannot be displayed. Please try a different search phrase, or /report if this keeps happening!", ephemeral: true})
					} else {
					await interaction.editReply({
					content: playlistList,
					ephemeral: true,
					components: [
						{
							type: 1,
							components: [
								{
									type: 2,
									label: "[1]",
									style: 2,
									custom_id: playlists[0].id
								},
								{
									type: 2,
									label: "[2]",
									style: 2,
									custom_id: playlists[1].id
								},
								{
									type: 2,
									label: "[3]",
									style: 2,
									custom_id: playlists[2].id
								},
								{
									type: 2,
									label: "[4]",
									style: 2,
									custom_id: playlists[3].id
								},
								{
									type: 2,
									label: "[5]",
									style: 2,
									custom_id: playlists[4].id
								}
							]
						},
						{
							type: 1,
							components: [
								{
									type: 2,
									label: "[6]",
									style: 2,
									custom_id: playlists[5].id
								},
								{
									type: 2,
									label: "[7]",
									style: 2,
									custom_id: playlists[6].id
								},
								{
									type: 2,
									label: "[8]",
									style: 2,
									custom_id: playlists[7].id
								},
								{
									type: 2,
									label: "[9]",
									style: 2,
									custom_id: playlists[8].id
								},
								{
									type: 2,
									label: "[10]",
									style: 2,
									custom_id: playlists[9].id
								}
							]
						}
					]
				})
					}
				}
				else {
					videos = await ytubes.getVideo(link, {max: 10});
					videoList = "**VIDEO SEARCH**\n";
					failedToGetAllInfo = false
					for (i = 0; i < videos.length; i++) {
						videoList+=`${i+1}. ${videos[i].title}\n`
						if (typeof videos[i].id == "undefined" || typeof videos[i] == "undefined") {
							failedToGetAllInfo = true
						}
					}
					
					if (failedToGetAllInfo == true) {
						interaction.editReply({content: "I was unable to get the information of every video, so the search cannot be displayed. Please try a different search phrase, or /report if this keeps happening!", ephemeral: true})
					} else {
					await interaction.editReply({
						content: videoList,
						ephemeral: true,
						components: [
							{
								type: 1,
								components: [
									{
										type: 2,
										label: "[1]",
										style: 2,
										custom_id: videos[0].id
									},
									{
										type: 2,
										label: "[2]",
										style: 2,
										custom_id: videos[1].id
									},
									{
										type: 2,
										label: "[3]",
										style: 2,
										custom_id: videos[2].id
									},
									{
										type: 2,
										label: "[4]",
										style: 2,
										custom_id: videos[3].id
									},
									{
										type: 2,
										label: "[5]",
										style: 2,
										custom_id: videos[4].id
									}
								]
							},
							{
								type: 1,
								components: [
									{
										type: 2,
										label: "[6]",
										style: 2,
										custom_id: videos[5].id
									},
									{
										type: 2,
										label: "[7]",
										style: 2,
										custom_id: videos[6].id
									},
									{
										type: 2,
										label: "[8]",
										style: 2,
										custom_id: videos[7].id
									},
									{
										type: 2,
										label: "[9]",
										style: 2,
										custom_id: videos[8].id
									},
									{
										type: 2,
										label: "[10]",
										style: 2,
										custom_id: videos[9].id
									}
								]
							}
						]
					})
					}
					return;
				}
			}
			if (isPlaylist == true) {
				await interaction.editReply({ content: "Playlist loaded!", ephemeral: true })
			}
			//This if else chain actually plays the song, but does something different depending on if there's already a song playing
			if (loop == true) {
				interaction.editReply({content: "I'm sorry, but to add songs to the queue, you must turn loop **off**. This is to prevent confusion between whether a song will get looped or not (you can turn it back on once you're done)"})
				return;
			}
			if (isPlaylist == false && isVideo == true) {
				if (state != "playing") {
					realPlay(link);
					ytdl(link).on('info', (info) => {
						interaction.editReply({ content: "Playing **" + info.videoDetails.title + "** in **" + interaction.member.voice.channel.name + "**", ephemeral: true })
						nowPlaying = info.videoDetails.title
						curLink = link
						api.update(1, nowPlaying)
					})
					
				}
				else {
					queue.push(link)
					ytdl(link).on('info', (info) => {
						interaction.editReply({ content: "Added **" + info.videoDetails.title + "** to the queue (Position " + queue.length.toString() + ")", ephemeral: true })
						nameQueue.push(info.videoDetails.title)
						api.update(2, nameQueue)
					})
				}
			}
			else if (state != "playing" && isPlaylist == true) {
					realPlay(queue[0]);
					nowPlaying = nameQueue[0]
					curLink = queue[0]
					queue.shift();
					nameQueue.shift();
					api.update(2, nameQueue)
					api.update(1, nowPlaying)
			}
			player.on(AudioPlayerStatus.Idle, () => {
				if (queue.length != 0 && state != "playing" && state != "buffering") {
					realPlay(queue[0]);
					nowPlaying = nameQueue[0]
					curLink = queue[0];
					queue.shift();
					nameQueue.shift();
				}
				else if (queue.length == 0 && loop == true) {
					queue = loopQueue.slice()
					nameQueue = loopNameQueue.slice()
					realPlay(queue[0])
					nowPlaying = nameQueue[0]
					curLink = queue[0];
					queue.shift()
					nameQueue.shift()
				}
				if (queue.length == 0 && loop == false) {
					nowPlaying = ""
				}
				api.update(2, nameQueue)
				api.update(1, nowPlaying)
			});
			/*connection.on('stateChange', (oldState, newState) => {
				console.log(`Connection transitioned from ${oldState.status} to ${newState.status}`);
			});*/
			//Original player.on stateChange line but removed bc button
		}
		else if (subcommand == "manage") {
			const type = interaction.options.getString('action');
			if (type == 'pause') {
				player.pause();
				await interaction.editReply({ content: "Successfully paused!", ephemeral: true })
			}
			else if (type == 'unpause') {
				player.unpause();
				await interaction.editReply({ content: "Successfully unpaused!", ephemeral: true })
			}
			else if (type == 'stop') {
				player.stop();
				connection.destroy();
				queue.length = 0;
				nameQueue.length = 0;
				loopQueue.length = 0;
				loopNameQueue.length = 0;
				loop = false;
				nowPlaying = "";
				curLink = "";
				api.update(1, nowPlaying)
				api.update(2, nameQueue)
				api.update(3, loop)
				await interaction.editReply({ content: "Successfully disconnected!", ephemeral: true })
			}
			else if (type == 'skip') {
				if (state != "playing") {
					await interaction.editReply({ content: "Nothing in queue! Run `/yt manage disconnect` if you want to disconnect the player.", ephemeral: true })
					return;
				}
				player.stop();
				if (queue.length != 0) {
					realPlay(queue[0]);
					nowPlaying = nameQueue[0]
					curLink = queue[0]
					queue.shift();
					nameQueue.shift();
					api.update(2, nameQueue)
					api.update(1, nowPlaying)
					await interaction.editReply({ content: "Skipped!", ephemeral: true })
				}
				else if (queue.length == 0 && loop == true) {
					queue = loopQueue
					nameQueue = loopNameQueue
					realPlay(queue[0])
					nowPlaying = nameQueue[0]
					curLink = queue[0]
					queue.shift()
					nameQueue.shift()
					api.update(2, nameQueue)
					api.update(1, nowPlaying)
				}
				else {
					await interaction.editReply({content: "Skipped, but couldn't find the next song!", ephemeral: true})
				}
			}
			else if (type == 'clear') {
				queue.length = 0;
				nameQueue.length = 0;
				loopQueue.length = 0;
				loopNameQueue.length = 0;
				interaction.editReply({content: "Cleared the current queue! Make sure to use stop, skip, or pause to stop the current song as well", ephemeral: true})
				api.update(2, nameQueue)
			}
			else if (type == 'loop') {
				if (loop == true) {
					interaction.editReply({content: 'Turned loop to **off**', ephemeral: true})
					loop = false
					api.update(3, loop)
				}
				else if (loop == false) {
					interaction.editReply({content: 'Turned loop to **on**', ephemeral: true})
					loop = true
					loopQueue = queue.slice()
					loopQueue.splice(0, 1, curLink)
					loopNameQueue = nameQueue.slice()
					loopNameQueue.splice(0, 1, nowPlaying)
					api.update(3, loop)
				}
			}
			else if (type == 'reset') {
				player.stop();
				queue.length = 0;
				nameQueue.length = 0;
				loopQueue.length = 0;
				loopNameQueue.length = 0;
				loop = false;
				nowPlaying = "";
				curLink = "";
				api.update(2, nameQueue)
				api.update(1, nowPlaying)
				api.update(3, loop)
				await interaction.editReply({ content: "Successfully returned to default state!", ephemeral: true })
			}
		}
		else if (subcommand == "queue") {
			skip = interaction.options.getInteger('skip')
			if (skip == null) {
				if (state == 'playing') {
					content = "Now Playing: **" + nowPlaying + "**" 
					if (loop == true) {
						content += " :arrows_counterclockwise:" + "\n" + loopNameQueue.join('\n')
					}
					else {
						content += " :arrow_right:" + '\n'+nameQueue.join('\n')
					}
					
					if (content.length > 2000) {
						if (loop == false) {
							content = `Queue too long to list!\nCurrently playing: ${nowPlaying}\nNext 3 songs:\n${nameQueue[0]}\n${nameQueue[1]}\n${nameQueue[2]}`
						}
						else {
							content = `Queue too long to list!\nCurrently playing: ${nowPlaying}\nSongs until next loop: ${queue.length}`
						}
					}
					
					await interaction.editReply({ content: content, ephemeral: true })
					
				}
				else {
					await interaction.editReply({ content: "Nothing in queue and nothing playing!", ephemeral: true })
				}
			}
			else {
				player.stop()
				while (skip > 0) {
					queue.shift()
					nameQueue.shift()
					skip -= 1
				}
				realPlay(queue[0])
				nowPlaying = nameQueue[0]
				curLink = queue[0];
				queue.shift()
				nameQueue.shift()
				api.update(2, nameQueue)
				api.update(1, nowPlaying)
				interaction.editReply({content: `Skipped ${interaction.options.getInteger('skip')} songs!`})
			}
		}
	},
	async button(interaction, client) {
		await interaction.deferReply({ephemeral: true});
		const link = interaction.customId;
		realPlay = function(url) {
			global.connection = joinVoiceChannel({
				channelId: interaction.member.voice.channel.id,
				guildId: interaction.member.guild.id,
				adapterCreator: interaction.member.guild.voiceAdapterCreator
			});
			global.stream = ytdl(url, { filter: 'audioonly' });
			global.resource = createAudioResource(stream, { inputType: StreamType.Arbitrary });
			player.play(resource);
			connection.subscribe(player);
		}
		loadPlaylist = async function(url) {
				id = await ytpl.getPlaylistID(url)
				list = await ytpl(id);
				await interaction.editReply({content: `Loading playlist ${list.title}, please wait...`, ephemeral: true});
				for (video of list.items) {
					queue.push(video.shortUrl);
					nameQueue.push(video.title);
				}
				return true;
			}
		if (loop == true) {
			interaction.editReply({content: "I'm sorry, but to add songs to the queue, you must turn loop **off**. This is to prevent confusion between whether a song will get looped or not (you can turn it back on once you're done)"})
			return;
		}
		try {
			isPlaylist = await loadPlaylist(link)
			interaction.editReply({content: "Playlist loaded!", ephemeral: true})
			if (state != "playing") {
				realPlay(queue[0]);
				nowPlaying = nameQueue[0]
				curLink = queue[0]
				queue.shift();
				nameQueue.shift();
			}
			api.update(1, nowPlaying)
			api.update(2, nameQueue)
		}
		catch {
			if (state != "playing") {
				
				realPlay(link);
				ytdl(link).on('info', (info) => {
					interaction.editReply({ content: "Playing **" + info.videoDetails.title + "** in **" + interaction.member.voice.channel.name + "**", ephemeral: true })
					nowPlaying = info.videoDetails.title
					curLink = link
					api.update(1, nowPlaying)
					api.update(2, nameQueue)
				})
			}
			else {
				queue.push(link)
				ytdl(link).on('info', (info) => {
					interaction.editReply({ content: "Added **" + info.videoDetails.title + "** to the queue (Position " + queue.length.toString() + ")", ephemeral: true })
				nameQueue.push(info.videoDetails.title)
					api.update(2, nameQueue)
				})
			}
		}
		player.on(AudioPlayerStatus.Idle, () => {
			if (queue.length != 0 && state != "playing" && state != "buffering") {
				realPlay(queue[0]);
				nowPlaying = nameQueue[0]
				curLink = queue[0];
				queue.shift();
				nameQueue.shift();
			}
			else if (queue.length == 0 && loop == true) {
				queue = loopQueue.slice()
				nameQueue = loopNameQueue.slice()
				realPlay(queue[0])
				nowPlaying = nameQueue[0]
				curLink = queue[0];
				queue.shift()
				nameQueue.shift()
			}
			if (queue.length == 0 && loop == false) {
				nowPlaying = ""
			}
			api.update(2, nameQueue)
			api.update(1, nowPlaying)
		});
	}
}