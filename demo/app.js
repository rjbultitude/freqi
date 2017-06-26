'use strict';
var musicalScales = require('../lib/musicalScales');

var scaleConfigAllOpts = {
  startFreq: 440,
  numSemitones: 12,
  numNotes: 8,
  inversionStartNote: 0,
  rootNote: 0,
  intervals: [-12, 0, 12, 7],
  amountToAdd: 12,
  repeatMultiple: 0,
  type: 'sine'
};

var scaleConfigOpts = {
  startFreq: 440,
  numSemitones: 12,
  intervals: [-7, 0, 7, 12]
};

var augArrayOpts = {
  originalArray: [-7, 0, 7, 12],
  difference: 3,
  amountToAdd: 12,
  repeatMultiple: 0
}

musicalScales.augmentNumArray(augArrayOpts);

//var chordFrequencies = musicalScales.getSpecificScale(scaleConfigAllOpts);
var chordFrequencies = musicalScales.getSpecificScale(scaleConfigOpts);
console.log('chordFrequencies', chordFrequencies);

var playBtn = document.getElementById('play');
var stopBtn = document.getElementById('stop');
var connected = false;

var index = 0;

// define audio context
var context = new (window.AudioContext || window.webkitAudioContext)();
var oscillator = context.createOscillator();
var myInterval;
oscillator.start();

function playSine(freq) {
  oscillator.type = 'sine';
  oscillator.frequency.value = freq;
  oscillator.connect(context.destination);
  connected = true;
}

function playSineCb(scale) {
  playSine(scale[index]);
  if (index >= scale.length - 1) {
    index = 0;
  } else {
    index++;
  }
}

function stop() {
  oscillator.disconnect(context.destination);
  connected = false;
  clearInterval(myInterval);
}

function play(scale, noteLength) {
  myInterval = setInterval(function() {
    playSineCb(scale);
  }, noteLength || 300);
}

playBtn.addEventListener('click', function(e) {
  e.preventDefault();
  if (!connected) {
    //play(myScale.scale, 1000);
    play(chordFrequencies, 1000);
  }
});

stopBtn.addEventListener('click', function(e) {
  e.preventDefault();
  if (connected) {
    stop();
  }
});
