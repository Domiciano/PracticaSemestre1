// Crea un nuevo cliente MQTT
var host = broker;
var port = 8084;
var path = '/mqtt';
var clientId = cedula;
var client = new Paho.MQTT.Client(host, port, path, clientId);
var connectOptions = {
    useSSL: true,
    onSuccess: suscribe,
    onFailure: function(){
        location.href = 'index.html'
    }
};

client.connect(connectOptions);

function suscribe(){  
    console.log("connected")  
    client.subscribe(topic);
    console.log("suscribed");
}

function sendMessage(message) {
    if(client.isConnected()){
        message = new Paho.MQTT.Message(JSON.stringify(message));
        message.destinationName = topic;
        client.send(message);
    }
};