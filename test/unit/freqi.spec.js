'use strict';
var mocha = require('mocha');
var expect = require('chai').expect;
var freqi = require('../../lib/freqi');

/**
 * ---------------------
 * getFreqs tests
 * ---------------------
 */

describe('getFreqs return value types', function() {
  before(function() {
    this.config = {
      startFreq: 440,
      numSemitones: 12,
      intervals: [-5, 0, 7]
    };
    this.badConfig = '';
  });

  it('should return an array when valid config is used', function() {
    expect(freqi.getFreqs(this.config)).to.be.an('array');
  });
  it('should return an array of numbers when valid config is used', function() {
    expect(freqi.getFreqs(this.config)[0]).to.be.a('number');
  });
  it('should return false when an invalid config is used', function() {
    expect(freqi.getFreqs(this.badConfig)).to.be.false;
  });
});

describe('getFreqs return array length', function() {
  beforeEach(function() {
    this.MoreNotesconfig = {
      startFreq: 440,
      numSemitones: 12,
      intervals: [0, 3, 5],
      numNotes: 5
    };
    this.LessNotesconfig = {
      startFreq: 440,
      numSemitones: 12,
      intervals: [0, 3, 5],
      numNotes: 2
    };
    this.InversionStartNoteconfig = {
      startFreq: 440,
      numSemitones: 12,
      intervals: [0, 3, 5],
      intervalStartIndex: 4
    };
    this.NumNotesOverrideConfig = {
      startFreq: 440,
      numSemitones: 12,
      intervals: [0, 3, 5],
      intervalStartIndex: 4,
      numNotes: 4
    };
    this.NumNotesIgnoredConfig = {
      startFreq: 440,
      numSemitones: 12,
      intervals: [0, 3, 5],
      intervalStartIndex: 4,
      numNotes: 1
    };
  });

  it('should return an array numNotes long, when numNotes is higher than intervals length', function() {
    expect(freqi.getFreqs(this.MoreNotesconfig)).to.have.lengthOf(this.MoreNotesconfig.numNotes);
  });
  it('should return an array intervals length long, when numNotes is smaller than intervals length', function() {
    expect(freqi.getFreqs(this.LessNotesconfig)).to.have.lengthOf(this.LessNotesconfig.intervals.length);
  });
  it('should return an array intervals length long, even if intervalStartIndex is larger than intervals length', function() {
    var _InversionArr = freqi.getFreqs(this.InversionStartNoteconfig);
    expect(_InversionArr).to.have.lengthOf(this.InversionStartNoteconfig.intervals.length);
  });
  it('should return an array numNotes long, when intervalStartIndex is larger than intervals length', function() {
    var _InversionArr = freqi.getFreqs(this.NumNotesOverrideConfig);
    expect(_InversionArr).to.have.lengthOf(this.NumNotesOverrideConfig.numNotes);
  });
  it('should return an array numNotes long, '
  + 'when numNotes is smaller than intervals length and intervalStartIndex is higher than inversions length', function() {
    expect(freqi.getFreqs(this.NumNotesIgnoredConfig)).to.have.lengthOf(this.NumNotesIgnoredConfig.numNotes);
  });
});

describe('getFreqs startFreq argument', function() {
  beforeEach(function() {
    this.startFreq = 480;
    this.negStartFreq = -220;
    this.posConfig = {
      startFreq: this.startFreq,
      numSemitones: 12,
      intervals: [-5, 0, 7]
    };
    this.negConfig = {
      startFreq: this.negStartFreq,
      numSemitones: 12,
      intervals: [-5, 0, 7]
    };
    this.nanConfig = {
      startFreq: NaN,
      numSemitones: 12,
      intervals: [-5, 0, 7]
    };
    this.badConfig = {
      startFreq: 'bad value',
      numSemitones: 12,
      intervals: [-5, 0, 7]
    };
  });

    it('should return an array when using 0 or high integer', function() {
      expect(freqi.getFreqs(this.posConfig)).to.be.an('array');
    });

    it('should return false when using a negative number', function() {
      expect(freqi.getFreqs(this.negConfig)).to.be.false;
    });

    it('should return false when using an incorrect data type', function() {
      expect(freqi.getFreqs(this.badConfig)).to.be.false;
    });

    it('should return false when NaN is generated', function() {
      expect(freqi.getFreqs(this.nanConfig)).to.be.false;
    });
});

describe('getFreqs numSemitones argument', function() {
  beforeEach(function() {
      this.numSemitones = 40;
      this.negNumSemitones = -20;
      this.posConfig = {
        startFreq: 440,
        numSemitones: this.numSemitones,
        intervals: [-5, 0, 7]
      };
      this.negConfig = {
        startFreq: 440,
        numSemitones: this.negNumSemitones,
        intervals: [-5, 0, 7]
      };
      this.nanConfig = {
        startFreq: 440,
        numSemitones: NaN,
        intervals: [-5, 0, 7]
      };
      this.badConfig = {
        startFreq: 440,
        numSemitones: 'bad value',
        intervals: [-5, 0, 7]
      };
      this.zeroConfig = {
        startFreq: 440,
        numSemitones: 0,
        intervals: [-5, 0, 7]
      };
  });

  it('should return an array when using one or higher', function() {
    expect(freqi.getFreqs(this.posConfig)).to.be.an('array');
  });

  it('should return false when using a negative number', function() {
    expect(freqi.getFreqs(this.negConfig)).to.be.false;
  });

  it('should return false when using an incorrect data type', function() {
    expect(freqi.getFreqs(this.badConfig)).to.be.false;
  });

  it('should return false when NaN is generated', function() {
    expect(freqi.getFreqs(this.nanConfig)).to.be.false;
  });

  it('should return false when using zero', function() {
    expect(freqi.getFreqs(this.zeroConfig)).to.be.false;
  });
});

describe('getFreqs intervals argument', function() {
  beforeEach(function() {
    this.interval = 40;
    this.negInterval = -20;
    this.intervals = [this.interval, this.negInterval];
    this.config = {
      startFreq: 440,
      numSemitones: 12,
      intervals: this.intervals
    };
    this.nanConfig = {
      startFreq: 440,
      numSemitones: 12,
      intervals: [NaN, NaN]
    };
    this.badConfig = {
      startFreq: 440,
      numSemitones: 12,
      intervals: ['bad value', 'bad value']
    };
    this.undefConfig = {
      startFreq: 440,
      numSemitones: 12
    };
  });

  it('should return an array when using 0 or high integer', function() {
    expect(freqi.getFreqs(this.config)).to.be.an('array');
  });

  it('should return an array of the same length as the intervals', function() {
    expect(freqi.getFreqs(this.config)).to.have.a.lengthOf(this.config.intervals.length);
  });

  it('should return false when using an incorrect data type', function() {
    expect(freqi.getFreqs(this.badConfig)).to.be.false;
  });

  it('should return false when NaN is generated', function() {
    expect(freqi.getFreqs(this.nanConfig)).to.be.false;
  });
  it('should return false when intervals is undefined', function() {
    expect(freqi.getFreqs(this.undefConfig)).to.be.false;
  });
});

/**
 * ---------------------
 * augmentNumArray tests
 * ---------------------
 */

describe('augmentNumArray return value', function() {
  beforeEach(function() {
    this.config = {
      originalArray: [0, 1, 2],
      difference: 2,
      amountToAdd: 12,
      repeatMultiple: 0
    };
  });
  it('should return an array', function() {
    expect(freqi.augmentNumArray(this.config)).to.be.an('array');
  });
  it('should return an array of the correct length', function() {
    var _finalLenth = this.config.originalArray.length + this.config.difference;
    expect(freqi.augmentNumArray(this.config)).to.have.lengthOf(_finalLenth);
  });
});

describe('augmentNumArray originalArray argument', function() {
  beforeEach(function() {
    this.config = {
      originalArray: [-5, 0, 7],
      difference: 3,
      amountToAdd: 12,
      repeatMultiple: 0
    };
    this.NaNConfig = {
      originalArray: [NaN, NaN, NaN],
      difference: 3,
      amountToAdd: 12,
      repeatMultiple: 0
    };
    this.ObjConfig = {
      originalArray: [{index: -5}, {index: 0}, {index: 1}],
      difference: 3,
      amountToAdd: 12,
      repeatMultiple: 0
    };
  });
  it('should return true if array contains numbers', function() {
    expect(freqi.augmentNumArray(this.config)).to.be.ok;
  });
  it('should return empty array if array contains NaNs', function() {
    expect(freqi.augmentNumArray(this.NaNConfig)).to.have.length(0);
  });
  it('should return true if array contains objects', function() {
    expect(freqi.augmentNumArray(this.ObjConfig)).to.have.be.ok;
  });
});

describe('augmentNumArray difference argument', function() {
  beforeEach(function() {
    this.config = {
      originalArray: [-5, 0, 7],
      difference: 3,
      amountToAdd: 12,
      repeatMultiple: 0
    };
    this.NaNConfig = {
      originalArray: [-5, 0, 7],
      difference: NaN,
      amountToAdd: 12,
      repeatMultiple: 0
    };
    this.BadConfig = {
      originalArray: [-5, 0, 7],
      difference: '3',
      amountToAdd: 12,
      repeatMultiple: 0
    };
    this.ZeroConfig = {
      originalArray: [-5, 0, 7],
      difference: 0,
      amountToAdd: 12,
      repeatMultiple: 0
    };
  });
  it('should return true if difference is a number', function() {
    expect(freqi.augmentNumArray(this.config)).to.be.ok;
  });
  it('should return empty array if difference is NaN', function() {
    expect(freqi.augmentNumArray(this.NaNConfig)).to.have.length(0);
  });
  it('should return empty array if difference is a string', function() {
    expect(freqi.augmentNumArray(this.BadConfig)).to.have.length(0);
  });
  it('should return empty array if difference is zero or less', function() {
    expect(freqi.augmentNumArray(this.ZeroConfig)).to.have.length(0);
  });
});

describe('augmentNumArray amountToAdd argument', function() {
  beforeEach(function() {
    this.config = {
      originalArray: [-5, 0, 7],
      difference: 3,
      amountToAdd: 12,
      repeatMultiple: 0
    };
    this.NegConfig = {
      originalArray: [-5, 0, 7],
      difference: 3,
      amountToAdd: -2,
      repeatMultiple: 0
    };
    this.NaNConfig = {
      originalArray: [-5, 0, 7],
      difference: 3,
      amountToAdd: NaN,
      repeatMultiple: 0
    };
    this.BadConfig = {
      originalArray: [-5, 0, 7],
      difference: 3,
      amountToAdd: '12',
      repeatMultiple: 0
    };
    this.ExtraItemConfig = {
      originalArray: [-5, 0, 7],
      difference: 1,
      amountToAdd: 12,
      repeatMultiple: 0
    };

  });
  it('should return true if amountToAdd is a number', function() {
    expect(freqi.augmentNumArray(this.config)).to.be.ok;
  });
  it('should return empty array if amountToAdd is a negative number', function() {
    expect(freqi.augmentNumArray(this.negConfig)).to.have.length(0);
  });
  it('should return empty array if amountToAdd is NaN', function() {
    expect(freqi.augmentNumArray(this.NaNConfig)).to.have.length(0);
  });
  it('should return empty array if amountToAdd is a string', function() {
    expect(freqi.augmentNumArray(this.BadConfig)).to.have.length(0);
  });
  it('should return an array with the amountToAdd added to any missing items', function() {
    var _extraItemIndex = this.ExtraItemConfig.originalArray.length + this.ExtraItemConfig.difference - 1;
    var _firstItemValue = this.ExtraItemConfig.originalArray[0];
    var _ExtraItemFreq = freqi.augmentNumArray(this.ExtraItemConfig)[_extraItemIndex];
    expect(_ExtraItemFreq).to.equal(_firstItemValue + this.ExtraItemConfig.amountToAdd);
  });
});

describe('augmentNumArray repeatMultiple argument', function() {
  beforeEach(function() {
    this.config = {
      originalArray: [-5, 0, 7],
      difference: 3,
      amountToAdd: 12,
      repeatMultiple: 0
    };
    this.NegConfig = {
      originalArray: [-5, 0, 7],
      difference: 3,
      amountToAdd: 12,
      repeatMultiple: -5
    };
    this.NaNConfig = {
      originalArray: [-5, 0, 7],
      difference: 3,
      amountToAdd: 12,
      repeatMultiple: NaN
    };
    this.BadConfig = {
      originalArray: [-5, 0, 7],
      difference: 3,
      amountToAdd: 12,
      repeatMultiple: '0'
    };
    this.RepeatConfig = {
      originalArray: [-5, 0, 7],
      difference: 10,
      amountToAdd: 12,
      repeatMultiple: 2
    };

  });
  it('should return true if repeatMultiple is a positive number', function() {
    expect(freqi.augmentNumArray(this.config)).to.be.an('array');
  });
  it('should return empty array if repeatMultiple is a negative number', function() {
    expect(freqi.augmentNumArray(this.negConfig)).to.have.length(0);
  });
  it('should return empty array if repeatMultiple is NaN', function() {
    expect(freqi.augmentNumArray(this.NaNConfig)).to.have.length(0);
  });
  it('should return empty array if repeatMultiple is a string', function() {
    expect(freqi.augmentNumArray(this.BadConfig)).to.have.length(0);
  });
  it('should return an array that repeats values when repeatMultiple is reached', function() {
    var _repeatIndex = this.RepeatConfig.difference + this.RepeatConfig.originalArray.length - 1;
    var _repeatArr = freqi.augmentNumArray(this.RepeatConfig);
    var _repeatVal = _repeatArr[_repeatIndex];
    expect(_repeatVal).to.equal(_repeatArr[0]);
  });
});

/**
 * ---------------------
 * addMissingNotesFromInterval tests
 * ---------------------
 */

describe('addMissingNotesFromInterval', function() {
  beforeEach(function() {
    this.largeConfig = {
      intervalStartIndex: 2,
      numNotes: 5,
      scaleIntervals: [3, 5, 12],
      amountToAdd: 0,
      repeatMultiple: 1
    };
    this.smallConfig = {
      intervalStartIndex: 0,
      numNotes: 1,
      scaleIntervals: [3, 5, 12],
      amountToAdd: 0,
      repeatMultiple: 1
    };
  });
  it('should return scaleIntervals array if numNotes is smaller than scaleIntervals length plus intervalStartIndex', function() {
    expect(freqi.addMissingNotesFromInterval(this.smallConfig)).to.deep.equal([3, 5, 12]);
  });
  it('should return array twice the length of scaleIntervals plus one if numNotes is larger than scaleIntervals length plus intervalStartIndex', function() {
    expect(freqi.addMissingNotesFromInterval(this.largeConfig).length).to.equal(7);
  });
});



/**
 * ---------------------
 * getSingleFreq tests
 * ---------------------
 */

describe('getSingleFreq startFreq argument', function() {
  beforeEach(function() {
    this.startFreq = 440;
    this.negStartFreq = -220;
    this.posConfig = {
        startFreq: this.startFreq,
        numSemitones: 12,
        interval: 0,
        upwardsScale: true,
        mode: 'eqTemp'
    };
    this.negConfig = {
        startFreq: this.negStartFreq,
        numSemitones: 12,
        interval: 0,
        upwardsScale: true,
        mode: 'eqTemp'
    };
    this.nanConfig = {
        startFreq: NaN,
        numSemitones: 12,
        interval: 0,
        upwardsScale: true,
        mode: 'eqTemp'
    };
    this.badConfig = {
        startFreq: 'bad value',
        numSemitones: 12,
        interval: 0,
        upwardsScale: true,
        mode: 'eqTemp'
    };
    this.zeroConfig = {
        startFreq: 0,
        numSemitones: 12,
        interval: 0,
        upwardsScale: true,
        mode: 'eqTemp'
    };
  });

  it('should return a number when using 0 or high integer', function() {
    expect(freqi.getSingleFreq(this.posConfig)).to.be.a('number');
  });

  it('should return a number when startFreq is zero', function() {
    expect(freqi.getSingleFreq(this.zeroConfig)).to.be.a('number');
  });

  it('should return false when using a negative number', function() {
    expect(freqi.getSingleFreq(this.negConfig)).to.be.false;
  });

  it('should return false when using an incorrect data type', function() {
    expect(freqi.getSingleFreq(this.badConfig)).to.be.false;
  });

  it('should return false when NaN is generated', function() {
    expect(freqi.getSingleFreq(this.nanConfig)).to.be.false;
  });
});

describe('getSingleFreq numSemitones argument', function() {
  beforeEach(function() {
    this.numSemitones = 40;
    this.negNumSemitones = -20;
    this.posConfig = {
      startFreq: 400,
      numSemitones: this.numSemitones,
      interval: 0,
      upwardsScale: true,
      mode: 'eqTemp'
    };
    this.negConfig = {
      startFreq: 440,
      numSemitones: this.negNumSemitones,
      interval: 0,
      upwardsScale: true,
      mode: 'eqTemp'
    };
    this.nanConfig = {
      startFreq: 440,
      numSemitones: NaN,
      interval: 0,
      upwardsScale: true,
      mode: 'eqTemp'
    };
    this.badConfig = {
      startFreq: 440,
      numSemitones: 'test',
      interval: 0,
      upwardsScale: true,
      mode: 'eqTemp'
    };
  });

  it('should return a number when using 0 or high integer', function() {
    expect(freqi.getSingleFreq(this.posConfig)).to.be.a('number');
  });

  it('should return false when using a negative number', function() {
    expect(freqi.getSingleFreq(this.negConfig)).to.be.false;
  });

  it('should return false when using an incorrect data type', function() {
    expect(freqi.getSingleFreq(this.badConfig)).to.be.false;
  });

  it('should return false when NaN is generated', function() {
    expect(freqi.getSingleFreq(this.nanConfig)).to.be.false;
  });
});

describe('getSingleFreq interval argument', function() {
  beforeEach(function() {
    this.interval = 40;
    this.negInterval = -20;
    this.posConfig = {
      startFreq: 400,
      numSemitones: 12,
      interval: this.interval,
      upwardsScale: true,
      mode: 'eqTemp'
    };
    this.negConfig = {
      startFreq: 440,
      numSemitones: 12,
      interval: this.negInterval,
      upwardsScale: true,
      mode: 'eqTemp'
    };
    this.nanConfig = {
      startFreq: 440,
      numSemitones: 12,
      interval: NaN,
      upwardsScale: true,
      mode: 'eqTemp'
    };
    this.badConfig = {
      startFreq: 440,
      numSemitones: 12,
      interval: 'test',
      upwardsScale: true,
      mode: 'eqTemp'
    };
  });

  it('should return a number when using 0 or high integer', function() {
    expect(freqi.getSingleFreq(this.posConfig)).to.be.a('number');
  });

  it('should return a number when using 0 or lower integer', function() {
    expect(freqi.getSingleFreq(this.negConfig)).to.be.a('number');
  });

  it('should return false when using an incorrect data type', function() {
    expect(freqi.getSingleFreq(this.badConfig)).to.be.false;
  });

  it('should return false when NaN is generated', function() {
    expect(freqi.getSingleFreq(this.nanConfig)).to.be.false;
  });
});

/**
 * ---------------------
 * getJustIntNote tests
 * ---------------------
 */

describe('getJustIntNote interval argument', function() {
  beforeEach(function() {
    this.configPythag = {
      interval: 2,
      mode: 'pythagorean'
    };
    this.configDiatonic = {
      interval: 2,
      mode: 'diatonic'
    };
    this.configFiveLimit = {
      interval: 2,
      mode: 'fiveLimit'
    };
    this.configIndDiatonic = {
      interval: 2,
      mode: 'diatonicIndian'
    };
    this.configIndTwentyTwo = {
      interval: 2,
      mode: 'twentyTwoShrutis'
    };
    this.configZarlino = {
      interval: 2,
      mode: 'gioseffoZarlino'
    };
    this.badConfig = {
      interval: 2,
      mode: 'pythagorean typo'
    };
  });

  it('should return a number when ETNoteConfig arg object contains valid interval and mode', function() {
    expect(freqi.getJustIntNote(this.configPythag, false, freqi.justTuningSystems)).to.be.a('number');
  });
  it('should return a number when ETNoteConfig arg object contains mode: diatonic', function() {
    expect(freqi.getJustIntNote(this.configDiatonic, false, freqi.justTuningSystems)).to.be.a('number');
  });
  it('should return a number when ETNoteConfig arg object contains mode: fiveLimit', function() {
    expect(freqi.getJustIntNote(this.configFiveLimit, false, freqi.justTuningSystems)).to.be.a('number');
  });
  it('should return a number when ETNoteConfig arg object contains mode: diatonicIndian', function() {
    expect(freqi.getJustIntNote(this.configIndDiatonic, false, freqi.justTuningSystems)).to.be.a('number');
  });
  it('should return a number when ETNoteConfig arg object contains mode: twentyTwoShrutis', function() {
    expect(freqi.getJustIntNote(this.configIndTwentyTwo, false, freqi.justTuningSystems)).to.be.a('number');
  });
  it('should return a number when ETNoteConfig arg object contains mode: gioseffoZarlino', function() {
    expect(freqi.getJustIntNote(this.configZarlino, false, freqi.justTuningSystems)).to.be.a('number');
  });
  it('should return false when ETNoteConfig arg object contains an invalid mode string', function() {
    expect(freqi.getJustIntNote(this.badConfig, false, freqi.justTuningSystems)).to.be.false;
  });
});

describe('getHSeriesNote', function() {
  beforeEach(function() {
    this.config = {
      startFreq: 440,
      interval: -2,
      mode: 'hSeries'
    };
    this.configZero = {
      startFreq: 440,
      interval: 0,
      mode: 'hSeries'
    };
    this.configOne = {
      startFreq: 440,
      interval: 1,
      mode: 'hSeries'
    };
  });

  it('should return a number half of the start freq when interval is -2', function() {
    expect(freqi.getHSeriesNote(this.config, false)).to.equal(220);
  });
  it('should return the start freq if passed zero as the interval', function() {
    expect(freqi.getHSeriesNote(this.configZero, false)).to.equal(this.configZero.startFreq);
  });
  it('should return the start freq if passed one as the interval', function() {
    expect(freqi.getHSeriesNote(this.configOne, false)).to.equal(this.configOne.startFreq);
  });
});

/**
 * ---------------------
 * getAllOctaveJustIntervals tests
 * ---------------------
 */

describe('getAllOctaveJustIntervals mult return value', function() {
  beforeEach(function() {
    this.justIntArr = [[1,1],[3,2],[4,3],[5,4],[16,9]];
  });

  it('should return mult 0 when interval argument is within the array argument length', function() {
    expect(freqi.getAllOctaveJustIntervals(2, this.justIntArr.length).mult).to.equal(0);
  });
  it('should return mult 1 when interval argument is within the next multiple of the array argument length', function() {
    expect(freqi.getAllOctaveJustIntervals(6, this.justIntArr.length).mult).to.equal(1);
  });
  it('should return mult 2 when interval argument is double the array argument length', function() {
    expect(freqi.getAllOctaveJustIntervals(10, this.justIntArr.length).mult).to.equal(2);
  });
  it('should return mult 2 when interval argument is between double and treble the array argument length', function() {
    expect(freqi.getAllOctaveJustIntervals(13, this.justIntArr.length).mult).to.equal(2);
  });
  it('should return mult 1 when interval argument is within the array argument length but negative', function() {
    expect(freqi.getAllOctaveJustIntervals(-2, this.justIntArr.length).mult).to.equal(1);
  });
  it('should return mult 2 when interval argument is double the array argument length but negative', function() {
    expect(freqi.getAllOctaveJustIntervals(-10, this.justIntArr.length).mult).to.equal(2);
  });
  it('should return mult 2 when interval argument is between double and treble the array argument length but negative', function() {
    expect(freqi.getAllOctaveJustIntervals(-13, this.justIntArr.length).mult).to.equal(3);
  });
});

describe('getAllOctaveJustIntervals rangeInterval return value', function() {
  beforeEach(function() {
    this.justIntArr = [[1,1],[3,2],[4,3],[5,4],[16,9]];
  });

  it('should return rangeInterval 3 when interval argument is 3', function() {
    expect(freqi.getAllOctaveJustIntervals(3, this.justIntArr.length).rangeInterval).to.equal(3);
  });
  it('should return rangeInterval 3 when interval argument is greater than the array argument length by three items', function() {
    expect(freqi.getAllOctaveJustIntervals(8, this.justIntArr.length).rangeInterval).to.equal(3);
  });
  it('should return rangeInterval 4 when interval argument is greater than the array argument length and negative', function() {
    expect(freqi.getAllOctaveJustIntervals(-6, this.justIntArr.length).rangeInterval).to.equal(4);
  });
});

describe('getCorrectIndex', function() {
  beforeEach(function() {
    this.notesInOct = 12;
    this.circleOfFifths = [7, 2, 9, 4, 11, 6, 1, 8, 3, 10, 5];
  });
  it('should return 7 when interval argument is 1', function() {
    expect(freqi.getCorrectIndex(1, true, this.notesInOct, 0)).to.equal(7);
  });
  it('should return 7 + notesInOct when interval argument is 13', function() {
    expect(freqi.getCorrectIndex(13, true, this.notesInOct, 1)).to.equal(19);
  });
});

describe('raiseOrReduceByFifth', function() {
  it('should return number times 1.5 if _up arg is true', function() {
    expect(freqi.raiseOrReduceByFifth(1, true)).to.equal(1.5);
  });
  it('should return number divided 1.5 if _up arg is false', function() {
    expect(freqi.raiseOrReduceByFifth(3, false)).to.equal(2);
  });
});

describe('multOrDivide', function() {
  it('should divide num arg by mult arg if _up arg is true', function() {
    expect(freqi.multOrDivide(2, 2, true)).to.equal(1);
  });
  it('should multiply num arg by mult arg if _up arg is false', function() {
    expect(freqi.multOrDivide(2, 2, false)).to.equal(4);
  });
});

describe('getTruePythagNote', function() {
  beforeEach(function() {
    this.config = {
      startFreq: 261.6,
      interval: 0
    };
    this.configGNote = {
      startFreq: 261.6,
      interval: 7
    };
    this.configLowerFNote = {
      startFreq: 261.6,
      interval: -7
    };
  });
  it('should return the start freq if interval is zero', function() {
    expect(freqi.getTruePythagNote(this.config, true)).to.equal(261.6);
  });
  it('should return the start freq * 1.5 if interval is seven', function() {
    expect(freqi.getTruePythagNote(this.configGNote, true)).to.equal(261.6 * 1.5);
  });
  it('should return the start freq / 1.5 if interval is minus seven', function() {
    expect(freqi.getTruePythagNote(this.configLowerFNote, false)).to.equal(261.6 / 1.5);
  });
});

describe('getModes', function() {
  it('should return an array the length of justTuningSystems plus the default (eqTemp) and the harmonic series', function() {
    const justTuningSystemsLength = Object.keys(freqi.justTuningSystems).length;
    expect(freqi.getModes().length).to.equal(justTuningSystemsLength + 2);
  });
});
