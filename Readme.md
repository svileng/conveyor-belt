# conveyor-belt
> Asset management for Node, using globs and compatible with Gulp.

## Usage
```javascript
// Store config in a separate file for convenience (and to share with Gulp).
var config = require("./config")

// Get an instance by supplying a number of environment configurations and current environment.
// Current environment must match at least one of the supplied environment configurations.
var conveyorBelt = require("conveyorBelt")({
    development: config.development,
    production: config.production,
    anotherenv: config.anotherenv
}, process.env.NODE_ENV)

// Attach as an Express middleware.
app.use(conveyorBelt.attach)

// Job done.
```
After attaching the middleware, two variables will be available locally for your templates - `scripts` and `styles`. Here's an example with `Jade`:

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

Example `config.js`:
```javascript
module.exports = {
    development: {
        scripts: [
            "bower/angular/angular.js"
            "js/**/*.js",
            "a.js",
            "!b.js"
        ],
        styles: [
            "bower/normalize-css/normalize.css",
            "*.css",
            "!foobar.css"
        ]
    },
    production: {
        // ...
    },
    whateverEnvYouMayHave: {
        // ...
    }
}
```
