import resources from '../resources.js'

const bg = {
	container: new PIXI.Container(),
	sprite_1: PIXI.Sprite.from(resources.bg_1),
	sprite_2: PIXI.Sprite.from(resources.bg_2),
	sprite_3: PIXI.Sprite.from(resources.bg_3),

	flipped: false,

	speed: 1,

	init () {
		this.sprite_1.y = -108
		this.sprite_2.y = -108
		this.sprite_1.scale.y = 1.2
		this.sprite_2.scale.y = 1.2

		this.sprite_2.x = this.sprite_1.width

		this.container.addChild(this.sprite_1)
		this.container.addChild(this.sprite_2)

		// затемняем фон слегка
		const graphics = new PIXI.Graphics()
		graphics.beginFill(0x000000, 0.4)
		graphics.drawRect(0, 0, window.app.screen.width, window.app.screen.height)
		graphics.endFill()
		this.container.addChild(graphics)
	},

	move () {
		let time = (new Date().getTime()) / 1000

		this.sprite_1.y = Math.cos(time) * 5
		this.sprite_2.y = this.sprite_1.y

		if (!this.flipped) {
			if (this.sprite_1.x < -this.sprite_1.width) {
				this.sprite_1.x = this.sprite_2.width - this.speed
				this.flipped = true
			}
		} else {
			if (this.sprite_2.x < -this.sprite_2.width) {
				this.sprite_2.x = this.sprite_1.width - this.speed
				this.flipped = false
			}
		}

		this.sprite_1.x -= this.speed
		this.sprite_2.x -= this.speed
	},
}

export default bg