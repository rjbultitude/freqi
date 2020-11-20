interface MetaDataTuningSys {
    "name": string;
    "shortName": string;
    "longName": string;
    "intervalsInOctave": number;
    "type": string;
    "scaleType": string;
    "notes": string;
}
interface MetaData {
    [key: string]: MetaDataTuningSys;
}
interface JustTuningSystems {
    pythagorean: Array<Array<number>>;
    fiveLimit: Array<Array<number>>;
    diatonic: Array<Array<number>>;
    diatonicIndian: Array<Array<number>>;
    twentyTwoShrutis: Array<Array<number>>;
    gioseffoZarlino: Array<Array<number>>;
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
interface MNoteConfig {
    amountToAdd: number;
    intervalStartIndex: number;
    numNotes: number;
    repeatMultiple: number;
    scaleIntervals: Array<number>;
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
/**
 * Duplicates items 'difference' number of times
 * Can add a given amount to each duplicated item if desired
 * Can start from beginning of array
 * after repeatMultiple number of times.
 * Is public
 */
declare function augmentNumArray(augArrConfig: AugArrConfig): Array<number>;
/**
 * ------------
 * Housekeeping
 * ------------
 */
declare function getModes(): Array<string>;
declare function getMetaData(): MetaData;
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
declare function getAllOctaveJustIntervals(interval: number, justIntervalsArrLength: number): AllOctaveJustIntervals;
declare function raiseOrReduceByFifth(number: number, _up: boolean): number;
declare function multOrDivide(_number: number, _mult: number, _up: boolean): number;
declare function getCorrectIndex(interval: number, _up: boolean, notesInOctave: number, mult: number): number;
declare function getPythagNoteWithinOct(index: any, notesInOctave: any, noteFreq: any, _up: any): number;
declare function getTruePythagNote(eTNoteConfig: ETNoteConfig, _up: any): number;
declare function getHSeriesNote(eTNoteConfig: ETNoteConfig, _up: any): number;
/**
 * Takes the note index from the eTNoteConfig obj
 * and calculates the frequency in Hz
 * using one of the tuning systems specified
 */
declare function getJustIntNote(eTNoteConfig: ETNoteConfig, _up: boolean, justTuningSystems: JustTuningSystems): number;
declare function getSingleFreq(eTNoteConfig: ETNoteConfig): number | boolean;
declare function addMissingNotesFromInterval(pConfig: MNoteConfig): Array<number>;
/**
 * Accepts only an object
 * No TS interface is provided
 * as this is the entry point
 * Is public
 * */
declare function getFreqs(msConfig: UserConfigObj): Array<number> | boolean;
declare const _default: {
    getFreqs: typeof getFreqs;
    augmentNumArray: typeof augmentNumArray;
    addMissingNotesFromInterval: typeof addMissingNotesFromInterval;
    getCorrectIndex: typeof getCorrectIndex;
    raiseOrReduceByFifth: typeof raiseOrReduceByFifth;
    multOrDivide: typeof multOrDivide;
    getSingleFreq: typeof getSingleFreq;
    getJustIntNote: typeof getJustIntNote;
    getHSeriesNote: typeof getHSeriesNote;
    getTruePythagNote: typeof getTruePythagNote;
    getPythagNoteWithinOct: typeof getPythagNoteWithinOct;
    getAllOctaveJustIntervals: typeof getAllOctaveJustIntervals;
    getModes: typeof getModes;
    getMetaData: typeof getMetaData;
    justTuningSystems: JustTuningSystems;
    CHROMATIC_SCALE: string[];
};
export default _default;
