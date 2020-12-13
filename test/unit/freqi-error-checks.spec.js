'use strict';
var mocha = require('mocha');
var expect = require('chai').expect;
var freqiErrChecks = require('../../lib/freqi').errorCheckFns;

/**
 * ---------------------
 * tests for error checking fns only
 * ---------------------
 */

describe('checkAugmentNumArrayConfigTypes', function() {
  before(function() {
    this.config = {
      origialArray: false,
      difference: -1,
      repeatMultiple: -2,
      amountToAdd: -3
    };
    this.configArrayNaN = {
      origialArray: [NaN],
      difference: -1,
      repeatMultiple: -2,
      amountToAdd: -3
    };
    this.configDifferenceNaN = {
      origialArray: [1],
      differenceNan: NaN,
      repeatMultiple: -2,
      amountToAdd: -3
    };
    this.configDifferenceNotNum = {
      origialArray: [1],
      differenceNan: 'NaN',
      repeatMultiple: -2,
      amountToAdd: -3
    };
    this.configRepeatMultNaN = {
      origialArray: [1],
      differenceNan: 1,
      repeatMultiple: NaN,
      amountToAdd: -3
    };
    this.configRepeatMultNotNum = {
      origialArray: [1],
      differenceNan: 1,
      repeatMultiple: 'NaN',
      amountToAdd: -3
    };
    this.configAmountNaN = {
      origialArray: [1],
      differenceNan: 1,
      repeatMultiple: 1,
      amountToAdd: NaN
    };
    this.configAmountNotNum = {
      origialArray: [1],
      differenceNan: 1,
      repeatMultiple: 1,
      amountToAdd: ''
    };
  });
  it('should throw if origialArray prop of arg obj is note an array', function() {
    expect(function() {
      freqiErrChecks.checkAugmentNumArrayConfigTypes(this.config);
    }).to.throw;
  });
  it('should throw if origialArray contains any NaNs', function() {
    expect(function() {
      freqiErrChecks.checkAugmentNumArrayConfigTypes(this.configArrayNaN);
    }).to.throw;
  });
  it('should throw if difference is not data type number', function() {
    expect(function() {
      freqiErrChecks.checkAugmentNumArrayConfigTypes(this.configRepeatMultNotNum);
    }).to.throw;
  });
  it('should throw if difference is NaN', function() {
    expect(function() {
      freqiErrChecks.checkAugmentNumArrayConfigTypes(this.configRepeatMultNaN);
    }).to.throw;
  });
  it('should throw if repeatMultiple is not data type number', function() {
    expect(function() {
      freqiErrChecks.checkAugmentNumArrayConfigTypes(this.configDifferenceNotNum);
    }).to.throw;
  });
  it('should throw if repeatMultiple is NaN', function() {
    expect(function() {
      freqiErrChecks.checkAugmentNumArrayConfigTypes(this.configDifferenceNaN);
    }).to.throw;
  });
  it('should throw if amountToAdd is not data type number', function() {
    expect(function() {
      freqiErrChecks.checkAugmentNumArrayConfigTypes(this.configAmountNotNum);
    }).to.throw;
  });
  it('should throw if amountToAdd is NaN', function() {
    expect(function() {
      freqiErrChecks.checkAugmentNumArrayConfigTypes(this.configAmountNaN);
    }).to.throw;
  });
});

describe('checkAugmentNumArrayConfigForNegs', function() {
  before(function() {
    this.config = {
      difference: -1,
      repeatMultiple: -2,
      amountToAdd: -3
    }
  });
  it('should throw if difference prop of arg obj is negative', function() {
    expect(function() {
      freqiErrChecks.checkAugmentNumArrayConfigForNegs(this.config);
    }).to.throw;
  });
  it('should throw if repeatMultiple prop of arg obj is negative', function() {
    expect(function() {
      freqiErrChecks.checkAugmentNumArrayConfigForNegs(this.config);
    }).to.throw;
  });
  it('should throw if amountToAdd prop of arg obj is negative', function() {
    expect(function() {
      freqiErrChecks.checkAugmentNumArrayConfigForNegs(this.config);
    }).to.throw;
  });
});

describe('checkGetSingleFreqConfigForNegs', function() {
  before(function() {
    this.config = {
      difference: -1,
      repeatMultiple: -2,
      amountToAdd: -3
    }
  });
  it('should throw if any prop of arg obj is negative and prop is not "interval", "upwardsScale" or "mode"', function() {
    expect(function() {
      freqiErrChecks.checkGetSingleFreqConfigForNegs(this.config);
    }).to.throw;
  });
});

describe('checkGetSingleFreqConfigDataTypes', function() {
  before(function() {
    this.configBadStartFreq = {
      startFreq: '1',
      numSemitones: 2,
      upwardsScale: true,
      mode: 'eqTemp'
    };
    this.configBadStartFreqNaN = {
      startFreq: NaN,
      numSemitones: 2,
      upwardsScale: true,
      mode: 'eqTemp'
    };
    this.configBadUpwardsScale = {
      startFreq: 200,
      numSemitones: 2,
      upwardsScale: 'true',
      mode: 'eqTemp'
    };
    this.configBadMode = {
      startFreq: 200,
      numSemitones: 2,
      upwardsScale: 'true',
      mode: []
    };
  });
  it('should throw if any numeric prop of arg obj is not type number or is NaN', function() {
    expect(function() {
      freqiErrChecks.checkGetSingleFreqConfigDataTypes(this.configBadStartFreq);
    }).to.throw;
    expect(function() {
      freqiErrChecks.checkGetSingleFreqConfigDataTypes(this.configBadStartFreqNaN);
    }).to.throw;
  });
  it('should throw if upwardsScale prop of arg obj is not a boolean', function() {
    expect(function() {
      freqiErrChecks.checkGetSingleFreqConfigDataTypes(this.configBadUpwardsScale);
    }).to.throw;
  });
  it('should throw if mode prop of arg obj is not a string', function() {
    expect(function() {
      freqiErrChecks.checkGetSingleFreqConfigDataTypes(this.configBadUpwardsScale);
    }).to.throw;
  });
});

describe('checkGetFreqsNumericDataTypes', function() {
  before(function() {
    this.config = {
      startFreq: -1,
      numSemitones: -2,
      rootNote: -3,
      numNotes: 1,
      amountToAdd: 1,
      intervalStartIndex: 1,
      mode: 'eqTemp',
      type: 'test'
    }
  });
  it('should throw if startFreq of arg obj is not a number', function() {
    expect(function() {
      freqiErrChecks.checkGetFreqsNumericDataTypes(this.config);
    }).to.throw;
  });
});
