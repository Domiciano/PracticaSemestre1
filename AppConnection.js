var client = new Paho.MQTT.Client('broker.hivemq.com', Number(8000), "webmqttuser1");
//Listener de mensajes
client.onMessageArrived = function (msg) {
    console.log("Arrived!: " + msg.payloadString);
}
client.connect({
    onSuccess: function () {
        console.log("conectado!")
        client.subscribe("icesi/introtel");
    }
});

function sendMessage(message) {
    if(client.isConnected()){
        message = new Paho.MQTT.Message(JSON.stringify(message));
        message.destinationName = "icesi/introtel";
        client.send(message);
    }
};