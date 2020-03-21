/**
 * GameData.js
 *
 * This is perhaps the only file that you need to change in order to adjust
 * various factors and behaviors in the game while keeping the game's natural
 * rules intact.
 *
 * @author Nguyen Hoang Duong
 */

/**
 * Class for game data to be used by Game (see Game.js).
 *
 * When you create an instace of this class, default values are immediate set.
 * If you want different default values, override the default values. If you
 * want this class to be more flexible, re-implement it.
 */
class GameData {

	constructor( canvas, frameRate ) {

		this.env = {

			width: canvas.width,
			height: canvas.height

		};

		this.game = {

			frameRate,

		},

		this.sprites = {

			size: 50,
			colors: [
				[ '#ef5350', '#66bb6a' ],
				[ '#7e57c2', '#ffee58' ],
				[ '#42a5f5', '#ffa726' ]
			],
			speedFactor: 5,
			speed: ( factor, size ) => ( factor * 100 ) / size,
			value: ( size ) => size / 3,
			shrinkFactor: 5,
			shrinkDuration: 5000,
			canEatPellet: ( sprite, pellet ) => Math.hypot(
				abs( sprite.pos.x - pellet.pos.x ),
				abs( sprite.pos.y - pellet.pos.y )
			) < sprite.actualSize / 2 + pellet.size / 2,
			canEatSprite: ( sprite, otherSprite ) => Math.hypot(
				abs( sprite.pos.x - otherSprite.pos.x ),
				abs( sprite.pos.y - otherSprite.pos.y )
			) < sprite.actualSize / 2 && sprite.actualSize > otherSprite.actualSize * 1.2

		};

		this.pellets = {

			initialQuantity: round( random( 50, 100 ) ),
			newQuantity: 1,
			newPelletsInterval: 20,
			size: 10,
			colors: [ 'red', 'green', 'blue' ],
			value: 1

		};

		this.blackHoles = {

			size: 230,
			power: 1,
			lifeSpan: this.game.frameRate * 7,
			spawnInterval: this.game.frameRate * 12,
			canSuckPellet: ( blackHole, pellet ) => Math.hypot(
				abs( blackHole.pos.x - pellet.pos.x ),
				abs( blackHole.pos.y - pellet.pos.y )
			) < blackHole.size / 2 + pellet.size / 2,
			canSuckSprite: ( blackHole, sprite ) => Math.hypot(
				abs( blackHole.pos.x - sprite.pos.x ),
				abs( blackHole.pos.y - sprite.pos.y )
			) < blackHole.size / 2 + sprite.actualSize / 2

		};

	}

}
