PIXI.Assets.add({ alias: 'bg_1', src: 'assets/bgs/1.png' })
PIXI.Assets.add({ alias: 'bg_2', src: 'assets/bgs/2.png' })
PIXI.Assets.add({ alias: 'bg_3', src: 'assets/bgs/3.png' })
PIXI.Assets.add({ alias: 'bg_4', src: 'assets/bgs/4.png' })
PIXI.Assets.add({ alias: 'bg_5', src: 'assets/bgs/5.png' })
PIXI.Assets.add({ alias: 'bg_6', src: 'assets/bgs/6.png' })

PIXI.Assets.add({ alias: 'player', src: 'assets/sps/player.png' })

PIXI.Assets.add({ alias: 'bullet', src: 'assets/sps/bullet.png' })

PIXI.Assets.add({ alias: 'enemy_1', src: 'assets/sps/enemy_1.png' })
PIXI.Assets.add({ alias: 'enemy_2', src: 'assets/sps/enemy_2.png' })

const resources = await PIXI.Assets.load([
	'bg_1', 'bg_2', 'bg_3', 'bg_4', 'bg_5', 'bg_6',
	'player',
	'bullet',
	'enemy_1', 'enemy_2'
])

export default resources