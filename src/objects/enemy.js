import resources from '../resources.js'

export default class Enemy {
	constructor () {
		this.sprite = new PIXI.Sprite()

		this.sprite.anchor.set(0.5, 0.5)

		this.speed = 5
	}

	init () {
		const spriteId = rand(1, 2)
		const sizeCoff = rand(8, 12) / 10

		this.sprite.texture = resources['enemy_' + spriteId]

		this.sprite.width = this.sprite.texture.width / 3 * sizeCoff
		this.sprite.height = this.sprite.texture.height / 3 * sizeCoff

		const maxY = parseInt(window.app.screen.height / this.sprite.height) * 2

		this.sprite.x = window.app.screen.width + (this.sprite.width * 1.5) * (rand(0, 10))
		this.sprite.y = rand(1, maxY) * (this.sprite.height / 2)
	}

	move () {
		this.sprite.x -= this.speed

		if (this.sprite.x < -(this.sprite.width / 2)) {
			// TODO: минус жизнь по идее
			this.destroy()
		}
	}

	destroy () {
		this.init()
	}
}