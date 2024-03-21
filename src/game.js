import Bg from './objects/bg.js'
import Player from './objects/player.js'
import Enemy from './objects/enemy.js'
import Bullet from './objects/bullet.js'

// Константы
const enemiesCount = 8 // кол-во врагов в пуле (макс)
const bulltesCount = 48 // кол-во патрон в пуле (макс)
// Переменные
let shotDelay = 0.5 // таймаут между выстрелами (в секундах)
let bulletsPerShot = 1 // кол-во одновременно выпускаемых партон

// Инициализация и тд
const container = new PIXI.Container()
let state = 0

const bg = new Bg()
const player = new Player()

container.addChild(bg.container)
container.addChild(player.sprite)

let enemiesPool = []
let bulletsPool = []

for (let i = 0; i < enemiesCount; i++) {
	let enemy = new Enemy()
	enemiesPool.push(enemy)

	container.addChild(enemy.sprite)
}

for (let i = 0; i < bulltesCount; i++) {
	let bullet = new Bullet()
	bulletsPool.push(bullet)

	container.addChild(bullet.sprite)
}

let shotDelayTimeout = null

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

	if (
		pressedKey.indexOf('Space') !== -1 
		|| pressedKey.indexOf('Enter') !== -1
		|| pressedKey.indexOf('TouchShot') !== -1
	) {
		shot()
	}

	// читы
	if (pressedKey.indexOf('Digit1') !== -1) {
		bulletsPerShot = 1
	}
	if (pressedKey.indexOf('Digit2') !== -1) {
		bulletsPerShot = 2
	}
	if (pressedKey.indexOf('Digit3') !== -1) {
		bulletsPerShot = 3
	}
	if (pressedKey.indexOf('Digit4') !== -1) {
		bulletsPerShot = 4
	}
	if (pressedKey.indexOf('Digit5') !== -1) {
		bulletsPerShot = 5
	}
	if (pressedKey.indexOf('Digit6') !== -1) {
		bulletsPerShot = 6
	}
	if (pressedKey.indexOf('Digit0') !== -1) {
		shotDelay = 0.5
	}
	if (pressedKey.indexOf('Digit9') !== -1) {
		shotDelay = 0.25
	}
	if (pressedKey.indexOf('Digit8') !== -1) {
		shotDelay = 0.1
	}
}

function shot () {
	if (shotDelayTimeout) {
		return
	}

	let i = 0

	for (let bullet of bulletsPool) {
		if (bullet.state) {
			continue
		}

		let {x, y} = player.getGunCoords()

		bullet.init(x, y)

		if (i < bulletsPerShot - 1) {
			i++
			continue
		}

		break
	}

	shotDelayTimeout = setTimeout(() => {
		clearTimeout(shotDelayTimeout)
		shotDelayTimeout = null
	}, shotDelay * 1000)
}

function checkCollision (a, b) {
	const ba = a.getBounds()
    const bb = b.getBounds()

    return (
        ba.x < bb.x + bb.width
        && ba.x + ba.width > bb.x
        && ba.y < bb.y + bb.height
        && ba.y + ba.height > bb.y
    )
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

// TODO: ПАУЗА

export function tick () {
	handleInput()

	if (!state) {
		return
	}
	
	bg.move()

	for (let enemy of enemiesPool) {
		enemy.move()
	}

	for (let bullet of bulletsPool) {
		bullet.move()
	}

	for (let enemy of enemiesPool) {
		if (enemy.sprite.x > (window.app.screen.width + enemy.sprite.width / 2)) {
			continue
		}

		for (let bullet of bulletsPool) {
			if (!bullet.state) {
				continue
			}

			if (checkCollision(enemy.sprite, bullet.sprite)) {
				enemy.destroy()
				bullet.destroy()
				// TODO: генерируем лут
			}
		}
	}
}

export function end () {
	state = 0
}