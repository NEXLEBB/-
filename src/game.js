import Bg from './objects/bg.js'
import Player from './objects/player.js'
import Enemy from './objects/enemy.js'

const container = new PIXI.Container()
let state = 0

const bg = new Bg()
const player = new Player()

container.addChild(bg.container)
container.addChild(player.sprite)

let enemiesPool = []

for (let i = 0; i < 6; i++) {
	let enemy = new Enemy()
	enemiesPool.push(enemy)

	container.addChild(enemy.sprite)
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

export { container }

export function start () {
	if (state) {
		return
	}

	state = 1

	bg.init()
	player.init()

	for (let enemy of enemiesPool) {
		enemy.init()
	}
}

export function tick () {
	handleInput()
	bg.move()

	for (let enemy of enemiesPool) {
		enemy.move()
	}
}

export function end () {
	state = 0
}