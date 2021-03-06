var recognition;
var play = true;

function startRecognition() {
	recognition = new webkitSpeechRecognition();
	recognition.onstart = function(event) {
		updateRec();
	};
	recognition.onresult = function(event) {
		var text = "";
	    for (var i = event.resultIndex; i < event.results.length; ++i) {
	    	text += event.results[i][0].transcript;
	    }
	    setInput(text);
		stopRecognition();
		$('#spinner-wrapp').show();
	};
	recognition.onend = function() {
		stopRecognition();
	};
	recognition.lang = "en-US";
	recognition.start();
}

function stopRecognition() {
	if (recognition) {
		recognition.stop();
		recognition = null;
	}
	updateRec();
}

function switchRecognition() {
	if (recognition) {
		stopRecognition();
	} else {
		startRecognition();
	}
}

function setInput(text) {
	$('#toFocus').addClass('control-focus')
	$("#query").val(text);
	send();
}

function updateRec() {
	$("#rec").text(recognition ? "mic_off" : "mic");
}


function togglePlay(){
	if(play === null) {
		responsiveVoice.resume();
		play = true;
	} else {
		responsiveVoice.pause();
		play = null;
	}
}

$("#query").keypress(function(event) {
	if (event.which == 13) {
		event.preventDefault();
		send();
		$('#spinner-wrapp').show();
		if(responsiveVoice.isPlaying()){
			responsiveVoice.cancel();
		}
	}
});

$("#rec").click(function(event) {
	switchRecognition();
	if(responsiveVoice.isPlaying()){
		responsiveVoice.cancel();
	}
});

$('#toggle_play').click(function(){
	togglePlay();
	console.log(play);
});
