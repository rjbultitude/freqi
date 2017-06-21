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
            intervals: [-5, 0, 7];
        };
    });

    it('should return an object', function() {
        // test the type
        expect(musicalscales(this.config)).to.be.an('object');
    });
    it('should return an object with the property getSpecificScale', function() {
        // test the type
        expect(musicalscales(this.config).getSpecificScale).to.be.a('function');
    });
    it('should return an object with the property scale', function() {
        // test the type
        expect(musicalscales(this.config).scale).to.be.an('array');
    });
});

describe('Test the musicalscales scales array values', function() {
    // executes once, before all tests
    beforeEach(function() {
        this.randomStartFreq = getRandomInt(0, 10000);
        this.randomNegStartFreq = -Math.abs(getRandomInt(0, 180));
    });

    it('should return an array when using 0 or high integer', function() {
        // test the type
        expect(musicalscales({startFreq: this.randomStartFreq, numOctaves: 2, numSemitones: 12, downFirst: true}).scale).to.be.an('array');
    });

    xit('should throw an error when using a negative number', function() {
        // test the type
        expect(musicalscales({startFreq: this.randomStartFreq, numOctaves: 2, numSemitones: 12, downFirst: true}).scale).to.throw(new TypeError);
    });

    xit('should throw a type error when using an incorrect data type', function() {
        // test the type
        expect(musicalscales({startFreq: 'test', numOctaves: 2, numSemitones: 12, downFirst: true}).scale).to.throw(new TypeError);
    });

    xit('should return false when using an incorrect data type', function() {
        // test the type
        expect(musicalscales({startFreq: 'test', numOctaves: 2, numSemitones: 12, downFirst: true}).scale).to.be.false;
    });

    it('should contain the original startFreq value', function() {
        // test the type
        expect(musicalscales({startFreq: 1, numOctaves: 2, numSemitones: 12, downFirst: true}).scale).to.include(1);
    });
});

describe('Test the musicalscales scales array length', function() {

    it('should return an object', function() {
        // test the type
        expect(musicalscales({startFreq: 440, numOctaves: 2, numSemitones: 12, downFirst: true}).scale).to.have.length(25);
    });
});
