/**
 * Pellet.js
 *
 * @author Nguyen Hoang Duong
 */

/**
 * Class for pellets.
 *
 * Pellets, also called candies, are harmless dots that are there to be eaten
 * by sprites and black holes.
 */
class Pellet {

	/**
	 * Constructs a new pellet.
	 *
	 * @param {number} size The diameter of the pellet (pellets are circular)
	 * @param {object} color The fill color for the pellet
	 * @param {number} value The value that the pellet contains
	 */
	constructor( size, color, value = null ) {

		this.size = size;
		this.color = color;
		this.value = value;

	}

	/**
	 * Places this pellet randomly given the bound width and height.
	 *
	 * @param {number} width The width of the area where pellets are distributed
	 * @param {number} width The height of the area where pellets are distributed
	 */
	place( width, height ) {

		this.pos = {
			x: random( width ),
			y: random( height )
		};

	}

	/**
	 * Draws this pellet using p5.js's functions.
	 */
	display() {

		fill( this.color );
		noStroke();
		circle( this.pos.x, this.pos.y, this.size );

	}

}
