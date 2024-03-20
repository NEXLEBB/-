import bg from './objects/bg.js'
import player from './objects/player.js'

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
	},

	tick () {
		handleInput()
		bg.move()
		// TODO: движение врагов
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
		console.log('player.move(-1)')
	}
	if (
		pressedKey.indexOf('KeyD') !== -1
		|| pressedKey.indexOf('ArrowDown') !== -1
		|| pressedKey.indexOf('TouchDown') !== -1
	) {
		player.move(1)
		console.log('player.move(1)')
	}
}

export default game