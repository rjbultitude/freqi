(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.freqi = factory());
}(this, (function () { 'use strict';

  var __PROD__ = process.env.NODE_ENV !== 'test';
  /*
      By Richard Bultitude
      github.com/rjbultitude
  */
  // Constants
  var CHROMATIC_SCALE = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  var PYTHAGOREAN = [[1, 1], [256, 243], [9, 8], [32, 27], [81, 64], [4, 3], [729, 512], [3, 2], [128, 81], [27, 16], [16, 9], [243, 128]];
  var EQTEMP_STR = 'eqTemp';
  var JUSTINT_STR = 'justInt';
  function reallyIsNaN(x) {
      return x !== x;
  }
  function checkAugmentNumArrayConfigTypes(augArrConfig) {
      if (Array.isArray(augArrConfig.originalArray) !== true) {
          throw TypeError('originalArray is not an array');
      }
      else {
          for (var i = 0; i < augArrConfig.originalArray.length; i++) {
              if (reallyIsNaN(augArrConfig.originalArray[i])) {
                  throw TypeError('originalArray contains values that are NaN');
              }
          }
      }
      if (typeof augArrConfig.difference !== 'number' || Number.isNaN(augArrConfig.difference)) {
          throw TypeError('difference is not a number');
      }
      if (augArrConfig.difference <= 0) {
          throw TypeError('difference cannot be 0 or less');
      }
      if (typeof augArrConfig.repeatMultiple !== 'number' || Number.isNaN(augArrConfig.repeatMultiple)) {
          throw TypeError('repeatMultiple is not a number');
      }
      if (typeof augArrConfig.amountToAdd !== 'number' || Number.isNaN(augArrConfig.amountToAdd)) {
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
   * Can add a given amount to each duplicated item if desired
   * Can start from beginning of array
   * after repeatMultiple number of times
   * @param  {Object} augArrConfig    [config object]
   * @return {Array}                  [new array]
   */
  function augmentNumArray(augArrConfig) {
      var _index = 0;
      // error check
      try {
          checkAugmentNumArrayConfigTypes(augArrConfig);
      }
      catch (e) {
          if (__PROD__) {
              console.error(e);
          }
          return [];
      }
      try {
          checkAugmentNumArrayConfigForNegs(augArrConfig);
      }
      catch (e) {
          if (__PROD__) {
              console.error(e);
          }
          return [];
      }
      // begin fn
      var _newArr = augArrConfig.originalArray.map(function (item) {
          return item;
      });
      var _finalArr = [];
      var _diffArr = [];
      var _newVal;
      var _repeatPoint = (augArrConfig.originalArray.length * augArrConfig.repeatMultiple) - 1;
      // loop the number of times
      // needed to make the missing items
      addMissingLoop: for (var i = 0; i < augArrConfig.difference; i++) {
          _newVal = _newArr[_index];
          // Add the extra amount
          // if we're dealing with numbers
          if (typeof augArrConfig.amountToAdd === 'number' && typeof _newVal === 'number') {
              _newVal += augArrConfig.amountToAdd;
          }
          _diffArr.push(_newVal);
          // Start from 0 index
          if (i === _repeatPoint) {
              _index = 0;
              augArrConfig.amountToAdd = 0;
              continue addMissingLoop;
          }
          else if (_index === augArrConfig.originalArray.length - 1) {
              _index = 0;
              augArrConfig.amountToAdd += augArrConfig.amountToAdd;
              continue addMissingLoop;
          }
          _index += 1;
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
      var invalidKeys = ['interval', 'upwardsScale', 'mode'];
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
          if (prop !== 'upwardsScale' && prop !== 'mode') {
              if (typeof dataObj[prop] !== 'number' || Number.isNaN(dataObj[prop])) {
                  throw new TypeError("Config property " + prop + " is not a number");
              }
          }
          else if (prop === 'upwardsScale') {
              if (typeof dataObj[prop] !== 'boolean') {
                  throw new TypeError("Config property " + prop + " is not a boolean");
              }
          }
          else if (prop === 'mode') {
              if (typeof dataObj[prop] !== 'string') {
                  throw new TypeError("Config property " + prop + " is not a string");
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
  function checkGetFreqsForZerosNegs(data) {
      var invalidKeys = ['intervals', 'type', 'rootNote', 'mode'];
      Object.keys(data).forEach(function (prop) {
          if (isPropValid(prop, invalidKeys)) {
              if (prop === 'numSemitones' && data[prop] === 0) {
                  throw new SyntaxError('numSemitones must be a positive number');
              }
              if (data[prop] < 0) {
                  throw new SyntaxError(prop + ' must be zero or a positive number');
              }
          }
      });
  }
  function checkGetFreqsNumericDataTypes(dataObj) {
      Object.keys(dataObj).forEach(function (prop) {
          // Check numeric values
          if (prop !== 'type' && prop !== 'intervals' && prop !== 'mode') {
              if (typeof dataObj[prop] !== 'number' || Number.isNaN(dataObj[prop])) {
                  throw new TypeError('Config property ' + prop + ' is not a number');
              }
          }
      });
      return true;
  }
  function checkGetFreqsIntervalsProp(intervals) {
      if (Array.isArray(intervals) !== true) {
          throw new TypeError('intervals is not an array');
      }
      if (intervals.length === 0) {
          throw new TypeError('intervals array is empty');
      }
      for (var i = 0, length = intervals.length; i < length; i++) {
          if (typeof intervals[i] !== 'number' || Number.isNaN(intervals[i])) {
              throw new TypeError('intervals is not an array of numbers');
          }
      }
  }
  /**
   * ------------
   * Constructors
   * ------------
   */
  function GetFreqsConfig(configObj) {
      // Start frequency
      this.startFreq = configObj.startFreq === undefined ? 440 : configObj.startFreq;
      // Number of semitones in octave
      this.numSemitones = configObj.numSemitones === undefined ? 12 : configObj.numSemitones;
      // Index for start note in scale/chord
      this.rootNote = configObj.rootNote === undefined ? 0 : configObj.rootNote;
      // Pattern to use when using inversions
      this.intervalStartIndex = configObj.intervalStartIndex === undefined ? 0 : configObj.intervalStartIndex;
      // Pattern to use for playback play
      this.intervals = configObj.intervals;
      // The number of times we want to start from the beginning of the intervals arr again
      this.repeatMultiple = configObj.repeatMultiple === undefined ? 0 : configObj.repeatMultiple;
      // Musical tuning mode
      this.mode = configObj.mode === undefined ? EQTEMP_STR : configObj.mode;
      // For debugging
      this.type = configObj.type || 'unknown';
      // Optional extras for handling interval arrays
      // which are of a different length
      // to the desired number of notes
      // Total number of desired notes in the scale
      this.numNotes = configObj.numNotes;
      // How many notes to add if items are missing
      this.amountToAdd = configObj.amountToAdd === undefined ? this.numSemitones : configObj.amountToAdd;
  }
  /**
  * ------------
  * Main module functions
  * ------------
  */
  function getIntervalAndMult(interval) {
      var _intervalAbs = Math.abs(interval);
      var _mult = _intervalAbs / PYTHAGOREAN.length;
      var _multFloor = Math.floor(_mult);
      var _inRangeIndex = _intervalAbs - (_multFloor * PYTHAGOREAN.length);
      var _negIndex = PYTHAGOREAN.length - _inRangeIndex;
      var _multF;
      if (_intervalAbs % PYTHAGOREAN.length === 0) {
          return {
              mult: _mult,
              rangeInterval: 0
          };
      }
      var _newInterval;
      if (interval >= 0) {
          _newInterval = interval - (_multFloor * PYTHAGOREAN.length);
          _multF = _multFloor;
      }
      else {
          _newInterval = _negIndex;
          _multF = _multFloor + 1;
      }
      return {
          mult: _multF,
          rangeInterval: _newInterval
      };
  }
  function getEqTempNote(eTNoteConfig, _up) {
      if (_up) {
          return eTNoteConfig.startFreq * Math.pow(2, eTNoteConfig.interval / eTNoteConfig.numSemitones);
      }
      return eTNoteConfig.startFreq / Math.pow(2, Math.abs(eTNoteConfig.interval) / eTNoteConfig.numSemitones);
  }
  function getJustIntNote(eTNoteConfig, _up) {
      var _rangeObj = getIntervalAndMult(eTNoteConfig.interval);
      var _ratioFraction = PYTHAGOREAN[_rangeObj.rangeInterval][0] / PYTHAGOREAN[_rangeObj.rangeInterval][1];
      var _multiplier = Math.pow(2, _rangeObj.mult);
      var _noteVal = eTNoteConfig.startFreq * _ratioFraction;
      console.log('PYTHAGOREAN[_rangeObj.rangeInterval]', PYTHAGOREAN[_rangeObj.rangeInterval]);
      if (_rangeObj.rangeInterval > PYTHAGOREAN.length) {
          console.error('rangeInterval out of range');
      }
      if (_up) {
          return _noteVal * _multiplier;
      }
      return _noteVal / _multiplier;
  }
  function getSingleFreq(eTNoteConfig) {
      try {
          checkGetSingleFreqConfigDataTypes(eTNoteConfig);
      }
      catch (e) {
          if (__PROD__) {
              console.error(e);
          }
          return false;
      }
      try {
          checkGetSingleFreqConfigForNegs(eTNoteConfig);
      }
      catch (e) {
          if (__PROD__) {
              console.error(e);
          }
          return false;
      }
      var _intervalIsPos = eTNoteConfig.interval >= 0;
      var _up = eTNoteConfig.upwardsScale === undefined ? _intervalIsPos : eTNoteConfig.upwardsScale;
      var _note = getEqTempNote(eTNoteConfig, _up);
      if (eTNoteConfig.mode === EQTEMP_STR) {
          _note = getEqTempNote(eTNoteConfig, _up);
      }
      else if (eTNoteConfig.mode === JUSTINT_STR) {
          _note = getJustIntNote(eTNoteConfig, _up);
      }
      else {
          if (__PROD__) {
              console.warn('No mode set');
          }
          return false;
      }
      return _note;
  }
  // Adds new items to the intervals array
  // should it not have enough notes
  function addMissingNotesFromInterval(pConfig) {
      var _intervals = [];
      var _highestIndex = pConfig.intervalStartIndex + pConfig.numNotes;
      var _intervalsLength = pConfig.scaleIntervals.length;
      if (_highestIndex > _intervalsLength) {
          var _diff = _highestIndex - _intervalsLength;
          _intervals = augmentNumArray({
              originalArray: pConfig.scaleIntervals,
              difference: _diff,
              amountToAdd: pConfig.amountToAdd,
              repeatMultiple: pConfig.repeatMultiple,
          });
      }
      else {
          _intervals = pConfig.scaleIntervals;
      }
      return _intervals;
  }
  function getNotesFromIntervals(pConfig) {
      var _scaleArray = [];
      // For Inversions or rootless voicings
      var _intervalStartIndex = pConfig.intervalStartIndex;
      var _newNote;
      for (var i = 0; i < pConfig.loopLength; i++) {
          // __PROD__ && console.log('note ' + i + ' ' + pConfig.type);
          // __PROD__ && console.log('scaleInterval', pConfig.scaleIntervals[_intervalStartIndex]);
          // __PROD__ && console.log('intervaloffset ' + _intervalStartIndex + ' centreNote Index ' + pConfig.rootNote);
          var finalIndex = pConfig.scaleIntervals[_intervalStartIndex] + pConfig.rootNote;
          // __PROD__ && console.log('final highest Index', finalIndex);
          _newNote = getSingleFreq({
              startFreq: pConfig.startFreq,
              numSemitones: pConfig.numSemitones,
              mode: pConfig.mode,
              interval: finalIndex,
          });
          // Error check
          if (_newNote !== undefined || Number.isNaN(_newNote) === false) {
              _scaleArray.push(_newNote);
          }
          else if (__PROD__) {
              console.error('undefined or NaN note');
          }
          _intervalStartIndex += 1;
      }
      return _scaleArray;
  }
  // Accepts only an object
  function getFreqs(msConfig) {
      var _validConfig;
      // Check config exists
      if (typeof msConfig !== 'object') {
          if (__PROD__) {
              console.error('Musical Scale Config should be an object');
          }
          // Check and fix undefined
      }
      else {
          _validConfig = new GetFreqsConfig(msConfig);
      }
      try {
          checkGetFreqsIntervalsProp(_validConfig.intervals);
      }
      catch (e) {
          if (__PROD__) {
              console.error(e);
          }
          return false;
      }
      // Ensure numNotes is set
      if (_validConfig.numNotes === undefined) {
          _validConfig.numNotes = _validConfig.intervals.length;
      }
      // Check all data types
      try {
          checkGetFreqsNumericDataTypes(msConfig);
      }
      catch (e) {
          if (__PROD__) {
              console.error('Check your config values are valid', e);
          }
          return false;
      }
      // Check for negative numbers
      try {
          checkGetFreqsForZerosNegs(msConfig);
      }
      catch (e) {
          if (__PROD__) {
              console.error('Check your config values are valid', e);
          }
          return false;
      }
      // Set vars
      var _scaleArray = [];
      var _intervals = _validConfig.intervals;
      // Add missing scale intervals
      var _intervalsFull = addMissingNotesFromInterval({
          amountToAdd: _validConfig.amountToAdd,
          intervalStartIndex: _validConfig.intervalStartIndex,
          numNotes: _validConfig.numNotes,
          repeatMultiple: _validConfig.repeatMultiple,
          scaleIntervals: _intervals,
          type: _validConfig.type,
      });
      // Inversions are acheived by
      // selecting an index from within the intervals themselves
      var _loopLength = _intervalsFull.length - _validConfig.intervalStartIndex;
      // Where the magic happens
      _scaleArray = getNotesFromIntervals({
          startFreq: _validConfig.startFreq,
          scaleIntervals: _intervalsFull,
          numSemitones: _validConfig.numSemitones,
          rootNote: _validConfig.rootNote,
          intervalStartIndex: _validConfig.intervalStartIndex,
          loopLength: _loopLength,
          mode: _validConfig.mode,
          type: _validConfig.type,
      });
      console.log('_scaleArray', _scaleArray);
      return _scaleArray;
  }
  var freqi = {
      getFreqs: getFreqs,
      augmentNumArray: augmentNumArray,
      getSingleFreq: getSingleFreq,
      CHROMATIC_SCALE: CHROMATIC_SCALE,
  };

  return freqi;

})));
