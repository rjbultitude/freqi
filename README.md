# Freqi

A javascript api for generating frequencies for use with the web audio API

---

## Features

This package aims to:

* Provide a simple API for creating sets of frequencies
* Return actual sonic frequencies in Hz or relative frequencies for use with audio files
* Return a set of frequencies of any length
* Allow for any number of semitones per octave
* Handle bad data

What it doesn't do:

* Does not allow for input of notes as letters
* Does not allow for input of chords by name

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

If you're using [Webpack](http://webpack.github.io/), [Browserify](http://browserify.org/) or some other CJS module loader

import (ES6), like so

`import freqi from 'freqi'`

or for CommonJS use
`var freqi = require('freqi');`


## Usage

Freqi provides a pure function, `getFreqs`, which accepts a config object and returns an array of frequencies. `startFreq` can be a frequency in Hz, such as 440 (for A) or a relative frequency such 1 which is useful for playing back audio files, such as MP3s or OGGs where `1` is the original playback rate. A set of intervals must be provided, using the `intervals` property, for it to generate frequencies from. These intervals can be any integer, positive or negative e.g. ``[-5, 0, 7]``.

Optionally you can pass in a custom number of semitones. The default is 12, for a western chromatic scale, but you could pass in 19 for a non-western scale. This can produce interesting results!

If you are using Freqi to generate sequences of notes you can offset the root note using the `rootNote` property. Also, you can offset the intervals themselves to produce inversions e.g. `{intervals: [0, 3, 5, 7, 10], inversionStartNote: 2}` is the equivalent of `{intervals: [5, 7, 10, 12, 15], inversionStartNote: 2}` - note that the intervals array is automatically extended to the next octave to ensure the same number of notes are created.

Following on from the above, a larger number of notes can be set than is provided by the `intervals` property e.g. `{intervals : [0, 3, 5], numNotes: 5}`. In this case Freqi will add the missing array items and extend them to the next octave. You can have Freqi add any value to these missing items - setting `amountToAdd` to `0` will effectively add the same numbers again.

If, for any reason, you want an even longer set of frequencies back simply use the `repeatMultiple` property, which will repeat the duplication process x number of times.

### Mandatory properties:

 * startFreq : [number]
 * intervals : [array] // e.g. [0, 3, 5]

### Optional properties

 * numSemitones : [number]
 * rootNote : [number]
 * inversionStartNote : [number];

### Auxiliary properties

 * numNotes : [number];
 * amountToAdd : [number] // 12 if you want to go up an octave;
 * repeatMultiple : [number];
 * type : [string] // for debugging;

e.g. `freqi.getFreqs({startFreq: 440, intervals: [-5, 0, 7]})`


## Plans

In a later version it will be possible to generate musical scales that use just intonation rather than equal temperament

Also, it will be possible to pass in note letters, such as `C#`
