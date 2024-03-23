// фоны
PIXI.Assets.add({ alias: 'bg_1', src: 'assets/bgs/1.png' })
PIXI.Assets.add({ alias: 'bg_2', src: 'assets/bgs/2.png' })

// спрайты
PIXI.Assets.add({ alias: 'spr_player', src: 'assets/sps/player.png' })
PIXI.Assets.add({ alias: 'spr_player_bullet', src: 'assets/sps/player_bullet.png' })
PIXI.Assets.add({ alias: 'spr_enemy_1', src: 'assets/sps/enemy_1.png' })
PIXI.Assets.add({ alias: 'spr_enemy_2', src: 'assets/sps/enemy_2.png' })

PIXI.Assets.add({ alias: 'spr_hp', src: 'assets/gui/healf.png' })

// звуки
PIXI.Assets.add({ alias: 'snd_player_bullet', src: 'assets/sounds/sound.ogg' })
PIXI.Assets.add({ alias: 'snd_damage', src: 'assets/sounds/sound.ogg' })
PIXI.Assets.add({ alias: 'snd_heal', src: 'assets/sounds/sound.ogg' })
PIXI.Assets.add({ alias: 'snd_dead', src: 'assets/sounds/sound.ogg' })

const resources = await PIXI.Assets.load([
	'bg_1', 'bg_2',
	'spr_player',
	'spr_player_bullet',
	'spr_enemy_1', 'spr_enemy_2',
	'spr_hp',

	'snd_player_bullet', 'snd_damage',
	'snd_heal',
	'snd_dead',
])

export default resources
