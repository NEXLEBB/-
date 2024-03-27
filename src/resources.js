// ресурсы, что используются в проекте
const assets = [
	// фоны
	{ alias: 'bg_1', src: 'assets/bgs/1.png' },
	{ alias: 'bg_2', src: 'assets/bgs/2.png' },

	// спрайты
	{ alias: 'spr_player', src: 'assets/sps/player.png' },
	{ alias: 'spr_player_bullet', src: 'assets/sps/player_bullet.png' },
	{ alias: 'spr_enemy_1', src: 'assets/sps/enemy_1.png' },
	{ alias: 'spr_enemy_2', src: 'assets/sps/enemy_2.png' },
	{ alias: 'spr_hp', src: 'assets/gui/healf.png' },

	// звуки
	{ alias: 'snd_player_bullet', src: 'assets/sounds/sound.ogg' },
	{ alias: 'snd_damage', src: 'assets/sounds/sound.ogg' },
	{ alias: 'snd_heal', src: 'assets/sounds/sound.ogg' },
	{ alias: 'snd_dead', src: 'assets/sounds/sound.ogg' },
	{ alias: 'snd_enemy_destroy', src: 'assets/sounds/sound.ogg' },
]

let names = []

for (let asset of assets) {
	names.push(asset.alias)

	PIXI.Assets.add(asset)
}

const resources = await PIXI.Assets.load(names)

export default resources
