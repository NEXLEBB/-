import resources from '../resources.js'

export default class Enemy {
	constructor () {
		this.sprite = new PIXI.Sprite()

		this.sprite.anchor.set(0.5, 0.5)

		this.speed = 5

		this.onBrokeThrough = null
	}

	init () {
		const spriteId = rand(1, 2)
		const sizeCoff = rand(8, 12) / 10

		this.sprite.texture = resources['enemy_' + spriteId]

		this.sprite.width = this.sprite.texture.width / 3 * sizeCoff
		this.sprite.height = this.sprite.texture.height / 3 * sizeCoff

		const maxY = parseInt(window.app.screen.height / this.sprite.height) * 1.6

		this.sprite.x = window.app.screen.width + (this.sprite.width * 1.5) * (rand(0, 10))
		this.sprite.y = 120 + rand(1, maxY) * (this.sprite.height / 2)

		this.sprite.zIndex  = this.sprite.y
	}

	move () {
		this.sprite.x -= this.speed

		if (this.sprite.x > -(this.sprite.width / 2)) {
			return
		}

		if (this.onBrokeThrough) {
			this.onBrokeThrough()
		}

		this.destroy()
	}

	destroy () {
		this.init()
	}
}