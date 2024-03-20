import game from './src/game.js'

const canvas = document.querySelector('canvas')

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

	game.start()
}

window.app = new PIXI.Application({
	view: canvas,
	width: 1920,
	height: 1080,
})

window.app.stage.addChild(game.container)

app.ticker.add((delta) => {
	game.tick()
})

window.rand = (min, max) => {
	return (Math.floor(Math.random() * (max - min + 1) + min))
}

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
canvas.addEventListener('touchstart', (e) => {
	e.preventDefault()

	const code = e.touches[0].clientY < window.screen.height / 2
		? 'TouchUp'
		: 'TouchDown'

	if (pressedKey.indexOf(code) !== -1) {
		return
	}

	pressedKey.push(code)
})
canvas.addEventListener('touchmove', (e) => {
	e.preventDefault()

	const code = e.touches[0].clientY < window.screen.height / 2
		? 'TouchUp'
		: 'TouchDown'

	const oldCode = e.touches[0].clientY > window.screen.height / 2
		? 'TouchUp'
		: 'TouchDown'

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

	const indexTU = pressedKey.indexOf('TouchUp')
	if (indexTU !== 1) {
		pressedKey.splice(indexTU, 1)
	}

	const indexTD = pressedKey.indexOf('TouchDown')
	if (indexTD !== 1) {
		pressedKey.splice(indexTD, 1)
	}
})

window.addEventListener('resize', checkSize)
checkSize()