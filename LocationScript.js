// Inicializa el mapa
var map = L.map('map').setView([3.341722, -76.529894], 18);
        
// Agrega una capa de OpenStreetMap al mapa
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);




navigator.geolocation.watchPosition(updateLocation, handleLocationError, { enableHighAccuracy: true });

// Función para actualizar la posición del marcador con los datos de ubicación proporcionados por el navegador
function updateLocation(position) {
    var latlng = [position.coords.latitude, position.coords.longitude]; 
    /*
    sendMessage({
        id: cedula,
        name: username,
        lat: latlng[0],
        lng: latlng[1]
    });
    */
}
// Función para manejar errores en la geolocalización
function handleLocationError(error) {
    console.log("Error al obtener la ubicación: " + error.message);
}
// Permisos
navigator.permissions.query({ name: "geolocation" }).then(function(result) {
    if (result.state === "granted") {
    } else if (result.state === "denied") {
        console.log("Location permission denied");
    } else {
        console.log("Location permission prompt not yet shown");
    }
});


var userMap = {};

client.onMessageArrived = function(msg){
    console.log(msg.payloadString);
    let locationUpdate = JSON.parse(msg.payloadString);
    console.log(locationUpdate);

    if(!userMap[locationUpdate.id]){
        console.log("El punto no existe");
        userMap[locationUpdate.id] = L.marker([locationUpdate.lat, locationUpdate.lng]).addTo(map);
        userMap[locationUpdate.id].bindPopup(locationUpdate.name);
    }else{
        console.log("El punto ya existe");
        userMap[locationUpdate.id].setLatLng([locationUpdate.lat, locationUpdate.lng]);
    }
}

const action = document.getElementById('action');
action.addEventListener('click', function(){
    sendMessage(
        {
            id: '2',
            name: 'Ma',
            lat: 3.342330+(Math.random()/1000),
            lng: -76.528577+(Math.random()/1000)
        }
    );
});

client._setOnConnectionLost(function(response) {
    console.log('Conexión perdida:', response.errorMessage);
    // Aquí puedes llamar a funciones de reconexión u otras acciones necesarias
});