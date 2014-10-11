l['title'] = '';
l['text'] = [];
l['text'][0] = 'Где я?';
l['text'][1] = '...';
l['text'][2] = 'Как я сюда попал?';
l['text'][3] = '...';
l['text'][4] = 'Ух, как холодно...';
l['text'][5] = '...';
l['text'][6] = 'Мрачное место.';
l['text'][7] = '...';
l['text'][8] = 'Молния вдалеке.';
l['text'][9] = 'Еще одна.';
l['text'][10] = 'Земля здесь будто окровавлена.';
l['text'][11]= 'Так тихо.';
l['text'][12]= '...';
l['text'][13]= 'Что это у меня в кармане?';
l['text'][14]= '...';
l['text'][15]= 'Это компас.';
l['text'][16]= 'Отлично, по крайней мере я смогу знать направление.';
l['text'][17]= 'Надо попытаться сориентироваться.';
l['text'][18]= 'Это место...';
l['text'][19]= 'Я никогда здесь не был.';
l['text'][20]= 'Там, внизу, похоже, когда-то протекала река.';
l['text'][21]= '...';
l['text'][22]= 'Здешний воздух обжигает легкие.';
l['text'][23]= 'Он сухой, хотя небо выглядит так, как будто скоро пойдет дождь.';
l['text'][24]= 'Вот и первые капли.';
l['text'][25]= 'Надо уходить отсюда, и как можно скорее.';

l['next'] = 'desert';
l['audio'] = 'scene1';
l['compass'] = Math.PI+0.1;

l['routes'] = [];
l['routes']['text'] = '1 - Развернуться и идти на восток <br>2 - Спуститься с обрыва';
l['routes'][1] = 'desert';
l['routes'][2] = 'test';

l['func'] = [];
l['func'][8] = function(){
		renderThunder(f['w']*0.7 + rand()*f['w']*0.3,f['h']*0.4 + rand()*10, 10,8);
}
l['func'][9] = function(){
		renderThunder(f['w']*0.7 + rand()*f['w']*0.3,f['h']*0.4 + rand()*10, 10,8);
}
l['func'][15] = function(){
	drawCompass(l['compass']);
	setItem('compass', 1);
}
l['func'][23] = function(){
	l['rain'] = 1000;
	g['rain'] = -70;
}
l['func'][24] = function(){
	l['rain'] = 1000;
	if(g['rain']<20){
		g['rain'] = 20;	
	}
}
l['img'] = 'res/thedream.jpg';

l['onload'] = function(){
	if(navigator.userAgent.split(' ')[navigator.userAgent.split(' ').length-1].split('/')[0] == "Firefox"){
		for( var i = 0; i < 500; i++){
			g['smoke']['addPoint']( f['w']/2 + rand()*(f['w']/2), rand()*(f['h']/2),40, 'rgba(0,0,0, 0.005)');
		}
	}else{
		for( var i = 0; i < 500; i++){
			g['smoke']['addPoint']( rand()*(f['w']), f['h']*0.4 + rand()*(f['h']/6),90, 'rgba(0,0,0, 0.01)');
		}
	}
	for(var i = 0; i < 50; i++){
		g['birds']['addPoint'](f['w']*0.05+ rand()*f['w']*0.2,f['h']*0.2+ rand()*f['h']*0.1, 100+ rand()*300, 20+ rand()*60 , rand()*10  , 0.5+rand()*2);
	}
}
l['render'] = function(){
	if(rand()>0.95){
		renderThunder(f['w']*0.7 + rand()*f['w']*0.3,f['h']*0.4 + rand()*10, 10,8);
	}
}
postLoad();
