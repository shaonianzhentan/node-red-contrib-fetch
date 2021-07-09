const fs = require('fs')
const _ = require('lodash');
const InputEvent = require('input-event');

module.exports = function (RED) {

    RED.nodes.registerType("input-event", (config) => {

        RED.nodes.createNode(this, config);

        const inputDevice = config.name
        if (!fs.existsSync(inputDevice)) {
            return this.status({ fill: "red", shape: "ring", text: `未找到设备：${inputDevice}` });
        }
        const input = new InputEvent(inputDevice);
        const keyboard = new InputEvent.Keyboard(input);
        //keyboard.on('keyup'   , console.log);
        //keyboard.on('keydown' , console.log);
        keyboard.on('keypress', _.throttle((data) => {
            this.send({
                dev: inputDevice,
                code: data.code
            })
        }), 500);
    });
}