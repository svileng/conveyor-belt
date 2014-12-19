import ConveyorBelt from "./conveyorBelt"

module.exports = (config, env) => {
    return new ConveyorBelt(config, env)
}
