let player;
// tilemap properties;
let levelselect, outermap, spikesr, spikesl, outermapcornerTR, outermapcornerTL, outermapcornerBL, outermapcornerBR, placeholder;
// preload variables
let outermapimage, spikesimage, outermapcornerimage;


function preload(){

	outermapcornerimage = "assets/outermapcorner.png";
	outermapimage = "assets/outermap.png";
	spikesimage = "assets/spikes.png";
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  	outermap = new Group();
	outermap.w = 16;
	outermap.h = 16;
	outermap.img = outermapimage;
	outermap.scale = 0.1;
	outermap.tile = 'b';
	outermap.rotationLock = true;
	outermap.collider = "s";

	spikesr = new Group();
	spikesr.w = 16;
	spikesr.h = 16;
	spikesr.img = spikesimage;
	spikesr.scale = 0.1;
	spikesr.tile = 'J';
	spikesr.rotation = 90;
	spikesr.rotationLock = true;
	spikesr.collider = "s";

	spikesl = new Group();
	spikesl.w = 16;
	spikesl.h = 16;
	spikesl.img = spikesimage;
	spikesl.scale = 0.1;
	spikesl.tile = 'j';
	spikesl.rotation = 270;
	spikesl.rotationLock = true;
	spikesl.collider = "s";

	outermapcornerTR = new Group();
	outermapcornerTR.w = 16;
	outermapcornerTR.h = 16;
	outermapcornerTR.img = outermapcornerimage;
	outermapcornerTR.scale = 0.1;
	outermapcornerTR.tile = 'z';
	outermapcornerTR.rotation = 180;
	outermapcornerTR.rotationLock = true;
	outermapcornerTR.collider = "s";

	outermapcornerBL = new Group();
	outermapcornerBL.w = 16;
	outermapcornerBL.h = 16;
	outermapcornerBL.img = outermapcornerimage;
	outermapcornerBL.scale = 0.1;
	outermapcornerBL.tile = 'c';
	outermapcornerBL.rotation = 90;
	outermapcornerBL.rotationLock = true;
	outermapcornerBL.collider = "s";

	outermapcornerTL = new Group();
	outermapcornerTL.w = 16;
	outermapcornerTL.h = 16;
	outermapcornerTL.img = outermapcornerimage;
	outermapcornerTL.scale = 0.1;
	outermapcornerTL.tile = 'Z';
	outermapcornerTL.rotation = 270;
	outermapcornerTL.rotationLock = true;
	outermapcornerTL.collider = "s";

	outermapcornerBR = new Group();
	outermapcornerBR.w = 16;
	outermapcornerBR.h = 16;
	outermapcornerBR.img = outermapcornerimage;
	outermapcornerBR.scale = 0.1;
	outermapcornerBR.tile = 'k';
	outermapcornerBR.rotationLock = true;
	outermapcornerBR.collider = "s";

	placeholder = new Group();
	placeholder.w = 16;
	placeholder.h = 16;
	placeholder.scale = 0.1;
	placeholder.tile = 't';
	placeholder.rotationLock = true;
	placeholder.collider = "s";



	levelselect = new Tiles(
		[
			"bbbbJ..bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
			"bbbbJ..bbbbbbbbbbz.................xbbbb",
			"bbbbJ..bbbbbbbbbz...................xbbb",
			"bbbbJ..bbbbbbbbz.....................xbb",
			"bbbbJ..bbbbbbbz.......................xb",
			"bbbbJ..bbbbbbE...............t..........",
			"bbbbJ..bbbbbbE..........................",
			"bbbbJ..bbbbbbE.........................b",
			"bbbbJ..bbbbbbE.........................b",
			"bbbb...bbbbbbE.........................b",
			"bbbb..cbbbbbbbbbbbbbbbbbb..............b",
			"bbbz..bbbbbbbbbbbbbbbbbbz..........kb..E",
			"bbb...bbbbbbb......................bb..E",
			"bbb..jbbbbbbb......................bb..E",
			"bbb..jbbbbbbb......................bbbbb",
			"bbb..jbbbbbbb......................xbbbb",
			"bbb..jbbbbbbb............kbbZ..........b",
			"bbb..jbbbbbbb............bbbb..........b",
			"bbb..jbbbbbbb............bbbb..........b",
			"bbb......................bbbb..........b",
			"bbb......................bbbb..........b",
			"bbb......................bbbb..........b",
			"bbbZ.....................bbbbZ.........b",
			"bbbbbbbbbbbbZEEEEkbbcEEEEbbbbbZEEEEkbbbb",
		],
		36, 40,
		16, 16
	);  

}

function draw() {
  background(220);

}

