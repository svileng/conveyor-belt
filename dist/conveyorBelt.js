"use strict";

var _classProps = function (child, staticProps, instanceProps) {
  if (staticProps) Object.defineProperties(child, staticProps);
  if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
};

var globby = require("globby");
var debug = require("debug")("conveyorBelt:main");

var ConveyorBelt = (function () {
  var ConveyorBelt =

  // Main constructor.
  function ConveyorBelt(config, env) {
    if (env === undefined || env === null) {
      throw new Error("You must pass an 'env' option for current environment");
    }

    // Store current assets config
    this.config = config;

    // Initialise assets according to current environment.
    this.changeEnv(env);
  };

  _classProps(ConveyorBelt, null, {
    changeEnv: {
      writable: true,
      value: function (env) {
        if (this.config[env] === undefined) {
          throw new Error("No supplied config for current environment");
        }

        this.env = env;
        this.assets = this.getAssets(this.config[env]);
      }
    },
    getAssets: {
      writable: true,


      // Matches patterns and returns file paths for the supplied environment.
      value: function (assets) {
        if (assets === undefined || assets === null) {
          throw new Error("Current assets config is either null or undefined");
        }

        for (var key in assets) {
          if (!Array.isArray(assets[key])) {
            throw new Error("Assets config properties must be arrays of globs/paths");
          }
        }

        var result = {};

        for (var config in assets) {
          result[config] = globby.sync(assets[config]);
        }

        return result;
      }
    },
    middleware: {
      writable: true,


      // Attach and set assets.
      value: function (req, res, next) {
        res.locals.assets = this.assets;
        next();
      }
    }
  });

  return ConveyorBelt;
})();

module.exports = function (options, env) {
  return new ConveyorBelt(options, env);
};