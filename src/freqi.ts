const __PROD__ = process.env.NODE_ENV !== 'test';
/*
    By Richard Bultitude
    github.com/rjbultitude
*/

// Constants
const CHROMATIC_SCALE: Array<string> = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const HEPTATONIC_SCALE: Array<string> = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const PYTHAGOREAN_RATIOS: Array<Array<number>> = [[1,1], [256,243], [9,8], [32,27], [81,64], [4,3], [729,512], [3,2], [128,81], [27,16], [16,9], [243,128]];
const FIVE_LIMIT_RATIOS: Array<Array<number>> = [[1,1], [16,15], [9,8], [6,5], [5,4], [4,3], [64,45], [3,2], [8,5], [5,3], [9,5], [15,8]];
const DIATONIC_RATIOS: Array<Array<number>> = [[1,1], [9,8], [5,4], [4,3], [3,2], [5,3], [15,8]];
const DIATONIC_INDIAN_RATIOS: Array<Array<number>> = [[1,1], [9,8], [5,4], [4,3], [3,2], [27,16], [15,8]];
const TWENTY_TWO_SHRUTI_RATIOS: Array<Array<number>> = [[1,1], [256,243], [16,15], [10,9], [9,8], [32,27], [6,5], [5,4], [81,64], [4,3], [27,20], [45,32], [729,512], [3,2], [128,81], [8,5], [5,3], [27,16], [16,9], [9,5], [15,8], [243,128]];
const EQ_TEMP_STR = 'eqTemp';
const PYTHAGOREAN_STR = 'pythagorean';
const FIVE_LIMIT_STR = 'fiveLimit';
const DIATONIC_STR = 'diatonic';
const DIATONIC_INDIAN_STR = 'diatonicIndian';
const TWENTY_TWO_SHRUTI_STR = '22Shrutis';

interface UserConfigObj {
  intervals: Array<number>;
  startFreq?: number;
  numSemitones?: number;
  rootNote?: number;
  numNotes?: number;
  amountToAdd?: number;
  intervalStartIndex?: number;
  repeatMultiple?: number;
  mode?: string;
  type?: string;
}

interface PConfigObj {
  scaleIntervals: Array<number>;
  numNotes: number;
  intervalStartIndex: number;
  repeatMultiple: number;
  amountToAdd: number;
  mode: string;
  type?: string;
}

interface ETNoteConfig {
  interval: number;
  startFreq: number;
  upwardsScale?: boolean;
  numSemitones: number;
  mode: string;
}

interface AugArrConfig {
  originalArray: Array<number>;
  difference: number;
  repeatMultiple: number;
  amountToAdd?: number;
}

function reallyIsNaN(x: number): boolean {
  return x !== x;
}

function checkAugmentNumArrayConfigTypes(augArrConfig: AugArrConfig) {
  if (Array.isArray(augArrConfig.originalArray) !== true) {
    throw TypeError('originalArray is not an array');
  } else {
    for (let i = 0; i < augArrConfig.originalArray.length; i++) {
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

function checkAugmentNumArrayConfigForNegs(augArrConfig: AugArrConfig) {
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
 * after repeatMultiple number of times.
 * Is public
 */
function augmentNumArray(augArrConfig: AugArrConfig): Array<number> {
  let _index = 0;
  // error check
  try {
    checkAugmentNumArrayConfigTypes(augArrConfig);
  } catch (e) {
    if (__PROD__) {
      console.error(e);
    }
    return [];
  }
  try {
    checkAugmentNumArrayConfigForNegs(augArrConfig);
  } catch (e) {
    if (__PROD__) {
      console.error(e);
    }
    return [];
  }
  // begin fn
  const _newArr = augArrConfig.originalArray.map(function (item) {
    return item;
  });
  let _finalArr: Array<number> = [];
  const _diffArr: Array<number> = [];
  let _newVal;
  const _repeatPoint: number = (augArrConfig.originalArray.length * augArrConfig.repeatMultiple) - 1;
  // loop the number of times
  // needed to make the missing items
  addMissingLoop:
  for (let i = 0; i < augArrConfig.difference; i++) {
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
    } else if (_index === augArrConfig.originalArray.length - 1) {
      _index = 0;
      augArrConfig.amountToAdd += augArrConfig.amountToAdd;
      continue addMissingLoop;
    }
    _index += 1;
  }
  _finalArr = _newArr.concat(_diffArr);
  return _finalArr;
}

function isPropValid(prop, inValidKeys): boolean {
  for (let i = 0; i < inValidKeys.length; i++) {
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

function checkGetSingleFreqConfigForNegs(dataObj): boolean {
  const invalidKeys = ['interval', 'upwardsScale', 'mode'];
  for (const prop in dataObj) {
    if (isPropValid(prop, invalidKeys)) {
      if (dataObj[prop] < 0) {
        throw new SyntaxError(prop + ' must be a positive number');
      }
    }
  }
  return true;
}

function checkGetSingleFreqConfigDataTypes(dataObj: ETNoteConfig): boolean {
  for (const prop in dataObj) {
    if (prop !== 'upwardsScale' && prop !== 'mode') {
      if (typeof dataObj[prop] !== 'number' || Number.isNaN(dataObj[prop])) {
        throw new TypeError(`Config property ${prop} is not a number`);
      }
    } else if (prop === 'upwardsScale') {
      if (typeof dataObj[prop] !== 'boolean') {
        throw new TypeError(`Config property ${prop} is not a boolean`);
      }
    } else if (prop === 'mode') {
      if (typeof dataObj[prop] !== 'string') {
        throw new TypeError(`Config property ${prop} is not a string`);
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

function checkGetFreqsForZerosNegs(data): boolean {
  const invalidKeys = ['intervals', 'type', 'rootNote', 'mode'];
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
  return true;
}

function checkGetFreqsNumericDataTypes(dataObj): boolean {
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

function checkGetFreqsIntervalsProp(intervals: Array<number>): boolean {
  if (Array.isArray(intervals) !== true) {
    throw new TypeError('intervals is not an array');
  }
  if (intervals.length === 0) {
    throw new TypeError('intervals array is empty');
  }
  for (let i = 0, length = intervals.length; i < length; i++) {
    if (typeof intervals[i] !== 'number' || Number.isNaN(intervals[i])) {
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

function GetFreqsConfig(configObj: UserConfigObj) {
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
function getAllOctaveJustIntervals(interval: number, justIntervalsArr: Array): object {
  const _intervalAbs = Math.abs(interval);
  const _mult = _intervalAbs / justIntervalsArr.length;
  const _multFloor = Math.floor(_mult);
  const _inRangeIndex = _intervalAbs - (_multFloor * justIntervalsArr.length);
  const _negIndex = justIntervalsArr.length - _inRangeIndex;
  let _multF;
  if (_intervalAbs % justIntervalsArr.length === 0) {
    return {
      mult: _mult,
      rangeInterval: 0
    }
  }
  let _newInterval;
  const _isPos = interval >= 0;
  if (_isPos) {
    _newInterval = interval - (_multFloor * justIntervalsArr.length);
    _multF = _multFloor;
  } else {
    _newInterval = _negIndex;
    _multF = _multFloor + 1;

  }
  return {
    mult: _multF,
    rangeInterval: _newInterval
  }
}

function getEqTempNote(eTNoteConfig: ETNoteConfig, _up): number {
  if (_up) {
    return eTNoteConfig.startFreq * Math.pow(2, eTNoteConfig.interval / eTNoteConfig.numSemitones);
  }
  return eTNoteConfig.startFreq / Math.pow(2, Math.abs(eTNoteConfig.interval) / eTNoteConfig.numSemitones);
}

function getJustIntervalsType(mode: string): Array {
  switch (mode) {
  case PYTHAGOREAN_STR:
    return PYTHAGOREAN_RATIOS;
  case DIATONIC_STR:
    return DIATONIC_RATIOS;
  case FIVE_LIMIT_STR:
    return FIVE_LIMIT_RATIOS;
  case DIATONIC_INDIAN_STR:
    return DIATONIC_INDIAN_RATIOS;
  case TWENTY_TWO_SHRUTI_STR:
    return TWENTY_TWO_SHRUTI_RATIOS;
  default:
    console.warn('No mode received');
  }
}

/**
 * Takes the note index from the eTNoteConfig obj
 * and calculates the frequency in Hz
 * using one of the tuning systems specified
 */
function getJustIntNote(eTNoteConfig: ETNoteConfig, _up): number {
  const _justIntervalsArr = getJustIntervalsType(eTNoteConfig.mode);
  const _rangeObj = getAllOctaveJustIntervals(eTNoteConfig.interval, _justIntervalsArr);
  const _ratioFraction = _justIntervalsArr[_rangeObj.rangeInterval][0] / _justIntervalsArr[_rangeObj.rangeInterval][1];
  const _multiplier = Math.pow(2, _rangeObj.mult);
  const _noteVal = eTNoteConfig.startFreq * _ratioFraction;
  if (_rangeObj.rangeInterval > _justIntervalsArr.length) {
    throw new SyntaxError('rangeInterval larger than just intervals array');
  }
  if (_up) {
    return _noteVal * _multiplier;
  }
  return _noteVal / _multiplier;
}

// public
function getSingleFreq(eTNoteConfig: ETNoteConfig): number | boolean {
  try {
    checkGetSingleFreqConfigDataTypes(eTNoteConfig);
  } catch (e) {
    if (__PROD__) {
      console.error(e);
    }
    return false;
  }
  try {
    checkGetSingleFreqConfigForNegs(eTNoteConfig);
  } catch (e) {
    if (__PROD__) {
      console.error(e);
    }
    return false;
  }
  const _intervalIsPos = eTNoteConfig.interval >= 0;
  const _up = eTNoteConfig.upwardsScale === undefined ? _intervalIsPos : eTNoteConfig.upwardsScale;
  let _note;
  if (eTNoteConfig.mode === EQ_TEMP_STR) {
    _note = getEqTempNote(eTNoteConfig, _up);
  } else {
    _note = getJustIntNote(eTNoteConfig, _up);
  }
  return _note;
}

// Adds new items to the intervals array
// should it not have enough notes
function addMissingNotesFromInterval(pConfig: PConfigObj): Array<number> {
  let _intervals: Array<number> = [];
  const _highestIndex = pConfig.intervalStartIndex + pConfig.numNotes;
  const _intervalsLength = pConfig.scaleIntervals.length;
  if (_highestIndex > _intervalsLength) {
    const _diff = _highestIndex - _intervalsLength;
    _intervals = augmentNumArray({
      originalArray: pConfig.scaleIntervals,
      difference: _diff,
      amountToAdd: pConfig.amountToAdd,
      repeatMultiple: pConfig.repeatMultiple,
    });
  } else {
    _intervals = pConfig.scaleIntervals;
  }
  return _intervals;
}

function getNotesFromIntervals(pConfig: PConfigObj): Array<number> {
  const _scaleArray = [];
  // For Inversions or rootless voicings
  const _intervalStartIndex = pConfig.intervalStartIndex;
  let _newNote;
  for (let i = 0; i < pConfig.loopLength; i++) {
    // __PROD__ && console.log('note ' + i + ' ' + pConfig.type);
    // __PROD__ && console.log('scaleInterval', pConfig.scaleIntervals[_intervalStartIndex]);
    // __PROD__ && console.log('intervaloffset ' + _intervalStartIndex + ' centreNote Index ' + pConfig.rootNote);
    const finalIndex = pConfig.scaleIntervals[_intervalStartIndex] + pConfig.rootNote;
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
    } else if (__PROD__) {
      console.error('undefined or NaN note');
    }
    _intervalStartIndex += 1;
  }
  return _scaleArray;
}

/**
 * Accepts only an object
 * No TS interface is provided
 * as this is the entry point
 * Is public
 * */
function getFreqs(msConfig: object): Array | boolean {
  let _validConfig;
  // Check config exists
  if (typeof msConfig !== 'object') {
    if (__PROD__) {
      console.error('Musical Scale Config should be an object');
    }
  // Check and fix undefined
  } else {
    _validConfig = new GetFreqsConfig(msConfig);
  }
  try {
    checkGetFreqsIntervalsProp(_validConfig.intervals);
  } catch (e) {
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
  } catch (e) {
    if (__PROD__) {
      console.error('Check your config values are valid', e);
    }
    return false;
  }
  // Check for negative numbers
  try {
    checkGetFreqsForZerosNegs(msConfig);
  } catch (e) {
    if (__PROD__) {
      console.error('Check your config values are valid', e);
    }
    return false;
  }
  // Set vars
  let _scaleArray = [];
  const _intervals = _validConfig.intervals;
  // Add missing scale intervals
  const _intervalsFull = addMissingNotesFromInterval({
    amountToAdd: _validConfig.amountToAdd,
    intervalStartIndex: _validConfig.intervalStartIndex,
    numNotes: _validConfig.numNotes,
    repeatMultiple: _validConfig.repeatMultiple,
    scaleIntervals: _intervals,
    type: _validConfig.type,
  });
  // Inversions are acheived by
  // selecting an index from within the intervals themselves
  const _loopLength = _intervalsFull.length - _validConfig.intervalStartIndex;
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
  return _scaleArray;
}

export default {
  getFreqs: getFreqs,
  augmentNumArray: augmentNumArray,
  getSingleFreq: getSingleFreq,
  getJustIntNote: getJustIntNote,
  getAllOctaveJustIntervals: getAllOctaveJustIntervals,
  CHROMATIC_SCALE: CHROMATIC_SCALE,
};
