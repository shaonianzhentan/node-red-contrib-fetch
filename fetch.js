const fetch = require('node-fetch')

module.exports = function (RED) {
    function NodeFetch(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        node.on('input', async function (msg) {
            // console.log(msg)
            let { url, payload } = msg
            fetch(url, payload || {}).then(res => res.json()).then(payload => {
                node.send({
                    payload
                })
            })
        });
    }
    RED.nodes.registerType("node-fetch", NodeFetch);
}