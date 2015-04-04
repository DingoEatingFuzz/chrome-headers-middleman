# Headers Middleman
![Travis CI](https://travis-ci.org/DingoEatingFuzz/chrome-headers-middleman.svg?branch=master)

A Chrome extension for manipulating headers based on URL pattern matching

## Why would I use this?

Mostly for use with APIs. It is common for metadata to be sent along with
requests in the form of HTTP headers. It is slightly less common, but not
unheard of, to want to modify those headers pre-flight.

The use case that led me to make this extension is adding an `Authorization`
header to all requests to an api (which would happen when double-clicking
in the network tab).

Maybe you have more use cases? I'd love to hear them and make a list!

## What does it look like?

Super cool

## How do I contribute?

This project uses React, Babel, Gulp, and Browserify because JS is just
super dumb these days.

This will install required things and start `gulp watch`

```sh
$ npm install -g babel && npm start
```