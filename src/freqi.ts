/*
  By Richard Bultitude
  github.com/rjbultitude
*/

import tuningSystemsData from './tuning-systems.json';

interface TuningSystemDefinition {
  "name": string;
  "shortName": string;
  "longName": string;
  "intervalsInOctave": number;
  "intervalRatios": Array<Array<number>>;
  "type": string;
  "scaleType": string;
  "includesComma": boolean;
  "notes": string;
}

interface TuningSystemsData {
  [key: string]: TuningSystemDefinition;
}

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
  rootNote: number;
  startFreq: number;
  numSemitones: number;
  intervalStartIndex: number;
  loopLength: number;
  repeatMultiple: number;
  amountToAdd: number;
  mode: string;
  type?: string;
}

interface MNoteConfig {
  amountToAdd: number;
  intervalStartIndex: number;
  numNotes: number;
  repeatMultiple: number;
  scaleIntervals: Array<number>;
  type: string;
}

interface GetNoteConfig {
  startFreq: number;
  scaleIntervals: Array<number>;
  numSemitones: number;
  rootNote: number;
  intervalStartIndex: number;
  loopLength: number;
  mode: string;
  type: string;
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

interface AllOctaveJustIntervals {
  mult: number;
  rangeInterval: number;
}

// Constants
const EQ_TEMP_STR = 'eqTemp';
const H_SERIES_STR = 'hSeries';
const JUST_STR = 'just';
const JUST_COMMA_STR = 'justComma';
const JUST_NO_COMMA_STR = 'justNoComma';
const CHROMATIC_SCALE: Array<string> = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

/**
 * Error checking FNs
 */

function reallyIsNaN(x: number): boolean {
  return x !== x;
}

function checkAugmentNumArrayConfigTypes(augArrConfig: AugArrConfig): void {
  if (Array.isArray(augArrConfig.originalArray) !== true) {
    throw new TypeError('originalArray is not an array');
  } else {
    for (let i = 0; i < augArrConfig.originalArray.length; i++) {
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

function checkAugmentNumArrayConfigForNegs(augArrConfig: AugArrConfig): void {
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
function augmentNumArray(augArrConfig: AugArrConfig): Array<number> {
  let _index = 0;
  // error check
  try {
    checkAugmentNumArrayConfigTypes(augArrConfig);
  } catch (e) {
    console.error(e);
    return [];
  }
  try {
    checkAugmentNumArrayConfigForNegs(augArrConfig);
  } catch (e) {
    console.error(e);
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

// Check numeric values
function checkGetFreqsNumericDataTypes(msConfig: UserConfigObj): boolean {
  // Create list of props here
  // then loop through only them
  const invalidKeysAnyNum = ['intervals', 'type', 'mode'];
  const invalidKeysNegNum = ['intervals', 'type', 'rootNote', 'mode'];
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

function checkUsersConfig(msConfig: UserConfigObj): boolean {
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
  for (let i = 0, length = msConfig.intervals.length; i < length; i++) {
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
function getAllOctaveJustIntervals(interval: number, justIntervalsArrLength: number): AllOctaveJustIntervals {
  const _intervalAbs = Math.abs(interval);
  const _mult = _intervalAbs / justIntervalsArrLength;
  const _multFloor = Math.floor(_mult);
  const _inRangeIndex = _intervalAbs - (_multFloor * justIntervalsArrLength);
  const _negIndex = justIntervalsArrLength - _inRangeIndex;
  let _multF;
  if (_intervalAbs % justIntervalsArrLength === 0) {
    return {
      mult: _mult,
      rangeInterval: 0
    }
  }
  let _newInterval;
  const _isPos = interval >= 0;
  if (_isPos) {
    _newInterval = interval - (_multFloor * justIntervalsArrLength);
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

function raiseOrReduceByRatio(number: number, _up: boolean, ratio: Array<number>): number {
  const numerator = ratio[0];
  const denominator = ratio[1];
  const upperRatio = numerator / denominator;
  const lowerRatio = denominator / numerator;
  if (_up) {
    return number * upperRatio;
  }
  return number * lowerRatio;
}

function multOrDivide(_number: number, _mult: number, _up: boolean): number {
  if (_up) {
    return _number / _mult;
  }
  return _number * _mult;
}

function getCorrectIndex(interval: number, _up: boolean, notesInOctave: number, mult: number): number {
  const step = 5;
  const oct = mult * notesInOctave;
  let result = notesInOctave;
  let prevNum = result;
  const actInterval = Math.abs(interval);
  for (let index = 0; index < actInterval; index++) {
    result = prevNum - step;
    prevNum = result;
    if (result < 0) {
      result = notesInOctave - Math.abs(result);
      prevNum = result;
    }
  }
  return result + oct;
}

function getPythagNoteWithinOct(index, notesInOctave, noteFreq, _up): number {
  const halfOctave = notesInOctave / 2;
  const { rangeInterval } = getAllOctaveJustIntervals(index, notesInOctave);
  if (rangeInterval < halfOctave && index % 2 !== 0 || rangeInterval >= halfOctave && index % 2 === 0) {
    return multOrDivide(noteFreq, 2, _up);
  }
  return noteFreq;
}

function getJustIntCommaNote(eTNoteConfig: ETNoteConfig, _up, justTuningSystems: TuningSystemsData): number {
  if (eTNoteConfig.interval === 0) {
    return eTNoteConfig.startFreq;
  }
  const notesInOctave = justTuningSystems[eTNoteConfig.mode].intervalsInOctave;
  const ratio = justTuningSystems[eTNoteConfig.mode].intervalRatios[0];
  // Get number of octave note is in
  const intervalAbs = Math.abs(eTNoteConfig.interval);
  const { mult } = getAllOctaveJustIntervals(intervalAbs, notesInOctave);
  // Get number of times to loop
  // to reach note via circle of fifths
  const correctIndex = getCorrectIndex(eTNoteConfig.interval, _up, notesInOctave, mult);
  let noteFreq = eTNoteConfig.startFreq;
  let prevNote = noteFreq;
  for (let index = 0; index < correctIndex; index++) {
    noteFreq = raiseOrReduceByRatio(prevNote, _up, ratio);
    noteFreq = getPythagNoteWithinOct(index, notesInOctave, noteFreq, _up);
    prevNote = noteFreq;
  }
  return noteFreq;
}

function getHSeriesNote(eTNoteConfig: ETNoteConfig, _up): number {
  let interval;
  if (eTNoteConfig.interval === 0) {
    interval = 1;
  } else {
    interval = eTNoteConfig.interval;
  }
  if (_up) {
    return eTNoteConfig.startFreq * interval;
  }
  return eTNoteConfig.startFreq / Math.abs(interval);
}

function getEqTempNote(eTNoteConfig: ETNoteConfig, _up): number {
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
function getJustIntNote(eTNoteConfig: ETNoteConfig, _up: boolean, justTuningSystems: TuningSystemsData): number {
  if (Object.prototype.hasOwnProperty.call(justTuningSystems, eTNoteConfig.mode) === false) {
    console.error(eTNoteConfig.mode, 'is not a supported tuning system. Please set a valid mode');
    return 0;
  }
  // TODO decide whether to use array length or intervalsInOctave
  const _justIntervalsArr = justTuningSystems[eTNoteConfig.mode].intervalRatios;
  console.log('_justIntervalsArr', _justIntervalsArr);
  const _rangeObj = getAllOctaveJustIntervals(eTNoteConfig.interval, _justIntervalsArr.length);
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

function getJustTuningSystems(tuningSystemsData: TuningSystemsData): TuningSystemsData {
  const justTuningSysIntervals = {};
  Object.keys(tuningSystemsData).forEach((key) => {
    if (tuningSystemsData[key].type === JUST_STR) {
      Object.defineProperty(
        justTuningSysIntervals,
        key,
        {
          value: tuningSystemsData[key],
          enumerable: true,
          writable: false,
        }
      );
    }
  });
  return justTuningSysIntervals;
}

function getTuningSystemType(mode: string, tuningSystemsData: TuningSystemsData): string {
  if (mode === EQ_TEMP_STR || mode === H_SERIES_STR) {
    return mode;
  }
  if (tuningSystemsData[mode].includesComma) {
    return JUST_COMMA_STR;
  } else {
    return JUST_NO_COMMA_STR;
  }
}

// public
function getSingleFreq(eTNoteConfig: ETNoteConfig, tuningSystemsData: TuningSystemsData): number | boolean {
  try {
    checkGetSingleFreqConfigDataTypes(eTNoteConfig);
  } catch (e) {
    console.error(e);
    return false;
  }
  try {
    checkGetSingleFreqConfigForNegs(eTNoteConfig);
  } catch (e) {
    console.error(e);
    return false;
  }
  const _intervalIsPos = eTNoteConfig.interval >= 0;
  const _up = eTNoteConfig.upwardsScale === undefined ? _intervalIsPos : eTNoteConfig.upwardsScale;
  const justTuningSystems = getJustTuningSystems(tuningSystemsData);
  const tuningSysType = getTuningSystemType(eTNoteConfig.mode, tuningSystemsData);
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
function addMissingNotesFromInterval(pConfig: MNoteConfig): Array<number> {
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

function getNotesFromIntervals(pConfig: GetNoteConfig, tuningSystemsData: TuningSystemsData): Array<number> {
  const _scaleArray = [];
  // For Inversions or rootless voicings
  let _intervalStartIndex = pConfig.intervalStartIndex;
  let _newNote;
  for (let i = 0; i < pConfig.loopLength; i++) {
    const finalIndex = pConfig.scaleIntervals[_intervalStartIndex] + pConfig.rootNote;
    _newNote = getSingleFreq(
      {
        startFreq: pConfig.startFreq,
        numSemitones: pConfig.numSemitones,
        mode: pConfig.mode,
        interval: finalIndex,
      },
      tuningSystemsData
    );
    // Error check
    if (_newNote !== undefined || Number.isNaN(_newNote) === false) {
      _scaleArray.push(_newNote);
    } else {
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
function getFreqs(msConfig: UserConfigObj): Array<number> | boolean {
  // Check config for mandatory prop
  try {
    checkUsersConfig(msConfig);
  } catch (e) {
    console.log(e);
    return false;
  }
  // Create valid config by adding any undefined values
  const _validConfig = new GetFreqsConfig(msConfig);
  // If the user hasn't set the number of desired notes per octave
  // derive it from the intervals array
  if (_validConfig.numNotes === undefined) {
    _validConfig.numNotes = _validConfig.intervals.length;
  }
  // Check numeric data types
  try {
    checkGetFreqsNumericDataTypes(msConfig);
  } catch (e) {
    console.error('Check your config values are valid', e);
    return false;
  }
  // Set vars
  let _scaleArray = [];
  const _intervals = _validConfig.intervals;
  // TODO is this needed for Just tunings?
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
  _scaleArray = getNotesFromIntervals(
    {
      startFreq: _validConfig.startFreq,
      scaleIntervals: _intervalsFull,
      numSemitones: _validConfig.numSemitones,
      rootNote: _validConfig.rootNote,
      intervalStartIndex: _validConfig.intervalStartIndex,
      loopLength: _loopLength,
      mode: _validConfig.mode,
      type: _validConfig.type,
    },
    tuningSystemsData
  );
  return _scaleArray;
}

export default {
  getFreqs,
  augmentNumArray,
  addMissingNotesFromInterval,
  getCorrectIndex,
  raiseOrReduceByRatio,
  multOrDivide,
  getSingleFreq,
  getJustIntNote,
  getHSeriesNote,
  getJustIntCommaNote,
  getPythagNoteWithinOct,
  getAllOctaveJustIntervals,
  tuningSystemsData,
  CHROMATIC_SCALE,
};
