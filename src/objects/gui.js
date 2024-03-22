import resources from '../resources.js'

export default class Gui {
	constructor ({ maxHp }) {
		this.container = new PIXI.Container()

		this.hpSprites = []

		for (let i = 0; i < maxHp; i++) {
			let sprite = PIXI.Sprite.from(resources.hp)
			sprite.y = 8
			sprite.x = i * sprite.width
			sprite.visible = false

			this.hpSprites.push(sprite)

			this.container.addChild(sprite)
		}

		this.hp = 0

		this.scoreText = new PIXI.Text(0)
		this.scoreText.style = new PIXI.TextStyle({
			align: 'right',
			dropShadow: {
				alpha: 0.8,
				angle: 2.1,
				blur: 4,
				color: '0x111111',
				distance: 10,
			},
			fill: '#ffffff',
			stroke: { color: '#000000', width: 12, join: 'round' },
			stroke: '#ffffff',
			fontSize: 80,
			fontWeight: 'lighter',
		})

		this.scoreText.skew.set(-0.35, 0.1)
		this.scoreText.anchor.set(0.5, 0.5)

		this.scoreText.y = 64

		this.container.addChild(this.scoreText)
	}

	init () {
		this.scoreText.x = window.app.screen.width - this.scoreText.width - 64
	}

	changeHp (v) {
		let delta = v - this.hp

		if (delta > 0) {
			for (let i = this.hp; i < v; i++) {
				this.hpSprites[i].visible = true
			}
		} else {
			for (let i = v; i < this.hp; i++) {
				this.hpSprites[i].visible = false
			}
		}

		this.hp = v
	}

	changeScore (v) {
		this.scoreText.text = v
	}
}
