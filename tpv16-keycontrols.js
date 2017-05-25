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
		if (volume <= 5) {
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
