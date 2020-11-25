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
declare function checkAugmentNumArrayConfigTypes(augArrConfig: AugArrConfig): void;
declare function checkAugmentNumArrayConfigForNegs(augArrConfig: AugArrConfig): void;
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
 * Equal temperament data sanitisation
 * ------------
 */
declare function checkGetSingleFreqConfigForNegs(dataObj: ETNoteConfig): boolean;
declare function checkGetSingleFreqConfigDataTypes(dataObj: ETNoteConfig): boolean;
/**
* ------------
* Musical Scale data sanitisation
* ------------
*/
declare function checkGetFreqsNumericDataTypes(msConfig: UserConfigObj): boolean;
declare function getModes(tuningSystemsData: TuningSystemsData): Array<string>;
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
declare function raiseOrReduceByRatio(number: number, _up: boolean, ratio: Array<number>): number;
declare function multOrDivide(_number: number, _mult: number, _up: boolean): number;
declare function getCorrectIndex(interval: number, _up: boolean, notesInOctave: number, mult: number): number;
declare function getPythagNoteWithinOct(index: any, notesInOctave: any, noteFreq: any, _up: any): number;
declare function getJustIntCommaNote(eTNoteConfig: ETNoteConfig, _up: any, justTuningSystems: TuningSystemsData): number;
declare function getHSeriesNote(eTNoteConfig: ETNoteConfig, _up: any): number;
/**
 * Takes the note index from the eTNoteConfig obj
 * and calculates the frequency in Hz
 * using one of the tuning systems specified
 */
declare function getJustIntNote(eTNoteConfig: ETNoteConfig, _up: boolean, justTuningSystems: TuningSystemsData): number;
declare function getJustTuningSystems(tuningSystemsData: TuningSystemsData): TuningSystemsData;
declare function getTuningSystemType(mode: string, tuningSystemsData: TuningSystemsData): string;
declare function getSingleFreq(eTNoteConfig: ETNoteConfig, tuningSystemsData: TuningSystemsData): number | boolean;
declare function addMissingNotesFromInterval(pConfig: MNoteConfig): Array<number>;
/**
 * Accepts only an object
 * Is public
 * */
declare function getFreqs(msConfig: UserConfigObj): Array<number> | boolean;
declare const _default: {
    getFreqs: typeof getFreqs;
    augmentNumArray: typeof augmentNumArray;
    addMissingNotesFromInterval: typeof addMissingNotesFromInterval;
    getCorrectIndex: typeof getCorrectIndex;
    raiseOrReduceByRatio: typeof raiseOrReduceByRatio;
    multOrDivide: typeof multOrDivide;
    getSingleFreq: typeof getSingleFreq;
    getJustIntNote: typeof getJustIntNote;
    getHSeriesNote: typeof getHSeriesNote;
    getJustIntCommaNote: typeof getJustIntCommaNote;
    getPythagNoteWithinOct: typeof getPythagNoteWithinOct;
    getAllOctaveJustIntervals: typeof getAllOctaveJustIntervals;
    getJustTuningSystems: typeof getJustTuningSystems;
    getTuningSystemType: typeof getTuningSystemType;
    tuningSystemsData: {
        eqTemp: {
            name: string;
            shortName: string;
            longName: string;
            intervalsInOctave: number;
            intervalRatios: any;
            type: string;
            scaleType: string;
            includesComma: boolean;
            notes: string;
        };
        hSeries: {
            name: string;
            shortName: string;
            longName: string;
            intervalsInOctave: any;
            intervalRatios: any;
            type: string;
            scaleType: string;
            includesComma: boolean;
            notes: string;
        };
        truePythag: {
            name: string;
            shortName: string;
            longName: string;
            intervalsInOctave: number;
            intervalRatios: number[][];
            type: string;
            scaleType: string;
            includesComma: boolean;
            notes: string;
        };
        pythagorean: {
            name: string;
            shortName: string;
            longName: string;
            intervalsInOctave: number;
            intervalRatios: number[][];
            type: string;
            scaleType: string;
            includesComma: boolean;
            notes: string;
        };
        fiveLimit: {
            name: string;
            shortName: string;
            longName: string;
            intervalsInOctave: number;
            intervalRatios: number[][];
            type: string;
            scaleType: string;
            includesComma: boolean;
            notes: string;
        };
        diatonic: {
            name: string;
            shortName: string;
            longName: string;
            intervalsInOctave: number;
            intervalRatios: number[][];
            type: string;
            /**
             * Error checking FNs
             */
            scaleType: string;
            includesComma: boolean;
            notes: string;
        };
        diatonicIndian: {
            name: string;
            shortName: string;
            longName: string;
            intervalsInOctave: number;
            intervalRatios: number[][];
            type: string;
            scaleType: string;
            includesComma: boolean;
            notes: string;
        };
        twentyTwoShrutis: {
            name: string;
            shortName: string;
            longName: string;
            intervalsInOctave: number;
            intervalRatios: number[][];
            type: string;
            scaleType: string;
            includesComma: boolean;
            notes: string;
        };
        gioseffoZarlino: {
            name: string;
            shortName: string;
            longName: string;
            intervalsInOctave: number;
            intervalRatios: number[][];
            type: string;
            scaleType: string;
            includesComma: boolean;
            notes: string;
        };
        majorPentatonic: {
            name: string;
            shortName: string;
            longName: string;
            intervalsInOctave: number;
            intervalRatios: number[][];
            type: string;
            scaleType: string;
            includesComma: boolean;
            notes: string;
        };
        egyptianSuspended: {
            name: string;
            shortName: string;
            longName: string;
            intervalsInOctave: number;
            intervalRatios: number[][];
            type: string;
            scaleType: string;
            includesComma: boolean;
            notes: string;
        };
        bluesMinorManGong: {
            name: string;
            shortName: string;
            longName: string;
            intervalsInOctave: number;
            intervalRatios: number[][];
            type: string;
            scaleType: string;
            includesComma: boolean;
            notes: string;
        };
        bluesMajorRitsusenYo: {
            name: string;
            shortName: string;
            longName: string;
            intervalsInOctave: number;
            intervalRatios: number[][];
            type: string;
            scaleType: string;
            includesComma: boolean;
            notes: string;
        };
        minorPentatonic: {
            name: string;
            shortName: string;
            longName: string;
            intervalsInOctave: number;
            intervalRatios: number[][];
            type: string;
            scaleType: string;
            includesComma: boolean;
            notes: string;
        };
    };
    freqiModes: string[];
    getModes: typeof getModes;
    CHROMATIC_SCALE: string[];
    errorCheckFns: {
        checkAugmentNumArrayConfigTypes: typeof checkAugmentNumArrayConfigTypes;
        checkAugmentNumArrayConfigForNegs: typeof checkAugmentNumArrayConfigForNegs;
        checkGetSingleFreqConfigForNegs: typeof checkGetSingleFreqConfigForNegs;
        checkGetSingleFreqConfigDataTypes: typeof checkGetSingleFreqConfigDataTypes;
        checkGetFreqsNumericDataTypes: typeof checkGetFreqsNumericDataTypes;
    };
};
export default _default;
