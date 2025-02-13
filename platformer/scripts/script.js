let player;
// tilemap properties;
let levelselect, outermap, spikesr, spikesl, outermapcornerTR, outermapcornerTL, outermapcornerBL, outermapcornerBR, placeholder, entry, spawntile, parallax, base, backgroundoverlay;
// preload variables
let outermapimage, spikesimage, outermapcornerimage, parallaximg, bgoverlay, ssheet;
// assigning booleans
let horizontalmove, verticalmove, idle;



function preload(){

	parallaximg = loadImage("assets/parallax image.png");
	outermapcornerimage = loadImage("assets/outermapcorner(2).png");
	outermapimage = loadImage("assets/outermap.png");
	spikesimage = loadImage("assets/spikes.png");
	bgoverlay = loadImage("assets/backgroundoverlay.png");
	ssheet = loadImage("assets/alienBeige.png");

}

function playersetup(){
	player = new Sprite(0,0, 13.335, 20, "d")
	player.rotationLock = true;
	player.scale = 1;

	player.layer = 2
	player.spriteSheet = ssheet;
	player.anis.frameDelay = 4
	player.addAnis({
    	moveUpRight: {row:5, frames:2},
    	moveUpLeft: {row:6, frames:2},
    	moveLeft: {row:0, frames:2},
    	moveRight: {row:2, frames:2},
    	idle:{row:0}
  	})
	player.changeAni("moveUpRight")
  	player.scale = 0.7

}

function setup(){
  createCanvas(windowWidth, windowHeight);

	world.gravity.y = 9.80665;

	parallax = new Sprite();
	parallax.img = parallaximg;
	parallax.rotationLock = true;
	parallax.collider = "s";
	parallax.scale = 2;
	parallax.w = 1;
	parallax.h = windowHeight;
	parallax.debug = false;

	backgroundoverlay = new Sprite();
	backgroundoverlay.img = bgoverlay;
	backgroundoverlay.rotationLock = true;
	backgroundoverlay.collider = "s";
	backgroundoverlay.scale = 4;
	backgroundoverlay.w = 1;
	backgroundoverlay.h = windowHeight/2;
	backgroundoverlay.debug = false;

  	outermap = new Group();
	outermap.img = outermapimage;
	outermap.w = 16;
	outermap.h = 16;
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
	outermapcornerTR.diameter = 26;
	outermapcornerTR.img = outermapcornerimage;
	outermapcornerTR.scale = 0.5;
	outermapcornerTR.tile = 'Z';
	outermapcornerTR.offset.x = -100
	outermapcornerTR.rotation = 180;
	outermapcornerTR.rotationLock = true;
	outermapcornerTR.collider = "s";

	outermapcornerBL = new Group();
	outermapcornerBL.diameter = 26;
	outermapcornerBL.img = outermapcornerimage;
	outermapcornerBL.scale = 0.5;
	outermapcornerBL.tile = 'c';
	outermapcornerBL.rotation = 90;
	outermapcornerBL.rotationLock = true;
	outermapcornerBL.collider = "s";

	outermapcornerTL = new Group();
	outermapcornerTL.diameter = 26;
	outermapcornerTL.img = outermapcornerimage;
	outermapcornerTL.scale = 0.5;
	outermapcornerTL.tile = 'z';
	outermapcornerTL.rotation = 270;
	outermapcornerTL.rotationLock = true;
	outermapcornerTL.collider = "s";

	outermapcornerBR = new Group();
	outermapcornerBR.diameter = 26;
	outermapcornerBR.img = outermapcornerimage;
	outermapcornerBR.scale = 0.5;
	outermapcornerBR.tile = 'x';
	outermapcornerBR.rotationLock = true;
	outermapcornerBR.collider = "s";

	placeholder = new Group();
	placeholder.w = 16;
	placeholder.h = 16;
	placeholder.scale = 0.1;
	placeholder.tile = 't';
	placeholder.rotationLock = true;
	placeholder.collider = "s";

	entry = new Group();
	entry.w = 16;
	entry.h = 16;
	entry.scale = 1;
	entry.color = "cyan"
	entry.tile = 'E';
	entry.rotationLock = true;
	entry.collider = "s";

	spawntile = new Group();
	spawntile.w = 16;
	spawntile.h = 16;
	spawntile.scale = 0.1;
	spawntile.tile = 's';
	spawntile.rotationLock = true;
	spawntile.collider = "n";

	levelselect = new Tiles(
		[
			"bbbbbbbbbbbbbbbbbbbbJ.sbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
			"bbbbbbbbbbbbbbbbbbbbJ..bbbbbbbbbbz.................xbbbbbbbbbbbb",
			"bbbbbbbbbbbbbbbbbbbbJ..bbbbbbbbbz...................xbbbbbbbbbbb",
			"bbbbbbbbbbbbbbbbbbbbJ..bbbbbbbbz.....................xbbbbbbbbbb",
			"bbbbbbbbbbbbbbbbbbbbJ..bbbbbbbz.......................xbbbbbbbbbb",
			"bbbbbbbbbbbbbbbbbbbbJ..bbbbbbE.........................EEEEEEEEEE",
			"bbbbbbbbbbbbbbbbbbbbJ..bbbbbbE.........................EEEEEEEEEE",
			"bbbbbbbbbbbbbbbbbbbbJ..bbbbbbE.........................bbbbbbbbbb",
			"bbbbbbbbbbbbbbbbbbbbJ..bbbbbbE.........................bbbbbbbbbb",
			"bbbbbbbbbbbbbbbbbbbb...bbbbbbE.........................bbbbbbbbbb",
			"bbbbbbbbbbbbbbbbbbbb..cbbbbbbbbbbbbbbbbbb..............bbbbbbbbbb",
			"bbbbbbbbbbbbbbbbbbbz..bbbbbbbbbbbbbbbbbbz..........cb..EEEEEEEEEE",
			"bbbbbbbbbbbbbbbbbbb...bbbbbbbbz....................bb..EEEEEEEEEE",
			"bbbbbbbbbbbbbbbbbbb..jbbbbbbbz...........t.........bb..EEEEEEEEEE",
			"bbbbbbbbbbbbbbbbbbb..jbbbbbbb......................bbbbbbbbbbbbbb",
			"bbbbbbbbbbbbbbbbbbb..jbbbbbbb......................xbbbbbbbbbbbbb",
			"bbbbbbbbbbbbbbbbbbb..jbbbbbbb............cbbZ..........bbbbbbbbbb",
			"bbbbbbbbbbbbbbbbbbb..jbbbbbbb............bbbb..........bbbbbbbbbb",
			"bbbbbbbbbbbbbbbbbbb..jbbbbbbb............bbbb..........bbbbbbbbbb",
			"bbbbbbbbbbbbbbbbbbb......................bbbb..........bbbbbbbbbb",
			"bbbbbbbbbbbbbbbbbbb......................bbbb..........bbbbbbbbbb",
			"bbbbbbbbbbbbbbbbbbb......................bbbb..........bbbbbbbbbb",
			"bbbbbbbbbbbbbbbbbbbZ.....................bbbbZ.........bbbbbbbbbb",
			"bbbbbbbbbbbbbbbbbbbbbbbbbbbbZ....cbbZ....bbbbbZ....cbbbbbbbbbbbbb",
			"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbEEEEbbbbEEEEbbbbbbEEEEbbbbbbbbbbbbbb",
			"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbEEEEbbbbEEEEbbbbbbEEEEbbbbbbbbbbbbbb",
			"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbEEEEbbbbEEEEbbbbbbEEEEbbbbbbbbbbbbbb",
			"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbEEEEbbbbEEEEbbbbbbEEEEbbbbbbbbbbbbbb",
			"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbEEEEbbbbEEEEbbbbbbEEEEbbbbbbbbbbbbbb",
			"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbEEEEbbbbEEEEbbbbbbEEEEbbbbbbbbbbbbbb",
			"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbEEEEbbbbEEEEbbbbbbEEEEbbbbbbbbbbbbbb",
			"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbEEEEbbbbEEEEbbbbbbEEEEbbbbbbbbbbbbbb",
		],
		0, 0,
		16, 16
	);  

	playersetup();
	player.overlaps(parallax)
	player.overlaps(backgroundoverlay)

	for(s of spawntile){
		player.x = s.x;
		player.y = s.y;
	}

	for(p of placeholder){
		backgroundoverlay.x = p.x;
		backgroundoverlay.y = 175;
	}


	outermap.debug = false;
	outermapcornerTR.debug = false;
	outermapcornerTL.debug = false;
	outermapcornerBL.debug = false;
	outermapcornerBR.debug = false;

}

function draw() {
	background("black");
	movements();
	cameradefiner()
	spiketouch();
	parallaxchanger();
	spritesheetset()

}


function spiketouch(){
	if((player.colliding(spikesl)) || (player.colliding(spikesr))){
		player.vel.x = 0;
		player.vel.y = 0;
		for(s of spawntile){
			player.x = s.x;
			player.y = s.y;
		}
	}
}

function parallaxchanger(){
	parallax.x = player.x;
	parallax.moveTo(player.x, 500 + (player.y - player.y/2), 1)
}

function cameradefiner(){
	camera.x = player.x;
	camera.y = player.y;

	camera.zoom = 6; // maybe change camera to be in the area like box? make it slide but only to an extent so the camera cannot go past walls.

}

function movements(){

	if((kb.presses("w")) && ((player.colliding(outermap)) || ((player.colliding(outermapcornerBL)) || ((player.colliding(entry)) || (player.colliding(outermapcornerBR)) || (player.colliding(outermapcornerTL)) || (player.colliding(outermapcornerTR)))))){
		player.vel.y -= 5;
	}
	if((kb.pressing("a"))){
		player.vel.x = -2;
	}
	if((kb.pressing("d"))){
		player.vel.x = 2;
	}
}

function spritesheetset(){
	if((!kb.pressing("a")) && (!kb.pressing("w")) && (!kb.pressing("d")) && (!kb.pressing("s")) && !verticalmove){
		idle = true;
	}
	else{
		
	}
	if((kb.pressing("a")) || (kb.pressing("d"))){
		horizontalmove = true;
	}
	else{
		horizontalmove = false;
	}
	if((kb.pressing("w")) || (kb.pressing("s")) || (player.vel.y != 0)){
		verticalmove = true;
	}
	else{
		verticalmove = false;
	}


	if(idle){
		player.changeAni("idle");
		console.log("bean7")
	}
	if(horizontalmove){
		if(kb.pressing("d")){
			player.changeAni("moveRight");
			console.log("bean6")
		}
		if(kb.pressing("a")){
			player.changeAni("moveLeft")
			console.log("bean5")
		}
	}
	if(verticalmove){
		if(player.vel.y > 0){
			if(kb.pressing("a")){
				player.changeAni("moveUpLeft");
				console.log("bean4")
			}
			if(kb.pressing("d")){
				player.changeAni("moveUpRight");
				console.log("bean3")
			}
		}
		if(player.vel.y < 0){
			if(kb.pressing("a")){
				player.changeAni("moveUpLeft");
				console.log("bean2")
			}
			if(kb.pressing("d")){
				player.changeAni("moveUpRight");
				console.log("bean1")
			}
		}
	}
}