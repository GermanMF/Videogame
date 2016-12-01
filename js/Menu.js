//Variables globales
var juego = new Phaser.Game( "100%", "100%", Phaser.CANVAS, 'primerJuego', { preload: preload, create: create, update: update});

//Variables de escenario
var fondo, N1, N2, N3, N4, N5, N6, Texto;
var TN1, TN2, TN3, TN4, TN5, TN6;

//Variable de escala
var escala = 1;

//Variables para control de juego
var Inicio = false;
var width = document.body.offsetWidth;
var height = document.body.offsetHeight;


function preload() {
	fondo = juego.load.image("Fondo", "assets/fondo4.jpg");
	N1 = juego.load.image("N1", "assets/Nivel_1.png");
	N2 = juego.load.image("N2", "assets/Nivel_2.png");
	N3 = juego.load.image("N3", "assets/Nivel_3.png");
	N4 = juego.load.image("N4", "assets/Nivel_4.png");
	N5 = juego.load.image("N5", "assets/Nivel_5.png");
	N6 = juego.load.image("N6", "assets/Nivel_6.png");
}

function FullScreen() {
	//juego.stage.backgroundColor = "#000000"
	juego.scale.pageAlignHorizontally = true;
	juego.scale.pageAlignVertically = true;
	juego.scale.scaleMode = Phaser.ScaleManager.RESIZE;
	juego.scale.setScreenSize(true);
}

function create() {
	fondo = juego.add.sprite(0, 0, 'Fondo');
	FullScreen();
	fondo = juego.add.group();
	fondo.enableBody = true;
	var fondiqui = fondo.create(1785, 0, "Fondo");
	//fondiqui.scale.setTo(2,2);

	Texto = juego.add.text(juego.width/2-600, juego.height/2-100, "El Buen Comer", {fontSize: "72px", fill: "#000"});
	Texto.anchor.y = 1;

	N1 = juego.add.button(juego.width/2-315, juego.height-200, 'N1', null, this, 1, 0, 2);
	N1.events.onInputDown.add(function(){window.open("Nivel_1.html", "_self");});
	N1.events.onInputOver.add(function(){
		TN1=juego.add.text(N1.x + N1.width + 50, N1.y + N1.height,"Nivel 1",{fontSize: "36px", fill: "#000"});
		TN1.anchor.y = 1;
	});
	N1.events.onInputOut.add(function(){ TN1.kill(); });
	N1.events.onInputUp.add(function(){ duck=false; });
	N1.events.onInputUp.add(function(){ TN1.kill(); });

	N2 = juego.add.button(juego.width/2-247, juego.height-296, 'N2', null, this, 1, 0, 2);
	N2.events.onInputDown.add(function(){window.open("Nivel_2.html", "_self");});
	N2.events.onInputOver.add(function(){
		TN2=juego.add.text(N2.x + N2.width + 50, N2.y + N2.height,"Nivel 2",{fontSize: "36px", fill: "#000"});
		TN2.anchor.y = 1;
	});
	N2.events.onInputOut.add(function(){ TN2.kill(); });
	N2.events.onInputUp.add(function(){ TN2.kill(); });

	N3 = juego.add.button(juego.width/2-181, juego.height-392, 'N3', null, this, 1, 0, 2);
	N3.events.onInputDown.add(function(){window.open("Nivel_3.html", "_self");});
	N3.events.onInputOver.add(function(){
		TN3=juego.add.text(N3.x + N3.width + 50, N3.y + N3.height,"Nivel 3",{fontSize: "36px", fill: "#000"});
		TN3.anchor.y = 1;
	});
	N3.events.onInputOut.add(function(){ TN3.kill(); });
	N3.events.onInputUp.add(function(){ TN3.kill(); });

	N4 = juego.add.button(juego.width/2-115, juego.height-488, 'N4', null, this, 1, 0, 2);
	N4.events.onInputDown.add(function(){window.open("Nivel_4.html", "_self");});
	N4.events.onInputOver.add(function(){
		TN4=juego.add.text(N4.x + N4.width + 50, N4.y + N4.height,"Nivel 4",{fontSize: "36px", fill: "#000"});
		TN4.anchor.y = 1;
	});
	N4.events.onInputOut.add(function(){ TN4.kill();} );
	N4.events.onInputUp.add(function(){ TN4.kill();} );

	N5 = juego.add.button(juego.width/2-49, juego.height-584, 'N5', null, this, 1, 0, 2);
	N5.events.onInputDown.add(function(){window.open("Nivel_5.html", "_self");});
	N5.events.onInputOver.add(function(){
		TN5=juego.add.text(N5.x + N5.width + 50, N5.y + N5.height, "Nivel 5", {fontSize: "36px", fill: "#000"});
		TN5.anchor.y = 1;
	});
	N5.events.onInputOut.add(function(){ TN5.kill(); });
	N5.events.onInputUp.add(function(){ TN5.kill(); });

	N6 = juego.add.button(juego.width/2+17, juego.height-708, 'N6', null, this, 1, 0, 2);
	N6.events.onInputDown.add(function(){window.open("Nivel_6.html", "_self");});
	N6.events.onInputOver.add(function(){
		TN6=juego.add.text(N6.x + N6.width + 50, N6.y + N6.height, "Nivel 6", {fontSize: "36px", fill: "#000"});
		TN6.anchor.y = 1;
	});
	N6.events.onInputOut.add(function(){ TN6.kill(); });
	N6.events.onInputUp.add(function(){ TN6.kill(); });
}

function update () {	
	
}