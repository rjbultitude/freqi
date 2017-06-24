# musicalscales

A javascript api for generating frequencies for use with the web audio API

## Please note this is a work in progress.
Though it functions, it is not published on NPM and doesn't describe the return values.
I will endeavour to publish the first full release later in 2017

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

It is recommended you install via [NPM](https://npmjs.com) where dependencies will be loaded automatically.

`npm install musicalscales`

musicalscales is configured to work with both [AMD](https://en.wikipedia.org/wiki/Asynchronous_module_definition) and [CJS](https://en.wikipedia.org/wiki/CommonJS) applications.

If you're using [Webpack](http://webpack.github.io/), [Browserify](http://browserify.org/) or some other CJS module loader simply require the module like so

`var musicalScales = require('musicalscales');`

or using ES6 import, like so

`import musicalScales from 'musicalscales'`

You can then use one of the two methods listed below to retrieve location specific weather data.

* `getSpecificScale`
* `getEqTempNote`

If you're using [Require.JS](http://requirejs.org/) you will need to download [momentjs](https://momentjs.com/) and [es6-promise](https://github.com/stefanpenner/es6-promise).

## Music arrays

TBC

## Demo

To run the demo run `npm install` to install the dependencies, then `npm run build` to create the demo bundle and then `npm run start` which will start a new server at localhost:8080. Be sure to navigate to the demo folder in order to see the page i.e. localhost:8080/demo

## Plans

Finish writing tests

Delete demo repo

Create gh-pages branch

In a later version it will be possible to generate musical scales that use just intonation rather than equal temperament
