import resources from '../resources.js'

export default class Bullet {
	constructor () {
		this.sprite = PIXI.Sprite.from(resources.spr_player_bullet)

		this.sprite.anchor.set(0.5, 0.5)

		this.speed = 6

		this.state = false

		this.sprite.x = -1000
		this.sprite.y = -1000
	}

	init (x, y) {
		const sizeCoff = rand(8, 12) / 10

		this.sprite.width = this.sprite.texture.width / 3 * sizeCoff
		this.sprite.height = this.sprite.texture.height / 3 * sizeCoff

		this.sprite.x = x
		this.sprite.y = y

		this.state = true
	}

	move () {
		if (!this.state) {
			return
		}

		this.sprite.x += this.speed

		if (this.sprite.x > window.app.screen.width + (this.sprite.width / 2)) {
			// TODO: минус жизнь по идее
			this.state = false
		}
	}

	destroy ()  {
		this.state = false
		this.sprite.x = -1000
		this.sprite.y = -1000
	}
}
