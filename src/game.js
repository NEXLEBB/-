import Bg from './objects/bg.js'
import Gui from './objects/gui.js'
import Player from './objects/player.js'
import Enemy from './objects/enemy.js'
import Bullet from './objects/bullet.js'

import resources from './resources.js'

// Константы
const enemiesCount = 8 // кол-во врагов в пуле (макс)
const bulltesCount = 48 // кол-во патрон в пуле (макс)
const maxHp = 7 // максимальное здоровье
// Переменные
let shotDelay = 0.75 // таймаут между выстрелами (в секундах)
let bulletsPerShot = 1 // кол-во одновременно выпускаемых партон

const gameplay = {
	_hp: 0,
	_score: 0,

	get hp() {
		return (this._hp)
	},
	set hp(v) {
		if (v > maxHp) {
			return
		}
		this._hp = v
		if (v < 0) {
			end()
			return
		}
		gui.changeHp(this._hp)
	},

	get score() {
		return (this._score)
	},
	set score(v) {
		this._score = v
		gui.changeScore(this._score)
	},
}

// Инициализация и тд
const container = new PIXI.Container()
const room = new PIXI.Container()
room.sortableChildren = true

let state = 0

const bg = new Bg()
const player = new Player()
const gui = new Gui({ maxHp })

container.addChild(bg.container)
container.addChild(room)
container.addChild(gui.container)

room.addChild(player.sprite)

let enemiesPool = []
let bulletsPool = []

for (let i = 0; i < enemiesCount; i++) {
	let enemy = new Enemy()
	enemiesPool.push(enemy)
	enemy.onBrokeThrough = () => {
		gameplay.hp -= 1

		resources.snd_damage.play()
	}

	room.addChild(enemy.sprite)
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
		state && player.move(-1)
	}
	if (
		pressedKey.indexOf('KeyD') !== -1
		|| pressedKey.indexOf('ArrowDown') !== -1
		|| pressedKey.indexOf('TouchDown') !== -1
	) {
		state && player.move(1)
	}

	if (
		pressedKey.indexOf('Space') !== -1 
		|| pressedKey.indexOf('Enter') !== -1
		|| pressedKey.indexOf('TouchShot') !== -1
	) {
		state && shot()
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
		gameplay.score += 10
	}
	if (pressedKey.indexOf('Digit9') !== -1) {
		gameplay.hp += 1
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

		setTimeout(() => {
			resources.snd_player_bullet.play()
		}, i * 125)

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

// логика

export { container }

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

				resources.snd_enemy_destroy.play()

				gameplay.score += 1
				// TODO: генерируем лут
			}
		}
	}
}

function finit () {
	gameplay.hp = 3
	gameplay.score = 0

	bg.init()
	player.init()
	gui.init()

	for (let enemy of enemiesPool) {
		enemy.init()
	}
}

export function init () {
	if (state) {
		return
	}

	gameplay.hp = 3
	gameplay.score = 0

	bg.init()
	player.init()
	gui.init()

	for (let enemy of enemiesPool) {
		enemy.init()
	}
}

export function start () {
	if (state) {
		return
	}
resources.snd_OST.play({ loop: true })
	state = 1

	// TODO: состояние игры короче да
 
	finit()
}

export function mreboot () {
	state = 1

	gameplay.hp = 3

	for (let enemy of enemiesPool) {
		enemy.init()
	}
}

// TODO: ПАУЗА

export function end () {
	resources.snd_dead.play()

	for (let bullet of bulletsPool) {
		bullet.destroy()
	}

	state = 0
	document.querySelector('#gameover')
		.style.display = ''
}
