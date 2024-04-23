// Crea un nuevo cliente MQTT
var host = 'broker.hivemq.com';
var port = 8884;
var path = '/mqtt';
var clientId = 'icesiclient';
var client = new Paho.MQTT.Client(host, port, path, clientId);
var connectOptions = {
    timeout: 30,
    cleanSession: true,
    useSSL: true,
    onSuccess: suscribe
};


client.connect(connectOptions);

function suscribe(){  
    console.log("connected")  
    client.subscribe("icesi/introtel");
}

function sendMessage(message) {
    if(client.isConnected()){
        message = new Paho.MQTT.Message(JSON.stringify(message));
        message.destinationName = "icesi/introtel";
        client.send(message);
    }
};