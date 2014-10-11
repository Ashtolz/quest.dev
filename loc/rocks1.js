l['title'] = '';
l['text'] = [];
l['text'][0] = 'Отсюда они не кажутся такими высокими...';
l['text'][1] = 'Вероятно, я смогу пройти насквозь.';
l['text'][2] = 'Надо подойти ближе.';
l['text'][3] = '...';
l['text'][4] = 'Это мост.';
l['text'][5] = 'Значит, здесь неподалеку есть люди.';
l['text'][6] = '...';
l['text'][7] = 'Слышу какой-то звук.';
l['text'][8] = 'Что-то движется сюда.';
l['text'][9] = '...';
l['text'][10] = 'Поезд!';
l['text'][11] = 'Я спасен.';
l['next'] = 'first';
l['img'] = 'res/rocks.jpg';
l['rain'] = 0;
l['audio'] = 'scene2';
l['compass'] = 0.3;

l['onload'] = function(){

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
sc['camera'] = new THREE.PerspectiveCamera( 40, f['w'] / f['h'], 1, 1000 );
sc['scene'].fog = new THREE.FogExp2( 0xefd1b5, 0.001 );

sc['camera_y_shift'] = 1.6;
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
sc['renderer'].shadowMapSoft = true;
sc['renderer'].shadowCameraNear = 3;
sc['renderer'].shadowCameraFar = sc['camera'].far;
sc['renderer'].shadowCameraFov = 50;
sc['renderer'].shadowMapBias = 0.0039;
sc['renderer'].shadowMapDarkness = 0.9;
sc['renderer'].shadowMapWidth = 1024;
sc['renderer'].shadowMapHeight = 1024;
sc['scene'].add( new THREE.AmbientLight( 0xFFFFFF, 0) );
sc['texture_sand'] = THREE.ImageUtils.loadTexture('res/sand.jpg?q='+Math.random());
sc['material_sand'] = new THREE.MeshLambertMaterial( {
	map: sc['texture_sand'],
	wireframe: false,
	overdraw: true
 } );
sc['landscape_map'] = '\
989887897788989789879898989\n\
342342342344234432443424678\n\
000000000000002000500000146\n\
210002200066001610466500125\n\
001003450470000100000000135\n\
003203000000090000000000125\n\
000004000000000000000000135\n\
000000000000000000000000145\n\
000000000000000000000000125\n\
000000000000000000000000145\n\
000000000000000000000000145\n\
000000000000000000000000000';
sc['l'] = [];
sc['lw'] = 200;
sc['lh'] = 200;
for(var  i = 0; i < sc['lw']; i++){
	sc['l'][i] = [];
	for(var j = 0; j < sc['lh']; j++){
		sc['l'][i][j] = 0;//Math.cos((i/sc['lw']*2)*Math.PI)*20; 
	}
}

loadLandscapeMap(sc['landscape_map'],'mountain2',10);
//softenMap82();
softenMap8();
//softenMap4();
//softenMap4();
randomize(1);
/*
for(var i = 0; i < 2000; i++){
addLandscapeObject(Math.ceil(sc['lw']*rand()), Math.ceil(sc['lh']*rand()), 'mountain2', 0.5);
}*/

//addLandscapeObject(0, 300, 'm2', 30);


sc['scenic'] = [];
sc['scenic']['stone'] = [];
sc['scenic']['stone']['loader'] = new THREE.ColladaLoader();
sc['scenic']['stone']['loader'].load( '/scenic/stone3.dae?q='+Math.random(), function ( collada ) {
	sc['scenic']['stone']['model'] = collada.scene;
	sc['scenic']['stone']['model'].scale.x = 0.2;
	sc['scenic']['stone']['model'].scale.y = 0.2;
	sc['scenic']['stone']['model'].scale.z = 0.1;
	sc['scenic']['stone']['model'].castShadow = true;
	sc['scenic']['stone']['model'].receiveShadow = true;
	sc['scenic']['stone']['model'].position.set(38, 20, 0)
	sc['scenic']['stone']['model'].updateMatrix();
	sc['scene'].add(sc['scenic']['stone']['model']);
} );
sc['scenic']['stone2'] = [];
sc['scenic']['stone2']['loader'] = new THREE.ColladaLoader();
sc['scenic']['stone2']['loader'].load( '/scenic/stone3.dae?q='+Math.random(), function ( collada ) {
	sc['scenic']['stone2']['model'] = collada.scene;
	sc['scenic']['stone2']['model'].scale.x = 0.2;
	sc['scenic']['stone2']['model'].scale.y = 0.1;
	sc['scenic']['stone2']['model'].scale.z = 0.15;
	sc['scenic']['stone2']['model'].castShadow = true;
	sc['scenic']['stone2']['model'].receiveShadow = true;
	sc['scenic']['stone2']['model'].position.set(47, 30, 0)
	sc['scenic']['stone2']['model'].updateMatrix();
	sc['scene'].add(sc['scenic']['stone2']['model']);
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
		krd = 0.6 + Math.random()*0.4;
		uvs.push( new THREE.Vector2(0,0));
		uvs.push( new THREE.Vector2(krd,0));
		uvs.push( new THREE.Vector2(krd,krd));
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
sc['mesh'] = new THREE.Mesh( sc['geom'], sc['material_sand']);
sc['mesh'].receiveShadow = true;
sc['mesh'].castShadow = true;
   
sc['scene'].add(sc['mesh']); 

///////////////////










sc['camera'].position.z = 4;
sc['camera'].position.x = 43
sc['camera'].position.y = 0;
sc['camera'].rotation.x = 1.6;

sc['camera_rotation_y'] = 0;
sc['camera_rotation_z'] = 0;
sc['camera_rotation_x'] = 1.6;
sc['camera_position_y'] = 0;
sc['camera_position_z'] = 10;
sc['camera_position_x'] = sc['l'].length/2;

sc['3drender'] = function() {
	sc['renderer'].render( sc['scene'], sc['camera'] );
	if(sc['camera'].position.y < 210 && game['turn'] <= 3){
	//	sc['camera'].position.y += 0.1;// (250-sc['camera'].position.y)*0.5;
	}
	if(sc['camera'].position.y < 209 && game['turn'] >= 4){
	//	sc['camera'].position.y += (209-sc['camera'].position.y)*0.05;
	}
	if( game['turn'] >= 9){
	//	sc['scenic']['train']['model'].position.x -= 5;	
	}
	if(g['imageAnimation'] != 0){
	//	sc['camera'].position.y += g['imageAnimation']/10;
	}
	//sc['directionalLight'].position.x = Math.sin(game['timestamp'])*10;
	//sc['directionalLight'].position.y = Math.cos(game['timestamp'])*10;
}


    sc['fog_geometry'] = new THREE.PlaneGeometry(160, 500);
    sc['fog_material05'] = new THREE.MeshLambertMaterial({ color: 0xefd1b5, opacity: 0.7, transparent: true });
   
    sc['fog1'] = new THREE.Mesh(sc['fog_geometry'], sc['fog_material05']);
    sc['fog1'].position.z = 4.5;
    sc['fog1'].position.y = 100;
    sc['fog1'].receiveShadow = true;
  //  sc['scene'].add(sc['fog1']);

sc['directionalLight'] = new THREE.DirectionalLight(0xffffff, 0.1);
sc['directionalLight'].castShadow = true;
sc['directionalLight'].receiveShadow = true;
sc['directionalLight'].shadowCameraVisible = true;
sc['directionalLight'].shadowCameraNear = 100;
sc['directionalLight'].shadowDarkness= 0.3;
sc['directionalLight'].shadowCameraFar = 1000;
sc['directionalLight'].shadowCameraLeft = -1000; 
sc['directionalLight'].shadowCameraRight = 1000;
sc['directionalLight'].shadowCameraTop = 200;
sc['directionalLight'].shadowCameraBottom = -100;
sc['directionalLight'].position.x = 200;
sc['directionalLight'].position.y = 10;
sc['directionalLight'].position.z = 10;
sc['scene'].add(sc['directionalLight']);

postLoad();
 
