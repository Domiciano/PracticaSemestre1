// Crea un nuevo cliente MQTT
var host = 'broker.emqx.io';
var port = 8084;
var path = '/mqtt';
var clientId = cedula;
var client = new Paho.MQTT.Client(host, port, path, clientId);
var connectOptions = {
    useSSL: true,
    onSuccess: suscribe
};

client.connect(connectOptions);

function suscribe(){  
    console.log("connected")  
    client.subscribe("icesi/introtel");
    console.log("suscribed");
}

function sendMessage(message) {
    if(client.isConnected()){
        message = new Paho.MQTT.Message(JSON.stringify(message));
        message.destinationName = "icesi/introtel";
        client.send(message);
    }
};