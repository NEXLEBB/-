import resources from '../resources.js'

const player = {
	sprite: PIXI.Sprite.from(resources.player),

	hp: 3,
	speed: 5,

	init () {
		player.sprite.width = 256
		player.sprite.height = 256
		player.sprite.anchor.set(0, 0.5)
		player.sprite.x = 0
		player.sprite.y = 456
	},

	move (dir) {
		let delta = dir * this.speed

		if (this.sprite.y + delta < this.sprite.height / 2) {
			return
		}

		if (this.sprite.y + delta > window.app.screen.height - this.sprite.height / 2) {
			return
		}

		this.sprite.y += delta
	},

	shot () {
		// TODO: make shot
	}
}

export default player