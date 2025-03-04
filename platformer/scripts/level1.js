let player, base;
let horizontalmove = false, verticalmove = false, idle = true, dashcooldown = false, shiftmove = false;
let bg1, bg2, bg3, cbs, cts, gm, gs, gsb, mpp, mbl, mbr, mtl, mtr, ogre, rs, slgr, srgl, ogle, sl, exittile, spawntile, acidpool, sidejump, dash, d, gtmb;
// images for the above objects
let bg1i, bg2i, bg3i, cbsi, ctsi, gmi, gsi, gsbi, mppi, mbli, mbri, mtli, mtri, ogrei, rsi, slgri, srgli, oglei, sli, di, gtmbi;
// values
let soundval;

function preload(){

  bg1i = loadImage("level1assets/background_layer_1.png");
  bg2i = loadImage("level1assets/background_layer_2.png");
  bg3i = loadImage("level1assets/background_layer_3.png");
  cbsi = loadImage("level1assets/concretebottomsingle.png");
  ctsi = loadImage("level1assets/concretetopsingle.png");
  gsi = loadImage("level1assets/grasssingle.png");
  gmi = loadImage("level1assets/grassmid.png");
  gsbi = loadImage("level1assets/grasssinglebottom.png");
  mppi = loadImage("level1assets/midpillarpart.png");
  mbli = loadImage("level1assets/mudbl.png");
  mbri = loadImage("level1assets/mudbr.png");
  mtli = loadImage("level1assets/mudtl.png");
  mtri = loadImage("level1assets/mudtr.png");
  ogrei = loadImage("level1assets/orangegrassrightedge.png");
  rsi = loadImage("level1assets/rightstone.png");
  slgri = loadImage("level1assets/stoneleftgrassright.png");
  srgli = loadImage("level1assets/stonerightgrassleft.png");
  oglei = loadImage("level1assets/ogle.png");
  sli = loadImage("level1assets/stoneleft.png");
  ssheet2 = loadImage("assets/knight.png");
  di = loadImage("level1assets/dirt.png");
  gtmbi = loadImage("level1assets/grasstopmudbottom.png")

}

function playersetup(){



	player = new Sprite(0,0, 15, 20, "d")
	player.debug = true;
	player.rotationLock = true;
	// player.scale = 1; \\
	player.layer = 2
	// player.offset.x = 20
	player.spriteSheet = ssheet2;
	player.anis.frameDelay = 6;
	player.addAnis({
    	Rollleft: {row:3, frames:7},
    	Rollright: {row:4, frames:7},
    	moveLeft: {row:1, frames:7},
    	moveRight: {row:2, frames:7},
    	idle:{row:0, frames:4}
  	})
	player.changeAni("idle")
  	// player.scale = 0.7;
	// player.w = 16;
	// player.h = 20;
	// bean = player.addCollider(0, 6,16,20);
	player.bounciness = 0;

}

function setup(){
  createCanvas(windowWidth, windowHeight);

	base = 2;
	world.gravity.y = 9.80665;

	bg1 = new Sprite();
	bg1.img = bg1i;
	bg1.rotationLock = true;
	bg1.collider = "s";
	bg1.scale = 2;
	bg1.w = 1;
	bg1.h = windowHeight;
	bg1.debug = false;
  
  	bg2 = new Sprite();
	bg2.img = bg2i;
	bg2.rotationLock = true;
	bg2.collider = "s";
	bg2.scale = 2;
	bg2.w = 1;
	bg2.h = windowHeight;
	bg2.debug = false;

  	bg3 = new Sprite();
	bg3.img = bg3i;
	bg3.rotationLock = true;
	bg3.collider = "s";
	bg3.scale = 2;
	bg3.w = 1;
	bg3.h = windowHeight;
	bg3.debug = false;
	bg3.offset.x = -50;

 	cbs = new Group();
	cbs.w = 24;
	cbs.h = 24;
	cbs.img = cbsi;
	cbs.tile = 'Z';
	cbs.rotationLock = true;
	cbs.collider = "s";

	cts = new Group();
	cts.w = 24;
	cts.h = 24;
	cts.img = ctsi;
	cts.tile = 'z';
	cts.rotationLock = true;
	cts.collider = "s";

	gm = new Group();
	gm.w = 24;
	gm.h = 24;
	gm.img = gmi;
	gm.tile = 'k';
	gm.rotationLock = true;
	gm.collider = "s";

	gs = new Group();
	gs.w = 24;
	gs.h = 24;
	gs.img = gsi;
	gs.tile = 'p';
	gs.rotationLock = true;
	gs.collider = "s";

	gsb = new Group();
	gsb.w = 24;
	gsb.h = 24;
	gsb.img = gsbi;
	gsb.tile = 't';
	gsb.rotationLock = true;
	gsb.collider = "s";

	mpp = new Group();
	mpp.w = 24;
	mpp.h = 24;
	mpp.img = gtmbi;
	mpp.tile = 'f';
	mpp.rotationLock = true;
	mpp.collider = "s";

	mbl = new Group();
	mbl.w = 24;
	mbl.h = 24;
	mbl.img = di;
	mbl.tile = 'H';
	mbl.rotationLock = true;
	mbl.collider = "s";

	mbr = new Group();
	mbr.w = 24;
	mbr.h = 24;
	mbr.img = di;
	mbr.tile = 'h';
	mbr.rotationLock = true;
	mbr.collider = "s";

	mtr = new Group();
	mtr.w = 24;
	mtr.h = 24;
	mtr.img = di;
	mtr.tile = 'K';
	mtr.rotationLock = true;
	mtr.collider = "s";

	d = new Group();
	d.w = 24;
	d.h = 24;
	d.img = di;
	d.tile = 't';
	d.rotationLock = true;
	d.collider = "s";

	mtl = new Group();
	mtl.w = 24;
	mtl.h = 24;
	mtl.img = di;
	mtl.tile = 'l';
	mtl.rotationLock = true;
	mtl.collider = "s";	
	
	ogre = new Group();
	ogre.w = 24;
	ogre.h = 24;
	ogre.img = ogrei;
	ogre.tile = 'u';
	ogre.rotationLock = true;
	ogre.collider = "s";	

	ogle = new Group();
	ogle.w = 24;
	ogle.h = 24;
	ogle.img = oglei;
	ogle.tile = 'm';
	ogle.rotationLock = true;
	ogle.collider = "s";

	sl = new Group();
	sl.w = 24;
	sl.h = 24;
	sl.img = sli;
	sl.tile = 'M';
	sl.rotationLock = true;
	sl.collider = "s";

	rs = new Group();
	rs.w = 24;
	rs.h = 24;
	rs.img = rsi;
	rs.tile = 'r';
	rs.rotationLock = true;
	rs.collider = "s";

	slgr = new Group();
	slgr.w = 24;
	slgr.h = 24;
	slgr.img = slgri;
	slgr.tile = 'a';
	slgr.rotationLock = true;
	slgr.collider = "s";

	srgl = new Group();
	srgl.w = 24;
	srgl.h = 24;
	srgl.img = srgli;
	srgl.tile = 'a';
	srgl.rotationLock = true;
	srgl.collider = "s";

	spawntile = new Group();
	spawntile.w = 24;
	spawntile.h = 24;
	spawntile.tile = 'U';
	spawntile.rotationLock = true;
	spawntile.visible = false;
	spawntile.collider = "n";

	exittile = new Group();
	exittile.w = 24;
	exittile.h = 24;
	exittile.tile = 'w';
	exittile.rotationLock = true;
	exittile.visible = false;
	exittile.collider = "n";

	acidpool = new Group();
	acidpool.w = 24;
	acidpool.h = 24;
	acidpool.tile = 'a';
	acidpool.rotationLock = true;
	// acidpool.visible = false;
	acidpool.collider = "n";

	sidejump = new Group();
	sidejump.w = 24;
	sidejump.h = 24;
	sidejump.tile = 'L';
	sidejump.rotationLock = true;
	// sidejump.visible = false;
	sidejump.collider = "n";

	dash = new Group();
	dash.w = 24;
	dash.h = 24;
	dash.tile = 'c';
	dash.rotationLock = true;
	// sidejump.visible = false;
	dash.collider = "n";

	levelselect = new Tiles(
		[	"........................................",
			"........................................",
			"........................................",
			"w.........................p............c",
			"ffffffffffu.....L......paatakk...p...mff",
			"hHhHhHhHhHr.....L...kaatkkkk.....t...MKl",
			"KlKlKlKlKlr.....L.L..kkk.........t...MhH",
			"hHhHhHhHhHr.....L.L..............t...MKl",
			"KlKlKlKlKlr.....L.L..............t...MhH",
			"kkkkkkkkkkk.....L.L..............t...MKl",
			"................L.L..............t...MhH",
			"................L................kaaaKKl",
			"..................................kkkKhH",
			"..................kkkaaap...p........MKl",
			".....................kkkt...t........MhH",
			"........................k...k..kkk...MKl",
			"....................................MhhH",
			".....................................MKl",
			"...................................z.MhH",
			".......................ffffffffffu.Z.MKl",
			"......................fhHhHhHhHhHr.Z.MhH",
			"...................ffffKlKlKlKlKlr.Z.MKl",
			"U...ffu..mfff...fffhHhHhHhHhHhHhHr.Z.MhH",
			"ffffflr..MlKfffffKlKlKlKlKlKlKlKlr.Z.MKl",
			"lKlKllr..MlKlKlKlKlKlKlKlKlKlKlKlr.Z.MKl",
			"lKlKllr..MlKlKlKlKlKlKlKlKlKlKlKlr.Z.MKl",
			"lKlKllr..MlKlKlKlKlKlKlKlKlKlKlKlr.Z.MKl",
			"lKlKllr..MlKlKlKlKlKlKlKlKlKlKlKlr.Z.MKl",
			"lKlKlllaallKlKlKlKlKlKlKlKlKlKlKlr.Z.MKl",
			"lKlKlllaallKlKlKlKlKlKlKlKlKlKlKlr.Z.MKl",
		],
		0, 0,
		23.9, 23.9
	);  

	playersetup();


	for(s of spawntile){
		player.x = s.x;
		player.y = s.y;
	}

	player.overlaps(bg1);
	player.overlaps(bg2);
	player.overlaps(bg3);

}

function draw() {
	background("black");

  camerastuff();
  movements();
  spritesheetset();
}

function movements(){

	if((kb.presses("w"))){
		player.vel.y -= 5;
	}
	if((kb.pressing("a"))){
		player.vel.x = base * -1;
	}
	if((kb.pressing("d"))){
		player.vel.x = base;
	}
	if(kb.pressing("shift")){
		if((kb.pressing("a")) && (!dashcooldown)){
			base = 4;
			dashcooldown = true;
			setTimeout(() => {
				base = 2;
				setTimeout(() => {
					dashcooldown = false;
				}, 500)
			}, 1000)
		}
		if((kb.pressing("d")) && (!dashcooldown)){
			base = 4;
			dashcooldown = true;
			setTimeout(() => {
				base = 2;
				setTimeout(() => {
					dashcooldown = false;
				}, 500)
			}, 1000)
		}
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
	if(kb.presses("shift")){
		shiftmove = true;
	}
	else{
		setTimeout(() => {
			shiftmove = false;
		}, 1500)
	}


	if(idle){
		player.changeAni("idle");
		console.log("bean7")
	}
	if(horizontalmove && !shiftmove){
		if(kb.pressing("d")){
			player.changeAni("moveRight");
			console.log("bean6")
		}
		if(kb.pressing("a")){
			player.changeAni("moveLeft")
			console.log("bean5")
		}
	}
	if(shiftmove && horizontalmove){
		if(kb.pressing("a")){
			player.changeAni("Rollleft");
		}
		if(kb.pressing("d")){
			player.changeAni("Rollright")
		}
	}
	if(kb.pressing("shift") && kb.pressing("a")){
		player.changeAni("Rollleft")
	}
	if(kb.pressing("d") && kb.pressing("shift")){
		player.changeAni("Rollright")
	}
}

function camerastuff(){
    camera.zoom = 5;

	camera.x = player.x;
	camera.y = player.y;

	bg1.x = player.x;
	bg1.y = player.y;

	bg2.x = bg1.x;
	bg2.y = bg1.y;

	bg3.x = bg1.x;
	bg3.y = bg1.y;

}