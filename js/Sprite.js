/**
 * Sprite.js
 *
 * @author Nguyen Hoang Duong
 */

/**
 * Class for a game sprite, which is controlled by a player.
 *
 * A sprite can...
 * - ...eat pellets
 * - ...eat other sprites
 * - ...shrink in size
 */
class Sprite {

	/**
	 * Constructs a new sprite.
	 *
	 * @param {number} size The initial diameter of the sprite (the sprite's shape is circle)
	 * @param {object} fill The fill color for the new sprite sprite
	 * @param {object} stroke The stroke color for the new sprite
	 * @param {number} speedFactor The factor accounted in calculating the speed of the sprite
	 * @param {function} computeStep The function used to compute the speed of the sprite
	 * @param {number} shrinkFactor How much times smaller the sprite is while in shrunken state
	 * @param {number} shrinkDuration Duration of being in shrunken state of the sprite (in ms)
	 */
	constructor( size, fill, stroke, speedFactor, computeStep, shrinkFactor, shrinkDuration ) {

		this.size = size;
		this.fill = fill;
		this.stroke = stroke;
		this.speedFactor = speedFactor;
		this.computeStep = computeStep;

		this.shrunk = false;
		this.shrinkFactor = shrinkFactor;
		this.shrinkDuration = shrinkDuration;

	}

	/**
	 * Gets the physical size of this sprite.
	 *
	 * The size as held by Sprite.size is actually the number of points
	 * earned by that sprite.
	 */
	get actualSize() {

		return ( ! this.shrunk ) ? this.size : this.size / this.shrinkFactor;

	}

	/**
	 * Gets this sprite's number of pixels travelled per frame.
	 */
	get step() {

		return this.computeStep( this.speedFactor, this.actualSize );

	}

	/**
	 * Places this sprite onto a canvas.
	 *
	 * @param {number} x The initial x position for the sprite
	 * @param {number} y The initial y position for the sprite
	 * @param {number} width The width of the canvas
	 * @param {number} height The height of the canvas
	 */
	place( x, y, width, height ) {

		this.pos = { x, y };
		this.env = { width, height };

	}

	/**
	 * Binds keys to this sprite to control it.
	 *
	 * @param {number} w The key code that binds with UP
	 * @param {number} a The key code that binds with LEFT
	 * @param {number} s The key code that binds with DOWN
	 * @param {number} d The key code that binds with RIGHT
	 * @param {number} shrink The key code that binds with SHRINK
	 */
	bindKeys( w, a, s, d, shrink ) {

		this.keyBindings = { w, a, s, d, shrink };

	}

	/**
	 * Draws this sprite on the canvas using p5.js's functions.
	 */
	display() {

		fill( this.fill );
		stroke( this.stroke );
		strokeWeight( this.actualSize / 30 );
		circle(
			this.pos.x,
			this.pos.y,
			this.actualSize
		);

		fill( 'white' );
		noStroke();
		textSize( 20 );
		text( round( this.size ), this.pos.x, this.pos.y );

	}

	/**
	 * Detects pressed keys and controls this sprite according
	 * to the bound key bindings.
	 */
	control() {

		if ( ! this.keyBindings ) return;

		if ( keyIsDown( this.keyBindings.w ) )
			this.pos.y = constrain( this.pos.y - this.step, 0, this.env.height );
		if ( keyIsDown( this.keyBindings.a ) )
			this.pos.x = constrain( this.pos.x - this.step, 0, this.env.width );
		if ( keyIsDown( this.keyBindings.s ) )
			this.pos.y = constrain( this.pos.y + this.step, 0, this.env.height );
		if ( keyIsDown( this.keyBindings.d ) )
			this.pos.x = constrain( this.pos.x + this.step, 0, this.env.width );
		if ( keyIsPressed && keyCode === this.keyBindings.shrink && ! this.shrunk ) {

			this.shrunk = true;
			setTimeout( () => {

				this.shrunk = false;

			}, this.shrinkDuration );

		}

	}

	/**
	 * Eats a pellet.
	 *
	 * The condition for being able to eat a particular pellet is found in
	 * GameData and is managed in Game.
	 *
	 * @param {object} pellet The pellet to eat
	 * @param {object} eatenPellets An array of eaten pellets to be processed by the game
	 */
	eatPellet( pellet, eatenPellets ) {

		this.size += pellet.value;
		eatenPellets.push( pellet );

	}

	/**
	 * Eats a sprite.
	 *
	 * The condition for being able to eat a particular sprite is found in
	 * GameData and is managed in Game.
	 *
	 * @param {object} sprite The sprite to eat
	 * @param {object} eatenSprites An array of eaten sprites to be processed by the game
	 */
	eatOtherSprite( sprite, eatenSprites ) {

		this.size += sprite.value;
		eatenSprites.push( sprite );

	}

}
