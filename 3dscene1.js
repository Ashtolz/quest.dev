/*var sc = [];
sc['scene'] = new THREE.Scene();
sc['camera'] = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
sc['camera'].position.x = 0;
sc['camera'].position.y = 200;
sc['camera'].position.z = 5;
sc['camera'].rotation.x = 1.6;
sc['camera'] = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
sc['renderer'] = new THREE.WebGLRenderer( { alpha: true, antialias: true } );
sc['renderer'].setClearColor( 0x000000, 0 );
sc['renderer'].setSize(window.innerWidth, window.innerHeight);

	sc['scene'].add(sc['camera']);
sc['renderer'].setSize(window.innerWidth, window.innerHeight);
document.body.appendChild( sc['renderer'].domElement );
sc['renderer'].domElement.style['position'] = 'fixed';
sc['renderer'].domElement.id = 'scenecanvas';
sc['renderer'].domElement.style['top'] = '0';
sc['renderer'].domElement.style['left'] = '0';
sc['renderer'].domElement.style['bottom'] = '0';
sc['renderer'].domElement.style['right'] = '0';
sc['renderer'].domElement.style['z-index'] = '9';
sc['scenic'] = [];
sc['scenic_count'] = 1;


function loadSceneModel(src, name, x,y,z, scalex, scaley, scalez){
	var loader = new THREE.ColladaLoader();
	loader.load( src, function ( collada ) {
		sc['scenic'][name] = collada.scene;
		sc['scenic'][name].scale.x = scalex;
		sc['scenic'][name].scale.y = scaley;
		sc['scenic'][name].scale.z = scalez;
		sc['scenic'][name].position.set(x, y, z);
		sc['scenic'][name].updateMatrix();
		sc['scene'].add(sc['scenic'][name]);
	} );
}

function renderScene(){
	sc['renderer'].render(sc['scene'], sc['camera']);
}
sc['onload'] = function(){		
	/*var loader = new THREE.ColladaLoader();
	loader.load( '/scenic/arka.dae', function ( collada ) {
		sc['scenic']['arka'] = collada.scene;
		sc['scenic']['arka'].scale.x = sc['scenic']['arka'].scale.y = sc['scenic']['arka'].scale.z = 0.1;
		sc['scenic']['arka'].position.set(7, 390, 0);
		sc['scenic']['arka'].updateMatrix();
		sc['scene'].add(sc['scenic']['arka']);
	} );
	loadSceneModel('/scenic/arka.dae', 'arka', 7 , 290 , 0 , 0.1 , 0.1 , 0.1);
}
sc['onload']();
setInterval('renderScene()', 1000);
*/