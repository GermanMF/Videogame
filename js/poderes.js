//Variables globales
var juego = new Phaser.Game("100%","100%", Phaser.CANVAS, 'primerJuego',{ preload:preload, create:create, update:update, resize:resize });

//Variables de escenario
var fondo, piso, bola, boton, puntuacion, poder, contador=0, Estado;

//Variables personaje
var barra, controles;

//Variable score
var score = 0;

//Variable de escala
var escala=1;
	
//Poderes
var poderes,
	POK=1, //BanderaPoderActivo
	PG=0, //BanderaPoderBuenoLiberado
	PB=0, //BanderaPoderMaloLiberado
	P=0, //Variable de Control, determina que poder se usara
	Bolas=1, //Variable de Control, determina el numero de bolas actuales.
	Multi=1; //Variable para el poder Multiplicador*2, determina la cantidad de puntos que se ganan por bloque.
	TimeP=0, //Variable de Control, determina el tiempo del poder si es que tiene duracion
	ControlTP=false, //Variable de control para indicar que hubo cuanta hacia atras.
	nbola=null, //variable para la bola extra. En caso de querer más bolas extra pues esta pelado :v
	Vel=1; //Variable para el contrapoder 'velocidad*2'. Determina la velocidad que tendra la vola.
	Bloqueados=false, //variable para el contrapoder 'Bloqueo'. Determina si se puede pegar a los bloques o no.
	PNom="";//Nombre del poder.

//Variables para control de juego
var Inicio = false;
var width = document.body.offsetWidth;
var height = document.body.offsetHeight;


function preload(){
	juego.load.image("fondo","assets/sky.png",800,600);
	juego.load.image("boton","assets/start-button.png",104,58);
	juego.load.spritesheet("bola", "assets/bola.png",17,17);
	juego.load.image("barra","assets/perrongo.png",100,20);	
	juego.load.image("poder","assets/diamond.png",32,28);

	//IMAGENES PISO// Agregar imagenes para las barras de diferente tamaño. (Se llaman en la funcion barrapower())
	juego.load.image("piso","assets/paddle2.png",64,16); //Normal
	juego.load.image("pisogrande","assets/grande.png",64,16); //Grande
	juego.load.image("pisochico","assets/chica.png",64,16); //Chica

	//IMAGENES PODERES// Escoger entre cargar imagen o spritesheet. (Imagen: Poder Random con imagen general)(spritesheet: Poder random con imagen correspondiente al poder. Se necesitan crear animaciones extra)
	juego.load.image("poder","assets/poder.png",24,22);
	juego.load.image("poderM","assets/poderM.png",24,22);
	//juego.load.spritesheet("poder","assets/poder.png",20,20);//Imagenes de los poderes	buenos
	//juego.load.spritesheet("poderM","assets/poderM.png",20,20);//Imagenes de los poderes malos
}

function FullScreen () {
	//juego.stage.backgroundColor = "#000000"
	juego.scale.pageAlignHorizontally = true;
	juego.scale.pageAlignVertically = true;
	juego.scale.scaleMode = Phaser.ScaleManager.RESIZE;
	juego.scale.setScreenSize(true);
}

function create(){
	juego.physics.startSystem(Phaser.Physics.ARCADE);
	juego.physics.arcade.checkCollision.down = false;
	juego.add.sprite("0","0","fondo");
	//Full Screen Yeah lml from hell 666
	FullScreen();
	//Fondo
	fondo = juego.add.group();
	fondo.enableBody = true;
	var fondiqui = fondo.create(0,0,"fondo");
	fondiqui.scale.setTo(2,2);

	piso = juego.add.sprite(juego.width/2, juego.height-50, "piso");
	bola = juego.add.sprite(juego.width/2, juego.height-150,"bola");

	controles = juego.input.keyboard.createCursorKeys();

	//Fisicas del piso
	juego.physics.arcade.enable(piso);
	piso.body.collideWorldBounds = true;
	piso.body.immovable = true;
	piso.body.bounce.set(1);

	//Fisicas de la bola
	bola.checkWorldBounds = true;
	juego.physics.arcade.enable(bola);
	bola.body.collideWorldBounds = true;

	//Gravedad bola
	bola.body.bounce.set(1);
	bola.body.velocity.y = 300*Vel;
	bola.body.velocity.x = 200*Vel;
	bola.events.onOutOfBounds.add(bola_perdida, this);

	barra = juego.add.group();
	barra.enableBody = true;
	barra.physicsBodyType = Phaser.Physics.ARCADE;
	//Diseño Nivel
	for(var i=0;i<4; i++){
		for(j=0;j<10;j++){
			if(i==0 || i == 2){
				contador++;
				var barras = barra.create(100+(j*110), 100+(i*30),"barra");	
			}
			else{
				contador++;
				var barras = barra.create(50+(j*110), 100+(i*30),"barra");	
			}
			barras.body.bounce.set(1);
			barras.body.immovable = true;
			barras.checkWorldBounds = true;
			
			juego.physics.arcade.enable(barras);
		}
	}
	//Poderes
	poderes = juego.add.group();
	poderes.enableBody = true;
	poderes.physicsBodyType = Phaser.Physics.ARCADE;


	//Puntaje
	puntuacion = juego.add.text(10, 50,"Score: 0",{fontSize: "32px", fill: "#000"});
	puntuacion.anchor.y = 1;
	//puntuacion.anchor.x = 1;

	resize;
}

function resize () {
	if(juego.width <= width/3){
		escala = (1/3);
		barra.scale.x = .35;
		barra.scale.y = .35;
		piso.scale.x=.35;
		piso.scale.y=.35;
		bola.scale.x=.35;
		bola.scale.y=.35;
	}
	else if(juego.width <= (2*width)/5){
		escala = (2/5);
		barra.scale.x = .4;
		barra.scale.y = .4;
		piso.scale.x=.4;
		piso.scale.y=.4;
		bola.scale.x=.4;
		bola.scale.y=.4;	
	}
	else if(juego.width <= (width)/2){
		escala = .5;
		barra.scale.x = .5;
		barra.scale.y = .5;
		piso.scale.x=.5;
		piso.scale.y=.5;
		bola.scale.x=.5;
		bola.scale.y=.5;
	}	
	else if(juego.width <= (3*width)/4){
		escala = (3/4);
		barra.scale.x = .75;
		barra.scale.y = .75;
		piso.scale.x=.75;
		piso.scale.y=.75;
		bola.scale.x=.75;
		bola.scale.y=.75;
	}
	else
	{
		escala = 1;
		barra.scale.x = 1;
		barra.scale.y = 1;
		piso.scale.x=1;
		piso.scale.y=1;
		bola.scale.x=1;
		bola.scale.y=1;
	}
	puntuacion.x = juego.width/2;
	puntuacion.y = juego.height;

	piso.x = Math.round((juego.width)/2);
	piso.y = Math.round((juego.height)-50);
	bola.x = Math.round((juego.width)/2);
	bola.y = Math.round((juego.height)-150);

}

//Modificar si se mete una nueva imagen de piso
function inverso (bola,piso){
	var diferencia = 0;
	if(bola.x < piso.x + (juego.cache.getImage("piso").width/2)*escala)
	{
			diferencia = piso.x+((juego.cache.getImage("piso").width/2)*escala) - bola.x;
			bola.body.velocity.x =-(10*diferencia*escala)*Vel;	
	}
	else if(bola.x > piso.x+ (juego.cache.getImage("piso").width/2)*escala)
	{
			diferencia = bola.x - piso.x+(juego.cache.getImage("piso").width/2)*escala;
			bola.body.velocity.x= (10*diferencia*escala)*Vel;
	}
	else
	{
			bola.body.velocity.x = (2 + Math.random() * 8)*Vel;
	}
}

function update (){	
	juego.physics.arcade.collide(bola,piso,inverso,null,this);
	juego.physics.arcade.collide(piso,poderes,powerup,null,this);
	if(!Bloqueados){juego.physics.arcade.collide(bola,barra,rebote,null,this);}else{juego.physics.arcade.collide(bola,barra);}
	if(nbola!=null){
		juego.physics.arcade.collide(nbola,piso,inverso,null,this);
		if(!Bloqueados){juego.physics.arcade.collide(nbola,barra,rebote,null,this);}
	}
	if(controles.right.isDown)
	{
		piso.body.velocity.x = 500*escala;
	}
	else if(controles.left.isDown)
	{
		piso.body.velocity.x= -500*escala ;
	}
	else
	{
		piso.body.velocity.x= 0 ;
	}

	if(bola.body.velocity.x == 0 && (controles.left.isDown || controles.right.isDown))
	{
		bola.body.velocity.x= 300*escala*Vel;
		bola.body.velocity.y= 200*escala*Vel;
	}
	if(TimeP!=0){
		TimeP--;
		if(PG==1){puntuacion.text = 'Score: '+score + '  PowerUp '+PNom+':'+TimeP/100;}else{puntuacion.text = 'Score: '+score + '  PowerDown '+PNom+':'+TimeP/100;}	
		ControlTP=true;
	}
	if(TimeP==0 && ControlTP==true){
			//CATEGORIA: PODERES BUENOS
			if(PG==1){
				switch(P){
					default:
					case 2://Terminar el powerUP Alargar
						PG=0;PB=0;barrapower();
						break;
					case 4://Terminar el powerUp Multiplicador*2
						Multi=1;
				}
				PG=0; //Habilitar Poderes
			}else{
				//CATEGORIA: PODERES MALOS
				if(PB==1){
					switch(P){
						default:
						case 1://Terminar el contraPowerUp Bloqueo
							Bloqueados=false;
							break;
						case 2://Terminar el contraPowerUp BarraChica
							PG=0;PB=0;barrapower();
							break;
						case 3://Terminar el contraPowerUp Velocidad*2
							Vel=1;
					}
					PB=0; //Habilitar Poderes
				}
			}
			ControlTP=false; //ReinicializarControlTP
			//puntuacion.text = 'Score: '+score;
			POK=1; //Reinicializar POK
	}
}

function bola_perdida () {
	Bolas--;
	if(Bolas == 0){
		bola.reset(juego.width/2, juego.height-150);
		piso.reset(juego.width/2, juego.height-50);
		bola.body.velocity.set(0);
		Bolas++;
	}
	else{
		var tempX=nbola.body.velocity.x,tempY=nbola.body.velocity.y;
		bola.reset(nbola.body.x, nbola.body.y);
		bola.body.velocity.x=tempX;bola.body.velocity.y=tempY;
		nbola.kill();
		POK=1;
	}
}

//Funcion Para el poder de Bolas Extra//
function nbola_perdida () {
	Bolas--;	
	nbola.kill();
	POK=1;
}

//Funcion Al Agarrar algun poder
function powerup(piso,poder){	
	//Se determina cual poder se va a activar//Para agregar poderes se debe de agregar un case en la categoria que se quiere, ademas se debe agregar la posibilidad de generar ese numero aleatoriamente en la funcion rebote().
	//Los poderes que requieran tiempo se debe de colocar los segundos(aprox) multiplicados por 100, y la linea para mostrar el tiempo del poder en el texto. La variable ControlTP se activa automaticamente en el Update.
	//Para los poderes que requieren tiempo se debe de colocar lo que se hace al terminarse este tiempo dento de la categoria correspondiente en el case dentro de la funcion Uptade().
	poder.kill();
	if(PG==1){		
		//CATEGORIA: PODERES BUENOS
		switch(P){
			default:
			case 1://Tiempo Extra (Solo agregar a la variable del tiempo el tiempo extra)
				//variableTiempoPartida += NuevoTiempo;
				POK=1;//HabilitarPoderesNuevos
				PG=0;
				PNom="TiempoExtra";
				break;
			case 2://Alargar (Alarga la Barra)
				barrapower();
				TimeP=1500;
				PNom="Más Grande";
				puntuacion.text = 'Score: '+score + '  PowerUp '+PNom+':'+TimeP/100;
				//No se Habilitan PoderesNuevos hasta que se regresa a la normalidad
				break;
			case 3://Muchas Bolas
				nbola = juego.add.sprite(bola.body.x, bola.body.y,"bola");
				nbola.enableBody=true;
				nbola.checkWorldBounds = true;
				juego.physics.arcade.enable(nbola);
				nbola.body.collideWorldBounds = true;
				nbola.body.bounce.set(1);
				nbola.body.velocity.y = -300*Vel;
				nbola.body.velocity.x = 200*Vel;
				nbola.events.onOutOfBounds.add(nbola_perdida, this);
				Bolas++;
				//No se Habilitan PoderesNuevos hasta que se muere la bola
				PNom="Bola Extra!";
				break;
			case 4://Multiplicador*2 (Multiplica la puntuacion obtenida)
				Multi=2;
				TimeP=700;
				PNom="Más Puntos!";
				puntuacion.text = 'Score: '+score + '  PowerUp '+PNom+':'+TimeP/100;				
		}	
		PB=0;	
	}else if(PB==1){		
		//CATEGORIA: PODERES MALOS
		switch(P){
			default:
			case 1://Bloqueo (Evita que se puedan romper bloques)
				Bloqueados=true;
				TimeP=1500;
				PNom="Bloqueo";
				puntuacion.text = 'Score: '+score + '  PowerDown '+PNom+':'+TimeP/100;				
				break;
			case 2://BarraChica (Acorta el tamaño de la barra)
				barrapower();
				TimeP=1500;
				PNom="Más Chica";
				puntuacion.text = 'Score: '+score + '  PowerDown '+PNom+':'+TimeP/100;				
				break;
			case 3://Velocidad*2 (Multiplica la velocidad de la bola)
				Vel=2;
				TimeP=1500;
				PNom="Más Rapido!";
				puntuacion.text = 'Score: '+score + '  PowerDown '+PNom+':'+TimeP/100;				
		}
		PG=0;
	}
}
function powerlost(){
	POK=1; // HabilitarPoderesNuevos
	PG=0;PB=0;
}
function rebote (bola,barra) {
	//Para probar algun poder establecer manualmente la P de la categoria y la P del poder
	score += 10*Multi;
	if(TimeP!=0){
		if(PG==1){puntuacion.text = 'Score: '+score + '  PowerUp '+PNom+':'+TimeP/100;}else{puntuacion.text = 'Score: '+score + '  PowerDown '+PNom+':'+TimeP/100;}
	}else{
		puntuacion.text = 'Score: '+score;
	}
	contador--;
	if(contador == 0){//Ganaste
		Estado = juego.add.text(juego.world.centerX, 400, '¡Ganaste!', { font: "40px Arial", fill: "#ffffff", align: "center" })
		Estado.anchor.setTo(0.5, 0.5);
		bola.kill();
	}
	if((score%80)==0 && POK==1){	
		POK=0; //DeshabilitarPoderesNUevos
		///P: CATEGORIA (Determina de cual categoria se activara algun oder)///Descomentar solo 1 de las 3 opciones para p, comentar las otras 2.

		//P=2; //Valor estatico para probar alguna categoria especifica
		P=juego.rnd.integerInRange(0,3); //Random entre 1 y 2 para determinar la categoria del poder (Probabilidad: 50% buenos / 50% malos)
		//P=Categoria();
		if(P==1){//ImagenPoderBueno
			var poder = poderes.create(barra.body.x, barra.body.y,"poder");		
			juego.physics.arcade.enable(poder);
			poder.body.immovable=false;
			poder.body.velocity.y = 300;		
			poder.checkWorldBounds = true;
			poder.events.onOutOfBounds.add(powerlost, this);
			PG=1;
		}else{//ImagenPoderMalo
			var poder = poderes.create(barra.body.x, barra.body.y,"poderM");		
			juego.physics.arcade.enable(poder);
			poder.body.immovable=false;
			poder.body.velocity.y = 300;		
			poder.checkWorldBounds = true;
			poder.events.onOutOfBounds.add(powerlost, this);
			PB=1;
		}
		///P: PODER (Determina cual poder de la categoria seleccionada anteriormente se activara)///Descomentar solo 1 de las 3 opciones para p, comentar las otras 2.
		//P=1;
		P=juego.rnd.integerInRange(0,5); //Rango del 1 hasta aquel que sea el numeroMaximo de poderes entre ambas categorias
		//P=Poder();
		puntuacion.text=''+P;
	}
	barra.kill();	
}

function barrapower(){
	//Cambia el sprite de la barra por el que le corresponde. dependiendo del poder escogido, o lo devuelve a la normalidad.
	var tempX=piso.x,tempY=piso.y;//Variables auxiliares para almacenar coordenadas.
	if(PG==1){
		piso.kill();
		piso = juego.add.sprite(tempX, tempY, "pisogrande");
	}else if(PB==1){
		piso.kill();
		piso = juego.add.sprite(tempX, tempY, "pisochico");
	}else{		
		piso.kill();
		piso = juego.add.sprite(tempX, tempY, "piso");
	}
		juego.physics.arcade.enable(piso);
		piso.body.collideWorldBounds = true;
		piso.body.immovable = true;
		piso.body.bounce.set(1);
}
//EN CONTRUCCION//
function Categoria(){
	//Agregar mayor probabilidad a cierta opcion
}
function Poder(){
	//Agregar mayor probabilidad a cierto poder
}
