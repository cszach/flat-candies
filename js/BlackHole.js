/**
 * BlackHole.js
 *
 * @since v1.0.0-beta2
 * @author Nguyen Hoang Duong
 */
 
class BlackHole {

		static isDead( blackHole ) {

				return frameCount - blackHole.birth > blackHole.lifeSpan;

		}

		constructor( size, power, lifeSpan ) {

				this.size = size;
				this.power = power;
				this.lifeSpan = lifeSpan;

		}

		spawn( x, y ) {

				this.pos = { x, y };
				this.birth = frameCount;

		}

		suckPellet( pellet, eatenPellets ) {

				eatenPellets.push( pellet );

		}

		suckSprite( sprite ) {

				sprite.size -= this.power;

		}

		display() {

				noFill();
				noStroke();
				circle( this.pos.x, this.pos.y, this.size );

		}

}
