/**
 * Flat Candies - an action game
 *
 * @version v1.0.0-beta1
 * @author Nguyen Hoang Duong / you_create@protonmail.com
 * @license CC-BY-SA-3.0 / https://creativecommons.org/licenses/by-sa/3.0/legalcode
 */

let game, button;
const FPS = 60;

function setup() {

	// Setup our canvas

	let canvas = createCanvas( windowWidth, windowHeight );
	frameRate( FPS );

	// Drawing settings

	textAlign( CENTER, CENTER );

	// Initialize game

	let data = new GameData( canvas, FPS );
	game = new Game( canvas, data );

	// Create the first player

	let firstPlayer = game.createPlayer();
	firstPlayer.bindKeys( 87, 65, 83, 68, 70 ); // W, A, S, D, F

	game.addPlayer( firstPlayer );

	// Get the game ready

	game.placePlayers();
	game.placePellets();
	game.start();

	// Add 'new player' button

	button = createButton( "Add a second player" );
	button.style( 'font-size', '30px' );
	button.position( width / 2, height * 0.8 );
	button.center( 'horizontal' );
	button.mouseClicked( addSecondPlayer );

	// Remove the button after 5 seconds
	setTimeout( () => {

		button.remove();

	}, 5000 );

}

function draw() {

	clear();
	background( 240 );

	if ( game.paused ) {

		fill( 'black' );
		textSize( 50 );
		text( "Paused", width / 2, height / 2 );

	}

	game.update( frameCount );
	game.run();

}

function keyPressed() {

	if ( key === "p" ) {

		if ( game.paused ) {

			game.continue();

		} else {

			game.pause();

		}

	}

}

function addSecondPlayer() {

	let secondPlayer = game.createPlayer();
	secondPlayer.bindKeys( UP_ARROW, LEFT_ARROW, DOWN_ARROW, RIGHT_ARROW, 17 );

	game.addPlayer( secondPlayer );
	game.placePlayer( secondPlayer );

	button.html( "Add a third player" );
	button.center( 'horizontal' );
	button.mouseClicked( false );
	button.mouseClicked( addThirdPlayer );

}

function addThirdPlayer() {

	let thirdPlayer = game.createPlayer();
	thirdPlayer.bindKeys( 73, 74, 75, 76, 72 ); // I, J, K, L, H

	game.addPlayer( thirdPlayer );
	game.placePlayer( thirdPlayer );

	button.remove();

}
