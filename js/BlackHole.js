/**
 * BlackHole.js
 *
 * @since v1.0.0-beta2
 * @author Nguyen Hoang Duong
 */

/**
 * Class for black holes in the game.
 *
 * Black holes are circles like pellets and sprites. They can eat candies and
 * can suck sprites. Black holes are also invisible.
 */
class BlackHole {

	/**
	 * Checks if a black hole is dead given its birth "frame", its life span in
	 * number of frames and the current frame count.
	 *
	 * @return {boolean} true if the black hole is dead, false otherwise
	 */
	static isDead( blackHole ) {

		return frameCount - blackHole.birth > blackHole.lifeSpan;

	}

	/**
	 * Constructs a new black hole.
	 *
	 * @param {number} size The diameter of the black hole
	 * @param {number} power How many points the black hole will suck from any nearby sprite, per frame
	 * @param {number} lifeSpan How long this black hole will operate (in number of frames)
	 */
	constructor( size, power, lifeSpan ) {

		this.size = size;
		this.power = power;
		this.lifeSpan = lifeSpan;

	}

	/**
	 * Spawns this (constructed) black hole by assigning a position for it.
	 *
	 * @param {number} x The x-position of the black hole on the canvas
	 * @param {number} y The y-position of the black hole on the canvas
	 */
	spawn( x, y ) {

		this.pos = { x, y };
		this.birth = frameCount;

	}

	/**
	 * Eats a pellet.
	 *
	 * @param {object} pellet The pellet to eat
	 * @param {object} eatenPellets An array of eaten pellets to be processed by the game
	 */
	suckPellet( pellet, eatenPellets ) {

		eatenPellets.push( pellet );

	}

	/**
	 * Sucks points out of a sprite.
	 *
	 * @param {object} sprite The sprite to suck points from
	 */
	suckSprite( sprite ) {

		sprite.size -= this.power;

	}

	/**
	 * Displays this black hole on the canvas using p5.js's methods
	 */
	display() {

		noFill();
		noStroke();
		circle( this.pos.x, this.pos.y, this.size );

	}

}
