# Open DIS for TypeScript (JavaScript) ES6

## Introduction

A TypeScript ES6 implementation of DIS that decodes IEEE 1278.1
binary data format messages and turns them into Javascript
objects.

This library is intended to be used client-side on a browser
with a websocket. The websocket should send DIS data to and from
a server.

-NathanielPoteat

The code also includes some simple coordinate system transforms
to change DIS world coordinates to (lat, lon, alt) or to a
position in a local tanget plane coordinate system. 

-DMcG

## Build (In Progress)

*The following instructions do not currently produce a working build. To build a min file, manual copy and paste the contents of the .ts files you need into a single .ts file and comment out all the imports. Until a file is converted from .ts to .js it cannot be used to create a build file*

To generate a single `dis6.min.js` and `dis7.min.js` from the source files, run the following command:

`$ npm install`

# Release

*The following is currently for the original open-dis-javascript*

Releases of open-dis-javascript are published to http://npmjs.com/package/open-dis

1. `$ npm login`
1. `$ npm version <version-to-be-released>`
1. `$ npm publish`
1. `$ git push --tags`
