# Freqi

A javascript api for generating frequencies for use with the web audio API

---

## Features

This package aims to:

* Provide a simple API for creating sets of frequencies
* Return actual sonic frequencies in Hz or relative frequencies for use with audio files
* Return a set of frequencies of any number
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


## Plans

Add audiofile playback example

Create gh-pages branch

In a later version it will be possible to generate musical scales that use just intonation rather than equal temperament

Also, it will be possible to pass in note letters, such as `C#`
