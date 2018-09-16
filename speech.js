var recognizing = false;
var final_transcript = "";
var interim_transcript = "";
var transcript_archive = [];
var results = document.getElementById("results");
var temp = document.getElementById("temp");

document.getElementById("start").addEventListener("click", function() {
	recognition.start();
});
document.getElementById("stop").addEventListener("click", function() {
	recognition.stop();
});

if (!('webkitSpeechRecognition' in window)) {
  console.log("update");
} 
else {
  var recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onstart = function() { 
  	recognition.lang = "en-US";
  	recognizing = true;
  }
  recognition.onresult = function(event) { 
  	var interim_transcript = "";
  	for (var i = event.resultIndex; i < event.results.length; ++i) {
  		if (event.results[i].isFinal) {
  			final_transcript += event.results[i][0].transcript;
  		}
  		else {
  			interim_transcript += event.results[i][0].transcript;
  		}
  		show(interim_transcript);
  	}

  }
  recognition.onerror = function(event) {  
  	console.log("error: " + event.error);
  }
  recognition.onend = function() {  
  	recognizing = false;
  	transcript_archive.push(final_transcript);
  	temp.innerHTML = "";

  	var result = document.createElement("p");
  	result.appendChild(document.createTextNode(transcript_archive[transcript_archive.length - 1]));
  	results.appendChild(result);
  	results.appendChild(temp);
  	
  	final_transcript = "";
  }
}

function show(interim) {
	console.log("fin: " + final_transcript);
	temp.innerHTML = final_transcript + "<span class='interim'>" + interim + "</span>";

}