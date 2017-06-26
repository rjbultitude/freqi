# Freqi

A javascript api for generating frequencies for use with the web audio API

## Please note this is a work in progress.
Though it functions, it is not published on NPM and doesn't describe the return values.
I will endeavor to publish the first full release later in 2017

---

## Features

This package is designed to provide :

* A simple API for creating sets of frequencies
* Frequencies can be generated that are any number of semitones per octave
* An even or odd number of octaves can be generated
* For odd numbers of octaves an option is available for whether the remaining octave is lower or upper
* The centre frequency can be returned - useful for...

What it doesn't do:

* Does not allow for input of notes as letters
* Does not allow for input of chords by name


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

The main exported function is `getFreqs`, which accepts a config object with the following mandatory properties:

 * startFreq : [whole number]
 * intervals : [array] // e.g. [0, 3, 5]

these optional properties

 * numSemitones : [whole number]
 * rootNote : [whole number]
 * inversionStartNote : [whole number];

and these auxiliary properties

 * repeatMultiple : [number];
 * numNotes : [number];
 * amountToAdd : [number] // 12 if you want to go up an octave;
 * type : [string] // for debugging;

e.g. `freqi.getFreqs({startFreq: 440, intervals: [-5, 0, 7]})`


## Demo

To run the demo run `npm install` which will install any dependencies, then `npm run build` to create the demo bundle and then `npm run start` which will start a new server at localhost:8080.

Then, be sure to navigate to the demo folder in order to see the page i.e. localhost:8080/demo

## Plans

Add audiofile playback example

Create gh-pages branch

In a later version it will be possible to generate musical scales that use just intonation rather than equal temperament

Also, it will be possible to pass in note letters, such as `C#`
