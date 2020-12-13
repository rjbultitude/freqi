# Freqi

A javascript api for generating frequencies for use with the web audio API

[![Build Status](https://travis-ci.org/rjbultitude/freqi.svg?branch=master)](https://travis-ci.org/rjbultitude/freqi) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/0bb328eb9dc14cca98a6db914c66e425)](https://www.codacy.com/app/rjbultitude/freqi?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=rjbultitude/freqi&amp;utm_campaign=Badge_Grade)
---

## Features

This package aims to:

* Provide a simple API for creating sets of frequencies from numeric intervals
* Return actual sonic frequencies in Hz or _relative_ frequencies for use with audio file playback
* Supports multiple tuning systems both tempered and just
* Allow for any number of semitones per octave(equal temperament mode only)
* Return an array of frequencies of any length
* Provide a way of creating frequencies from within the intervals themselves
* Handle bad data

What it doesn't do:

* Does not allow for input of notes as letters
* Does not allow for input of chords by name
* It is not a sequencer or audio processor

## Dependencies

This module has _no_ dependencies. 
Please note that dependencies for the demo were mistakenly listed in pre-1.0.1 versions.

## Getting Started

It is recommended you install via [Yarn](https://yarnpkg.com/) or [NPM](https://npmjs.com)

using

`yarn add freqi`

or

`npm install freqi`

Freqi is configured to work with [ESM](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules), [AMD](https://en.wikipedia.org/wiki/Asynchronous_module_definition) and [CJS](https://en.wikipedia.org/wiki/CommonJS) applications.

If you're using [Webpack](http://webpack.github.io/) or some other CJS module loader

import (ES6), like so

`import freqi from 'freqi'`

or for CommonJS loaders (such as [Browserify](http://browserify.org/)) use
`var freqi = require('freqi');`


## Usage

**Freqi** provides a pure function, `getFreqs`, which accepts a config object and returns an array of frequencies. There is one mandatory property: `intervals`, though it is recommended that `startFreq` be set too.

`intervals` is the set of notes you want to generate frequencies from. These intervals can be any integer, positive or negative e.g. `[-5, 0, 7]` where `0` is the start frequency.

`startFreq` can be a frequency in Hz, such as `440` (for the note A) or a relative frequency such `1` which is useful for playing back audio files, such as MP3s or OGGs, where `1` is the original playback rate. `440` is the default value.

**Tuning Systems**
Freqi supports just intonation tuning systems. By default it will use equal temperament, but to use a Just tuning system set the `mode` to one of the following:
* `pythagorean` - Pythagorean just intonation excluding the syntonic comma
* `truePythag` - Pythagorean just intonation that _includes_ the syntonic/[pyhthagorean comma](https://en.wikipedia.org/wiki/Pythagorean_comma)
* `fiveLimit` - A set of whole number ratios using only powers of 2, 3, or 5
* `diatonic` - A justly-tuned major diatonic scale that uses the 5-limit system devised by Ptolemy
* `diatonicIndian` - A justly-tuned diatonic scale that uses 27/16 for Dha
* `twentyTwoShrutis` - A justly-tuned 22 note Indian scale described by the Bharata and Dattilam
* `gioseffoZarlino` - An early just tuning system of 16 notes per octave 

Please note, once in one of these modes, other config params, such as `numNotes`, will have no effect as they are fixed scale systems.

The object containing the ratios for each _just_ system is exported as `justTuningSystems` should you need to view it. If you want to list all the tuning system keys, use the property `freqiModes`, which is an array of the keys. Furthermore, an object containing meta data about all the tuning systems can be obtained via `tuningSystemsData`.

There is also a mode for the harmonic series called `hSeries`. In its raw state it may not particularly useful for making music, but may be of interest to music theorists.

**Optional Params**
You can pass in a custom number of semitones. The default is `12`, a western chromatic scale, but you could pass in 19 for a non-western scale - this can produce very interesting results!

If you are using **Freqi** to generate multiple sequences of notes you can offset the root note using the `rootNote` property. A value of `2` for example will pitch the provided intervals up by two semitones.

Also, you can offset the intervals themselves to produce inversions or rootless voicings.  `{intervals: [0, 3, 5, 7, 10], intervalStartIndex: 2}` will create a set of frequencies from the 2nd index in the intervals array, so it's equivalent to `{intervals: [5, 7, 10]`. If you always want arrays of the same length use the `numNotes` property. If that is set **Freqi** will automatically produce the desired number of notes. Use this in conjunction with `amountToAdd` if you want it to extend the intervals by a certain number of semitones e.g. `{intervals: [0, 3, 5, 7, 10], intervalStartIndex: 2, amountToAdd: 12, numNotes: 5}` will yield  

Following on from the above, by using `numNotes`, a larger or smaller number of notes can be set than is provided by the `intervals` property e.g. `{intervals : [0, 3, 5], numNotes: 5}`. In this case **Freqi** will add the missing array items and extend them to the next octave. You can have **Freqi** add any value to these missing items - setting `amountToAdd` to `0` will effectively add the same numbers again.

### Mandatory properties:

 * intervals : \[array\] // e.g. [0, 3, 5]

### Optional properties

 * startFreq : \[number\] // e.g. 440
 * numSemitones : \[number\] // e.g. 19
 * mode: \[string\] // `justInt`, `pythagorean`, `truePythag`, `diatonic`, `fiveLimit`, `diatonicIndian`, `twentyTwoShrutis`
 * rootNote : \[number\]
 * intervalStartIndex : \[number\]

### Auxiliary properties

 * numNotes : \[number\];
 * amountToAdd : \[number\] // 12 if you want to go up an octave;
 * type : \[string\] // for debugging;

## Demo

[View the online demo on GitHub here](https://rjbultitude.github.io/freqi/demo/index.html)

Or download/clone it and run `npm install` which will install any dependencies, `npm run build` to create the demo bundle and `npm run start` which will start a new server at localhost:8080.
Then, be sure to navigate to the demo folder in order to see the page i.e. localhost:8080/demo

## Release notes

1.6.0 Addition of pentatonic tuning systems. Addition of `freqiModes` property as alternative to `getModes`. `getMetaData` is deprecated in favour of `tuningSystemsData`.

1.5.3 Addition of meta data for each tuning system and `getMetaData` method

1.5.2 TypeScript definitions added

1.5.2 Native EcmaScript module support added

1.4.0 Bug fix for True Pythagorean

1.3.0 Support for true pythagorean scale added.

1.2.0 Support for Gioseffo Zarlino's 16 note scale added.

1.1.0 As described above, 1.1.0 supports mutliple tuning systems. The source has been refactored to TypeScript and test coverage has been improved.

1.0.0 included one breaking change whereby `inversionStartNote` was changed to `intervalStartIndex` to better express its purpose. If you're not explicitly using this property in your app you should be able to safely upgrade to the latest version.

## Development

The library is written in TypeScript. Rollup has been used as the bundler for two reaons:
1. To ensure backwards compatibility - there's an issue with how TS publishes modules defined using the UMD IIFE
2. The TypeScript compiler (still) doesn't support `.mjs` files as a target

The `build` script first runs the TS compiler to produce the type definitions, then the Rollup compiler to produce the library artefacts.

Mocha is used as the testing framework.

Browserify is used to build the demo.

## Contributing

### Commands
`npm build` creates the TS definitions and compiles the library using TS and Rollup respectively

`npm build run` will compile the lib, then the demo and then start the local server. Navigate to localhost:8080/demo to view it

### Features
* Please post feature requets or sugestions as issues here: [https://github.com/rjbultitude/freqi/issues](https://github.com/rjbultitude/freqi/issues)
* As of version 1.6.0 all tuning system data is stored in the src/tuning-systems.json file. Any additional systems must be added here. 
* There is no need to create any additional equally tempered tuning systems in the core lib as the function `getEqTempNote` will allow for the division of an octave into any number of notes.
* Based on annecdotal feedback, the most useful feature to develop next is support for note letters e.g. `getFreqs(['A', 'C', 'D#'])` or `getFreqs(['Sa', 'Re', 'Ga'])`
