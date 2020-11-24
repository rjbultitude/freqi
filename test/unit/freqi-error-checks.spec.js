'use strict';
var mocha = require('mocha');
var expect = require('chai').expect;
var freqiErrChecks = require('../../lib/freqi').errorCheckFns;

/**
 * ---------------------
 * tests for error checking fns only
 * ---------------------
 */

describe('getFreqs return value types', function() {
  before(function() {
    this.config = {
      difference: -1,
      repeatMultiple: -2,
      amountToAdd: -3
    }
  });
  it('should throw if difference prop or arg obj is negative', function() {
    expect(function() {
      freqiErrChecks.checkAugmentNumArrayConfigForNegs(this.config);
    }).to.throw;
  });
  it('should throw if repeatMultiple prop or arg obj is negative', function() {
    expect(function() {
      freqiErrChecks.checkAugmentNumArrayConfigForNegs(this.config);
    }).to.throw;
  });
  it('should throw if amountToAdd prop or arg obj is negative', function() {
    expect(function() {
      freqiErrChecks.checkAugmentNumArrayConfigForNegs(this.config);
    }).to.throw;
  });
});


