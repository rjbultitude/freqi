'use strict';
var freqi = require('../lib/freqi');

var scaleConfigAllOpts = {
  startFreq: 440,
  numSemitones: 12,
  numNotes: 8,
  inversionStartNote: 0,
  rootNote: 0,
  intervals: [-3, 0, 5, 7],
  amountToAdd: 12,
  type: 'some useful description'
};

var scaleConfigJustIntOpts = {
  startFreq: 440,
  numSemitones: 12,
  rootNote: 0,
  intervals: [-23, -17, 0, 1, 2, 3],
  mode: 'diatonic'
};

var scaleConfigMandatoryOpts = {
  intervals: [-3, 0, 5, 7]
};

var scaleFrequencies = freqi.getFreqs(scaleConfigAllOpts);
// var scaleFrequencies = freqi.getFreqs(scaleConfigMandatoryOpts);
// var scaleFrequencies = freqi.getFreqs(scaleConfigJustIntOpts);
console.log('scaleFrequencies', scaleFrequencies);

var playBtn = document.getElementById('play');
var stopBtn = document.getElementById('stop');
var connected = false;

var index = 0;

// define audio context
var context = new (window.AudioContext || window.webkitAudioContext)();
var oscillator = context.createOscillator();
oscillator.start();
var myInterval;

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
  playSineCb(scale);
  myInterval = setInterval(function() {
    playSineCb(scale);
  }, noteLength || 300);
}

playBtn.addEventListener('click', function(e) {
  e.preventDefault();
  if (!connected) {
    play(scaleFrequencies, 1000);
  }
  console.log('connected', connected);
});

stopBtn.addEventListener('click', function(e) {
  e.preventDefault();
  if (connected) {
    stop();
  }
  console.log('connected', connected);
});
