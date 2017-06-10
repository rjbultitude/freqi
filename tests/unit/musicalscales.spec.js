'use strict'

var musicalScales = require('../lib/musicalscales');

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
describe('Test the methods of musicalScales', function() {
    describe('Test musicalScales error handling', function() {
      beforeEach(function() {
        this.randomLength = getRandomInt(0, 10);
      }
      it('should return an error when non numeric value is supplied', function() {
        expect(musicalScales()).to.throw.error;
      });
      it('should return an error', function() {
        expect(musicalScales()).to.error;
      });
      it('should return an error', function() {
        expect(musicalScales()).to.error;
      });
    });
    describe('Test getScale', function() {
      // executes once, before all tests
      beforeEach(function() {
          this.randomPosLatitude = getRandomInt(0, 90);
          this.randomPosLongitude = getRandomInt(0, 180);
          this.randomNegLatitude = -Math.abs(getRandomInt(0, 90));
          this.randomNegLongitiude = -Math.abs(getRandomInt(0, 180));
      });

      //create scale spec
      it('should return an array of locations', function() {
          //test the type
      });
    });
});
