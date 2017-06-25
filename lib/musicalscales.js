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

  function checkAugmentNumArrayConfigTypes(augArrConfig) {
    if (Array.isArray(augArrConfig.originalArray !== true)) {
      throw TypeError('originalArray is not an array');
    } else {
      for (var i = 0; i < augArrConfig.originalArray.length; i++) {
        if (typeof augArrConfig.originalArray[i] !== 'number' || isNaN(augArrConfig.originalArray[i])) {
          throw TypeError('originalArray contains values that aren\'t numbers');
        }
      }
    }
    if (typeof augArrConfig.difference !== 'number' || isNaN(augArrConfig.difference)) {
      throw TypeError('difference is not a number');
    }
    if (typeof augArrConfig.repeatMultiple !== 'number' || isNaN(augArrConfig.repeatMultiple)) {
      console.log('typeof augArrConfig.repeatMultiple', typeof augArrConfig.repeatMultiple);
      throw TypeError('repeatMultiple is not a number');
    }
    if (typeof augArrConfig.amountToAdd !== 'number' || isNaN(augArrConfig.amountToAdd)) {
      throw TypeError('amountToAdd is not a number');
    }
  }

  function checkAugmentNumArrayConfigForNegs(augArrConfig) {
    console.log('augArrConfig', augArrConfig);
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

  function checkSpecificNoteConfigForNegs(dataObj) {
    var invalidKeys = ['interval', 'upwardsScale'];
      for (var prop in dataObj) {
        if (isPropValid(prop, invalidKeys)) {
          if (dataObj[prop] < 0) {
            throw new SyntaxError(prop + ' must be a positive number');
        }
      }
    }
  }

  function checkSpecificNoteConfigDataTypes(dataObj) {
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

  function checkSpecificScaleForNegs(data) {
    var invalidKeys = ['intervals', 'type', 'rootNote'];
      for (var prop in data) {
        if (isPropValid(prop, invalidKeys)) {
          if (data[prop] < 0) {
            throw new SyntaxError(prop + ' must be a positive number');
        }
      }
    }
  }

  function checkSpecificScaleDataTypes(dataObj) {
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

  function SpecificScaleConfig(configObj) {
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

  function getSpecificNote(eTNoteConfig) {
    //startFreq, numSemitones, interval, upwardsScale
    try {
      checkSpecificNoteConfigDataTypes(eTNoteConfig);
    } catch (e) {
      __PROD__ && console.error(e);
      return false;
    }
    try {
      checkSpecificNoteConfigForNegs(eTNoteConfig);
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
        _newNote = getSpecificNote({
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
  function getSpecificScale(msConfig) {
      __PROD__ && console.log('msConfig', msConfig);
      var _validConfig;
      // Check config exists
      if (typeof msConfig !== 'object') {
        __PROD__ && console.error('Warning: Musical Scale Config should be an object');
        _validConfig = new SpecificScaleConfig();
      // Check and fix undefined
      } else {
        _validConfig = new SpecificScaleConfig(msConfig);
      }
      // Check all data types
      try {
        checkSpecificScaleDataTypes(msConfig);
      } catch(e) {
        __PROD__ && console.error('Check your config values are valid', e);
        return false;
      }
      // Check for negative numbers
      try {
        checkSpecificScaleForNegs(msConfig);
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
    getSpecificScale: getSpecificScale,
    augmentNumArray: augmentNumArray,
    getSpecificNote: getSpecificNote,
    CHROMATIC_SCALE: CHROMATIC_SCALE
  };
}));
