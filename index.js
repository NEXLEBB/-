import { init, start, tick, mreboot, container } from './src/game.js'

const canvas = document.querySelector('canvas')

window.app = new PIXI.Application({
	view: canvas,
	width: 1920,
	height: 1080,
})

window.app.stage.addChild(container)

app.ticker.add((delta) => {
	tick()
})

window.rand = (min, max) => {
	return (Math.floor(Math.random() * (max - min + 1) + min))
}

// регистрируем клавиши, тачи для управления
window.pressedKey = []
document.addEventListener('keydown', (e) => {
	if (pressedKey.indexOf(e.code) !== -1) {
		return
	}
	pressedKey.push(e.code)
})
document.addEventListener('keyup', (e) => {
	const index = pressedKey.indexOf(e.code)
	if (index == -1) {
		return
	}
	pressedKey.splice(index, 1)
})

let oldTouch = null

canvas.addEventListener('touchstart', (e) => {
	e.preventDefault()

	for (let touch of e.touches) {
		if (touch.clientX > window.screen.width / 2) {
			if (pressedKey.indexOf('TouchShot') !== -1) {
				continue
			}
			pressedKey.push('TouchShot')
			continue
		}
		oldTouch = touch
	}
})
canvas.addEventListener('touchmove', (e) => {
	e.preventDefault()

	let newTouch = null

	for (let touch of e.touches) {
		if (touch.clientX > window.screen.width / 2) {
			continue
		}

		newTouch = touch
	}

	if (!newTouch) {
		return
	}

	let dir = newTouch.clientY < oldTouch.clientY

	const code = dir 
		? 'TouchUp'
		: 'TouchDown'

	const oldCode = dir
		? 'TouchDown'
		: 'TouchUp'

	const index = pressedKey.indexOf(oldCode)
	if (index !== -1) {
		pressedKey.splice(index, 1)
	}

	if (pressedKey.indexOf(code) !== -1) {
		return
	}

	pressedKey.push(code)
})
canvas.addEventListener('touchend', (e) => {
	e.preventDefault()

	let saveShot = false
	let saveUpDown = false

	for (let touch of e.touches) {
		if (touch.clientX > window.screen.width / 2) {
			saveShot = true
			continue
		}
		saveUpDown = true
	}

	if (!saveShot) {
		const indexTS = pressedKey.indexOf('TouchShot')
		if (indexTS !== -1) {
			pressedKey.splice(indexTS, 1)
		}
	}
	if (!saveUpDown) {
		const indexTU = pressedKey.indexOf('TouchUp')
		if (indexTU !== -1) {
			pressedKey.splice(indexTU, 1)
		}

		const indexTD = pressedKey.indexOf('TouchDown')
		if (indexTD !== -1) {
			pressedKey.splice(indexTD, 1)
		}
	}
})

// поворот экрана
function checkSize () {
	let wr = window.innerWidth / window.innerHeight
	let ar = app.screen.width / app.screen.height

	let hw = wr > ar
	app.view.classList.remove(hw ? 'w' : 'h')
	
	if (!app.view.classList.contains(hw ? 'h' : 'w')) {
		app.view.classList.add(hw ? 'h' : 'w')
	}

	let isAlbum = wr > 1

	if (!isAlbum) {
		return
	}

	init()
}
window.addEventListener('resize', checkSize)
checkSize()

document.querySelector('#play')
	.addEventListener('click', () => {
		document.querySelector('#menu')
			.style.display = 'none'
		start()
	})

document.querySelector('#continue')
	.addEventListener('click', () => {
		// TODO: показываем рекламу
		document.querySelector('#gameover')
			.style.display = 'none'
		mreboot()
	})

document.querySelector('#exit')
	.addEventListener('click', () => {
		document.querySelector('#menu')
			.style.display = ''
		document.querySelector('#gameover')
			.style.display = 'none'
	})