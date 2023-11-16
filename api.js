const express = require('express')
const port = 4000
const app = express()
const cors = require('cors')

let nowPlaying = ""
let nameQueue = []
let loop = false

function keepAlive() {
	app.listen(4000, () => {
		console.log("Server is ready.")
	})
}

app.use(cors({
	origin: '*'
}))

app.get('/', (req, res) => {
	res.send('API working')
})
module.exports = {
	
	update(id, data) {
		if (id == 1) {
			nowPlaying = data
		}
		else if (id == 2) {
			nameQueue = data
		}
		else if (id == 3) {
			loop = data
		}
		app.get('/queue', (req, res) => {
			return res.json({ queue: nameQueue, current: nowPlaying, loop: loop })
		})
		
	},
	keepAlive
}