(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
var freqi = require('../lib/freqi');

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

freqi.augmentNumArray(augArrayOpts);

//var scaleFrequencies = freqi.getSpecificScale(scaleConfigAllOpts);
var scaleFrequencies = freqi.getFreqs(scaleConfigOpts);
console.log('scaleFrequencies', scaleFrequencies);

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
    play(scaleFrequencies, 1000);
  }
});

stopBtn.addEventListener('click', function(e) {
  e.preventDefault();
  if (connected) {
    stop();
  }
});

},{"../lib/freqi":2}],2:[function(require,module,exports){
(function (process){
'use strict';

var __PROD__ = process.env.NODE_ENV !== 'test';
//var __PROD__ = true;

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.returnExports = factory();
  }
}(this, function () {
  /*
      By Richard Bultitude
      github.com/rjbultitude
  */

  // Constants
  var CHROMATIC_SCALE = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

  function reallyIsNaN(x) {
    return x !== x;
  }

  function checkAugmentNumArrayConfigTypes(augArrConfig) {
    if (Array.isArray(augArrConfig.originalArray !== true)) {
      throw TypeError('originalArray is not an array');
    } else {
      for (var i = 0; i < augArrConfig.originalArray.length; i++) {
        if (reallyIsNaN(augArrConfig.originalArray[i])) {
          throw TypeError('originalArray contains values that are NaN');
        }
      }
    }
    if (typeof augArrConfig.difference !== 'number' || isNaN(augArrConfig.difference)) {
      throw TypeError('difference is not a number');
    }
    if (typeof augArrConfig.repeatMultiple !== 'number' || isNaN(augArrConfig.repeatMultiple)) {
      throw TypeError('repeatMultiple is not a number');
    }
    if (typeof augArrConfig.amountToAdd !== 'number' || isNaN(augArrConfig.amountToAdd)) {
      throw TypeError('amountToAdd is not a number');
    }
  }

  function checkAugmentNumArrayConfigForNegs(augArrConfig) {
    if (augArrConfig.difference <= 0) {
      throw SyntaxError('difference should be higher than 0');
    }
    if (augArrConfig.repeatMultiple < 0) {
      throw SyntaxError('repeatMultiple should be 0 or higher');
    }
    if (augArrConfig.amountToAdd < 0) {
      throw SyntaxError('amountToAdd should be 0 or higher');
    }
  }

  /**
   * Duplicates items 'difference' number of times
   * and can add a given amount to each duplicated item if desired
   * and can repeat as many times as specified
   * @param  {Object} augArrConfig    [config object]
   * @return {Array}                  [new array]
   */
  function augmentNumArray(augArrConfig) {
    // error check
    try {
      checkAugmentNumArrayConfigTypes(augArrConfig);
    } catch (e) {
      __PROD__ && console.error(e);
      return false;
    }
    try {
      checkAugmentNumArrayConfigForNegs(augArrConfig);
    } catch (e) {
      __PROD__ && console.error(e);
      return false;
    }
    // begin fn
    var _index = 0;
    var _newArr = augArrConfig.originalArray.map(function(item) {
      return item;
    });
    var _finalArr = [];
    var _diffArr = [];
    var _newVal;
    var _repeatPoint = (augArrConfig.originalArray.length * augArrConfig.repeatMultiple) - 1;
    // loop the number of times
    // needed to make the missing items
    addMissingLoop:
    for (var i = 0; i < augArrConfig.difference; i++) {
      _newVal = _newArr[_index];
      //Add the extra amount
      //if we're dealing with numbers
      if (typeof augArrConfig.amountToAdd === 'number' && typeof _newVal === 'number') {
        _newVal += augArrConfig.amountToAdd;
      }
      _diffArr.push(_newVal);
      //Start from 0 index
      //when there's no more items left
      if (i === _repeatPoint) {
        _index = 0;
        augArrConfig.amountToAdd = 0;
        continue addMissingLoop;
      } else if (_index === augArrConfig.originalArray.length - 1) {
        _index = 0;
        augArrConfig.amountToAdd += augArrConfig.amountToAdd;
        continue addMissingLoop;
      }
      _index++;
    }
    _finalArr = _newArr.concat(_diffArr);
    return _finalArr;
  }

  function isPropValid(prop, inValidKeys) {
    for (var i = 0; i < inValidKeys.length; i++) {
      if (prop === inValidKeys[i]) {
        return false;
      }
    }
    return true;
  }

  /**
   * ------------
   * Equal temperament data sanitisation
   * ------------
   */

  function checkGetSingleFreqConfigForNegs(dataObj) {
    var invalidKeys = ['interval', 'upwardsScale'];
      for (var prop in dataObj) {
        if (isPropValid(prop, invalidKeys)) {
          if (dataObj[prop] < 0) {
            throw new SyntaxError(prop + ' must be a positive number');
        }
      }
    }
  }

  function checkGetSingleFreqConfigDataTypes(dataObj) {
    for (var prop in dataObj) {
      if (prop !== 'upwardsScale') {
        if (typeof dataObj[prop] !== 'number' || isNaN(dataObj[prop])) {
          throw new TypeError('Config property ' + prop + ' is not a number');
        }
      } else {
        if (typeof dataObj[prop] !== 'boolean') {
          throw new TypeError('Config property ' + prop + ' is not a boolean');
        }
      }
    }
    return true;
  }

  /**
  * ------------
  * Musical Scale data sanitisation
  * ------------
  */

  function checkGetFreqsForNegs(data) {
    var invalidKeys = ['intervals', 'type', 'rootNote'];
      for (var prop in data) {
        if (isPropValid(prop, invalidKeys)) {
          if (data[prop] < 0) {
            throw new SyntaxError(prop + ' must be a positive number');
        }
      }
    }
  }

  function checkGetFreqsDataTypes(dataObj) {
    for (var prop in dataObj) {
      // Check numeric values
      if (prop !== 'type' && prop !== 'intervals') {
        if (typeof dataObj[prop] !== 'number' || isNaN(dataObj[prop])) {
           throw new TypeError('Config property ' + prop + ' is not a number');
        }
      // Check intervals array
      } else if (prop === 'intervals') {
          if (Array.isArray(dataObj[prop]) !== true) {
           throw new TypeError('Config property ' + prop + ' is not an array');
        } else {
          for (var i = 0, length = dataObj[prop].length; i < length; i++) {
            if (typeof dataObj[prop][i] !== 'number' || isNaN(dataObj[prop][i])) {
              throw new TypeError(prop + ' is not an array of numbers');
            }
          }
        }
      }
    }
    return true;
  }

  /**
   * ------------
   * Constructors
   * ------------
   */

  function getFreqsConfig(configObj) {
    // Start frequency
    this.startFreq = configObj.startFreq === undefined ? 440 : configObj.startFreq;
    // Number of semitones in octave
    this.numSemitones = configObj.numSemitones === undefined ? 12 : configObj.numSemitones;
    // Index for start note in scale/chord
    this.rootNote = configObj.rootNote === undefined ? 0 : configObj.rootNote;
    // Pattern to use when using inversions
    this.inversionStartNote = configObj.inversionStartNote === undefined ? 0 : configObj.inversionStartNote;
    // Pattern to use for playback play
    this.intervals = configObj.intervals === undefined ? [0, 3, 5] : configObj.intervals;
    // How many times to repeat if notes are missing
    this.repeatMultiple = configObj.repeatMultiple === undefined ? 0 : configObj.repeatMultiple;
    // For debugging
    this.type = configObj.type || 'unknown';
    // Optional extras for handling interval arrays
    // which are of a different length
    // to the desired number of notes

    // Total number of desired notes in the scale
    this.numNotes = configObj.numNotes === undefined ? this.intervals.length : configObj.numNotes;
    // How many notes to add if items are missing
    this.amountToAdd = configObj.amountToAdd === undefined ? this.numSemitones : configObj.amountToAdd;
  }

  /**
  * ------------
  * Main module functions
  * ------------
  */

  function getSingleFreq(eTNoteConfig) {
    try {
      checkGetSingleFreqConfigDataTypes(eTNoteConfig);
    } catch (e) {
      __PROD__ && console.error(e);
      return false;
    }
    try {
      checkGetSingleFreqConfigForNegs(eTNoteConfig);
    } catch (e) {
      __PROD__ && console.error(e);
      return false;
    }
    var _intervalIsPos = eTNoteConfig.interval >= 0 ? true : false;
    var _up = eTNoteConfig.upwardsScale === undefined ? _intervalIsPos : eTNoteConfig.upwardsScale;
    var _note = null;
    if (_up) {
      _note = eTNoteConfig.startFreq * Math.pow(2, eTNoteConfig.interval/eTNoteConfig.numSemitones);
    } else {
      _note = eTNoteConfig.startFreq / Math.pow(2, Math.abs(eTNoteConfig.interval)/eTNoteConfig.numSemitones);
    }
    return _note;
  }

  // Adds new items to the intervals array
  // should it not have enough notes
  function addMissingNotesFromInterval(pConfig) {
      var _intervals = [];
      var _highestIndex = pConfig.inversionStartNoteIndex + pConfig.numNotes;
      var _intervalsLength = pConfig.scaleIntervals.length;
      if (_highestIndex > _intervalsLength) {
        var _diff = _highestIndex - _intervalsLength;
        _intervals = augmentNumArray({
          originalArray: pConfig.scaleIntervals,
          difference: _diff,
          amountToAdd: pConfig.amountToAdd,
          repeatMultiple: pConfig.repeatMultiple
        });
        __PROD__ && console.log('added missing items to ' + pConfig.type, _intervals);
      } else {
        _intervals = pConfig.scaleIntervals;
      }
      return _intervals;
  }

  function getNotesFromIntervals(pConfig) {
      var _scaleArray = [];
      // For Inversions
      var _inversionStartNoteIndex = pConfig.inversionStartNoteIndex;
      var _newNote;
      for (var i = 0; i < pConfig.scaleIntervals.length; i++) {
        //console.log('note ' + i + ' ' + pConfig.type);
        //console.log('scaleInterval', pConfig.scaleIntervals[_inversionStartNoteIndex]);
        //console.log('intervaloffset ' + _inversionStartNoteIndex + ' centreNote Index ' + pConfig.centreFreqIndex);
        var finalIndex = pConfig.scaleIntervals[_inversionStartNoteIndex] + pConfig.centreFreqIndex;
        //console.log('final highest Index', finalIndex);
        //_newNote = pConfig.allNotesArr[finalIndex];
        _newNote = getSingleFreq({
          startFreq: pConfig.startFreq,
          numSemitones: pConfig.numSemitones,
          interval: finalIndex,
        });
        //error check
        if (_newNote !== undefined || isNaN(_newNote) === false) {
          _scaleArray.push(_newNote);
        } else {
          __PROD__ && console.error('undefined or NaN note');
        }
        _inversionStartNoteIndex++;
      }
      return _scaleArray;
  }

    //Accepts only an object
  function getFreqs(msConfig) {
      __PROD__ && console.log('msConfig', msConfig);
      var _validConfig;
      // Check config exists
      if (typeof msConfig !== 'object') {
        __PROD__ && console.error('Warning: Musical Scale Config should be an object');
        _validConfig = new getFreqsConfig();
      // Check and fix undefined
      } else {
        _validConfig = new getFreqsConfig(msConfig);
      }
      // Check all data types
      try {
        checkGetFreqsDataTypes(msConfig);
      } catch(e) {
        __PROD__ && console.error('Check your config values are valid', e);
        return false;
      }
      // Check for negative numbers
      try {
        checkGetFreqsForNegs(msConfig);
      } catch(e) {
        __PROD__ && console.error('Check your config values are valid', e);
        return false;
      }
      //Set vars
      var _scaleArray = [];
      var _rootAndInversionOffset = _validConfig.rootNote + _validConfig.inversionStartNote;
      __PROD__ && console.log('_rootAndInversionOffset', _rootAndInversionOffset);
      var _intervals = _validConfig.intervals;
      //var _intervals = intervals[_validConfig.chordKey];
      // add missing scale intervals
      var _intervalsFull = addMissingNotesFromInterval({
        amountToAdd: _validConfig.amountToAdd,
        inversionStartNoteIndex: _validConfig.inversionStartNote,
        numNotes: _validConfig.numNotes,
        repeatMultiple: _validConfig.repeatMultiple,
        scaleIntervals: _intervals,
        type: _validConfig.type
      });
      // Inversions are acheived by
      // selecting an index from within the intervals themselves
      _scaleArray = getNotesFromIntervals({
          startFreq: _validConfig.startFreq,
          scaleIntervals: _intervalsFull,
          numSemitones: _validConfig.numSemitones,
          centreFreqIndex: _rootAndInversionOffset,
          // TODO not sure this is needed
          // or being used correctly
          inversionStartNoteIndex: _validConfig.inversionStartNote,
          type: _validConfig.type
        });
      return _scaleArray;
  }

  return {
    getFreqs: getFreqs,
    augmentNumArray: augmentNumArray,
    getSingleFreq: getSingleFreq,
    CHROMATIC_SCALE: CHROMATIC_SCALE
  };
}));

}).call(this,require('_process'))
},{"_process":3}],3:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}]},{},[1]);
