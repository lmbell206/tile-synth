//this needs to be in the html file
//<div id = 'gamecontainer'></div>
// there also need the appropriate button ids for the event listeners
tileSequencer = function(){
//audio rendering
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();


// Create a compressor node
var compressor = audioCtx.createDynamicsCompressor();
compressor.threshold.value = -30;
compressor.knee.value = 30;
compressor.ratio.value = 4;
compressor.reduction.value = -20;
compressor.attack.value = 0;
compressor.release.value = 0.50;

// connect the AudioBufferSourceNode to the destination


var masterFilter = audioCtx.createBiquadFilter();
masterFilter.frequency.value = 2000;
masterFilter.type = 'lowpass';
masterFilter.gain = masterFilter.frequency.value / 5000;
masterFilter.connect(compressor);
compressor.connect(audioCtx.destination);

var oscillator1 = audioCtx.createOscillator();
var gainNode1 = audioCtx.createGain();
var biquadFilter1 = audioCtx.createBiquadFilter();

oscillator1.type = 'square';
biquadFilter1.type = "bandpass";
oscillator1.connect(biquadFilter1);
oscillator1.start();
biquadFilter1.connect(gainNode1);
gainNode1.connect(masterFilter);
gainNode1.gain.value = 0;

var oscillator2 = audioCtx.createOscillator();
var gainNode2 = audioCtx.createGain();
var biquadFilter2 = audioCtx.createBiquadFilter();
		
biquadFilter2.type = "bandpass";
oscillator2.type = 'sawtooth';
oscillator2.connect(biquadFilter2);
biquadFilter2.connect(gainNode2);
oscillator2.start();
gainNode2.connect(masterFilter);
gainNode2.gain.value = 0;

var oscillator3 = audioCtx.createOscillator();
var oscillator3b = audioCtx.createOscillator();
var gainNode3 = audioCtx.createGain();
var gainNode3b = audioCtx.createGain();
var biquadFilter3 = audioCtx.createBiquadFilter();
var biquadFilter3b = audioCtx.createBiquadFilter();
biquadFilter3.type = "bandpass";
biquadFilter3b.type = "lowpass";

oscillator3.type = 'triangle';
oscillator3b.type = 'square';
oscillator3.connect(biquadFilter3);
oscillator3b.connect(biquadFilter3b);
biquadFilter3.connect(gainNode3);
biquadFilter3.connect(gainNode3b);
oscillator3.start();
oscillator3b.start();
gainNode3.connect(masterFilter);
gainNode3b.connect(masterFilter);
gainNode3.gain.value = 0;
gainNode3b.gain.value = 0;

var oscillator4 = audioCtx.createOscillator();
var gainNode4 = audioCtx.createGain();
var biquadFilter4 = audioCtx.createBiquadFilter();

biquadFilter4.type = "lowshelf";
oscillator4.type = 'square';
oscillator4.connect(biquadFilter4);
biquadFilter4.connect(gainNode4);
oscillator4.start();
gainNode4.connect(masterFilter);
gainNode4.gain.value = 0;

var oscillator5 = audioCtx.createOscillator();
var gainNode5 = audioCtx.createGain();
var biquadFilter5 = audioCtx.createBiquadFilter();
oscillator5.type = 'square';
oscillator5.connect(biquadFilter5);
biquadFilter5.connect(gainNode5);
oscillator5.start();
gainNode5.connect(masterFilter);
gainNode5.gain.value = 0;

var oscillator6 = audioCtx.createOscillator();
var gainNode6 = audioCtx.createGain();
var biquadFilter6 = audioCtx.createBiquadFilter();
oscillator6.type = 'sine';
oscillator6.connect(biquadFilter6);
biquadFilter6.connect(gainNode6);
oscillator6.start();
gainNode6.connect(masterFilter);
gainNode6.gain.value = 0;

var oscillator7 = audioCtx.createOscillator();
var gainNode7 = audioCtx.createGain();
var biquadFilter7 = audioCtx.createBiquadFilter();
oscillator7.type = 'triangle';
oscillator7.connect(biquadFilter7);
biquadFilter7.connect(gainNode7);
oscillator7.start();
gainNode7.connect(masterFilter);
gainNode7.gain.value = 0;

//visual rendering
var screenwidth = screen.availWidth - 15;
var screenheight = screen.availHeight - 15;
var synthwindow = document.getElementById('gamecontainer');
synthwindow.innerHTML = '<canvas id="game_screen" width="' + screenwidth + '" height="' + screenheight + '" style="position:absolute; border:0px solid #000000; z-index:-1"></canvas>';
var c = document.getElementById("game_screen");
var ctx = c.getContext("2d");

var clickcount = 0;

var rectangle = [];
var rectangleghost = [];
var building = false;
var rectanglehue = 0;
var pointa = {'x':0,'y':0};
var pointb = {'x':0,'y':0};
var backgroundhue = 107;

var globalmodulation = 501;
var localmodulation = [];
var globalmodulationdirection = 'up';
var modulationrate = 12;
var modulationmax = 1660;
var modulationmin = 330;
var soundpatch = 1;
var soundpatchcount = 7;
var playstatus = 'paused';
var temporeference = 32;

var volume = 2.5;

var modulationInterval;
var sequenceInterval;
var buttonInterval;

// Find the right method, call on correct element -- I used this code snippet to cover different browser's full screen modes
function launchIntoFullscreen(element) {
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if(element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

iosaudio = function(){
	var buffer = audioCtx.createBuffer(1, 1, 22050);
	var source = audioCtx.createBufferSource();
	source.buffer = buffer;
	source.connect(audioCtx.destination);
	source.start();
	source.stop();
}
document.getElementById('filter_down_button').addEventListener('touchstart', function(e){
	e.preventDefault();
	clearInterval(buttonInterval);
	buttonInterval = setInterval(function() {		
		if (masterFilter.frequency.value >= 24) {
			masterFilter.frequency.value = masterFilter.frequency.value - 30;
			masterFilter.gain = masterFilter.frequency.value / 5000;
			document.getElementById('info').innerHTML = "filter: " + masterFilter.frequency.value;
		}
	},30);
});
document.getElementById('filter_up_button').addEventListener('touchstart', function(e){
	e.preventDefault();
	clearInterval(buttonInterval);
	buttonInterval = setInterval(function() {
		if (masterFilter.frequency.value <= 12000) {
			masterFilter.frequency.value = masterFilter.frequency.value + 30;
			masterFilter.gain = masterFilter.frequency.value / 5000;
			document.getElementById('info').innerHTML = "filter: " + masterFilter.frequency.value;
		}
	},30);
});

document.getElementById('filter_up_button').addEventListener('touchend', function(e){
	e.preventDefault();
	clearInterval(buttonInterval);
});
document.getElementById('filter_down_button').addEventListener('touchend', function(e){
	e.preventDefault();
	clearInterval(buttonInterval);
});		

// volume controls


document.getElementById('volume_up_button').addEventListener('touchstart', function(e){
	e.preventDefault();
	clearInterval(buttonInterval);
	buttonInterval = setInterval(function() {		
		if (volume <= 10) {
			volume = volume + .05;
			document.getElementById('info').innerHTML = "volume: " + volume;
		}
	},75);
});
document.getElementById('volume_down_button').addEventListener('touchstart', function(e){
	e.preventDefault();
	clearInterval(buttonInterval);
	buttonInterval = setInterval(function() {
		if (volume >= 0) {
			volume = volume - .05;
			document.getElementById('info').innerHTML = "volume: " + volume;
		}
	},75);
});

document.getElementById('volume_up_button').addEventListener('touchend', function(e){
	e.preventDefault();
	clearInterval(buttonInterval);
});
document.getElementById('volume_down_button').addEventListener('touchend', function(e){
	e.preventDefault();
	clearInterval(buttonInterval);
});	

document.getElementById('sound_toggle_button').addEventListener('touchstart', function(e){
	e.preventDefault();
	if (soundpatch < soundpatchcount) {
		soundpatch = soundpatch + 1;
	} else if (soundpatch == soundpatchcount) {
		soundpatch = 1;
	}
	backgroundhue = (360/soundpatchcount) * soundpatch;
	rectanglehue = (360/soundpatchcount) * soundpatch;
	document.getElementById('info').innerHTML = 'sound patch: ' + soundpatch;
});
document.getElementById('sequence_swipe_button').addEventListener('touchstart',function(e){
	e.preventDefault();
	if (playstatus == 'paused') {
		playstatus = 'playing';
		iosaudio();
		launchIntoFullscreen(document.documentElement);
		modulationinit();
		sequenceSwipe();
	} else {
		playstatus = 'paused';
		clearInterval(sequenceInterval);
		clearInterval(buttonInterval);
		clearInterval(modulationInterval);
	}
});

document.getElementById('tempo_up_button').addEventListener('touchstart',function(e){
	e.preventDefault();
	clearInterval(buttonInterval);
	buttonInterval = setInterval(function(){
		if (temporeference > 15) {
			temporeference = temporeference - .2;
			document.getElementById('info').innerHTML = 'tempo:' + Math.floor(4000/temporeference);
		}
	}, 30);
});

document.getElementById('tempo_up_button').addEventListener('touchend',function(e){
	e.preventDefault();
	clearInterval(buttonInterval);
});
	
document.getElementById('tempo_down_button').addEventListener('touchstart',function(e){
	e.preventDefault();
	clearInterval(buttonInterval);
	buttonInterval = setInterval(function(){
		if (temporeference < 64) {
			temporeference = temporeference + .2;
			document.getElementById('info').innerHTML = 'tempo:' + Math.floor(4000/temporeference);
		}
	}, 30);
});

document.getElementById('tempo_down_button').addEventListener('touchend',function(e){
	e.preventDefault();
	clearInterval(buttonInterval);	
});

c.addEventListener('click', function(e){
	e.preventDefault();
	var tapspotx = e.clientX;
	var tapspoty = e.clientY;

	if (clickcount == 0){
		pointa.x = e.clientX;
		pointa.y = e.clientY;
		pointb.x = e.clientX;
		pointb.y = e.clientY;
		if (handleTap(tapspotx,tapspoty)){
			clickcount = 0;
		} else {
			clickcount = 1;
		}
		
	} else {
		pointb.x = e.clientX;
		pointb.y = e.clientY;
		clickcount = 0;
		buildit();
	}
	
		
});

c.addEventListener('touchstart', function(e){
	e.preventDefault();
	document.getElementById('info').innerHTML = "";
	if (e.touches.length == 1) {
		var tapspotx = e.touches[0].pageX;
		var tapspoty = e.touches[0].pageY;
		handleTap(tapspotx,tapspoty);
	}
	if (e.touches.length >= 2) {
		building = true;
		pointa.x = e.touches[0].pageX;
		pointa.y = e.touches[0].pageY;
		pointb.x = e.touches[1].pageX;
		pointb.y = e.touches[1].pageY;
	}
});
c.addEventListener('touchmove', function(e){
	e.preventDefault();
	if (e.touches.length >= 2) {
		building = true;
		pointa.x = e.touches[0].pageX;
		pointa.y = e.touches[0].pageY;
		pointb.x = e.touches[1].pageX;
		pointb.y = e.touches[1].pageY;
	}
	if (e.touches.length == 1) {
		var tapspotx = e.touches[0].pageX;
		var tapspoty = e.touches[0].pageY;
		handleTap(tapspotx,tapspoty);
	}
});
c.addEventListener('touchend', function(e){
	e.preventDefault();
	if (e.touches.length >= 1) {
		pointb.x = e.touches[0].pageX;
		pointb.y = e.touches[0].pageY;
		pointa.x = e.changedTouches[0].pageX;
		pointa.y = e.changedTouches[0].pageY;
	}
	if (e.touches.length == 0 && building) {
		buildit();
	}	
});
drawit = function() {
	ctx.fillStyle = 'hsl('+ backgroundhue + ', 100%, 50%)';
	ctx.fillRect(0,0,screenwidth,screenheight);
	ctx.beginPath();
	ctx.lineWidth = '10px';
	ctx.strokeStyle = 'black';
	for (var i = 0; i <= 4; i = i + 1) {
		ctx.moveTo(screenwidth/4 * i,0);
		ctx.lineTo(screenwidth/4*i,screenheight)
	}
	ctx.stroke();
	for (var i = 0; i < rectangle.length; i = i + 1){
		var rectangleid = i;
		ctx.fillStyle = 'hsl('+ rectangle[rectangleid].color + ', 50%, 50%)';
		ctx.fillRect(rectangle[rectangleid].x,rectangle[rectangleid].y,rectangle[rectangleid].l, rectangle[rectangleid].h);
	}
	ctx.fillStyle = 'hsl('+ rectanglehue + ', 50%, 50%)';
	if (rectanglehue >= (360/soundpatchcount * (soundpatch-1)) + (360/soundpatchcount * (soundpatch-1))){rectanglehue = (360/soundpatchcount) * (soundpatch-1)}
	ctx.strokeStyle ='black';
	ctx.fillRect(pointa.x,pointa.y,pointb.x - pointa.x, pointb.y - pointa.y);
	ctx.stroke();
//	ctx.fillStyle = 'hsl(' + (360/5) * soundpatch - soundpatch + ', 100%, 50%)';
//	ctx.fillRect(screenwidth-40,0,40,40)
}
animateit = function() {
	rectanglehue = rectanglehue + 3;
	backgroundhue = backgroundhue + rectangle.length*.1;
	if (backgroundhue>360){backgroundhue = 0;}
	for (var i = 0;i<rectangle.length;i++){
		if (rectangle[i].fading){
			rectangle[i].x = rectangle[i].x + 7;
			rectangle[i].y = rectangle[i].y + 7;
			rectangle[i].l = rectangle[i].l - 15;
			rectangle[i].h = rectangle[i].h - 15;
		}
		if (rectangle[i].l <= 0 && rectangle[i].h <= 0) {
			rectangle.splice(i,1);
		}
	}
}
buildit = function() {
	if (pointa.x >pointb.x && pointa.y>pointb.y) {
		var tempx = pointb.x;
		var tempy = pointb.y;
		pointb.x = pointa.x;
		pointb.y = pointa.y;
		pointa.x = tempx;
		pointa.y = tempy;
	}
	var rectangleid = rectangle.length;
	
	rectangle[rectangleid] = {};
	rectangle[rectangleid].x = pointa.x;
	rectangle[rectangleid].y = pointa.y;
	rectangle[rectangleid].l = pointb.x - pointa.x;
	rectangle[rectangleid].h = pointb.y - pointa.y;
	rectangle[rectangleid].color = (360/5) * soundpatch - soundpatch;
	rectangle[rectangleid].fading = false;
	rectangle[rectangleid].played = false;
	rectangle[rectangleid].sound = soundpatch;

	rectangleghost[rectangleid] = {};
	rectangleghost[rectangleid].x = pointa.x;
	rectangleghost[rectangleid].y = pointa.y;
	rectangleghost[rectangleid].l = pointb.x - pointa.x;
	rectangleghost[rectangleid].h = pointb.y - pointa.y;
	rectangleghost[rectangleid].color = (360/5) * soundpatch - soundpatch;
	rectangleghost[rectangleid].fading = false;
	rectangleghost[rectangleid].played = false;
	rectangleghost[rectangleid].sound = soundpatch;
	
//	if (rectangleghost.length > 16) { rectangleghost.splice(0,1)};
	
	pointa.x = 0;
	pointa.y = 0;
	pointb.x = 0;
	pointb.y = 0;	
	building = false;
}
handleTap = function(x,y) {
	var x = x;
	var y = y;
	var i = 0;
	var hitstatus = false;
	for (i = 0; i < rectangle.length; i= i + 1){
		if (
			rectangle[i].l < 0 && rectangle[i].h < 0 &&
			x >= rectangle[i].x + rectangle[i].l &&
			x <= rectangle[i].x &&
			y >= rectangle[i].y + rectangle[i].h &&
			y <= rectangle[i].y &&
			rectangle[i].fading == false
		){
			rectangleghost.splice(i,1);
			rectangle[i].fading = true;
			hitstatus = true;
			continue;
		}
		if (
			rectangle[i].l > 0 && 
			rectangle[i].h < 0 &&
			x >= rectangle[i].x &&
			x <= rectangle[i].x + rectangle[i].l &&
			y >= rectangle[i].y + rectangle[i].h &&
			y <= rectangle[i].y &&
			rectangle[i].fading == false
		){
				rectangleghost.splice(i,1);
				rectangle[i].fading = true;
				hitstatus = true;
				continue;
		}
		if (
			rectangle[i].l < 0 && 
			rectangle[i].h > 0 &&
			x >=rectangle[i].x + rectangle[i].l &&
			x <= rectangle[i].x &&
			y >= rectangle[i].y &&
			y <= rectangle[i].y+rectangle[i].h &&
			rectangle[i].fading == false
		){
				rectangleghost.splice(i,1);
				rectangle[i].fading = true;
				hitstatus = true;
				continue;
		}
		if (
			x >= rectangle[i].x &&
			x <= rectangle[i].x+rectangle[i].l &&
			y >= rectangle[i].y &&
			y <= rectangle[i].y+rectangle[i].h &&
			rectangle[i].fading == false
		){
				rectangleghost.splice(i,1);
				rectangle[i].fading = true;
				hitstatus = true;
				continue;			
		}	
	}
	return hitstatus;
}
handleTapSequence = function(sequencelocation) {
	var x = sequencelocation;
	for (var i = 0;i<rectangle.length;i++){	
		for (var j = 0; j < screenwidth/64; j = j+1){
			if (x + j > rectangle[i].x && rectangle[i].l >= 0 && rectangle[i].played == false && rectangle[i].fading == false) {
				var finalpitch = 4000 - Math.abs(rectangle[i].h * 10);
			//	playSoundLibrary[rectangle[i].sound](4000 - Math.abs(rectangle[i].h * 10), Math.abs(rectangle[i].l *10));
				//if (finalpitch > 500){
				//	playSoundLibrary[rectangle[i].sound](4000 - Math.abs(rectangle[i].h * 10)-Math.abs(rectangle[i].h * 10)/4, Math.abs(rectangle[i].l *10));
				//}
				playSoundLibrary[rectangle[i].sound](4000 - Math.abs(rectangle[i].h * 10/(screenheight/768)), Math.abs(rectangle[i].l *10/(screenwidth/1366)));
				rectangle[i].played = true;
				ctx.fillStyle = 'pink';
				ctx.fillRect(sequencelocation,0,15,screenheight);
				break;
			}
			if (rectangle[i].x + rectangle[i].l <= x + j && rectangle[i].l <=0 && rectangle[i].played == false && rectangle[i].fading == false){
			var finalpitch = 4000 - Math.abs(rectangle[i].h * 10)
				playSoundLibrary[rectangle[i].sound](4000 - Math.abs(rectangle[i].h * 10/(screenheight/768)), Math.abs(rectangle[i].l *10/(screenwidth/1366)));
				//if (finalpitch >500){
				//	playSoundLibrary[rectangle[i].sound](4000 - Math.abs(rectangle[i].h * 10)-Math.abs(rectangle[i].h * 10)/4, Math.abs(rectangle[i].l *10));
			//	}
				rectangle[i].played = true;
				ctx.fillStyle = 'pink';
				ctx.fillRect(sequencelocation,0,15,screenheight);
				break;
			}
		}
	}
}
sequenceSwipe = function() {
	clearInterval(sequenceInterval);
	for (var i = 0; i < rectangleghost.length; i = i+1){
		rectangle[i] = {};
		if (rectangleghost[i] === undefined) {continue}
		rectangle[i].x = rectangleghost[i].x;
		rectangle[i].y = rectangleghost[i].y;
		rectangle[i].l = rectangleghost[i].l;
		rectangle[i].h = rectangleghost[i].h;
		rectangle[i].color = rectangleghost[i].color;
		rectangle[i].played = false;
		rectangle[i].fading = rectangleghost[i].fading;
		rectangle[i].sound = rectangleghost[i].sound;
	}
	var sequencelocation = 0;
	globalmodulation = 0;
	sequenceInterval = setInterval(function(){
		ctx.fillStyle = 'grey';
		ctx.fillRect(sequencelocation,0,15,screenheight);
		if (sequencelocation > screenwidth){
			sequenceSwipe();
			sequencelocation = 0;
		}
		handleTapSequence(sequencelocation);
		sequencelocation = sequencelocation + screenwidth/64;
	}, temporeference);
}
function randomNumber(min_range, max_range) {
	return Math.floor((Math.random() * max_range) + min_range);
}
playSoundLibrary = {
	1:function(freq,duration){
		// set floor for frequency
		if (freq<190){freq=190}
		oscillator1.frequency.value = freq/5 + 100;
		biquadFilter1.frequency.value = freq/2;	
		gainNode1.gain.setTargetAtTime(.05*volume, audioCtx.currentTime, .5);
		gainNode1.gain.setTargetAtTime(0, audioCtx.currentTime + 0.1, duration/22800);
		biquadFilter1.frequency.setTargetAtTime(0, audioCtx.currentTime, duration/100 + .2);  

		//set parameters to follow global modulation, possibly can change set internal variables for consistent starting point
//		var m = localmodulation.length
//		localmodulation[m] = globalmodulation*freq/100;
//		clearInterval(filtercycleInterval);
//		var filtercycleInterval = setInterval(function() {
//			oscillator1.frequency.value = localmodulation[m];
	//		localmodulation[m] = localmodulation[m] + 5;
	//	}, 60);
	//	
	//	var noteEnd = setTimeout(function(){
	//		clearInterval(filtercycleInterval);
	//		localmodulation.slice(m,1);
	//	}, 1000);
	},
	
	2:function(freq,duration){
		if (freq<56){freq=56}
	//	biquadFilter2.frequency.cancelScheduledValues(audioCtx.currentTime);
	//	oscillator2.frequency.cancelScheduledValues(audioCtx.currentTime);
	//	gainNode2.gain.cancelScheduledValues(audioCtx.currentTime);
		biquadFilter2.frequency.value = freq*1.5;
		oscillator2.frequency.value = freq;
		gainNode2.gain.setTargetAtTime(.5*volume, audioCtx.currentTime, .5);
		gainNode2.gain.setTargetAtTime(0, audioCtx.currentTime + 0.01, duration/7900);
		biquadFilter2.frequency.setTargetAtTime(freq, audioCtx.currentTime, duration/200);  
		//oscillator2.frequency.setTargetAtTime(freq +freq,audioCtx.currentTime,0.5);
	},
	
	3:function(freq,duration){
		if (freq<56){freq=56}
		biquadFilter3.frequency.value = freq/2;
		oscillator3.frequency.value = freq;
		gainNode3.gain.value = 0;
		gainNode3.gain.setTargetAtTime(0.05*volume, audioCtx.currentTime,.5);
		gainNode3.gain.setTargetAtTime(0, audioCtx.currentTime + 0.05, duration/10900);
		biquadFilter3b.frequency.value = freq/4;
		oscillator3b.frequency.value = freq/2;
		gainNode3b.gain.value = 0;
		gainNode3b.gain.setTargetAtTime(0.1*volume, audioCtx.currentTime,.1);
		gainNode3b.gain.setTargetAtTime(0, audioCtx.currentTime + 0.05, duration/30900);
	//	biquadFilter3.frequency.setTargetAtTime(0, audioCtx.currentTime, duration/120);  
	},
	
	4:function(freq,duration){
		if (freq<44){freq=44}
		gainNode4.gain.setTargetAtTime(.05*volume,audioCtx.currentTime,.05);
		oscillator4.frequency.value = freq/2; 
		biquadFilter4.frequency.value = freq*2;
		oscillator4.frequency.setTargetAtTime(freq/2.5, audioCtx.currentTime, duration/20000); 
		biquadFilter4.frequency.setTargetAtTime(freq,audioCtx.currentTime+.1, duration/30000);
		gainNode4.gain.setTargetAtTime(0, audioCtx.currentTime + 0.05, duration/30000);
	},
	5:function(freq,duration){
		if (freq<112){freq=112}
		var filtervalue = freq/2;

		oscillator5.type = 'square';
		oscillator5.frequency.value = freq/2;
			
		//set filter values
		biquadFilter5.type = "bandpass";
		biquadFilter5.frequency.value = filtervalue;
		gainNode5.gain.setTargetAtTime(.01 * 300 / filtervalue *volume, audioCtx.currentTime, .005);
	//	gainNode5.gain.value = ;
		
		//set parameters for envelopes
		gainNode5.gain.setTargetAtTime(0, audioCtx.currentTime + 0.1, duration/22800);
		biquadFilter5.frequency.setTargetAtTime(freq, audioCtx.currentTime, duration/100 + .2);  
		
	},
	6:function(freq,duration){
		if (freq<56){freq=56}
		oscillator6.type = 'triangle';
		oscillator6.frequency.value = globalmodulation/2 + freq;
		gainNode6.gain.setTargetAtTime(.1*volume, audioCtx.currentTime, .1);
		gainNode6.gain.setTargetAtTime(0, audioCtx.currentTime + duration/4800, duration/14800);
//		clearInterval(filtercycleInterval);
		//var filtercycleInterval = setInterval(function() {
		//	oscillator6.frequency.setValueAtTime(globalmodulation/2 + freq,audioCtx.currentTime);
	//	}, 30);
		//var noteEnd = setTimeout(function(){
			//clearInterval(filtercycleInterval);
		//}, 1000);
	},
	7:function(freq,duration){
		if (freq<56){freq=56}
		oscillator7.frequency.setTargetAtTime(freq/2,audioCtx.currentTime, .1);
		gainNode7.gain.setTargetAtTime(.01*volume,audioCtx.currentTime, duration/15000);;
		gainNode7.gain.setTargetAtTime(0,audioCtx.currentTime+.5, duration/15000);
	}
};

document.getElementById('generate_button').addEventListener('click', function(e){
//	e.preventDefault();
	generate();
});
document.getElementById('generate_button').addEventListener('touchstart', function(e){
//	e.preventDefault();
	generate();
});

document.getElementById('clear_button').addEventListener('click', function(e){
//	e.preventDefault();
	rectangle =[];
	rectangleghost = [];
});

document.getElementById('clear_button').addEventListener('touchstart', function(e){
//	e.preventDefault();
	rectangle =[];
	rectangleghost = [];
});
//document.getElementById('generate_button').addEventListener('touchstart', function(e){
//	e.preventDefault();
//	generate();
//});

function randomNumber(min_range, max_range) {
	return Math.floor((Math.random() * max_range) + min_range);
}

generate = function(){
	var axtemp = new Number(0);
	var aytemp = new Number(0);
	var bxtemp = new Number(0);
	var bytemp = new Number(0);
	building = true;
	axtemp = randomNumber(1,10);
	aytemp = randomNumber(5,screenheight);
	bxtemp = randomNumber(screenwidth/8,664);
	bytemp = randomNumber(15,screenheight);
	pointa.x = axtemp;
	pointa.y = aytemp;
	pointb.x = bxtemp; 
	pointb.y = bytemp;
	rectanglehue = randomNumber(0,360);
	soundpatch = randomNumber(1,7);
	buildit();
	for (i = 0 ; i<4;i =i+1) {
		building = true;
		axtemp = randomNumber(i*screenwidth/4,i*64+300);
		aytemp = randomNumber(5,screenheight);
		bxtemp = randomNumber(i * screenwidth/4,i*64+300);
		bytemp = randomNumber(15,screenheight);
		pointa.x = axtemp;
		pointa.y = aytemp;
		pointb.x = bxtemp; 
		pointb.y = bytemp;
		rectanglehue = randomNumber(0,360);
		soundpatch = randomNumber(1,7);
		buildit();
	}
}
modulationinit = function() {
	clearInterval(modulationInterval);
	modulationInterval = setInterval(function(){
		if (globalmodulation < modulationmax && globalmodulationdirection == 'up'){
			globalmodulation = globalmodulation + modulationrate;
		}
		if (globalmodulation > modulationmin && globalmodulationdirection == 'down'){
			globalmodulation = globalmodulation - modulationrate;
		}
		if (globalmodulation >= modulationmax && globalmodulationdirection == 'up'){
			globalmodulationdirection = 'down'
		}
		if (globalmodulation <= modulationmin && globalmodulationdirection == 'down'){
			globalmodulationdirection = 'up'
		}
		//drawit();
		//animateit();
	},60);
}
modulationinit();

// tile pad sequencer v 16 key controls

document.getElementById('filter_down_button').addEventListener('mousedown', function(e){
	e.preventDefault();
	clearInterval(buttonInterval);
	buttonInterval = setInterval(function() {		
		if (masterFilter.frequency.value >= 24) {
			masterFilter.frequency.value = masterFilter.frequency.value - 30;
			masterFilter.gain = masterFilter.frequency.value / 5000;
			document.getElementById('info').innerHTML = "filter: " + masterFilter.frequency.value;
		}
	},30);
});
document.getElementById('filter_up_button').addEventListener('mousedown', function(e){
	e.preventDefault();
	clearInterval(buttonInterval);
	buttonInterval = setInterval(function() {
		if (masterFilter.frequency.value <= 12000) {
			masterFilter.frequency.value = masterFilter.frequency.value + 30;
			masterFilter.gain = masterFilter.frequency.value / 5000;
			document.getElementById('info').innerHTML = "filter: " + masterFilter.frequency.value;
		}
	},30);
});

document.getElementById('filter_up_button').addEventListener('mouseup', function(e){
	e.preventDefault();
	clearInterval(buttonInterval);
});
document.getElementById('filter_down_button').addEventListener('mouseup', function(e){
	e.preventDefault();
	clearInterval(buttonInterval);
});		

// volume controls


document.getElementById('volume_up_button').addEventListener('mousedown', function(e){
	e.preventDefault();
	clearInterval(buttonInterval);
	buttonInterval = setInterval(function() {		
		if (volume <= 10) {
			volume = volume + .05;
			document.getElementById('info').innerHTML = "volume: " + volume;
		}
	},75);
});
document.getElementById('volume_down_button').addEventListener('mousedown', function(e){
	e.preventDefault();
	clearInterval(buttonInterval);
	buttonInterval = setInterval(function() {
		if (volume >= 0) {
			volume = volume - .05;
			document.getElementById('info').innerHTML = "volume: " + volume;
		}
	},75);
});

document.getElementById('volume_up_button').addEventListener('mouseup', function(e){
	e.preventDefault();
	clearInterval(buttonInterval);
});
document.getElementById('volume_down_button').addEventListener('mouseup', function(e){
	e.preventDefault();
	clearInterval(buttonInterval);
});	

document.getElementById('sound_toggle_button').addEventListener('mousedown', function(e){
	e.preventDefault();
	if (soundpatch < soundpatchcount) {
		soundpatch = soundpatch + 1;
	} else if (soundpatch == soundpatchcount) {
		soundpatch = 1;
	}
	backgroundhue = (360/soundpatchcount) * soundpatch;
	rectanglehue = (360/soundpatchcount) * soundpatch;
	document.getElementById('info').innerHTML = 'sound patch: ' + soundpatch;
});
document.getElementById('sequence_swipe_button').addEventListener('mousedown',function(e){
	e.preventDefault();
	if (playstatus == 'paused') {
		playstatus = 'playing';
		iosaudio();
		launchIntoFullscreen(document.documentElement);
		modulationinit();
		sequenceSwipe();
	} else {
		playstatus = 'paused';
		clearInterval(sequenceInterval);
		clearInterval(buttonInterval);
		clearInterval(modulationInterval);
	}
});

document.getElementById('tempo_up_button').addEventListener('mousedown',function(e){
	e.preventDefault();
	clearInterval(buttonInterval);
	buttonInterval = setInterval(function(){
		if (temporeference > 15) {
			temporeference = temporeference - .2;
			document.getElementById('info').innerHTML = 'tempo:' + Math.floor(4000/temporeference);
		}
	}, 30);
});

document.getElementById('tempo_up_button').addEventListener('mouseup',function(e){
	e.preventDefault();
	clearInterval(buttonInterval);
});
	
document.getElementById('tempo_down_button').addEventListener('mousedown',function(e){
	e.preventDefault();
	clearInterval(buttonInterval);
	buttonInterval = setInterval(function(){
		if (temporeference < 64) {
			temporeference = temporeference + .2;
			document.getElementById('info').innerHTML = 'tempo:' + Math.floor(4000/temporeference);
		}
	}, 30);
});

document.getElementById('tempo_down_button').addEventListener('mouseup',function(e){
	e.preventDefault();
	clearInterval(buttonInterval);	
});

var drawInterval
drawLoop = function(){
	clearInterval(drawInterval);
	drawInterval = setInterval(function(){
		drawit();
		animateit();
	},30);
}
drawLoop();



}
tileSequencer();
