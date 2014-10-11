l['title'] = '';
l['text'] = [];
l['text'][0] = 'Вот и выход отсюда.';
l['text'][1] = 'В конце ущелья какое-то строение.';
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
				//sc['scene'].fog = new THREE.Fog( 0x777777, 1, 800 );

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
sc['scene'].add( new THREE.AmbientLight( 0xFFFFFF, 0) );
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
sc['lh'] = 400;
for(var  i = 0; i < sc['lw']; i++){
	sc['l'][i] = [];
	for(var j = 0; j < sc['lh']; j++){
		sc['l'][i][j] = Math.pow(Math.cos((i/sc['lw']*2)*Math.PI)+1, 2)*40 + rand()*Math.pow(Math.abs( sc['lw']/2 - i),2)*0.01;
	}
}
for(var i = 0; i < 1000; i++){
addLandscapeObject(Math.ceil(sc['lw']*rand()), Math.ceil(sc['lh']*rand()), 'mountain2', 0.2);
}

addLandscapeObject(20, 300, 'mountain2', -30);
addLandscapeObject(10, 330, 'mountain2', -30);
addLandscapeObject(10, 350, 'm2', -30);
addLandscapeObject(30, 350, 'm2', -30);
//addLandscapeObject(0, 300, 'm2', 30);

sc['scenic'] = [];
sc['scenic']['arka'] = [];
sc['scenic']['arka']['loader'] = new THREE.ColladaLoader();
sc['scenic']['arka']['loader'].load( '/scenic/arka.dae?q='+Math.random(), function ( collada ) {
	sc['scenic']['arka']['model'] = collada.scene;
	sc['scenic']['arka']['model'].scale.x = 0.18;
	sc['scenic']['arka']['model'].scale.y = 0.2;
	sc['scenic']['arka']['model'].scale.z = 0.2;
	sc['scenic']['arka']['model'].castShadow = true;
	sc['scenic']['arka']['model'].receiveShadow = true;
	sc['scenic']['arka']['model'].position.set(16, sc['lh']-65, 0)
	sc['scenic']['arka']['model'].updateMatrix();
	sc['scene'].add(sc['scenic']['arka']['model']);
} );
sc['scenic']['train'] = [];
sc['scenic']['train']['loader'] = new THREE.ColladaLoader();
sc['scenic']['train']['loader'].load( '/scenic/train2.dae', function ( collada ) {
	sc['scenic']['train']['model'] = collada.scene;
	sc['scenic']['train']['model'].scale.x = 0.2;
	sc['scenic']['train']['model'].scale.y = 0.2;
	sc['scenic']['train']['model'].scale.z = 0.2;
	sc['scenic']['train']['model'].castShadow = true;
	sc['scenic']['train']['model'].receiveShadow = true;
	sc['scenic']['train']['model'].position.set(80, sc['lh']-60, 34)
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
sc['mesh'].receiveShadow = true;
sc['mesh'].castShadow = true;
   
sc['scene'].add(sc['mesh']); 

///////////////////















sc['geom2'] = new THREE.Geometry();
sc['vec2'] = [];

for(var i = 0; i < sc['l'].length-2 -10; i++){
	for(var j = 0; j < sc['l'][i].length-1; j++){
		for(var k = 0; k < 5; k++){
			if(gxy(i,j) != null && gxy(i+1,j) != null && gxy(i,j+1) != null && gxy(i+1,j+1) != null){
				ti = i+rad();
				tj = j+rad();
				sc['vec2'][sc['vec2'].length] = new THREE.Vector3(ti+rad()*0.2,    tj+rad()*0.2,  gxy(i   , j  )            );
				sc['vec2'][sc['vec2'].length] = new THREE.Vector3(ti+rad()*0.2,    tj+rad()*0.2,  gxy(i+1 , j  )            );
				sc['vec2'][sc['vec2'].length] = new THREE.Vector3(ti+rad()*0.2,    tj+rad()*0.2,  gxy(i   , j+1)  +rad()*0.4);
				sc['vec2'][sc['vec2'].length] = new THREE.Vector3(ti+rad()*0.2,    tj+rad()*0.2,  gxy(i+1 , j  )            );
				sc['vec2'][sc['vec2'].length] = new THREE.Vector3(ti+rad()*0.2,    tj+rad()*0.2,  gxy(i , j+1  )            );
				sc['vec2'][sc['vec2'].length] = new THREE.Vector3(ti+rad()*0.2,    tj+rad()*0.2,  gxy(i   , j+1)  +rad()*0.4);
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

sc['camera'].position.z = 12;
sc['camera'].position.x = sc['l'].length/2;
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
		sc['camera'].position.y += 0.1;// (250-sc['camera'].position.y)*0.5;
	}
	if(sc['camera'].position.y < 209 && game['turn'] >= 4){
		sc['camera'].position.y += (209-sc['camera'].position.y)*0.05;
	}
	if( game['turn'] >= 9){
		sc['scenic']['train']['model'].position.x -= 5;	
	}
	if(g['imageAnimation'] != 0){
		sc['camera'].position.y += g['imageAnimation']/10;
	}
}


    sc['fog_geometry'] = new THREE.PlaneGeometry(160, 500);
    sc['fog_material05'] = new THREE.MeshLambertMaterial({ color: 0xAAAAAA, opacity: 0.07, transparent: true });
   
    sc['fog1'] = new THREE.Mesh(sc['fog_geometry'], sc['fog_material05']);
    sc['fog1'].position.z = 4.5;
    sc['fog1'].position.y = 100;
    sc['fog1'].receiveShadow = true;
    sc['scene'].add(sc['fog1']);

sc['directionalLight'] = new THREE.DirectionalLight(0xffffff, 1);
sc['directionalLight'].castShadow = true;
sc['directionalLight'].receiveShadow = true;
//sc['directionalLight'].shadowCameraVisible = true;
sc['directionalLight'].shadowCameraNear = 0;
sc['directionalLight'].shadowDarkness= 10;
sc['directionalLight'].shadowCameraFar = 20000;
sc['directionalLight'].shadowCameraLeft = -2000; 
sc['directionalLight'].shadowCameraRight = 2000;
sc['directionalLight'].shadowCameraTop = 2000;
sc['directionalLight'].shadowCameraBottom = -2000; 
sc['directionalLight'].position.set(-20,600,300);
sc['scene'].add(sc['directionalLight']);
//sc['scene'].add( new THREE.DirectionalLightHelper(light, 0.2) );

postLoad();
 
