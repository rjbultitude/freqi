'use strict'

//import { describe, it } from 'mocha';
//import { expect } from 'chai';
var mocha = require('mocha');
var expect = require('chai').expect;
var musicalscales = require('../../lib/musicalscales');

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

// Group specs with describe
// Use as many specs as you like
describe('Test the getSpecificScale return value types', function() {
    before(function() {
        this.config = {
            startFreq: 440,
            numSemitones: 12,
            intervals: [-5, 0, 7]
        };
    });

    it('should return an object', function() {
        // test the type
        expect(musicalscales.getSpecificScale(this.config)).to.be.an('array');
    });
    it('should return an array of numbers', function() {
        // test the type
        expect(musicalscales.getSpecificScale(this.config)[0]).to.be.a('number');
    });
});

describe('Test the getSpecificScale startFreq values', function() {
    // executes once, before all tests
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
        expect(musicalscales.getSpecificScale(this.posConfig)).to.be.an('array');
    });

    it('should return false when using a negative number', function() {
        expect(musicalscales.getSpecificScale(this.negConfig)).to.be.false;
    });

    it('should return false when using an incorrect data type', function() {
        expect(musicalscales.getSpecificScale(this.badConfig)).to.be.false;
    });

    it('should return false when NaN is generated', function() {
        expect(musicalscales.getSpecificScale(this.nanConfig)).to.be.false;
    });
});

describe('Test augmentArray', function() {
  before(function() {
    this.config = {
      originalArray: [0, 1, 2],
      difference: 3,
      amountToAdd: 12,
      repeatMultiple: 0
    }
  });
  it('should return an array of the correct length', function() {
    var _finalLenth = this.config.originalArray.length + this.config.difference;
    expect(musicalscales.augmentArray(this.config)).to.have.lengthOf(_finalLenth);
  });
});

describe('Test getSpecificNote arguments', function() {
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
  
  it('should return an number when using 0 or high integer', function() {
      expect(musicalscales.getSpecificNote(this.posConfig)).to.be.a('number');
  });

  it('should return false when using a negative number', function() {
      expect(musicalscales.getSpecificNote(this.negConfig)).to.be.false;
  });

  it('should return false when using an incorrect data type', function() {
      expect(musicalscales.getSpecificNote(this.badConfig)).to.be.false;
  });

  it('should return false when NaN is generated', function() {
      expect(musicalscales.getSpecificNote(this.nanConfig)).to.be.false;
  });
});
