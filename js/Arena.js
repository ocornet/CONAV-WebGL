Arena = function(game) //on créée notre objet Arena qui prend l'objet game en argument
{
    // VARIABLES UTILES
    this.game = game;
    var scene = game.scene;

	this.time = 0;

    //EXEMPLE 
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    var island = BABYLON.MeshBuilder.CreateCylinder("island", {diameter:20.0,height:10.0}, scene);
	island.checkCollisions = true;

    island.position.y = 1;

    this.game.scene.cube = island;// va nous permettre d'accéder à notre mesh pour réaliser des animations au sein du prototype 
    //(à faire à chaque fois que vous comptez animer un mesh)
    /*
    var boxArena = BABYLON.Mesh.CreateBox("box1", 100, scene, false, BABYLON.Mesh.BACKSIDE);

    boxArena.scaling.y = 2;

    var materialGround = new BABYLON.StandardMaterial("groundTexture", scene);

    boxArena.material = materialGround;
    */
    //LIRE LA DOC

    // LUMIERES 

    /*TODO :  -3 lumières différentes
              -couleurs et intensités
    */
    var light1 = new BABYLON.PointLight("light1", new BABYLON.Vector3(0,50,25), scene);
    light1.diffuse = new BABYLON.Color3(1,0,0);
    light1.specular = new BABYLON.Color3(0,1,0);
    light1.intensity = 1;

    var light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0,-50,25), scene);
    light2.diffuse = new BABYLON.Color3(0,1,1);
    light2.specular = new BABYLON.Color3(0,0,1);
    light2.intensity = 0.5;

    // MATERIAUX ET TEXTURES

    /*TODO :    -materiau standard
                -multi-materiaux
                -video-texture
                -normal map
                -texture procedurale (feu, nuage...)
    */
	var iceMaterial = new BABYLON.StandardMaterial("iceMaterial",scene);
	iceMaterial.diffuseTexture = new BABYLON.Texture("assets/Ice_001/Ice_001_COLOR.jpg",scene);
	iceMaterial.bumpTexture = new BABYLON.Texture("assets/Ice_001/Ice_001_NRM.jpg",scene);
	iceMaterial.specularTexture = new BABYLON.Texture("assets/Ice_001/Ice_001_SPEC.jpg",scene);
	iceMaterial.lightmapTexture = new BABYLON.Texture("assets/Ice_001/Ice_001_OCC.jpg",scene);
	iceMaterial.useLightmapAsShadowmap = true;
	iceMaterial.useParallax = true;
	iceMaterial.useParallaxOcclusion = true;
	iceMaterial.parallaxScaleBias = 0.2;
	iceMaterial.alpha = 0.5;
	
	var snowMaterial = new BABYLON.StandardMaterial("snowMaterial", scene);
	snowMaterial.diffuseTexture = new BABYLON.Texture("assets/Snow_001_SD/Snow_001_COLOR.jpg",scene);
	snowMaterial.diffuseTexture.uScale = 5;
	snowMaterial.diffuseTexture.vScale = 5;
	snowMaterial.bumpTexture = new BABYLON.Texture("assets/Snow_001_SD/Snow_001_NORM.jpg",scene);
	snowMaterial.bumpTexture.uScale = 5;
	snowMaterial.bumpTexture.vScale = 5;
	snowMaterial.specularTexture = new BABYLON.Texture("assets/Snow_001_SD/SNOW_001_ROUGH.jpg",scene);
	snowMaterial.specularTexture.uScale = 5;
	snowMaterial.specularTexture.vScale = 5;
	snowMaterial.specularPower = 16;
	snowMaterial.emissiveColor = new BABYLON.Color3.White();
	island.material = snowMaterial;
	
	var sandMaterial = new BABYLON.StandardMaterial("sandMaterial", scene);
	sandMaterial.diffuseTexture = new BABYLON.Texture("assets/Sand_002/Sand 002_COLOR.jpg",scene);
	sandMaterial.diffuseTexture.uScale = 5;
	sandMaterial.diffuseTexture.vScale = 5;
	sandMaterial.bumpTexture = new BABYLON.Texture("assets/Sand_002/Sand 002_NRM.jpg",scene);
	sandMaterial.bumpTexture.uScale = 5;
	sandMaterial.bumpTexture.vScale = 5;
	sandMaterial.specularTexture = new BABYLON.Texture("assets/Sand_002/Sand 002_SPEC.jpg",scene);
	sandMaterial.specularTexture.uScale = 5;
	sandMaterial.specularTexture.vScale = 5;
	sandMaterial.specularPower = 16;
	//sandMaterial.emissiveColor = new BABYLON.Color3.White();
	
	var qwarkMaterial = new BABYLON.StandardMaterial("qwarkMaterial", scene);
	qwarkMaterial.diffuseTexture = new BABYLON.Texture("assets/qwark.png",scene);
	
	var greenMaterial  = new BABYLON.StandardMaterial("greenMaterial", scene);
	greenMaterial.diffuseColor = new BABYLON.Color3.Green();

	var multiMat = new BABYLON.MultiMaterial("multi", scene);
	multiMat.subMaterials.push(qwarkMaterial);
	multiMat.subMaterials.push(greenMaterial);
	


	var cloudsMaterial = new BABYLON.StandardMaterial("cloudsMaterial",scene);
	var clouds = new BABYLON.NoiseProceduralTexture("clouds",1024,scene);
	cloudsMaterial.disableLighting = true;
	cloudsMaterial.emissiveColor = new BABYLON.Color3.White();
	clouds.brightness = 0.2;
	clouds.octaves = 8;
	clouds.persistence = 0.8;
	clouds.getAlphaFromRGB = true;
	cloudsMaterial.opacityTexture = clouds;
	
	var lakeMaterial = new BABYLON.StandardMaterial("lakeMaterial",scene);
	var water = new BABYLON.NoiseProceduralTexture("water",1024,scene);
	lakeMaterial.disableLighting = true;
	lakeMaterial.emissiveColor = new BABYLON.Color3(0.9,1,1);
	water.brightness = 0.8;
	water.octaves = 12;
	water.persistence = 0.8;
	lakeMaterial.diffuseTexture = water;
	lakeMaterial.bumpTexture = water;
	
	

    //MESHS ET COLLISIONS

    /*TODO :    -box
                -sphere
                -cylindre
                -tore
                -appliquer les collisions
    */

	
    this.sphere = BABYLON.MeshBuilder.CreateSphere("sphere1", {}, scene);
    this.sphere.position = new BABYLON.Vector3(-2,7,0);
	this.sphere.material = multiMat;
	this.sphere.subMeshes = [];
	var verticesCount = this.sphere.getTotalVertices();
	this.sphere.subMeshes.push(new BABYLON.SubMesh(1, 0, verticesCount, 0,1224, this.sphere));
	this.sphere.subMeshes.push(new BABYLON.SubMesh(0, 0, verticesCount, 1224, 13872-2*1224, this.sphere));
	this.sphere.subMeshes.push(new BABYLON.SubMesh(1, 0, verticesCount, 13872-1224, 1224, this.sphere));
	
	
    var torus = BABYLON.MeshBuilder.CreateTorus("torus", {diameter:18.0, thickness:5}, scene);
    torus.position = new BABYLON.Vector3(0,0,0);
	torus.material = sandMaterial;
	
	var sky = BABYLON.MeshBuilder.CreateDisc("sky", {radius:500.0, sideOrientation:2},scene);
	sky.position = new BABYLON.Vector3(0,200,0);
	sky.rotation = new BABYLON.Vector3(3.1415/2,0,0);
	sky.material = cloudsMaterial;
	
	var lake = BABYLON.MeshBuilder.CreatePlane("lake", {size:1000.0, sideOrientation:2},scene);
	lake.position = new BABYLON.Vector3(0,0,0);
	lake.rotation = new BABYLON.Vector3(3.1415/2,0,0);
	lake.material = lakeMaterial;
	
	
	//Plateformes
	
	this.platforms = [];
	this.t0 = [];
	for(var i=0; i<10 ; i++){
		var p = BABYLON.MeshBuilder.CreateBox("platform" + i.toString(), {size:5.0}, scene);
		p.material = iceMaterial;
		p.rotation.y = Math.random()*6.28;
		p.checkCollisions = true;
		this.platforms.push(p);
		this.t0.push(Math.random()*6.28);
	}
	
	this.platforms[0].position = new BABYLON.Vector3(30,0,0);
	this.platforms[1].position = new BABYLON.Vector3(50,0,10);
	this.platforms[2].position = new BABYLON.Vector3(68,0,31);
	this.platforms[3].position = new BABYLON.Vector3(100,0,40);
	this.platforms[4].position = new BABYLON.Vector3(130,0,0);
	this.platforms[5].position = new BABYLON.Vector3(110,0,-50);
	this.platforms[6].position = new BABYLON.Vector3(90,0, -70);
	this.platforms[7].position = new BABYLON.Vector3(30,0, -70);
	
    //AUDIO

    /*TODO : -sons d'ambiance
              -sons liés à des objets --> le son doit être localisé spatialement
    */
    
    //SKYBOX

    /*TODO : -Créer une (grande) box
             -Un materiau avec une CubeTexture, attention à bien faire correspodre les faces.
    */
    var skybox = BABYLON.MeshBuilder.CreateBox("skybox", {size:1000.0}, scene);
    var skyboxMaterial = new BABYLON.StandardMaterial("skyboxMaterial", scene)
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("assets/skybox", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;

    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skybox.material = skyboxMaterial;	
};

Arena.prototype={

    //ANIMATION
    _animateWorld : function(ratioFps)
    {
		
      // Animation des plateformes (translation, rotation, redimensionnement ...)
		for(var i =0; i < this.platforms.length; i++){
			var move = new BABYLON.Vector3(0,0.01*parseFloat(Math.cos(0.01*this.time+this.t0[i])),0);
			
			switch(i){
				case 4://1ère plateforme mouvante
					move.addInPlace(new BABYLON.Vector3(0,0,0.3*parseFloat(Math.cos(0.01*this.time))));
				break;
				case 7:
					move.addInPlace(new BABYLON.Vector3(0.5*parseFloat(Math.cos(0.015*this.time)),0,0));
			}
			
			
			this.platforms[i].position.addInPlace(move);
			if(this.platforms[i].hasPlayer){
				this.player.camera.playerBox.position.addInPlace(move);
			}
		}
		
		this.sphere.rotation.addInPlace(new BABYLON.Vector3(0.1,0.1,0.1));
		
		this.time++;
    },
	
	_resetPlatformParenting : function()
	{
		for(var i =0; i < this.platforms.length; i++){
			this.platforms[i].hasPlayer = false;
		}
	},
	
}