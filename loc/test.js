l['title'] = '';
l['text'] = [];
l['text'][0] = 'vfvrf.';
l['text'][1] = 'Тут пустыня.';
l['next'] = 'first';
l['img'] = 'res/red_desert.jpg';
l['rain'] = 1;
l['rain'] = 1000;
l['audio'] = 'scene2';





l['func'] = [];
l['onload'] = function(){
	if(navigator.userAgent.split(' ')[navigator.userAgent.split(' ').length-1].split('/')[0] == "Firefox"){
		for( var i = 0; i < 80; i++){
			g['smoke']['addPoint']( f['w']/2 + f['w']/2*rand(), (f['h']/5) + rand()*(f['h']/10),100, 'rgba(70,70,70, 0.005');
		}
	}else{
		for( var i = 0; i < 80; i++){
			g['smoke']['addPoint']( f['w']/2 + f['w']/2*rand(), (f['h']/5) + rand()*(f['h']/10),100, 'rgba(80,80,80, 0.01)');
		}
	}
	for(var i = 0; i < 50; i++){
		g['birds']['addPoint'](100+ rand()*100,80+ rand()*110, 100+ rand()*300, 20+ rand()*60 , rand()*10  , 0.5+rand()*2);
	}
}
l['render'] = function(){
	if(rand()>0.95){
		renderThunder(f['w']*0.85 + rand()*200 - 100,f['h']*0.30 + rand()*20, 6,50);
	}
}
postLoad();

