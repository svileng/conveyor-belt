# conveyor-belt [![Build Status](https://travis-ci.org/svileng/conveyor-belt.svg?branch=master)](https://travis-ci.org/svileng/conveyor-belt) [![Coverage Status](https://img.shields.io/coveralls/svileng/conveyor-belt.svg)](https://coveralls.io/r/svileng/conveyor-belt?branch=master) [![npm version](https://badge.fury.io/js/conveyor-belt.svg)](http://badge.fury.io/js/conveyor-belt)
> Pure asset management for Node/Express, using globs and compatible with Gulp.

Juggling different sets of assets for production, development, staging, etc? ConveyorBelt is a tiny Node.js module for loading different groups of front-end assets, depending on current environment. It uses [globs](https://github.com/isaacs/node-glob#glob-primer) so it plays nicely with [Gulp](https://github.com/gulpjs/gulp/), and you can use it with any build tool or Node framework.

It's time to get rid of those `if (NODE_ENV === ...)` statements!

## Usage
```bash
npm install conveyor-belt --save
```
```javascript
// Get an instance by supplying a number of environment configurations and current environment.
// Current environment must match one of the supplied environment configurations.
var conveyorBelt = require("conveyor-belt")({
    development: {
        scripts: [
            "bower/angular/angular.js"
            "assets/js/**/*.js",
            "!excluded.js"
        ],
        styles: [
            "bower/normalize-css/normalize.css",
            "assets/css/**/*.css",
        ]
    },
    production: {
        scripts: [
            "public/app.min-*.js"
        ],
        styles: [
            "public/app.min-*.css"
        ]
    }
}, process.env.NODE_ENV)

// Set assets to be accessible to the view. If you're using Express:
var app = require("express")()
app.locals.assets = conveyorBelt.assets

// You can also set it on the actual response, per request:
// app.use(function(req, res, next) {
//     res.locals.assets = conveyorBelt.assets
//     next()
// })

// Or attach it as an Express middleware:
// app.use(conveyorBelt.middleware.bind(conveyorBelt))

// Job done. Paths are now available in the view!
```
Optional - separate environment configs into a separate module (e.g. `config.js`):
```javascript
module.exports = {
    development: {
        scripts: [
            "bower/angular/angular.js"
            "assets/js/**/*.js",
            "!assets/js/excluded.js"
        ],
        styles: [
            "bower/normalize-css/normalize.css",
            "assets/csss/**/*.css",
        ]
    },
    production: {
        scripts: [
            "public/app.min-*.js"
        ],
        styles: [
            "public/app.min-*.css"
        ]
    }
}
```
```javascript
var config = require("./config")
var conveyorBelt = require("conveyor-belt")(config, process.env.NODE_ENV)

```
It's entirely up to you how you name your environments (you don't have to call them "development" and "production") and you can have as many as you want (e.g. add "staging"). Same applies for the keys inside each environment ("scripts", "styles", etc), as long as the value is an array of strings (paths or globs). Here's the general format:
```javascript
{
    environment1: {
        assetsGroup1: [
            "path/to/file.js"
            "or/wildcards/**/*.js",
            "!excluded.js"
        ],
        assetsGroup2: [
            // ...
        ],
        assetsGroupX: [
            // ...
        ]
    },
    environmentX: {
        assetsX: [],
        whatever: []
    }
}

```
So that's a perfectly valid config:
```javascript
var conveyorBelt = require("conveyor-belt")({
    superman: {
        powers: [
            "path/to/powers/*.png"
        ]
    }
}, "superman")

```
## Rendering
After attaching the middleware, you can access the `assets` variable in your templates (set on [res.locals](http://expressjs.com/4x/api.html#res.locals)). It will contain the same keys in your environment config. Here's an example with Jade that assumes you've specified `scripts` and `styles` in your environment config:

```jade
doctype html
html
    head
        each style in assets.styles
            link(rel='stylesheet', href="/#{style}")

    body
        each script in assets.scripts
            script(src="/#{script}")
```
Or if you take the superman example before that:
```jade
doctype html
html
    body
        each thing in assets.powers
            img(src="/#{thing}")
```
If you have the same keys in all environment configs ("scripts", etc) then the same code will work in all environments.

## Contributions
Pull requests are more than welcome. Please make your changes in your own branch, make sure the current tests are passing (run with `gulp mocha`) and update/add tests if necessary. Run `gulp` to get your ES6 code transpiled to ES5.

## Contributors

- [@svileng](https://twitter.com/svileng)
