//Variables globales
var juego = new Phaser.Game("100%","100%", Phaser.AUTO, 'primerJuego',{ preload:preload, create:create, update:update });

//Variables de escenario
var fondo, piso, musica, getReady;

//Botones
var Boton;

//Variable score
var scoreAve = 0 , scoreJugador = 0;

//Variables para control de juego
var Inicio = false;

function preload()
{
	juego.load.image("fondo","assets/sky.png",800,600);
	juego.load.image("n1","assets/Nivel_1.png",837,120);
	juego.load.image("n2","assets/Nivel_2.png",691,110);
	juego.load.image("n3","assets/Nivel_3.png",554,105);
	juego.load.image("n4","assets/Nivel_4.png",420,113);
	juego.load.image("n5","assets/Nivel_5.png",286,109);
	juego.load.image("n6","assets/Nivel_6.png",147,114);
	/*juego.load.image("n1","assets/Nivel_1.png",837,120);
	juego.load.image("n2","assets/Nivel_2.png",691,110);
	juego.load.image("n3","assets/Nivel_3.png",554,105);
	juego.load.image("n4","assets/Nivel_4.png",420,113);
	juego.load.image("n5","assets/Nivel_5.png",286,109);
	juego.load.image("n6","assets/Nivel_6.png",147,114);*/
	juego.load.image("flappy","assets/title.png",800,112)
	juego.load.image("getReady","assets/get-ready.png",184,52);
}

function create()
{
	juego.physics.startSystem(Phaser.Physics.ARCADE);

	juego.add.sprite("0","0","fondo");
	juego.add.sprite("0","800","getReady");

	//Fondo
	fondo = juego.add.group();
	fondo.enableBody = true;
	var fondiqui = fondo.create(0,0,"fondo");
	fondiqui.scale.setTo(2,2);

	Boton = juego.add.group();
	//Boton para flappy
	for (var i = 1; i <= Boton.length; i++) {
		var Botones = juego.add.button(juego.width/2-(juego.cache.getImage("n1"+i))/2, juego.cache.getImage("n"+i),"n"+i, flappy,this,1,0,2);
	};
	resize();
	/*boton6 = juego.add.button(juego.width/2, 120, "n6", flappy, this, 1,0,2);
	boton5 = juego.add.button(juego.width/2, 230, "n5", getReady, this, 1,0,2);
	boton4 = juego.add.button(juego.width/2, 335, "n4", getReady, this, 1,0,2);
	boton3 = juego.add.button(juego.width/2, 448, "n3", getReady, this, 1,0,2);
	boton2 = juego.add.button(juego.width/2, 557, "n2", getReady, this, 1,0,2);
	boton1 = juego.add.button(juego.width/2, 671, "n1", getReady, this, 1,0,2);*/

}

function resize () {
	for (var i = (Boton.length - 1); i >= 0; i--) {
		Boton[i].scale.x = .5;
		Boton[i].scale.y = .5;
	};
}

function update () 
{	
	
}

function flappy () {
	document.href="primerJuego.html";
}

function getReady () {
	document.href="juego2.html";
}
	
	function recolectar (personaje,gema) {
		gema.kill();
		scoreAve++;
		puntuacionAve.text = "Ave: "+ scoreAve;
	}

	function recolecta_j (jugador,gema) {
		gema.kill();
		scoreJugador++;
		puntuacionPlayer.text = "Personaje: "+scoreJugador;
	}


