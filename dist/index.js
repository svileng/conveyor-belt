"use strict";

var ConveyorBelt = require("./conveyorBelt")["default"];


module.exports = function (config, env) {
  return new ConveyorBelt(config, env);
};