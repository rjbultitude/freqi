# Freqi

A javascript api for generating frequencies for use with the web audio API

---

## Features

This package aims to:

* Provide a simple API for creating sets of frequencies from intervals
* Return actual sonic frequencies in Hz or relative frequencies for use with audio files
* Return a set of frequencies of any length
* Allow for any number of semitones per octave
* Provide a way of creating frequencies from within the intervals
* Handle bad data

What it doesn't do:

* Does not allow for input of notes as letters
* Does not allow for input of chords by name

## Dependencies

This module has _no_ dependencies, though dependencies for the demo were mistakenly listed in pre 1.0.1 versions.

## Release notes

The first major release (version 1.0.0) included one breaking change whereby `inversionStartNote` was changed to `intervalStartIndex` to better express its purpose. If you're not explicitly using this property in your app you should be able to safely upgrade to the latest version.

## Demo

[View the online demo on GitHub here](https://rjbultitude.github.io/freqi/demo/index.html)

Or download/clone it and run `npm install` which will install any dependencies, `npm run build` to create the demo bundle and `npm run start` which will start a new server at localhost:8080.
Then, be sure to navigate to the demo folder in order to see the page i.e. localhost:8080/demo

## Getting Started

It is recommended you install via [Yarn](https://yarnpkg.com/) or [NPM](https://npmjs.com)

using

`yarn add freqi`

or

`npm install freqi`

Freqi is configured to work with both [AMD](https://en.wikipedia.org/wiki/Asynchronous_module_definition) and [CJS](https://en.wikipedia.org/wiki/CommonJS) applications.

If you're using [Webpack](http://webpack.github.io/) or some other CJS module loader

import (ES6), like so

`import freqi from 'freqi'`

or for CommonJS loaders (such as [Browserify](http://browserify.org/)) use
`var freqi = require('freqi');`


## Usage

**Freqi** provides a pure function, `getFreqs`, which accepts a config object and returns an array of frequencies. There is one mandatory property: `intervals`, though it is recommended that `startFreq` be set too.

`intervals` is the set of notes you want to generate frequencies from. These intervals can be any integer, positive or negative e.g. `[-5, 0, 7]`.

`startFreq` can be a frequency in Hz, such as `440` (for the note A) or a relative frequency such `1` which is useful for playing back audio files, such as MP3s or OGGs, where `1` is the original playback rate. 440 is the default value.

Optionally, you can pass in a custom number of semitones. The default is `12`, a western chromatic scale, but you could pass in 19 for a non-western scale - this can produce very interesting results!

If you are using **Freqi** to generate multiple sequences of notes you can offset the root note using the `rootNote` property. A value of `2` for example will pitch the provided intervals up by two semitones.

Also, you can offset the intervals themselves to produce inversions or rootless voicings.  `{intervals: [0, 3, 5, 7, 10], intervalStartIndex: 2}` will create a set of frequencies from the 2nd index in the intervals array, so it's equivalent to `{intervals: [5, 7, 10]`. If you always want arrays of the same length use the `numNotes` property. If that is set **Freqi** will automatically produce the desired number of notes. Use this in conjunction with `amountToAdd` if you want it to extend the intervals by a certain number of semitones e.g. `{intervals: [0, 3, 5, 7, 10], intervalStartIndex: 2, amountToAdd: 12, numNotes: 5}` will yield  

Following on from the above, by using `numNotes`, a larger or smaller number of notes can be set than is provided by the `intervals` property e.g. `{intervals : [0, 3, 5], numNotes: 5}`. In this case **Freqi** will add the missing array items and extend them to the next octave. You can have **Freqi** add any value to these missing items - setting `amountToAdd` to `0` will effectively add the same numbers again.

### Mandatory properties:

 * startFreq : [number]
 * intervals : [array] // e.g. [0, 3, 5]

### Optional properties

 * numSemitones : [number]
 * rootNote : [number]
 * intervalStartIndex : [number];

### Auxiliary properties

 * numNotes : [number];
 * amountToAdd : [number] // 12 if you want to go up an octave;
 * type : [string] // for debugging;


## Plans

In a later version it will be possible to generate musical scales that use just intonation rather than only equal temperament.

Also, it will be possible to pass in note letters, such as `C#`.

Likes, shares, comments, suggestions and collaborators welcome.
