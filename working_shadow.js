l['title'] = '';
l['text'] = [];
l['text'][0] = 'Кажется, через это ущелье можно пройти горы насквозь.';
l['text'][1] = 'Да, я уже вижу, где они кончаются.';
l['text'][2] = 'Но что это там?';
l['text'][3] = 'Похоже на дом.';
l['text'][4] = 'Надо подойти ближе.';
l['text'][5] = '...';
l['text'][6] = 'Это всего лишь старый мост.';
l['text'][7] = 'Надо что-то делать!..';
l['next'] = 'first';
l['img'] = 'res/rocks.jpg';
l['rain'] = 1400;
l['audio'] = 'scene2';
l['compass'] = 0.3;
l['routes'] = [];
l['routes']['text'] = '1 - Соснуть хуйца <br>2 - Сделать бочку';
l['routes'][1] = 'rocks';
l['routes'][2] = 'eart';
l['routes'][3] = 'first';

l['onload'] = function(){
	for(var i = 0; i < 8; i++){
		g['birds']['addPoint'](f['w']*0.7+ rand()*f['w']*0.2, f['h']*0.2+ rand()*f['h']*0.2, 100+f['w']*rand()*0.1, 10+ rand()*60 , rand()*10  , 0.5+rand()*2);
	}
}

l['func'] = [];
l['func'][1] = function(){
	l['rain'] = 0;
}


//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

 sc=[];
sc['scene'] = new THREE.Scene();
sc['camera'] = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );

//scene.add( camera );
sc['renderer'] = new THREE.WebGLRenderer( { alpha: true, antialias: true } );
sc['renderer'].setClearColor( 0x000000, 0 );
sc['renderer'].setSize(f['w'], f['h']);
document.body.appendChild( sc['renderer'].domElement );
sc['renderer'].domElement.style['position'] = 'fixed';
sc['renderer'].domElement.id = 'scenecanvas2';
sc['renderer'].domElement.style['top'] = '0';
sc['renderer'].domElement.style['left'] = '0';
sc['renderer'].domElement.style['bottom'] = '0';
sc['renderer'].domElement.style['right'] = '0';
sc['renderer'].domElement.style['z-index'] = '5';
sc['renderer'].shadowMapEnabled = true;
sc['renderer'].shadowMapType 	  = THREE.PCFSoftShadowMap;
sc['renderer'].shadowMapSoft = false;
sc['renderer'].shadowCameraNear = 3;
sc['renderer'].shadowCameraFar = sc['camera'].far;
sc['renderer'].shadowCameraFov = 50;
sc['renderer'].shadowMapBias = 0.0039;
sc['renderer'].shadowMapDarkness = 0.9;
sc['renderer'].shadowMapWidth = 1024;
sc['renderer'].shadowMapHeight = 1024;
sc['scene'].add( new THREE.AmbientLight( 0x666666, 0.8 ) );
/*
directionalLight = new THREE.DirectionalLight(0xeeeeee , 0.8);
directionalLight.position.set(-60,20,100);
directionalLight.position.normalize();
directionalLight.castShadow = true;
directionalLight.shadowCameraVisible = true;
directionalLight.shadowCameraNear = 1;
directionalLight.shadowCameraFar = 20000;
directionalLight.shadowCameraLeft = -2000; // CHANGED
directionalLight.shadowCameraRight = 2000; // CHANGED
directionalLight.shadowCameraTop = 2000; // CHANGED
directionalLight.shadowCameraBottom = -2000; // CHANGED
sc['scene'].add( directionalLight );
sc['scene'].add( new THREE.DirectionalLightHelper(directionalLight, 0.2) );*/

light3 = new THREE.DirectionalLight( 0xFFFFFF , 0.5);
light3.position.set( 0, -1, 0 ).normalize();
sc['scene'].add( light3 );
sc['texture_grass'] = THREE.ImageUtils.loadTexture('res/grass.png?q='+Math.random());
sc['material_grass'] = new THREE.MeshLambertMaterial( {
    map: sc['texture_grass'],
    wireframe: false,
    overdraw: true
  } );
sc['texture_grass_light'] = THREE.ImageUtils.loadTexture('res/grass_light.png?q='+Math.random());
sc['material_grass_light'] = new THREE.MeshLambertMaterial( {
    map: sc['texture_grass_light'],
    wireframe: false,
    overdraw: true
  } );
sc['l'] = [];
sc['lw'] = 80;
sc['lh'] = 600;
for(var  i = 0; i < sc['lw']; i++){
	sc['l'][i] = [];
	for(var j = 0; j < sc['lh']; j++){
		sc['l'][i][j] = Math.pow(Math.cos((i/sc['lw']*2)*Math.PI)+1, 2)*40 + rand()*Math.pow(Math.abs( sc['lw']/2 - i),2)*0.01;
	}
}
for(var i = 0; i < 1000; i++){
addLandscapeObject(Math.ceil(sc['lw']*rand()), Math.ceil(sc['lh']*rand()), 'mountain2', 0.1);
}


sc['scenic'] = [];
sc['scenic']['arka'] = [];
sc['scenic']['arka']['loader'] = new THREE.ColladaLoader();
sc['scenic']['arka']['loader'].load( '/scenic/arka.dae?q='+Math.random(), function ( collada ) {
	sc['scenic']['arka']['model'] = collada.scene;
	sc['scenic']['arka']['model'].scale.x = 0.2;
	sc['scenic']['arka']['model'].scale.y = 0.2;
	sc['scenic']['arka']['model'].scale.z = 0.2;
	sc['scenic']['arka']['model'].position.set(14, sc['lh']-45, 0)
	sc['scenic']['arka']['model'].updateMatrix();
	sc['scene'].add(sc['scenic']['arka']['model']);
} );
sc['scenic']['train'] = [];
sc['scenic']['train']['loader'] = new THREE.ColladaLoader();
sc['scenic']['train']['loader'].load( '/scenic/train.dae', function ( collada ) {
	sc['scenic']['train']['model'] = collada.scene;
	sc['scenic']['train']['model'].scale.x = 0.2;
	sc['scenic']['train']['model'].scale.y = 0.2;
	sc['scenic']['train']['model'].scale.z = 0.2;
	sc['scenic']['train']['model'].castShadow = true;
	sc['scenic']['train']['model'].receiveShadow = true;
	sc['scenic']['train']['model'].position.set(80, sc['lh']-40, 40)
	sc['scenic']['train']['model'].updateMatrix();
	sc['scene'].add(sc['scenic']['train']['model']);
} );

sc['landscape_height_k'] = 0.8;
sc['geom'] = new THREE.Geometry();
sc['vec'] = [];
for(var i = 0; i < sc['l'].length-2; i++){
	for(var j = 0; j < sc['l'][i].length-2; j++){
		if(gxy(i,j) != null && gxy(i+1,j) != null && gxy(i,j+1) != null && gxy(i+1,j+1) != null){
			sc['vec'][sc['vec'].length] = new THREE.Vector3(i,   j,   gxy(i   , j  )  * sc['landscape_height_k']);
			sc['vec'][sc['vec'].length] = new THREE.Vector3(i+1, j,   gxy(i+1 , j  )  * sc['landscape_height_k']);
			sc['vec'][sc['vec'].length] = new THREE.Vector3(i,   j+1, gxy(i   , j+1)  * sc['landscape_height_k']);
			sc['vec'][sc['vec'].length] = new THREE.Vector3(i+1, j,   gxy(i+1 , j  )  * sc['landscape_height_k']);
			sc['vec'][sc['vec'].length] = new THREE.Vector3(i+1, j+1, gxy(i+1 , j+1)  * sc['landscape_height_k']);
			sc['vec'][sc['vec'].length] = new THREE.Vector3(i,   j+1, gxy(i   , j+1)  * sc['landscape_height_k']);
		}
	}
}

/*
*/
sc['geom'].faceUvs = [[]];
sc['geom'].faceVertexUvs = [[]];
for(var i = 0; i < sc['vec'].length; i+=3 ){
		sc['geom'].vertices.push( sc['vec'][i] );
		sc['geom'].vertices.push( sc['vec'][i+1] );
		sc['geom'].vertices.push( sc['vec'][i+2] );
		uvs = [];
		uvs.push( new THREE.Vector2(0,0));
		uvs.push( new THREE.Vector2(1,0));
		uvs.push( new THREE.Vector2(1,1));
		sc['geom'].faces.push( new THREE.Face3( i, i+1, i+2 ) );
		sc['geom'].faceVertexUvs[0].push([ uvs[0], uvs[1], uvs[2] ]);
		//geom.faces.push( new THREE.Face3( vec[i], vec[i+1], vec[i+2] ) );
}
sc['geom'].computeFaceNormals();
sc['geom'].computeVertexNormals();


sc['geom'].dynamic = true
sc['geom'].__dirtyVertices = true;
sc['geom'].__dirtyNormals = true;

for(var i = 0; i< sc['geom'].faces.length; i++) {
    sc['geom'].faces[i].normal.x = -1*sc['geom'].faces[i].normal.x;
    sc['geom'].faces[i].normal.y = -1*sc['geom'].faces[i].normal.y;
    sc['geom'].faces[i].normal.z = -1*sc['geom'].faces[i].normal.z;
}
sc['geom'].computeFaceNormals();
sc['mesh'] = new THREE.Mesh( sc['geom'], sc['material_grass_light']);
sc['mesh'].castShadow = true;
//sc['mesh'].receiveShadow = true;
sc['scene'].add(sc['mesh']); 

///////////////////

















sc['geom2'] = new THREE.Geometry();
sc['vec2'] = [];

for(var i = 15; i < sc['l'].length-2 -15; i++){
	for(var j = 400; j < sc['l'][i].length-20; j++){
		for(var k = 0; k < 5; k++){
			if(gxy(i,j) != null && gxy(i+1,j) != null && gxy(i,j+1) != null && gxy(i+1,j+1) != null){
				ti = i+rad();
				tj = j+rad();
				sc['vec2'][sc['vec2'].length] = new THREE.Vector3(ti+rad()*0.2,    tj+rad()*0.2,  gxy(i   , j  ) + (rand()+0.5)*0.1 );
				sc['vec2'][sc['vec2'].length] = new THREE.Vector3(ti+rad()*0.2,    tj+rad()*0.2,  gxy(i+1 , j  ) + (rand()+0.5)*0.1);
				sc['vec2'][sc['vec2'].length] = new THREE.Vector3(ti+rad()*0.2,    tj+rad()*0.2,  gxy(i   , j+1) + (rand()+0.5)*0.1);
				sc['vec2'][sc['vec2'].length] = new THREE.Vector3(ti+rad()*0.2,    tj+rad()*0.2,  gxy(i+1 , j  ) + (rand()+0.5)*0.1);
				sc['vec2'][sc['vec2'].length] = new THREE.Vector3(ti+rad()*0.2,    tj+rad()*0.2,  gxy(i+1 , j+1) + (rand()+0.5)*0.1);
				sc['vec2'][sc['vec2'].length] = new THREE.Vector3(ti+rad()*0.2,    tj+rad()*0.2,  gxy(i   , j+1) + (rand()+0.5)*0.1);
			}
		}
	}
}
sc['geom2'].faceUvs = [[]];
sc['geom2'].faceVertexUvs = [[]];
for(var i = 0; i < sc['vec2'].length; i+=3 ){
		sc['geom2'].vertices.push( sc['vec2'][i] );
		sc['geom2'].vertices.push( sc['vec2'][i+1] );
		sc['geom2'].vertices.push( sc['vec2'][i+2] );
		uvs = [];
		uvs.push( new THREE.Vector2(0,0));
		uvs.push( new THREE.Vector2(0.3,0));
		uvs.push( new THREE.Vector2(0.3,0.3));
		sc['geom2'].faces.push( new THREE.Face3( i, i+1, i+2 ) );
		sc['geom2'].faceVertexUvs[0].push([ uvs[0], uvs[1], uvs[2] ]);
}
sc['geom2'].computeFaceNormals();
sc['geom2'].computeVertexNormals();



sc['geom2'].dynamic = true
sc['geom2'].__dirtyVertices = true;
sc['geom2'].__dirtyNormals = true;

for(var i = 0; i< sc['geom2'].faces.length; i++) {
    sc['geom2'].faces[i].normal.x = -1*sc['geom2'].faces[i].normal.x;
    sc['geom2'].faces[i].normal.y = -1*sc['geom2'].faces[i].normal.y;
    sc['geom2'].faces[i].normal.z = -1*sc['geom2'].faces[i].normal.z;
}
sc['geom2'].computeFaceNormals();
sc['mesh2'] = new THREE.Mesh( sc['geom2'], sc['material_grass']);
sc['mesh2'].castShadow = true;
sc['mesh2'].receiveShadow = true;
sc['scene'].add(sc['mesh2']); 












sc['camera'].position.z = 100;
sc['camera'].position.x = 0;//sc['l'].length/2;
sc['camera'].position.y = 0;
sc['camera'].rotation.x = 0;//1.6;

sc['camera_rotation_y'] = 0;
sc['camera_rotation_z'] = 0;
sc['camera_rotation_x'] = 0;//1.6;
sc['camera_positioin_y'] = 0;
sc['camera_positioin_z'] = 100;
sc['camera_positioin_x'] = 0;//sc['l'].length/2;

 
sc['3drender'] = function() {
	sc['renderer'].render( sc['scene'], sc['camera'] );
if(sc['camera'].position.y<400){
	//	sc['camera'].position.y += 9.1;// 0.04 + Math.abs(0.2*Math.sin(game['timestamp']*12));
		//sc['camera'].position.z += 0.06*Math.sin(game['timestamp']*12);
	}else{
		//sc['scenic']['train']['model'].position.x -= 0.1;
	}
}
/*
function animate() {
	requestAnimationFrame( animate );
	render();

}*/
/*new THREE.MeshNormalMaterial()*/
//sc['3drender_timer'] = setInterval('sc["3drender"]();', 40);
 

var camera, scene, renderer;
var cubes = [];

init();
animate();
var light, terrain;
function init() {

   // scene = new THREE.Scene();
    //scene.add(new THREE.AmbientLight(0x212223));

    for (var i = 0; i < 10; i++) {
        var cubeGeometry = new THREE.CubeGeometry(1, 1.5, 1);
        var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0x1ec876 });
        var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube.position.set(i*1.2, 0, 0.5);
        cube.castShadow = true;
        sc['scene'].add(cube);
        cubes.push(cube);
    }

  //  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000); // CHANGED
   // camera.position.x = 0; // CHANGED
    //camera.position.y = 0; // CHANGED
    //camera.position.z = 100; // CHANGED
//    camera.lookAt(cubes[5].position);
   // sc['scene'].add(camera); // not required

    var terrainGeo = new THREE.PlaneGeometry(50, 50);
    var terrainMaterial = new THREE.MeshLambertMaterial({ color: 0xc0c0a0 });
    var terrain = new THREE.Mesh(terrainGeo, terrainMaterial);
    terrain.position.z = - 10; // CHANGED
    terrain.receiveShadow = true;
    sc['scene'].add(terrain);

    light = new THREE.DirectionalLight(0xffffff, 1);
    light.castShadow = true;
    light.shadowCameraVisible = true;
	light.shadowCameraNear = 1;
	light.shadowCameraFar = 20000;
    light.shadowCameraLeft = -20; // CHANGED
	light.shadowCameraRight = 20; // CHANGED
	light.shadowCameraTop = 20; // CHANGED
	light.shadowCameraBottom = -35; // CHANGED

    light.position.set(-60, 20, 100); // CHANGED
    sc['scene'].add(light);
    sc['scene'].add( new THREE.DirectionalLightHelper(light, 0.2) );

   /* renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;
    renderer.shadowMapSoft = false;
    document.body.appendChild(renderer.domElement);
*/
	// controls
	//controls = new THREE.OrbitControls( camera, renderer.domElement );

}

function animate() {
    requestAnimationFrame(animate);
    for (var i = 0; i < cubes.length; i++) {
        cubes[i].rotation.x += 0.01 * i;
        cubes[i].rotation.y += 0.02 * i;
      //  light.position.x+=0.01;
    }

    //renderer.render(scene, camera);
}
postLoad();
 
