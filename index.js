var ConveyorBelt = require("./dist/conveyorBelt")

module.exports = function(config, env) {
    return new ConveyorBelt(config, env)
}
