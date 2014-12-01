let globby = require("globby")
let debug = require("debug")("conveyorBelt:main")

class ConveyorBelt {

    constructor(config, env) {
        if (env === undefined || env === null) {
            throw new Error("You must pass an 'env' option for current environment")
        }

        // Store current assets config.
        this.config = config

        // Set passed environment as current and process assets.
        this.changeEnv(env)
    }

    // Sets given env as current and processes assets for it.
    changeEnv(env) {
        if (this.config[env] === undefined ) {
            throw new Error("No supplied config for current environment")
        }

        this.env = env
        this.assets = this.getAssets(this.config[env])
    }

    // Expands all patterns/globs and returns file paths.
    getAssets(assets) {
        if (assets === undefined || assets === null) {
            throw new Error("Current assets config is either null or undefined")
        }

        for (let key in assets) {
            if (!Array.isArray(assets[key])) {
                throw new Error("Assets config properties must be arrays of globs/paths")
            }
        }

        var result = {}

        for (let config in assets) {
            result[config] = globby.sync(assets[config])
        }

        return result
    }

    // Attach and set assets.
    middleware(req, res, next) {
        res.locals.assets = this.assets
        next()
    }
}

module.exports = (options, env) => {
    return new ConveyorBelt(options, env)
}
