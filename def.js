var f    = [];  //window parameters & other
var game = [];  //global game
var l    = [];  //current level
var c    = []   //config
var g    = [];  //graphics
var sc = null;  //3d scene
game['name'] = ''; 
game['paused'] = true;
game['turn'] = 0;
game['timestamp'] = 0;
game['typing'] = 0;
game['inputTimestamp'] = 0;
var ctx, cTimer, bTimer;
g['rain'] = 0;
g['offsetX'] = 0;
g['offsetY'] = 0;
g['screenOffsetX'] = 0;
g['screenOffsetY'] = 0;
g['screenOffsetW'] = 0;
g['screenOffsetH'] = 0;
g['blackoutstatus'] = 0;
g['blackoutColor'] = '#000';
g['rainIntensivity'] = 1;
g['imageAnimation'] = 0;
g['smoke'] = [];
g['smoke']['points'] = [];
g['smoke']['addPoint'] = function(x,y,size, style){
	g['smoke']['points'][g['smoke']['points'].length] = [];
	g['smoke']['points'][g['smoke']['points'].length-1]['fx'] = x;
	g['smoke']['points'][g['smoke']['points'].length-1]['fy'] = y;
	g['smoke']['points'][g['smoke']['points'].length-1]['size'] = size;
	g['smoke']['points'][g['smoke']['points'].length-1]['style'] = style;
}
g['smoke']['clear'] = function(){
	g['smoke']['points'] = null;
	g['smoke']['points'] = [];
}

g['birds'] = [];
g['birds']['points'] = [];
g['birds']['addPoint'] = function(x,y, w,h, t, speed){
	if(speed === undefined){
		speed=0.1;
	}
	g['birds']['points'][g['birds']['points'].length] = [];
	g['birds']['points'][g['birds']['points'].length-1]['x'] = x;
	g['birds']['points'][g['birds']['points'].length-1]['y'] = y;
	g['birds']['points'][g['birds']['points'].length-1]['w'] = w;
	g['birds']['points'][g['birds']['points'].length-1]['h'] = h;
	g['birds']['points'][g['birds']['points'].length-1]['speed'] = speed;
	g['birds']['points'][g['birds']['points'].length-1]['t'] = t;
}
g['birds']['clear'] = function(){
	g['birds']['points'] = null;
	g['birds']['points'] = [];
}
var consoleDrag = null;
var consoleDragX = null;
var consoleDragY = null;

f['w'] = screen.width;
f['h'] = screen.height;

id('console-input').onkeydown = function(event){ 
	if(id('console-input').value != ''){
		event.cancelBubble = true;
	}
	if(event.keyCode == 13){
		var r = id('console-input').value;
		r = r.trim();
		if(id('console-routes').innerHTML != '' && isNaN(r) == false && l['routes'][r] !== undefined){
				//com('<br>'+id('console-input').value);
				l['next'] = l['routes'][r];
				startBlackoutAnimation('#000');
		}
		id('console-input').value = '';
	}
}

id('console-window').onmousedown = function(event){
	consoleDrag = true;
	document.body.style['cursor'] = 'move';
	consoleDragX = event.pageX - getOffset(this).left;
	consoleDragY = event.pageY - getOffset(this).top;
	id('console-div').style['opacity'] = 0.5;
	return false;
}

document.body.onmouseup = function(){
	consoleDrag = null;
	id('console-div').style['opacity'] = 0.6;
	document.body.style['cursor'] = 'default';
}

//////
var havePointerLock = 'pointerLockElement' in document ||
    'mozPointerLockElement' in document ||
    'webkitPointerLockElement' in document;
var requestedElement = document.body;

requestedElement.requestPointerLock = requestedElement.requestPointerLock ||
                                      requestedElement.mozRequestPointerLock ||
                                      requestedElement.webkitRequestPointerLock;
document.exitPointerLock =            document.exitPointerLock ||
                                      document.mozExitPointerLock ||
                                      document.webkitExitPointerLock;
var isLocked = function(){
  return requestedElement === document.pointerLockElement ||
         requestedElement === document.mozPointerLockElement ||
         requestedElement === document.webkitPointerLockElement;
}
requestedElement.addEventListener('click', function(){
  if(!isLocked()){
    requestedElement.requestPointerLock();
  } else {
    document.exitPointerLock();
  }
}, false);
var changeCallback = function() {
  if(!havePointerLock){
    alert('Ваш браузер не поддерживает pointer-lock');
    return;
  }
  if (isLocked()) {
    document.addEventListener("mousemove", moveCallback, false);
    document.body.classList.add('locked');
  } else {
    document.removeEventListener("mousemove", moveCallback, false);
    document.body.classList.remove('locked');
  }
}

document.addEventListener('pointerlockchange', changeCallback, false);
document.addEventListener('mozpointerlockchange', changeCallback, false);
document.addEventListener('webkitpointerlockchange', changeCallback, false);
var moveCallback = function(e) {
  var x = e.movementX ||
          e.mozMovementX ||
          e.webkitMovementX ||
          0;

  var y = e.movementY ||
          e.mozMovementY ||
          e.webkitMovementY ||
          0;
sc['camera'].rotation.y -= x/150;


//sc['camera_y_shift'] += y/1000;
//	sc['camera'].rotation.x = sc['camera_y_shift']* Math.sin(sc['camera'].rotation.y);
//	sc['camera'].rotation.z = sc['camera_y_shift']* Math.cos(sc['camera'].rotation.y);
	//sc['camera'].rotation.x -= Math.sin(sc['camera'].rotation.y - Math.PI/2)*y/100;
}



document.body.onkeydown = function(event, target){
	if(event.keyCode==13 || event.keyCode == 32 || event.which == 32){
		startCom();
	}
	if(event.keyCode == 87){
		var nx, ny, nz;
		ny = sc['camera'].position.y + Math.cos(sc['camera'].rotation.y*-1);
		nx = sc['camera'].position.x + Math.sin(sc['camera'].rotation.y*-1);
		nz = sc['l'][Math.round(nx)][Math.round(ny)];
		if(nz < 3){
			sc['camera'].position.y = ny;
			sc['camera'].position.x = nx;
		}
	}
}

document.body.onmousemove = function(event){
	if(consoleDrag){
		var tx = event.pageX - consoleDragX ;
		var ty = event.pageY - consoleDragY ;
		if(tx < 30){ tx = 0; }
		if(ty < 30){ ty = 0; }
		if(tx > f['w'] - id('console-div').scrollWidth - 30){ tx = f['w'] - id('console-div').scrollWidth; }
		if(ty > f['h'] - id('console-div').scrollHeight - 30){ ty = f['h'] - id('console-div').scrollHeight; }
		id('console-div').style['left'] = tx +  'px';
		id('console-div').style['top']  = ty +  'px';
	}
	if(document.getSelection().extentNode !=null ){
	if(document.getSelection().extentNode.tagName != undefined){
		document.getSelection().empty();
	}
	}
	g['offsetX'] = event.pageX; //(f['w']/2 - event.pageX )/70;
	g['offsetY'] = event.pageY;//(f['h']/2 - event.pageY )/70;
	if( sc != null && sc['mouseMove'] !== undefined){
		sc['mouseMove'](event.pageX,event.pageY);
	}
}

id('canvas').width = f['w'];
id('canvas').height = f['h'];
id('raincanvas').width  = f['w'];
id('raincanvas').height = f['h'];
id('birdscanvas').width = f['w'];
id('birdscanvas').height = f['h'];
id('smokecanvas').width  = f['w'];
id('smokecanvas').height = f['h'];
//id('scenecanvas').width  = f['w'];
//id('scenecanvas').height = f['h'];
id('compass-canvas').width  = 100;
id('compass-canvas').height = 100;
l['next'] = 'rocks1';
startBlackoutAnimation('#000');
setInterval(render, 120);