import Bg from './objects/bg.js'
import Player from './objects/player.js'
import Enemy from './objects/enemy.js'

const bg = new Bg()
const player = new Player()

let enemiesPool = []

for (let i = 0; i < 6; i++) {
	enemiesPool.push(new Enemy())
}

const game = {
	state: 0,
	container: new PIXI.Container(),

	start () {
		if (this.state) {
			return
		}

		this.state = 1

		bg.init()
		player.init()

		this.container.addChild(bg.container)
		this.container.addChild(player.sprite)

		for (let enemy of enemiesPool) {
			enemy.init()
			this.container.addChild(enemy.sprite)
		}
	},

	tick () {
		handleInput()
		bg.move()

		for (let enemy of enemiesPool) {
			enemy.move()
		}
	},

	end () {
		this.state = 0
		// TODO: вы проиграли
	},
}

// управление
function handleInput () {
	if (
		pressedKey.indexOf('KeyE') !== -1
		|| pressedKey.indexOf('ArrowUp') !== -1
		|| pressedKey.indexOf('TouchUp') !== -1
	) {
		player.move(-1)
	}
	if (
		pressedKey.indexOf('KeyD') !== -1
		|| pressedKey.indexOf('ArrowDown') !== -1
		|| pressedKey.indexOf('TouchDown') !== -1
	) {
		player.move(1)
	}
}

export default game