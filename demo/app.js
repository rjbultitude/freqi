'use strict';
const freqi = require('../lib/freqi');

const scaleConfigAllOpts = {
  startFreq: 440,
  numSemitones: 12,
  numNotes: 8,
  inversionStartNote: 0,
  rootNote: 0,
  intervals: [-3, 0, 5, 7],
  amountToAdd: 12,
  type: 'some useful description'
};

const scaleConfigJustIntOpts = {
  startFreq: 440,
  numSemitones: 12,
  rootNote: 0,
  intervals: [-23, -17, 0, 1, 2, 3],
  mode: 'diatonic'
};

const scaleConfigMandatoryOpts = {
  intervals: [-3, 0, 5, 7]
};

const scaleConfigHSeriesOpts = {
  startFreq: 440,
  intervals: [0, 1, 2, 3],
  mode: 'hSeries'
};

// const scaleFrequencies = freqi.getFreqs(scaleConfigAllOpts);
// const scaleFrequencies = freqi.getFreqs(scaleConfigMandatoryOpts);
// const scaleFrequencies = freqi.getFreqs(scaleConfigJustIntOpts);
const scaleFrequencies = freqi.getFreqs(scaleConfigHSeriesOpts);
console.log('scaleFrequencies', scaleFrequencies);

const playBtn = document.getElementById('play');
const stopBtn = document.getElementById('stop');
let connected = false;

let index = 0;

// define audio context
const context = new (window.AudioContext || window.webkitAudioContext)();
const oscillator = context.createOscillator();
oscillator.start();
let myInterval;

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
