'use strict';
const freqi = require('../lib/freqi');

const cNoteFreq =  261.6;
const cMajorScale = [0, 2, 4, 5, 7, 9, 11];

const scaleConfigAllOpts = {
  startFreq: cNoteFreq,
  numSemitones: 12,
  numNotes: 8,
  inversionStartNote: 0,
  rootNote: 0,
  intervals: cMajorScale,
  amountToAdd: 12,
  type: 'some useful description'
};

const scaleConfigJustIntOpts = {
  startFreq: cNoteFreq,
  numSemitones: 12,
  rootNote: 0,
  intervals: cMajorScale,
  mode: 'pythagorean'
};

const scaleConfigMandatoryOpts = {
  intervals: [-3, 0, 5, 7]
};

const scaleConfigHSeriesOpts = {
  startFreq: 1960,
  intervals: [1, -2, -3, -4, -5],
  mode: 'hSeries'
};

const scaleConfigTruePythagOpts = {
  startFreq: cNoteFreq,
  intervals: [0, 12, 24, 36, 48],
  mode: 'truePythag'
};

const scaleFrequencies = freqi.getFreqs(scaleConfigAllOpts);
// const scaleFrequencies = freqi.getFreqs(scaleConfigMandatoryOpts);
// const scaleFrequencies = freqi.getFreqs(scaleConfigJustIntOpts);
// const scaleFrequencies = freqi.getFreqs(scaleConfigHSeriesOpts);
// const scaleFrequencies = freqi.getFreqs(scaleConfigTruePythagOpts);
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
  console.log(scale[index]);
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
    play(scaleFrequencies, 2000);
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
