function rem(elem){
	elem.parentNode.removeChild(elem);
}
function rand(){
	return Math.random();
}
function log(sth){
	console.log(sth);
}
function id(id){
	return document.getElementById(id);
}
function setItem(item, value){
	localStorage.setItem(item, value);
}
function getItem(item){
	return localStorage.getItem(item);
}
function com(t){
	id('console-log').innerHTML += t;
}

function getOffset(elem) {
    if (elem.getBoundingClientRect) {
        return getOffsetRect(elem)
    } else {
        return getOffsetSum(elem)
    }
}
function getOffsetSum(elem) {
    var top=0, left=0
    while(elem) {
        top = top + parseInt(elem.offsetTop)
        left = left + parseInt(elem.offsetLeft)
        elem = elem.offsetParent
    }
    return {top: top, left: left}
}
function getOffsetRect(elem) {
    var box = elem.getBoundingClientRect();
    var body = document.body;
    var docElem = document.documentElement;
    var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;
    var clientTop = docElem.clientTop || body.clientTop || 0;
    var clientLeft = docElem.clientLeft || body.clientLeft || 0;
    var top  = box.top +  scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;
    return { top: Math.round(top), left: Math.round(left) }
}
function loadLocation(name){
	g['smoke']['clear']();
	g['birds']['clear']();
	game['turn'] = 0;
	game['name'] = name;
	if(typeof l['onunload'] == 'function'){
		l['onunload']();
	}
	l = [];
	if(sc != null){
		if(document.getElementById('scenecanvas2') != null){
			rem(id('scenecanvas2'));
			sc = null;
		}
	}
	var a = document.createElement('script');
	a.src = 'loc/'+name+'.js?q='+rand();
	a.id="script"+name;
	document.head.appendChild(a);
	game['paused'] = false;
	g['imageAnimation'] = 0;
}
function postLoad(){
	id('console-routes').innerHTML ='';
	id('console-log').innerHTML = '';
	if(l['audio'] !== undefined){
		if( l['audio']+'.mp3' !=id('mp3src').src.split('/')[id('mp3src').src.split('/').length-1] ){
			id('mp3src').src = 'audio/'+l['audio']+'.mp3';
			id('audio').load();
			id('audio').play();
		}
	}
	if(typeof l['onload'] == 'function'){
		l['onload']();
	}
	if(l['title'] !== undefined && l['title'] != ''){
		id('console-window').innerHTML = l['title'];
	}else{
		id('console-window').innerHTML = '&nbsp;';
	}
	if(l['rain'] !== undefined){
		g['rain'] = l['rain'];
		if(l['rain'] == 0){
			var rctx = id('raincanvas').getContext('2d');
			rctx.clearRect(0,0,f['w'],f['h']);
		}
	}else{
		l['rain'] = g['rain'] = 0;
			var rctx = id('raincanvas').getContext('2d');
			rctx.clearRect(0,0,f['w'],f['h']);
	}
	var rctx = id('birdscanvas').getContext('2d');
		rctx.clearRect(0,0,f['w'],f['h']);
	if(l['rain'] !== undefined){
		g['rain'] = l['rain'];
	}else{
		g['rain'] = 0;
	}
	if(l['compass'] !== undefined && getItem('compass')){
		drawCompass(l['compass']);
	}else{
		clearCompass();
	}
	if(sc !== undefined && sc != null && sc.length){
		sc['camera'].position.x = sc['camera_position_x'];
		sc['camera'].position.y = sc['camera_position_y'];
		sc['camera'].position.y = sc['camera_position_y'];
		
		sc['camera'].rotation.x = sc['camera_rotation_x'];
		sc['camera'].rotation.y = sc['camera_rotation_y'];
		sc['camera'].rotation.y = sc['camera_rotation_y'];
	}
	renderSmoke();
}
function doCom(){
	if(typeof l['text'] != 'undefined' && typeof l['text'][game['turn']] != 'undefined' && game['typing']){
		if(l['text'][game['turn']].length > 0){
			com(l['text'][game['turn']].substr(0,1));
			l['text'][game['turn']] = l['text'][game['turn']].substr(1);
		}else{
			clearInterval(cTimer);
			game['turn']++;
			game['typing'] = false;
		}
	}
}


function startCom(){
	if(game['typing'] == 0){
		if(id('console-routes').innerHTML == ''){
			id('console-log').innerHTML = '';
			cTimer = setInterval(doCom, 10);
			game['typing'] = 1;
			if(l['func'] !== undefined && l['func'][game['turn']] !== undefined){
					l['func'][game['turn']]();
			}
			if(l['text'][game['turn']+1] === undefined){
				if(l['routes'] !== undefined){
					id('console-routes').innerHTML = l['routes']['text'];
				}else{
					id('console-routes').innerHTML = '';
				}
			}else{
				id('console-routes').innerHTML = '';
			}
		}
	}else{
			if(typeof l['text'][game['turn']] != 'undefined'){
				game['typing'] = 0;
				com(l['text'][game['turn']].substr(0));
				clearInterval(cTimer);
				game['turn']++;
			}else{
				startBlackoutAnimation('#000');
			}
	}
}
function darkenBlackout(){
	if(g['blackoutstatus']==1){
			g['imageAnimation'] += 5;
			id('blackout').style['opacity'] = id('blackout').style['opacity']*1 + 0.02;
			if(id('blackout').style['opacity']*1 > 0.94){
				clearInterval(bTimer);
				id('blackout').style['opacity'] = 1;
				g['blackoutstatus']=2;
				g['imageReady'] = 0;
				loadLocation(l['next']);
			}
			id('audio').volume = 1 - id('blackout').style['opacity']*1;
	}
}
function lightenBlackout(){
	if(g['blackoutstatus'] == 3){
			id('blackout').style['opacity'] = id('blackout').style['opacity']*1 - 0.08;
			if(id('blackout').style['opacity']*1 < 0.05){
				clearInterval(bTimer);
				g['blackoutstatus']=0;
				id('blackout').style['opacity'] = 0;
				g['imageAnimation'] = 0;
			}
			id('audio').volume =  0;//(1 - id('blackout').style['opacity']*1);
	}
}
function startBlackoutAnimation(color){
	if(g['blackoutstatus']==0){// blackout абсолютно прозрачный
		id('blackout').style['opacity'] = 0;
		id('blackout').style['background-color'] = color;
		id('blackout').style['background'] = color;//color;
		g['blackoutstatus'] = 1;// начинаем 
		bTimer = setInterval(darkenBlackout, 10);
	}
}

/*
 * 
 * 
 * 
 * 
    ctx.beginPath();
    ctx.moveTo(30,96);
    ctx.lineTo(70,66);
    ctx.lineTo(103,76);
    ctx.lineTo(170,15);
    * */
    
