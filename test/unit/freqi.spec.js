'use strict'

//import { describe, it } from 'mocha';
//import { expect } from 'chai';
var mocha = require('mocha');
var expect = require('chai').expect;
var freqi = require('../../lib/freqi');

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomNumbers(length) {
    var numArray = [];
    for (var i = 0; i < length; i++) {
        numArray[i] = getRandomInt(1, 10000);
    }
    return numArray;
}

/**
 * ---------------------
 * getFreqs tests
 * ---------------------
 */

describe('Test the getFreqs return value types', function() {
    before(function() {
        this.config = {
            startFreq: 440,
            numSemitones: 12,
            intervals: [-5, 0, 7]
        };
    });

    it('should return an object', function() {
        expect(freqi.getFreqs(this.config)).to.be.an('array');
    });
    it('should return an array of numbers', function() {
        expect(freqi.getFreqs(this.config)[0]).to.be.a('number');
    });
});

describe('Test the getFreqs startFreq argument', function() {
    beforeEach(function() {
        this.randomStartFreq = getRandomInt(0, 10000);
        this.randomNegStartFreq = -Math.abs(getRandomInt(0, 180));
        this.posConfig = {
            startFreq: this.randomStartFreq,
            numSemitones: 12,
            intervals: [-5, 0, 7]
        };
        this.negConfig = {
            startFreq: this.randomNegStartFreq,
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

describe('Test the getFreqs numSemitones argument', function() {
    // executes once, before all tests
    beforeEach(function() {
        this.randomNumSemitones = getRandomInt(0, 100);
        this.randomNegNumSemitones = -Math.abs(getRandomInt(0, 100));
        this.posConfig = {
            startFreq: 440,
            numSemitones: this.randomNumSemitones,
            intervals: [-5, 0, 7]
        };
        this.negConfig = {
            startFreq: 440,
            numSemitones: this.randomNegNumSemitones,
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

describe('Test the getFreqs intervals argument', function() {
    beforeEach(function() {
        this.randomInterval = getRandomInt(0, 100);
        this.randomNegInterval = -Math.abs(getRandomInt(0, 100));
        this.intervals = [this.randomInterval, this.randomNegInterval];
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
});

/**
 * ---------------------
 * augmentNumArray tests
 * ---------------------
 */

describe('Test augmentNumArray return value', function() {
  beforeEach(function() {
    this.randomDifference = getRandomInt(0, 30);
    this.config = {
      originalArray: [0, 1, 2],
      difference: this.randomDifference,
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

describe('Test augmentNumArray originalArray argument', function() {
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
  it('should return false if array contains NaNs', function() {
    expect(freqi.augmentNumArray(this.NaNConfig)).to.be.false;
  });
  it('should return true if array contains objects', function() {
    expect(freqi.augmentNumArray(this.ObjConfig)).to.have.be.ok;
  });
});

describe('Test augmentNumArray difference argument', function() {
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
  });
  it('should return true if difference is a number', function() {
    expect(freqi.augmentNumArray(this.config)).to.be.ok;
  });
  it('should return false if difference is NaN', function() {
    expect(freqi.augmentNumArray(this.NaNConfig)).to.be.false;
  });
  it('should return false if difference is a string', function() {
    expect(freqi.augmentNumArray(this.BadConfig)).to.have.be.false;
  });
});

describe('Test augmentNumArray amountToAdd argument', function() {
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

  });
  it('should return true if amountToAdd is a number', function() {
    expect(freqi.augmentNumArray(this.config)).to.be.ok;
  });
  it('should return false if amountToAdd is a negative number', function() {
    expect(freqi.augmentNumArray(this.negConfig)).to.be.false;
  });
  it('should return false if amountToAdd is NaN', function() {
    expect(freqi.augmentNumArray(this.NaNConfig)).to.be.false;
  });
  it('should return false if amountToAdd is a string', function() {
    expect(freqi.augmentNumArray(this.BadConfig)).to.have.be.false;
  });
});

describe('Test augmentNumArray repeatMultiple argument', function() {
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

  });
  it('should return true if repeatMultiple is a positive number', function() {
    console.log('TYPE OF repeatMultiple', typeof this.config.repeatMultiple);
    expect(freqi.augmentNumArray(this.config)).to.be.an('array');
  });
  it('should return false if repeatMultiple is a negative number', function() {
    expect(freqi.augmentNumArray(this.negConfig)).to.be.false;
  });
  it('should return false if repeatMultiple is NaN', function() {
    expect(freqi.augmentNumArray(this.NaNConfig)).to.be.false;
  });
  it('should return false if repeatMultiple is a string', function() {
    expect(freqi.augmentNumArray(this.BadConfig)).to.have.be.false;
  });
});

/**
 * ---------------------
 * getSingleFreq tests
 * ---------------------
 */

describe('Test getSingleFreq startFreq argument', function() {
  beforeEach(function() {
    this.randomStartFreq = getRandomInt(0, 10000);
    this.randomNegStartFreq = -Math.abs(getRandomInt(0, 180));
    this.posConfig = {
        startFreq: this.randomStartFreq,
        numSemitones: 12,
        interval: 0,
        upwardsScale: true
    };
    this.negConfig = {
        startFreq: this.randomNegStartFreq,
        numSemitones: 12,
        interval: 0,
        upwardsScale: true
    };
    this.nanConfig = {
        startFreq: NaN,
        numSemitones: 12,
        interval: 0,
        upwardsScale: true
    };
    this.badConfig = {
        startFreq: 'bad value',
        numSemitones: 12,
        interval: 0,
        upwardsScale: true
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

describe('Test getSingleFreq numSemitones argument', function() {
  beforeEach(function() {
    this.randomNumSemitones = getRandomInt(0, 100);
    this.randomNegNumSemitones = -Math.abs(getRandomInt(0, 100));
    this.posConfig = {
        startFreq: 400,
        numSemitones: this.randomNumSemitones,
        interval: 0,
        upwardsScale: true
    };
    this.negConfig = {
        startFreq: 440,
        numSemitones: this.randomNegNumSemitones,
        interval: 0,
        upwardsScale: true
    };
    this.nanConfig = {
        startFreq: 440,
        numSemitones: NaN,
        interval: 0,
        upwardsScale: true
    };
    this.badConfig = {
        startFreq: 440,
        numSemitones: 'test',
        interval: 0,
        upwardsScale: true
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

describe('Test getSingleFreq interval argument', function() {
  beforeEach(function() {
    this.randomInterval = getRandomInt(0, 100);
    this.randomNegInterval = -Math.abs(getRandomInt(0, 100));
    this.posConfig = {
        startFreq: 400,
        numSemitones: 12,
        interval: this.randomInterval,
        upwardsScale: true
    };
    this.negConfig = {
        startFreq: 440,
        numSemitones: 12,
        interval: this.randomNegInterval,
        upwardsScale: true
    };
    this.nanConfig = {
        startFreq: 440,
        numSemitones: 12,
        interval: NaN,
        upwardsScale: true
    };
    this.badConfig = {
        startFreq: 440,
        numSemitones: 12,
        interval: 'test',
        upwardsScale: true
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
