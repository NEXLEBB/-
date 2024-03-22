PIXI.Assets.add({ alias: 'bg_1', src: 'assets/bgs/1.png' })
PIXI.Assets.add({ alias: 'bg_2', src: 'assets/bgs/2.png' })

PIXI.Assets.add({ alias: 'player', src: 'assets/sps/player.png' })

PIXI.Assets.add({ alias: 'player_bullet', src: 'assets/sps/player_bullet.png' })

PIXI.Assets.add({ alias: 'enemy_1', src: 'assets/sps/enemy_1.png' })
PIXI.Assets.add({ alias: 'enemy_2', src: 'assets/sps/enemy_2.png' })

PIXI.Assets.add({ alias: 'hp', src: 'assets/gui/healf.png' })

const resources = await PIXI.Assets.load([
	'bg_1', 'bg_2',
	'player',
	'player_bullet',
	'enemy_1', 'enemy_2',

	'hp',
])

export default resources
