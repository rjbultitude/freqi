'use strict';

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

    // Utility fns
    function arrayInsertAt(destArray, pos, arrayToInsert) {
      var _args = [];
      _args.push(pos);                           // where to insert
      _args.push(0);                             // nothing to remove
      _args = _args.concat(arrayToInsert);        // add on array to insert
      destArray.splice.apply(destArray, _args);  // splice it in
      return destArray;
    }

    // Data sanitisation
    function checkForNegatives(data) {
       for (var prop in data) {
         if (data.hasOwnProperty(prop) && prop !== 'downFirst') {
           if (data[prop] < 0) {
             throw new SyntaxError(prop + ' must be a positive number');
           }
           if (typeof data[prop] !== 'number') {
             throw new TypeError(prop + ' must be a number');
           }
         }
       }
     }

    // Data sanitisation
    function checkDataTypes(dataObj) {
      for (var prop in dataObj) {
        if (dataObj.hasOwnProperty(prop) && prop !== 'downFirst') {
          if (typeof dataObj[prop] !== 'number') {
            throw new Error('Config property ' + prop + ' is not a number');
          }
        } else if (dataObj.hasOwnProperty(prop)) {
          if (typeof dataObj[prop] !== 'boolean') {
            throw new Error('Config property ' + prop + ' is not a boolean');
          }
        }
      }
      return true;
    }

    // function getNoteLetters(numSemisPerOctave, startLetter, scale) {
    //   var _rootNoteLetters = [];
    //   if (numSemisPerOctave !== 12) {
    //     console.log('Cannot report letter due to non western scale');
    //   } else {
    //     console.log('CHROMATIC_SCALE', CHROMATIC_SCALE);
    //   }
    //   return _rootNoteLetters;
    // }
    //
    // var CHROMATIC_SCALE = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

    // Constructor
    function Config(configObj) {
      this.startFreq = configObj.startFreq;
      this.numOctaves = configObj.numOctaves;
      this.numSemitones = Math.ceil(configObj.numSemitones);
      this.downFirst = configObj.downFirst;
    }

    // Default values
    var defaults = new Config({
      startFreq: 440,
      numOctaves: 2,
      numSemitones: 12,
      downFirst: true
    });

    /**
    * createEqTempScale
    * Create a musical scale starting at a given frequency and counting up or down
    * Uses the formula for equal temperament
    * @param  {[Number]} startFreq     [A frequency or number to start at]
    * @param  {[Number]} numTones      [the number of tones (or semitone) in an octave ]
    * @param  {[Boolean]} includeOctave [a Boolean which determines whether an closing note is applied or not ]
    * @return {[Array]}               [an array containing all the frequencies in the scale]
    */
    function createEqTempScale(config) {
       var _scale = [];
       var _freqHigh;
       var _freqLow;
       var _numSemisInOct = config.numSemitones;
       if (config.includeOctave) {
         _numSemisInOct = config.numSemitones + 1;
       }
       if (config.upwardsScale) {
         for (var i = 1; i < _numSemisInOct; i++) {
           // formula for equal temperament
           _freqHigh = config.startFreq * Math.pow(2, i/config.numSemitones);
           _scale.push(_freqHigh);
         }
       } else {
         for (var j = _numSemisInOct; j > 0; j--) {
           // formula for equal temperament
           _freqLow = config.startFreq / Math.abs(Math.pow(2, j/config.numSemitones));
           _scale.push(_freqLow);
         }
       }
       return _scale;
     }

     /**
      * [findCentreFreqIndex finds the index in an array of notes or tones based on the number of octaves and semitones]
      * essentially it finds the median
      * @param  {[object]} config       [must contain number of octaves in the scale]
      * @return {[Number]}              [the index representing the start frequency]
      */
     function findCentreFreqIndex(config) {
       //numOctaves, numSemitones, downFirst
       var _totalNotes = config.numOctaves * config.numSemitones;
       var _noteIndex = null;
       //odd
       if(config.numOctaves % 2 === 1) {
         //If we went down first
         if (config.downFirst) {
           _noteIndex = config.numSemitones * ((config.numOctaves + 1) / 2);
         }
         //If we went up first
         else {
           _noteIndex = config.numSemitones * ((config.numOctaves - 1) / 2);
         }
         return _noteIndex;
       }
       //even
       else {
         _noteIndex = _totalNotes / 2;
         return _noteIndex;
       }
     }

     /**
      * [createJustMusicalExpScale creates an equal temperament musical scale of any length]
      * @param  {[Number]} startFreq    [a number representing the frequency or pitch]
      * @param  {[Number]} numOctaves   [the number of octaves to create]
      * @param  {[Number]} numSemitones [the number of semitones per octave]
      * @return {[Array]}              [an array of frequencies or pitches]
      */
     function createEqTempMusicalScale(masterConfig) {
       // No config error handler
       if (!masterConfig) {
         console.error('No masterConfig object supplied, using defaults', defaults);
         masterConfig = defaults;
       }
       // Incorrect data handler
       try {
         checkDataTypes(masterConfig);
       } catch (e) {
         console.error(e);
         return;
       }
       // Wrong numeric value handler
       var _validConfig = new Config(masterConfig);
       try {
         checkForNegatives(_validConfig);
       } catch (e) {
         console.error(e, 'Ensure the values of your config are correct');
         return;
       }
       // Start fn
       var _scale = [];
       var _centreFreqIndex = findCentreFreqIndex(_validConfig);
       var _posCount = _validConfig.startFreq;
       var _negCount = _validConfig.startFreq;
       var _modRemainder = 1;
       if (_validConfig.downFirst) {
         _modRemainder = 0;
       } else {
         _modRemainder = 1;
       }
       for (var i = 0; i < _validConfig.numOctaves; i++) {
         //Create downwards _scale
         if (i % 2 === _modRemainder) {
           //always insert the smallest freqs at the start
           _scale = arrayInsertAt(_scale, 0, createEqTempScale({
             startFreq: _negCount,
             numSemitones: _validConfig.numSemitones,
             includeOctave: false,
             upwardsScale: false
           }));
           _negCount = _negCount / 2;
         } else {
           //Create upwards _scale
           _scale = _scale.concat(createEqTempScale({
             startFreq: _posCount,
             numSemitones: _validConfig.numSemitones,
             includeOctave: true,
             upwardsScale: true
           }));
           _posCount *= 2;
         }
       }
       //Add centre frequency
       _scale.splice(_centreFreqIndex, 0, masterConfig.startFreq);
       return {
         scale : _scale,
         centreFreqIndex : _centreFreqIndex
       };
     }

     function getPitchesFromIntervals(pConfig) {
        var _scaleArray = [];
        var _intervalIndexOffset = pConfig.intervalIndexOffset;
        var _newNote;
        for (var i = 0; i < pConfig.numNotes; i++) {
          //console.log('note ' + i + ' ' + pConfig.type + ' scaleInterval', pConfig.scaleIntervals[_intervalIndexOffset]);
          //console.log('intervaloffset ' + _intervalIndexOffset + ' centreNoteI ' + pConfig.centreNoteIndex + ' Final index ', pConfig.scaleIntervals[_intervalIndexOffset] + pConfig.centreNoteIndex);
          _newNote = pConfig.allNotesArr[pConfig.scaleIntervals[_intervalIndexOffset] + pConfig.centreNoteIndex];
          //error check
          if (_newNote !== undefined || isNaN(_newNote) === false) {
            _scaleArray.push(_newNote);
          } else {
            console.error('undefined or NaN note');
          }
          _intervalIndexOffset++;
        }
        return _scaleArray;
      }

     return createEqTempMusicalScale;
}));
