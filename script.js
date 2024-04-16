var contextClass = (window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext || window.msAudioContext);
var danceButtons = document.querySelectorAll(".everybodydance");
var context;
var buffers = []; // Array to store buffers

if (contextClass) {
  context = new contextClass();
} else {
  onError();
}

// Load all sound files
loadSound("https://owesh74.github.io/jaddoo//song/0413(2)_out_1.MP3", 0); // First sound
loadSound("https://owesh74.github.io/jaddoo//song/0413(2)_out_2.MP3", 1); // Second sound
loadSound("https://owesh74.github.io/jaddoo//song/0413(2)_out_3.MP3", 2); // Third sound
loadSound("https://owesh74.github.io/jaddoo//song/0413(2)_out_4.MP3", 3); // Fourth sound
// loadSound("https://owesh74.github.io/jaddoo//song/0413(2)_out_2.MP3", 4); // Fifth sound

function loadSound(url, index) {
  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.responseType = 'arraybuffer';

  request.onload = function() {
    context.decodeAudioData(request.response, function(theBuffer) {
      buffers[index] = theBuffer; // Store buffer in the array
    }, onError);
  };

  request.send();
}

function onError() {
  console.log("Bad browser! No Web Audio API for you");
}

function unpress() {
  this.classList.remove("pressed");
}

function playSound(index) {
  this.classList.add("pressed");
  var source = context.createBufferSource();
  source.buffer = buffers[index]; // Use buffer from the array
  source.connect(context.destination);
  source.start(0);
  var delay = 2000;
  setTimeout(unpress.bind(this), delay);
}

danceButtons.forEach(function(button, index) {
  button.addEventListener('click', function() {
    playSound.call(this, index); // Pass index to playSound function
  });
});
