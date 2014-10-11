var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
scene.add( camera );

var renderer = new THREE.WebGLRenderer( { alpha: true, antialias: true } );
renderer.setClearColor( 0x000000, 0 );
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement );
renderer.domElement.style['position'] = 'fixed';
renderer.domElement.id = 'scenecanvas2';
renderer.domElement.style['top'] = '0';
renderer.domElement.style['left'] = '300px';
renderer.domElement.style['bottom'] = '0';
renderer.domElement.style['right'] = '0';
renderer.domElement.style['z-index'] = '2';
renderer.shadowMapEnabled = true;
renderer.shadowMapType 	  = THREE.PCFSoftShadowMap;
renderer.shadowMapSoft = true;
renderer.shadowCameraNear = 3;
renderer.shadowCameraFar = camera.far;
renderer.shadowCameraFov = 50;
renderer.shadowMapBias = 0.0039;
renderer.shadowMapDarkness = 0.9;
renderer.shadowMapWidth = 1024;
renderer.shadowMapHeight = 1024;

				scene.add( new THREE.AmbientLight( 0x666666, 0.5 ) );

				var directionalLight = new THREE.DirectionalLight(0xeeeeee , 0.8);
				directionalLight.position.set(1,1,1);
				directionalLight.position.normalize();
				scene.add( directionalLight );

				light3 = new THREE.DirectionalLight( 0xFFFFFF , 0.3);
				light3.position.set( 0, -1, 0 ).normalize();
				scene.add( light3 );
				/*light2 = new THREE.DirectionalLight( 0xFFFFFF );
				light2.position.set( 0, 1, 0 ).normalize();
				scene.add( light2 );
				light3 = new THREE.DirectionalLight( 0xFFFFFF );
				light3.position.set( 1, 0, 0 ).normalize();
				scene.add( light3 );
				light4 = new THREE.DirectionalLight( 0xFFFFFF );
				light4.position.set( -1, 0, 0 ).normalize();
				scene.add( light4 );
				light5 = new THREE.DirectionalLight( 0xFFFFFF );
				light5.position.set( 1, -1, 1 ).normalize();
				scene.add( light5 );
/*
				light1.shadowCameraRight     =  5;
				light1.shadowCameraLeft     = -5;
				light1.shadowCameraTop      =  5;
				light1.shadowCameraBottom   = -5;

				light1.castShadow = true;
				
				pointLight = new THREE.PointLight( 0xffaa00 );
				pointLight.position.set(10000, 10000, 10000);
				pointLight.castShadow = true;
				pointLight.shadowDarkness = 0.5;
				scene.add( pointLight );



	var spotLight	= new THREE.SpotLight( 0xFFAA88 );
	spotLight.target.position.set( 0, 2, 0 );
	spotLight.shadowCameraNear	= 0.01;		
	spotLight.castShadow		= true;
	spotLight.shadowDarkness	= 0.5;
	spotLight.shadowCameraVisible	= true;
// console.dir(spotLight)
// spotLight.shadowMapWidth	= 1024;
// spotLight.shadowMapHeight	= 1024;
	scene.add( spotLight );	

  var material = new THREE.MeshLambertMaterial({
        map: THREE.ImageUtils.loadTexture('/res/sand.jpg')
      });*/

  var texture=THREE.ImageUtils.loadTexture('res/sand2.jpg');
  var material=new THREE.MeshLambertMaterial( {
    map: texture,
    wireframe: false,
    overdraw: true
  } );


function str362int(int){
	if(int.charCodeAt(0) >= 48 && int.charCodeAt(0)<= 57){
		return int.charCodeAt(0)-48;
	}else if(int.charCodeAt(0) >= 97 && int.charCodeAt(0) <= 122){
		return int.charCodeAt(0) - 97;
	}
}
function int2str36(int){
	return '0123456789abcdefghijklmnopqrstuvwxyzzzz'.charAt(int);
}

var d3landscape = [];
d3landscape['mountain1'] = '\
0111101010\n\
1221321341\n\
1456434531\n\
0122101231';
d3landscape['mountain2'] = '\
0111101010001010010010101001001\n\
1222221221222232122212121021210\n\
1222323323232322323223222322232\n\
1222323323232322323223222322232\n\
1123455453545343544554433343321\n\
1123455453545343544554433343321\n\
1123455453545343544554433343321\n\
1212122212222111222111212222111\n\
010000100110101010110100110011';
function addLandscapeObject(x,y,name,kz){
	for(var i = 0; i < d3landscape[name].split('\n').length; i++){
		for(var j = 0; j < d3landscape[name].split('\n')[i].length; j++){
			if(str[x+i] !== undefined && str[x+i][y+i] !== undefined){
				if(d3landscape[name].split('\n')[i][j] != '-'){
					str[x+i][y+j] += d3landscape[name].split('\n')[i][j]*kz;
				}else{
					str[x+i][y+j] = null;
				}
			}
		}
	}
}

var str = [];
var tw = 40;
var th = 400;
for(var  i = 0; i < tw; i++){
	str[i] = [];
	for(var j = 0; j < th; j++){
		str[i][j] = Math.pow(Math.cos((i/tw*2)*Math.PI)+1, 2)*18 + rand()*(Math.abs( tw/2 - i )+2)*0.6;
	}
}
/*
for(var i = 0; i < 200; i++){
//	addLandscapeObject(Math.ceil(tw*rand()), Math.ceil(th*rand()), 'mountain2', 0.1);
}
*/
addLandscapeObject(Math.ceil(tw*rand()), Math.ceil(th*rand()), 'mountain2', 0.1);


document.body.onkeyup = function(){
	camera.position.y += 1;
}


function gxy(x,y){
	var s = str[x][y];
	return s;
}


			var loader = new THREE.ColladaLoader();
			//loader.options.convertUpAxis = true;
			var dae;
			loader.load( '/scenic/arka.dae', function ( collada ) {

				dae = collada.scene;
				dae.scale.x = dae.scale.y = dae.scale.z = 0.1;
				dae.position.set(7, th-10, 0)
				dae.updateMatrix();
				scene.add(dae);				
	//			particleLight = new THREE.Mesh( new THREE.SphereGeometry( 4, 8, 8 ), new THREE.MeshBasicMaterial( { color: 0xffffff } ) );
		//		scene.add( particleLight );

			//	scene.add( new THREE.AmbientLight( 0xcccccc ) );

			} );
			
			
var mountainZ = 0.8;
var geom = new THREE.Geometry();
var vec = [];/*
for(var i = 0; i < str.split('\n').length-2; i++){
	for(var j = 0; j < str.split('\n')[i].length-2; j++){*/
for(var i = 0; i < str.length-2; i++){
	for(var j = 0; j < str[i].length-2; j++){
		/*
		vec[vec.length] = new THREE.Vector3(i,   j,   str.split('\n')[i]  [j]  *mountainZ);
		vec[vec.length] = new THREE.Vector3(i+1, j,   str.split('\n')[i+1][j]  *mountainZ);
		vec[vec.length] = new THREE.Vector3(i,   j+1, str.split('\n')[i]  [j+1]*mountainZ);
		vec[vec.length] = new THREE.Vector3(i+1, j,   str.split('\n')[i+1][j]  *mountainZ);
		vec[vec.length] = new THREE.Vector3(i+1, j+1, str.split('\n')[i+1][j+1]*mountainZ);
		vec[vec.length] = new THREE.Vector3(i,   j+1, str.split('\n')[i]  [j+1]*mountainZ);
		*/
		
		if(gxy(i,j) != null && gxy(i+1,j) != null && gxy(i,j+1) != null && gxy(i+1,j+1) != null){
			vec[vec.length] = new THREE.Vector3(i,   j,   gxy(i   , j  )  *mountainZ);
			vec[vec.length] = new THREE.Vector3(i+1, j,   gxy(i+1 , j  )  *mountainZ);
			vec[vec.length] = new THREE.Vector3(i,   j+1, gxy(i   , j+1)  *mountainZ);
			vec[vec.length] = new THREE.Vector3(i+1, j,   gxy(i+1 , j  )  *mountainZ);
			vec[vec.length] = new THREE.Vector3(i+1, j+1, gxy(i+1 , j+1)  *mountainZ);
			vec[vec.length] = new THREE.Vector3(i,   j+1, gxy(i   , j+1)  *mountainZ);
		}

		/*vec[vec.length]   = new THREE.Vector3(i, j,str.split('\n')[i][j]*1);
		vec[vec.length] = new THREE.Vector3(i+1, j,0);
		vec[vec.length] = new THREE.Vector3(i+1, j+1,0);
		vec[vec.length] = new THREE.Vector3(i, j,str.split('\n')[i][j]*1);
		vec[vec.length] = new THREE.Vector3(i+1, j+1,str.split('\n')[i][j]*1);
		vec[vec.length] = new THREE.Vector3(i, j+1,0);
		log(str.split('\n')[i][j]*1);
		
		var v1 = new THREE.Vector3(0,0,0);
		var v2 = new THREE.Vector3(30,0,0);
		var v3 = new THREE.Vector3(30,30,0);*/

	}
}

geom.faceUvs = [[]];
geom.faceVertexUvs = [[]];
for(var i = 0; i < vec.length; i+=3 ){
		geom.vertices.push( vec[i] );
		geom.vertices.push( vec[i+1] );
		geom.vertices.push( vec[i+2] );
		var uvs = [];/*
		uvs.push( new THREE.Vector2(0+i/3,0+i/3));
		uvs.push( new THREE.Vector2(1+i/3,0+i/3));
		uvs.push( new THREE.Vector2(1+i/3,1+i/3));*/
		uvs.push( new THREE.Vector2(0,0));
		uvs.push( new THREE.Vector2(0.3,0));
		uvs.push( new THREE.Vector2(0.3,0.3));
		geom.faces.push( new THREE.Face3( i, i+1, i+2 ) );
		geom.faceVertexUvs[0].push([ uvs[0], uvs[1], uvs[2] ]);
		//geom.faces.push( new THREE.Face3( vec[i], vec[i+1], vec[i+2] ) );
}
//geom.computeCentroids();
geom.computeFaceNormals();
geom.computeVertexNormals();

for(var i = 0; i < vec.length/3; i++){
geom.faces.material = material;
geom.faces.castShadow = true;
geom.faces.receiveShadow = true;

}


geom.computeFaceNormals();
geom.computeVertexNormals();
geom.dynamic = true
geom.__dirtyVertices = true;
geom.__dirtyNormals = true;


/* Flip normals*/               
for(var i = 0; i< geom.faces.length; i++) {
    geom.faces[i].normal.x = -1*geom.faces[i].normal.x;
    geom.faces[i].normal.y = -1*geom.faces[i].normal.y;
    geom.faces[i].normal.z = -1*geom.faces[i].normal.z;
}
/*
		var v1 = new THREE.Vector3(0,0,0);
		var v2 = new THREE.Vector3(30,0,0);
		var v3 = new THREE.Vector3(30,30,0);
		* /*/

camera.position.z = 5;
camera.position.x = str.length/2;
camera.position.y = 200;
camera.rotation.x = 1.6;

geom.computeFaceNormals();
//obj.material.map = texture

var mesh= new THREE.Mesh( geom, material);
     // obj.material.map = texture
scene.add(mesh); 

 
function render() {

	renderer.render( scene, camera );

}

function animate() {
	requestAnimationFrame( animate );
	render();

}
setInterval(function(){
	if(camera.position.y<340){
		camera.position.y += 0.04 + Math.abs(0.2*Math.sin(game['timestamp']*12));
		camera.position.z += 0.06*Math.sin(game['timestamp']*12);
	}
}, 100);
			
/*new THREE.MeshNormalMaterial()*/
setInterval('render();', 100);
 
