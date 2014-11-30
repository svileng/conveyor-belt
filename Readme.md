# conveyor-belt
> Asset management for Node, using globs and compatible with Gulp.

ConveyorBelt is a simple Node module for Express, that helps you serve the right front-end assets, depending on the current environment. It uses [globs](https://github.com/isaacs/node-glob#glob-primer) so it plays nicely with [Gulp](https://github.com/gulpjs/gulp/).

Written in ES6 for fun and fully tested.

## Usage
```javascript
var app = require("express")()

// Get an instance by supplying a number of environment configurations and current environment.
// Current environment must match at least one of the supplied environment configurations.
var conveyorBelt = require("conveyorBelt")({
    development: {
        scripts: [
            "bower/angular/angular.js"
            "assets/js/**/*.js",
            "!assets/js/excluded.js"
        ],
        styles: [
            "bower/normalize-css/normalize.css",
            "assets/csss/**/*.css",
        ],
        sprite: [
            "public/sprite-main.png"
        ]
    },
    production: {
        scripts: [
            "public/app.min-*.js"
        ],
        styles: [
            "public/app.min-*.css"
        ],
        sprite: [
            "public/sprite-main.png"
        ]
    }
}, process.env.NODE_ENV)

// Attach as an Express middleware.
app.use(conveyorBelt.middleware)

// Job done. Assets defined above are now set as local variables to use in the view. Globs will be expanded to full paths.
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
        ],
        sprite: [
            "public/sprite-main.png"
        ]
    },
    production: {
        scripts: [
            "public/app.min-*.js"
        ],
        styles: [
            "public/app.min-*.css"
        ],
        sprite: [
            "public/sprite-main.png"
        ]
    }
}
```
```javascript
var config = require("./config")
var conveyorBelt = require("conveyorBelt")({
    development: config.development,
    production: config.production
}, process.env.NODE_ENV)

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
var conveyorBelt = require("conveyorBelt")({
    superman: {
        powers: [
            "path/to/powers/*.png"
        ]
    }
}, "superman")

```

After attaching the middleware, asset groups will be available as local variables in the view, so you can render them. Here's an example with `Jade` that assumes you've specified `scripts` and `styles` in your environment config:

```jade
doctype html
html
    head
        each style in styles
            link(rel='stylesheet', href="/#{style}")

    body
        each script in scripts
            script(src="/#{script}")
```
Or if you take the superman example before that:
```jade
doctype html
html
    body
        each thing in powers
            img(src="/#{thing}")
```
## Contributions
Any pull requests are more than welcome. Please make your changes in your own branch, make sure the current tests are passing (run with `gulp mocha`) and update/add tests if necessary. Run `gulp` to get your ES6 code transpiled to ES5.

## Contributors

- [@svileng](https://twitter.com/svileng)
