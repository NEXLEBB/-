import resources from '../resources.js'

const gunsCoords = [
	[ 130, 110 ],
	[ 240, 126 ],
	[ 127, 149 ],
	[ 237, 163 ],
	[ 127, 192 ],
	[ 247, 200 ],
]

export default class Player {
	constructor () {
		this.sprite = PIXI.Sprite.from(resources.spr_player)

		this.speed = 6

		this.gunId = 0
	}

	init () {
		this.sprite.width = 256
		this.sprite.height = 256
		this.sprite.anchor.set(0, 0.5)
		this.sprite.x = 24
		this.sprite.y = 456
		this.sprite.zIndex = this.sprite.y
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
		this.sprite.zIndex = this.sprite.y
	}

	getGunCoords () {
		this.gunId++

		if (this.gunId > gunsCoords.length) {
			this.gunId = 1
		}

		return ({
			x: gunsCoords[this.gunId - 1][0] + this.sprite.x,
			y: gunsCoords[this.gunId - 1][1] + this.sprite.y - (this.sprite.height / 2),
		})
	}
}
