// Crea un nuevo cliente MQTT
function connectToBroker(host, port, path, id){
    return new Promise(function(resolve, reject){
        var client = new Paho.MQTT.Client(host, port, path, id);
        var connectOptions = {
            useSSL: true,
            onSuccess: function(){
                console.log(`connected to ${host}:${port}/${path} with id ${id}`);
                resolve(client);
            },
            onFailure: function(){
                reject();
            }
        };
        client.connect(connectOptions);
    });
}

function suscribeToTopic(client, topic){
    return new Promise(function(resolve, reject){
        client.subscribe(topic, {
            onSuccess: function(){
                resolve();
            },
            onFailure: function(){
                reject();
            }
        }); 
    });
}

function reconnect(response) {
    console.log('Conexión perdida:', response.errorMessage);
    location.href = 'index.html';
}

function sendMessage(client, message) {
        message = new Paho.MQTT.Message(JSON.stringify(message));
        message.destinationName = topic;
        client.send(message);
};