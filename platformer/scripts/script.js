let player;
// tilemap properties;
let levelselect


function setup() {
  createCanvas(windowWidth, windowHeight);

  bricks = new Group();
	bricks.w = 20;
	bricks.h = 10;
	bricks.tile = '=';

	levelselect = new Tiles(
		[
			'======',
			'======',
			'==....',
			'==....',
			'=====.',
			'======',
			'....==',
			'....==',
			'======',
			'=====.'
		],
		36, 40,
		bricks.w + 4, bricks.h + 4
	);  

}

function draw() {
  background(220);

}

