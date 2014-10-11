
function renderSky(){
	var sctx=id('skycanvas').getContext("2d");
	var grd=ctx.createLinearGradient(0,0,0, f['h']);
	grd.addColorStop(0,"black");
	grd.addColorStop(1,"white");
	sctx.fillStyle=grd;
	sctx.fillRect(0,0,f['w'],f['h']);
}
function drawImage(src, x, y, w, h) {
	if(src !== undefined){
		var img = new Image();
		img.onload = function(){
			if(typeof sc == 'undefined' || sc == null){
				var tt = (Math.sin(game['timestamp']/3)+1)*10;
				if(g['imageAnimation'] != 0){
					tt += g['imageAnimation'];
				}
			}else{
				tt = 0;
			}
			tty = tt * f['h']/f['w'];
			x = x - f['w']/140 - tt;
			y = y - f['h']/140 - tty;
			w = w + tt*2 + f['w']/140 +2;
			h = h + tt*2 + f['h']/140 ;
			ctx.drawImage(img,x,y,w,h);
			if(typeof sc != 'undefined' && sc != null){
				sc['3drender']();
			}
			if(g['blackoutstatus']==2 && g['imageReady']==0){
				g['blackoutstatus'] = 3;
				
				g['imageReady'] = 1;
				bTimer = setInterval(lightenBlackout, 40);
			}
			
		};
		img.src = src;
	}
}
function renderSmoke(){
	var gspl = g['smoke']['points'].length;
	var ttx, tty;
	var sctx = id('smokecanvas').getContext('2d');
	sctx.clearRect(0,0,f['w'],f['h']);
	for(var i = 0; i < gspl; i++){
		var centerX = g['smoke']['points'][i]['fx'] + rand()*10-5;
		var centerY = g['smoke']['points'][i]['fy'] + rand()*10-5;
		var radius =  g['smoke']['points'][i]['size'];
		var style =  g['smoke']['points'][i]['style'];
		sctx.beginPath();      
		sctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, true);
		sctx.fillStyle = style;
		sctx.fill();
		sctx.closePath();
	}
}

function renderFog(){
	
}
function renderRain(){
		if(g['rain'] < l['rain']){
			g['rain'] += 5;
		}else if(g['rain'] > l['rain']){
			g['rain'] -= 5;
		}
		var rctx = id('raincanvas').getContext('2d');
			rctx.clearRect(0,0,f['w'],f['h']);
		for(var i = 0; i < g['rain'] ; i++){
			rctx.beginPath();
			tx = rand()*f['w'];
			ty = rand()*f['h'];
			rctx.moveTo(tx,ty );
			tk = rand()*2;
			rctx.lineTo(tx+tk*3, ty+tk*20);
			rctx.lineWidth = rand()*2+1;
			rctx.strokeStyle = 'rgba(255,255,255,0.05)';
			rctx.stroke();
			rctx.closePath();
		}	
}
function renderBirds(){
	var gspl = g['birds']['points'].length;
	var rctx = id('birdscanvas').getContext('2d');
		rctx.clearRect(0,0,f['w'],f['h']);
	for(var i = 0; i < gspl; i++){
		t = g['birds']['points'][i]['t'];
		g['birds']['points'][i]['t'] += 0.01;
		t2 = g['birds']['points'][i]['t'] * g['birds']['points'][i]['speed'];
		var centerX = g['birds']['points'][i]['x'] + (Math.sin(t2)+1)*g['birds']['points'][i]['w']/2 - g['offsetX']/70 + g['offsetX']/140;
		var centerY = g['birds']['points'][i]['y'] + (Math.cos(t2)+1)*g['birds']['points'][i]['h']/2 - g['offsetY']/70 +  g['offsetY']/140;
		var p1x = centerX - 4*((g['birds']['points'][i]['w']/2 - (Math.sin(t2)+1)*g['birds']['points'][i]['w']/2)/g['birds']['points'][i]['w']);
		var p1y = centerY - Math.sin(t*100)*2 +1;
		var p2x = centerX + 4*((g['birds']['points'][i]['w']/2 - (Math.sin(t2)+1)*g['birds']['points'][i]['w']/2)/g['birds']['points'][i]['w']);
		var p2y = centerY - Math.sin(t*100)*2 +1;
		//animation
		if(g['imageAnimation'] != 0){
			kx = 1/(f['w']/centerX)-0.5;
			ky = 1/(f['h']/centerY)-0.5;
			kx *= (g['imageAnimation'])*8;
			ky *= (g['imageAnimation'])*8;
			p1x += kx;
			p1y += ky;
			p2x += kx;
			p2y += ky;
			centerX += kx;
			centerY += ky;
		}
		rctx.beginPath();
		rctx.moveTo(p1x,p1y);
		rctx.lineTo(centerX,centerY);
		rctx.lineTo(p2x,p2y);
		rctx.strokeStyle = '#222';
		rctx.stroke();
		rctx.closePath();
	}
}
function renderThunder(x,y,fl,sl){
	
	ctx.beginPath();
	ctx.strokeStyle= "rgba(255,255,255,0.6)";
	var tx = x;
	var ty = y;
	var x0 = tx;
	var y0 = ty;
	for(var i = 0; i < fl; i++){
		px = tx;
		py = ty;
		if(rand()>0.9){
			var vpx = px;
			var vpy = py;
			for(var j = 0; j < sl; j++){
			var vtx = vpx;
			var vty = vpy;
				vpy+=rand()*10;
				vpx+=rand()*16-8;
				ctx.moveTo(vpx,vpy);
				ctx.lineTo(vtx,vty);
			}
		}
		ty+=rand()*10;
		tx+=rand()*16-8;
		ctx.moveTo(px,py);
		ctx.lineTo(tx,ty);
	}
	
	ctx.closePath();
	ctx.stroke();
	ctx.fillStyle = 'rgba(255,255,255,0.02)';
	
	ctx.beginPath();
	for(var i = 0; i < 5; i++){
		ctx.arc(x0+rand()*200-100 , y0+rand()*20, rand()*10, 0, rand()*2 * Math.PI, true);
		ctx.fill();
	}
	ctx.closePath();
}
function render(){
	if(game['paused'] != true){
		game['timestamp']+= 0.1;
		ctx = id('canvas').getContext('2d');
		drawImage(l['img'],0,0,f['w'],f['h']);
		if(typeof l['render'] == 'function'){
			l['render']();
		}
		renderRain();
		if(g['birds']['points'].length){
			renderBirds();
		}
			renderSmoke();
	}
}

function clearCompass(){
	var cctx = id('compass-canvas').getContext('2d');
		cctx.lineWidth = 1;
		cctx.clearRect(0,0,100,100);
}
function drawCompass(offset){
	if(offset === undefined){ 
		offset = 0;
	}
	offset *= -1;
	var cctx = id('compass-canvas').getContext('2d');
		cctx.clearRect(0,0,100,100);
		cctx.lineWidth = 1;
		cctx.beginPath();
		cctx.arc(50, 50, 45, 0, 2 * Math.PI, true);
		cctx.fillStyle = 'rgba(0,0,0,0.8)';
		cctx.fill();
		cctx.closePath();	
		cctx.beginPath();
		cctx.strokeStyle = 'rgba(200,200,200,0.7)';
		for(var i = offset; i < Math.PI*2 + offset; i+= Math.PI/36){
			cctx.moveTo( 50 + Math.cos(i)*42, 50 + Math.sin(i)*42);
			cctx.lineTo( 50 + Math.cos(i)*44, 50 + Math.sin(i)*44);
		}
		for(var i = offset; i < Math.PI*2 + offset; i+= Math.PI/12){
			cctx.moveTo( 50 + Math.cos(i)*40, 50 + Math.sin(i)*40);
			cctx.lineTo( 50 + Math.cos(i)*44, 50 + Math.sin(i)*44);
		}
		for(var i = offset; i < Math.PI*2 + offset; i+= Math.PI/4){
			cctx.moveTo( 50 + Math.cos(i)*38, 50 + Math.sin(i)*38);
			cctx.lineTo( 50 + Math.cos(i)*44, 50 + Math.sin(i)*44);
		}
		cctx.stroke();
		cctx.closePath();
		cctx.beginPath();
			cctx.strokeStyle = 'rgb(130,10,10)';
			cctx.lineWidth = 3;
			cctx.moveTo( 50, 50);
			cctx.lineTo( 50 + Math.cos(offset)*35, 50 + Math.sin(offset)*35);
			cctx.stroke();
		cctx.closePath();
		cctx.beginPath();
		    cctx.fillStyle = "#888";
			cctx.font = 'bold 7px sans';
			cctx.fillText("N", Math.cos(Math.PI  + offset)*30 + 47, Math.sin(Math.PI  + offset)*30 + 50);
			cctx.fillText("W", Math.cos(Math.PI*0.5 + offset)*30 + 47, Math.sin(Math.PI*0.5  + offset)*30 + 50);
			cctx.fillText("S", Math.cos(offset)*30 + 47, Math.sin(offset)*30 + 50);
			cctx.fillText("E", Math.cos(Math.PI*1.5  + offset)*30 + 47, Math.sin(Math.PI*1.5  + offset)*30 + 50);
		cctx.closePath();
		cctx.beginPath();
			cctx.strokeStyle = 'rgb(10,10,100)';
			cctx.moveTo( 50, 50);
			cctx.lineTo( 50 + Math.cos(offset+Math.PI)*35, 50 + Math.sin(offset+Math.PI)*35);
			cctx.stroke();
		cctx.closePath();
		cctx.beginPath();
			cctx.arc(50, 50, 4, 0, 2 * Math.PI, true);
			cctx.fillStyle   = 'rgb(0,0,150)';
			cctx.strokeStyle = 'rgb(150,0,0)';
			cctx.fill();
			cctx.stroke();
		cctx.closePath();
}

