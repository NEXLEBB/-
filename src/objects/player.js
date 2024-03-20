import resources from '../resources.js'

export default class Player {
	constructor () {
		this.sprite = PIXI.Sprite.from(resources.player)
		
		this.hp = 3
		this.speed = 5
	}

	init () {
		this.sprite.width = 256
		this.sprite.height = 256
		this.sprite.anchor.set(0, 0.5)
		this.sprite.x = 0
		this.sprite.y = 456
	}

	move (dir) {
		let delta = dir * this.speed

		if (this.sprite.y + delta < this.sprite.height / 2) {
			return
		}

		if (this.sprite.y + delta > window.app.screen.height - this.sprite.height / 2) {
			return
		}

		this.sprite.y += delta
	}

	shot () {
		// TODO: make shot
	}
}