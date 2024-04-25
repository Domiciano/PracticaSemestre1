
function installMap() {
    return new Promise(function (resolve, reject) {
        var map = L.map('map').setView([3.341722, -76.529894], 18);
        // Agrega una capa de OpenStreetMap al mapa
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        map.whenReady(function () {
            console.log("Map loaded!");
            resolve(map);
        });
    });

}

function queryPermission() {
    navigator.permissions.query({ name: "geolocation" }).then(function (result) {
        if (result.state === "granted") {
            console.log("granted");
        } else if (result.state === "denied") {
            console.log("Location permission denied");
        } else {
            console.log("Location permission prompt not yet shown");
        }
    });
}

function observeLocation(updateLocation) {
    navigator.geolocation.watchPosition(updateLocation, handleLocationError, { enableHighAccuracy: true });
}

// Función para manejar errores en la geolocalización
function handleLocationError(error) {
    console.log("Error al obtener la ubicación: " + error.message);
}

function reconnect(response) {
    console.log('Conexión perdida:', response.errorMessage);
    location.href = 'index.html';
};

function getInitPoint(sendPoint) {
    let initPoint = {
        id: cedula,
        name: username,
        lat: 3.341520 + ((Math.random() - 0.5) / 1000),
        lng: -76.530042 + ((Math.random() - 0.5) / 1000)
    }
    latlng = [initPoint.lat, initPoint.lng];
    sendPoint(initPoint);
}

//setTimeout(initialize, 3000);