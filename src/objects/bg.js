import resources from '../resources.js'

export default class Bg {
	constructor () {
		this.container = new PIXI.Container()

		this.sprites = [
			new PIXI.Sprite(),
			new PIXI.Sprite(),
		]

		this.ti = -1 // textureIndex
		this.si = false // spriteIndex
		
		this.textures = [
			resources.bg_1,
			resources.bg_2,
			// resources.bg_3,
			// resources.bg_4,
			// resources.bg_5,
			// resources.bg_6,
		]

		this.speed = 1

		this.container.scale.y = 1.2

		this.container.addChild(this.sprites[0])
		this.container.addChild(this.sprites[1])
	}

	init () {
		this.swipeSlide()

		// затемняем фон слегка
		const graphics = new PIXI.Graphics()
		graphics.beginFill(0x000000, 0.4)
		graphics.drawRect(0, 0, window.app.screen.width, window.app.screen.height)
		graphics.endFill()
		this.container.addChild(graphics)
	}

	swipeSlide () {
		this.ti++
		this.si = !this.si

		this.sprites[Number(this.si)].texture = this.textures[this.ti]
		this.sprites[Number(this.si)].x = this.sprites[Number(!this.si)].width - 2
		this.sprites[Number(!this.si)].x += 2

		if (this.ti + 1 >= this.textures.length) {
			this.ti = -1
		}
	}

	move () {
		let time = (new Date().getTime()) / 1000

		this.container.y = Math.cos(time) * 10 - 108

		if (
			this.sprites[0].x <= - this.sprites[0].width
			|| this.sprites[1].x < -this.sprites[1].width
		) {
			this.swipeSlide()
		}

		this.sprites[0].x -= this.speed
		this.sprites[1].x -= this.speed
	}
}