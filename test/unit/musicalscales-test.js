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
            startFreq: this.randomNegStartFreq,
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
        // test the type
        expect(musicalscales.getSpecificScale(this.posConfig)).to.be.an('array');
    });

    it('should throw an error when using a negative number', function() {
        // test the type
        expect(musicalscales.getSpecificScale(this.negConfig)).to.throw(TypeError);
    });

    it('should throw a type error when using an incorrect data type', function() {
        // test the type
        expect(musicalscales.getSpecificScale(this.badConfig)).to.throw(TypeError);
    });

    it('should throw a type error when NaN is generated', function() {
        // test the type
        expect(musicalscales.getSpecificScale(this.nanConfig)).to.throw(TypeError);
    });
});
