const fetch = require('node-fetch');
const checkIntervalMins = 20
let additionalReminders = 0
const ID = "660917925019910144"

function prependTime(message) {
    const date = new Date()
    const hours = ("0000" + date.getHours()).slice(-2)
    const minutes = ("0000" + date.getMinutes()).slice(-2)
    const seconds = ("0000" + date.getSeconds()).slice(-2)
    
    return `[${hours}:${minutes}:${seconds}] ${message}`
}

function remind(client) {
    // console.log(prependTime(`Sending reminder...`))
    client.users.fetch(ID)
    .then(user => {
        user.send("Zoo Reminder!\n</rescue:1071113056123367450>")
    })
}

async function doReminders(client) {
    const date = new Date()
    const UTCHours = date.getUTCHours()
    const ESTHours = (UTCHours - 5 + 24) % 24
    if (ESTHours >= 23 || ESTHours <= 6) {
        //console.log(prependTime(`User is sleeping, ignoring...`))
        return
    }

    const zooData = await fetch(`https://gdcolon.com/zoo/api/profile/${ID}`)
        .then(res => res.json())
    const rescueCooldownTimestamp = zooData.secretInfo.cooldowns.rescue
    const cooldownSec = Math.floor((rescueCooldownTimestamp - Date.now()) / 1000)
    //console.log(prependTime(`${cooldownSec} seconds until rescue (${cooldownSec/60} minutes)`))
    
    if (cooldownSec > 60 * checkIntervalMins) return
    const timeUntilReminder = cooldownSec - 60
    if (timeUntilReminder < 0) {
	if (additionalReminders < 2) {
	    additionalReminders++
	    return
	}
        // console.log(prependTime(`Sending additional rescue reminder...`))
        await remind(client)
        additionalReminders = 0
        return
    }
    // console.log(prependTime(`Rescue is within ${checkIntervalMins} minutes, setting timer for ${timeUntilReminder} seconds`))
    
    setTimeout(remind, timeUntilReminder * 1000, client)
}

function startReminders(client) {
		remind(client)
		doReminders(client)
		setInterval(doReminders, 1000 * 60 * checkIntervalMins, client)
}

module.exports = { startReminders }
