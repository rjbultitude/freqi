var eqTemp = {
	name: "eqTemp",
	shortName: "12TET",
	longName: "12 Tone Equal Temperament",
	intervalsInOctave: 12,
	intervalRatios: null,
	type: "tempered",
	scaleType: "",
	includesComma: false,
	notes: "An arbritray scale widely used in western music"
};
var hSeries = {
	name: "hSeries",
	shortName: "Harmonic Series",
	longName: "Harmonic Series",
	intervalsInOctave: null,
	intervalRatios: null,
	type: "pure",
	scaleType: "",
	includesComma: false,
	notes: "A set of whole number ratios representing how sound works in nature"
};
var truePythag = {
	name: "truePythag",
	shortName: "True Pythagorean",
	longName: "Pythagorean just intaonation including the syntonic comma",
	intervalsInOctave: 12,
	intervalRatios: [
		[
			3,
			2
		]
	],
	type: "just",
	scaleType: "chromatic",
	includesComma: true,
	notes: "A set of whole number ratios using only fifths e.g. 3/2"
};
var pythagorean = {
	name: "pythagorean",
	shortName: "Pythagorean",
	longName: "Pythagorean just intonation excluding the syntonic comma",
	intervalsInOctave: 12,
	intervalRatios: [
		[
			1,
			1
		],
		[
			256,
			243
		],
		[
			9,
			8
		],
		[
			32,
			27
		],
		[
			81,
			64
		],
		[
			4,
			3
		],
		[
			729,
			512
		],
		[
			3,
			2
		],
		[
			128,
			81
		],
		[
			27,
			16
		],
		[
			16,
			9
		],
		[
			243,
			128
		]
	],
	type: "just",
	scaleType: "chromatic",
	includesComma: false,
	notes: "A set of whole number ratios using only fifths (3/2) except for the octave (2/1)"
};
var fiveLimit = {
	name: "fiveLimit",
	shortName: "Five limit just intonation",
	longName: "Five limit just intonation",
	intervalsInOctave: 12,
	intervalRatios: [
		[
			1,
			1
		],
		[
			16,
			15
		],
		[
			9,
			8
		],
		[
			6,
			5
		],
		[
			5,
			4
		],
		[
			4,
			3
		],
		[
			64,
			45
		],
		[
			3,
			2
		],
		[
			8,
			5
		],
		[
			5,
			3
		],
		[
			9,
			5
		],
		[
			15,
			8
		]
	],
	type: "just",
	scaleType: "chromatic",
	includesComma: false,
	notes: "A set of whole number ratios using only powers of 2, 3, or 5"
};
var diatonic = {
	name: "diatonic",
	shortName: "Five limit diatonic",
	longName: "Five limit diatonic / Ptolemy's intense diatonic",
	intervalsInOctave: 7,
	intervalRatios: [
		[
			1,
			1
		],
		[
			9,
			8
		],
		[
			5,
			4
		],
		[
			4,
			3
		],
		[
			3,
			2
		],
		[
			5,
			3
		],
		[
			15,
			8
		]
	],
	type: "just",
	scaleType: "heptatonic",
	includesComma: false,
	notes: "A justly-tuned major diatonic scale that uses the 5-limit system devised by Ptolemy"
};
var diatonicIndian = {
	name: "diatonicIndian",
	shortName: "Five limit diatonic Indian",
	longName: "Five limit diatonic Indian",
	intervalsInOctave: 7,
	intervalRatios: [
		[
			1,
			1
		],
		[
			9,
			8
		],
		[
			5,
			4
		],
		[
			4,
			3
		],
		[
			3,
			2
		],
		[
			27,
			16
		],
		[
			15,
			8
		]
	],
	type: "just",
	scaleType: "heptatonic",
	includesComma: false,
	notes: "A justly-tuned diatonic scale that uses 27/16 for Dha"
};
var twentyTwoShrutis = {
	name: "twentyTwoShrutis",
	shortName: "Twenty Two Shrutis",
	longName: "Twenty Two Shrutis",
	intervalsInOctave: 22,
	intervalRatios: [
		[
			1,
			1
		],
		[
			256,
			243
		],
		[
			16,
			15
		],
		[
			10,
			9
		],
		[
			9,
			8
		],
		[
			32,
			27
		],
		[
			6,
			5
		],
		[
			5,
			4
		],
		[
			81,
			64
		],
		[
			4,
			3
		],
		[
			27,
			20
		],
		[
			45,
			32
		],
		[
			729,
			512
		],
		[
			3,
			2
		],
		[
			128,
			81
		],
		[
			8,
			5
		],
		[
			5,
			3
		],
		[
			27,
			16
		],
		[
			16,
			9
		],
		[
			9,
			5
		],
		[
			15,
			8
		],
		[
			243,
			128
		]
	],
	type: "just",
	scaleType: "",
	includesComma: false,
	notes: "A justly-tuned Indian scale described by the Bharata and Dattilam"
};
var gioseffoZarlino = {
	name: "gioseffoZarlino",
	shortName: "Gioseffo Zarlino 16",
	longName: "Gioseffo Zarlino 16 note just intonation",
	intervalsInOctave: 16,
	intervalRatios: [
		[
			1,
			1
		],
		[
			25,
			24
		],
		[
			10,
			9
		],
		[
			9,
			8
		],
		[
			32,
			27
		],
		[
			6,
			5
		],
		[
			5,
			4
		],
		[
			4,
			3
		],
		[
			25,
			18
		],
		[
			45,
			32
		],
		[
			3,
			2
		],
		[
			25,
			16
		],
		[
			5,
			3
		],
		[
			16,
			9
		],
		[
			9,
			5
		],
		[
			15,
			8
		]
	],
	type: "just",
	scaleType: "",
	includesComma: false,
	notes: "TBC"
};
var majorPentatonic = {
	name: "majorPentatonic",
	shortName: "Major pentatonic",
	longName: "Major pentatonic",
	intervalsInOctave: 5,
	intervalRatios: [
		[
			24,
			24
		],
		[
			27,
			24
		],
		[
			30,
			24
		],
		[
			36,
			24
		],
		[
			40,
			24
		]
	],
	type: "just",
	scaleType: "pentatonic",
	includesComma: false,
	notes: "TBC"
};
var egyptianSuspended = {
	name: "egyptianSuspended",
	shortName: "Egyptian, suspended",
	longName: "Egyptian, suspended",
	intervalsInOctave: 5,
	intervalRatios: [
		[
			24,
			24
		],
		[
			27,
			24
		],
		[
			32,
			24
		],
		[
			36,
			24
		],
		[
			42,
			24
		]
	],
	type: "just",
	scaleType: "pentatonic",
	includesComma: false,
	notes: "TBC"
};
var bluesMinorManGong = {
	name: "bluesMinorManGong",
	shortName: "Blues minor, Man Gong",
	longName: "Blues minor, Man Gong",
	intervalsInOctave: 5,
	intervalRatios: [
		[
			15,
			15
		],
		[
			18,
			15
		],
		[
			20,
			15
		],
		[
			24,
			15
		],
		[
			27,
			15
		]
	],
	type: "just",
	scaleType: "pentatonic",
	includesComma: false,
	notes: "TBC"
};
var bluesMajorRitsusenYo = {
	name: "bluesMajorRitsusenYo",
	shortName: "Blues major, Ritsusen (律旋), yo scale",
	longName: "Blues major, Ritsusen (律旋), yo scale",
	intervalsInOctave: 5,
	intervalRatios: [
		[
			24,
			24
		],
		[
			27,
			24
		],
		[
			32,
			24
		],
		[
			36,
			24
		],
		[
			40,
			24
		]
	],
	type: "just",
	scaleType: "pentatonic",
	includesComma: false,
	notes: "TBC"
};
var minorPentatonic = {
	name: "minorPentatonic",
	shortName: "Minor pentatonic",
	longName: "Minor pentatonic",
	intervalsInOctave: 5,
	intervalRatios: [
		[
			30,
			30
		],
		[
			36,
			30
		],
		[
			40,
			30
		],
		[
			45,
			30
		],
		[
			54,
			30
		]
	],
	type: "just",
	scaleType: "pentatonic",
	includesComma: false,
	notes: "TBC"
};
var tuningSystemsData = {
	eqTemp: eqTemp,
	hSeries: hSeries,
	truePythag: truePythag,
	pythagorean: pythagorean,
	fiveLimit: fiveLimit,
	diatonic: diatonic,
	diatonicIndian: diatonicIndian,
	twentyTwoShrutis: twentyTwoShrutis,
	gioseffoZarlino: gioseffoZarlino,
	majorPentatonic: majorPentatonic,
	egyptianSuspended: egyptianSuspended,
	bluesMinorManGong: bluesMinorManGong,
	bluesMajorRitsusenYo: bluesMajorRitsusenYo,
	minorPentatonic: minorPentatonic
};

/*
  By Richard Bultitude
  github.com/rjbultitude
*/
// Constants
var EQ_TEMP_STR = 'eqTemp';
var H_SERIES_STR = 'hSeries';
var JUST_STR = 'just';
var JUST_COMMA_STR = 'justComma';
var JUST_NO_COMMA_STR = 'justNoComma';
var CHROMATIC_SCALE = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
/**
 * Error checking FNs
 */
function reallyIsNaN(x) {
    return x !== x;
}
function checkAugmentNumArrayConfigTypes(augArrConfig) {
    if (Array.isArray(augArrConfig.originalArray) !== true) {
        throw new TypeError('originalArray is not an array');
    }
    else {
        for (var i = 0; i < augArrConfig.originalArray.length; i++) {
            if (reallyIsNaN(augArrConfig.originalArray[i])) {
                throw new TypeError('originalArray contains values that are NaN');
            }
        }
    }
    if (typeof augArrConfig.difference !== 'number' || Number.isNaN(augArrConfig.difference)) {
        throw new TypeError('difference is not a number');
    }
    if (augArrConfig.difference <= 0) {
        throw new TypeError('difference cannot be 0 or less');
    }
    if (typeof augArrConfig.repeatMultiple !== 'number' || Number.isNaN(augArrConfig.repeatMultiple)) {
        throw new TypeError('repeatMultiple is not a number');
    }
    if (typeof augArrConfig.amountToAdd !== 'number' || Number.isNaN(augArrConfig.amountToAdd)) {
        throw new TypeError('amountToAdd is not a number');
    }
}
function checkAugmentNumArrayConfigForNegs(augArrConfig) {
    if (augArrConfig.difference <= 0) {
        throw new SyntaxError('difference should be higher than 0');
    }
    if (augArrConfig.repeatMultiple < 0) {
        throw new SyntaxError('repeatMultiple should be 0 or higher');
    }
    if (augArrConfig.amountToAdd < 0) {
        throw new SyntaxError('amountToAdd should be 0 or higher');
    }
}
/**
 * Duplicates items 'difference' number of times
 * Can add a given amount to each duplicated item if desired
 * Can start from beginning of array
 * after repeatMultiple number of times.
 * Is public
 */
function augmentNumArray(augArrConfig) {
    var _index = 0;
    // error check
    try {
        checkAugmentNumArrayConfigTypes(augArrConfig);
    }
    catch (e) {
        console.error(e);
        return [];
    }
    try {
        checkAugmentNumArrayConfigForNegs(augArrConfig);
    }
    catch (e) {
        console.error(e);
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
    return true;
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
// Check numeric values
function checkGetFreqsNumericDataTypes(msConfig) {
    // Create list of props here
    // then loop through only them
    var invalidKeysAnyNum = ['intervals', 'type', 'mode'];
    var invalidKeysNegNum = ['intervals', 'type', 'rootNote', 'mode'];
    Object.keys(msConfig).forEach(function (prop) {
        if (isPropValid(prop, invalidKeysAnyNum)) {
            if (typeof msConfig[prop] !== 'number' || Number.isNaN(msConfig[prop])) {
                throw new TypeError('Config property ' + prop + ' is not a number');
            }
        }
    });
    Object.keys(msConfig).forEach(function (prop) {
        if (isPropValid(prop, invalidKeysNegNum)) {
            if (prop === 'numSemitones' && msConfig[prop] <= 0) {
                throw new SyntaxError('numSemitones must be a positive number');
            }
            if (msConfig[prop] < 0) {
                throw new SyntaxError(prop + ' must be zero or a positive number');
            }
        }
    });
    return true;
}
function checkUsersConfig(msConfig) {
    if (typeof msConfig !== 'object') {
        throw new TypeError('Musical Scale Config should be an object');
    }
    // Handle bad intervals array cases from user
    if (Array.isArray(msConfig.intervals) !== true) {
        throw new TypeError('intervals is not an array');
    }
    if (msConfig.intervals.length === 0) {
        throw new TypeError('intervals array is empty');
    }
    for (var i = 0, length = msConfig.intervals.length; i < length; i++) {
        if (typeof msConfig.intervals[i] !== 'number' || Number.isNaN(msConfig.intervals[i])) {
            throw new TypeError('intervals is not an array of numbers');
        }
    }
    return true;
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
    this.mode = configObj.mode === undefined ? EQ_TEMP_STR : configObj.mode;
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
/**
 * Takes a number to be used as an index for a musical tuning system array,
 * which may be out of range, and returns a valid (in-range) index
 * plus the number of times needed to multiply the array
 */
function getAllOctaveJustIntervals(interval, justIntervalsArrLength) {
    var _intervalAbs = Math.abs(interval);
    var _mult = _intervalAbs / justIntervalsArrLength;
    var _multFloor = Math.floor(_mult);
    var _inRangeIndex = _intervalAbs - (_multFloor * justIntervalsArrLength);
    var _negIndex = justIntervalsArrLength - _inRangeIndex;
    var _multF;
    if (_intervalAbs % justIntervalsArrLength === 0) {
        return {
            mult: _mult,
            rangeInterval: 0
        };
    }
    var _newInterval;
    var _isPos = interval >= 0;
    if (_isPos) {
        _newInterval = interval - (_multFloor * justIntervalsArrLength);
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
function raiseOrReduceByRatio(number, _up, ratio) {
    var numerator = ratio[0];
    var denominator = ratio[1];
    var upperRatio = numerator / denominator;
    var lowerRatio = denominator / numerator;
    if (_up) {
        return number * upperRatio;
    }
    return number * lowerRatio;
}
function multOrDivide(_number, _mult, _up) {
    if (_up) {
        return _number / _mult;
    }
    return _number * _mult;
}
function getCorrectIndex(interval, _up, notesInOctave, mult) {
    var step = 5;
    var oct = mult * notesInOctave;
    var result = notesInOctave;
    var prevNum = result;
    var actInterval = Math.abs(interval);
    for (var index = 0; index < actInterval; index++) {
        result = prevNum - step;
        prevNum = result;
        if (result < 0) {
            result = notesInOctave - Math.abs(result);
            prevNum = result;
        }
    }
    return result + oct;
}
function getPythagNoteWithinOct(index, notesInOctave, noteFreq, _up) {
    var halfOctave = notesInOctave / 2;
    var rangeInterval = getAllOctaveJustIntervals(index, notesInOctave).rangeInterval;
    if (rangeInterval < halfOctave && index % 2 !== 0 || rangeInterval >= halfOctave && index % 2 === 0) {
        return multOrDivide(noteFreq, 2, _up);
    }
    return noteFreq;
}
function getJustIntCommaNote(eTNoteConfig, _up, justTuningSystems) {
    if (eTNoteConfig.interval === 0) {
        return eTNoteConfig.startFreq;
    }
    var notesInOctave = justTuningSystems[eTNoteConfig.mode].intervalsInOctave;
    var ratio = justTuningSystems[eTNoteConfig.mode].intervalRatios[0];
    // Get number of octave note is in
    var intervalAbs = Math.abs(eTNoteConfig.interval);
    var mult = getAllOctaveJustIntervals(intervalAbs, notesInOctave).mult;
    // Get number of times to loop
    // to reach note via circle of fifths
    var correctIndex = getCorrectIndex(eTNoteConfig.interval, _up, notesInOctave, mult);
    var noteFreq = eTNoteConfig.startFreq;
    var prevNote = noteFreq;
    for (var index = 0; index < correctIndex; index++) {
        noteFreq = raiseOrReduceByRatio(prevNote, _up, ratio);
        noteFreq = getPythagNoteWithinOct(index, notesInOctave, noteFreq, _up);
        prevNote = noteFreq;
    }
    return noteFreq;
}
function getHSeriesNote(eTNoteConfig, _up) {
    var interval;
    if (eTNoteConfig.interval === 0) {
        interval = 1;
    }
    else {
        interval = eTNoteConfig.interval;
    }
    if (_up) {
        return eTNoteConfig.startFreq * interval;
    }
    return eTNoteConfig.startFreq / Math.abs(interval);
}
function getEqTempNote(eTNoteConfig, _up) {
    if (_up) {
        return eTNoteConfig.startFreq * Math.pow(2, eTNoteConfig.interval / eTNoteConfig.numSemitones);
    }
    return eTNoteConfig.startFreq / Math.pow(2, Math.abs(eTNoteConfig.interval) / eTNoteConfig.numSemitones);
}
/**
 * Takes the note index from the eTNoteConfig obj
 * and calculates the frequency in Hz
 * using one of the tuning systems specified
 */
function getJustIntNote(eTNoteConfig, _up, justTuningSystems) {
    if (Object.prototype.hasOwnProperty.call(justTuningSystems, eTNoteConfig.mode) === false) {
        console.error(eTNoteConfig.mode, 'is not a supported tuning system. Please set a valid mode');
        return 0;
    }
    // TODO decide whether to use array length or intervalsInOctave
    var _justIntervalsArr = justTuningSystems[eTNoteConfig.mode].intervalRatios;
    console.log('_justIntervalsArr', _justIntervalsArr);
    var _rangeObj = getAllOctaveJustIntervals(eTNoteConfig.interval, _justIntervalsArr.length);
    var _ratioFraction = _justIntervalsArr[_rangeObj.rangeInterval][0] / _justIntervalsArr[_rangeObj.rangeInterval][1];
    var _multiplier = Math.pow(2, _rangeObj.mult);
    var _noteVal = eTNoteConfig.startFreq * _ratioFraction;
    if (_rangeObj.rangeInterval > _justIntervalsArr.length) {
        throw new SyntaxError('rangeInterval larger than just intervals array');
    }
    if (_up) {
        return _noteVal * _multiplier;
    }
    return _noteVal / _multiplier;
}
function getJustTuningSystems(tuningSystemsData) {
    var justTuningSysIntervals = {};
    Object.keys(tuningSystemsData).forEach(function (key) {
        if (tuningSystemsData[key].type === JUST_STR) {
            Object.defineProperty(justTuningSysIntervals, key, {
                value: tuningSystemsData[key],
                enumerable: true,
                writable: false,
            });
        }
    });
    return justTuningSysIntervals;
}
function getTuningSystemType(mode, tuningSystemsData) {
    if (mode === EQ_TEMP_STR || mode === H_SERIES_STR) {
        return mode;
    }
    if (tuningSystemsData[mode].includesComma) {
        return JUST_COMMA_STR;
    }
    else {
        return JUST_NO_COMMA_STR;
    }
}
// public
function getSingleFreq(eTNoteConfig, tuningSystemsData) {
    try {
        checkGetSingleFreqConfigDataTypes(eTNoteConfig);
    }
    catch (e) {
        console.error(e);
        return false;
    }
    try {
        checkGetSingleFreqConfigForNegs(eTNoteConfig);
    }
    catch (e) {
        console.error(e);
        return false;
    }
    var _intervalIsPos = eTNoteConfig.interval >= 0;
    var _up = eTNoteConfig.upwardsScale === undefined ? _intervalIsPos : eTNoteConfig.upwardsScale;
    var justTuningSystems = getJustTuningSystems(tuningSystemsData);
    var tuningSysType = getTuningSystemType(eTNoteConfig.mode, tuningSystemsData);
    switch (tuningSysType) {
        case EQ_TEMP_STR:
            return getEqTempNote(eTNoteConfig, _up);
        case H_SERIES_STR:
            return getHSeriesNote(eTNoteConfig, _up);
        case JUST_COMMA_STR:
            return getJustIntCommaNote(eTNoteConfig, _up, justTuningSystems);
        case JUST_NO_COMMA_STR:
            return getJustIntNote(eTNoteConfig, _up, justTuningSystems);
        default:
            return false;
    }
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
function getNotesFromIntervals(pConfig, tuningSystemsData) {
    var _scaleArray = [];
    // For Inversions or rootless voicings
    var _intervalStartIndex = pConfig.intervalStartIndex;
    var _newNote;
    for (var i = 0; i < pConfig.loopLength; i++) {
        var finalIndex = pConfig.scaleIntervals[_intervalStartIndex] + pConfig.rootNote;
        _newNote = getSingleFreq({
            startFreq: pConfig.startFreq,
            numSemitones: pConfig.numSemitones,
            mode: pConfig.mode,
            interval: finalIndex,
        }, tuningSystemsData);
        // Error check
        if (_newNote !== undefined || Number.isNaN(_newNote) === false) {
            _scaleArray.push(_newNote);
        }
        else {
            console.error('undefined or NaN note');
        }
        _intervalStartIndex += 1;
    }
    return _scaleArray;
}
/**
 * Accepts only an object
 * Is public
 * */
function getFreqs(msConfig) {
    // Check config for mandatory prop
    try {
        checkUsersConfig(msConfig);
    }
    catch (e) {
        console.log(e);
        return false;
    }
    // Create valid config by adding any undefined values
    var _validConfig = new GetFreqsConfig(msConfig);
    // If the user hasn't set the number of desired notes per octave
    // derive it from the intervals array
    if (_validConfig.numNotes === undefined) {
        _validConfig.numNotes = _validConfig.intervals.length;
    }
    // Check numeric data types
    try {
        checkGetFreqsNumericDataTypes(msConfig);
    }
    catch (e) {
        console.error('Check your config values are valid', e);
        return false;
    }
    // Set vars
    var _scaleArray = [];
    var _intervals = _validConfig.intervals;
    // TODO is this needed for Just tunings?
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
    }, tuningSystemsData);
    return _scaleArray;
}
var freqi = {
    getFreqs: getFreqs,
    augmentNumArray: augmentNumArray,
    addMissingNotesFromInterval: addMissingNotesFromInterval,
    getCorrectIndex: getCorrectIndex,
    raiseOrReduceByRatio: raiseOrReduceByRatio,
    multOrDivide: multOrDivide,
    getSingleFreq: getSingleFreq,
    getJustIntNote: getJustIntNote,
    getHSeriesNote: getHSeriesNote,
    getJustIntCommaNote: getJustIntCommaNote,
    getPythagNoteWithinOct: getPythagNoteWithinOct,
    getAllOctaveJustIntervals: getAllOctaveJustIntervals,
    tuningSystemsData: tuningSystemsData,
    CHROMATIC_SCALE: CHROMATIC_SCALE,
};

export default freqi;
