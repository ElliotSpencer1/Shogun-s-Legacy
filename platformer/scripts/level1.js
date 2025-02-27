let bg1, bg2, bg3, cbs, cts, gm, gs, gsb, mpp, mbl, mbr, mtl, mtr, ogre, rs, slgr, srgl;
// images for the above objects
let bg1i, bg2i, bg3i, cbsi, ctsi, gmi, gsi, gsbi, mppi, mbli, mbri, mtli, mtri, ogrei, rsi, slgri, srgli;
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

}

function setup(){
  createCanvas(windowWidth, windowHeight);

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

  cbs = new Group();
	cbs.w = 24;
	cbs.h = 24;
	cbs.img = cbsi;
	cbs.tile = 'a';
	cbs.rotationLock = true;
	cbs.collider = "s";


}

function draw() {
	background("black");

  camerastuff();

}

function camerastuff(){
    camera.zoom = 3;
}