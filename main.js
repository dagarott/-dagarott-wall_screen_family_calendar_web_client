
function sendData() {
    // Lógica para guardar los datos
    console.log("Datos enviados");
    publishMessage();
};

function cancel() {
    // Lógica para cancelar
    console.log("Cancelar");
};

function gotoOptions() {
    document.getElementById("optionsContainer").style.display = "block"
    document.getElementById("mainContainer").style.display = "none"
};

function gotoMain() {
    document.getElementById("optionsContainer").style.display = "none"
    document.getElementById("mainContainer").style.display = "block"
};

function saveOptions() {
    console.log("Opciones guardadas");
};

function startConnect() {
    clientID = "clientID - " + parseInt(Math.random() * 100);
    host = "maqiatto.com"
    port = 8883
    userId = "dagarott@gmail.com"
    passwordId = "Dau8queL"

    client = new Paho.MQTT.Client(host, Number(port), clientID);
    client.onConnectionLost = onConnectionLost;
    // client.onMessageArrived = onMessageArrived;

    client.connect({
        onSuccess: onConnect,
        userName: userId,
        password: passwordId
    });


}

function onConnect() {
    console.log("Connected");
}

function onConnectionLost(responseObject) {
    console.log("Lost connection");
}

function onMessageArrived(message) {
}

function startDisconnect() {
    client.disconnect();
    console.log("Disconnected");
}

function publishMessage() {

    var options = document.getElementById("typeevent").value;
    var date = document.getElementById("date").value;
    var time = document.getElementById("time").value;
    var text = document.getElementById("notes").value;
    var topic = "dagarott@gmail.com/frame"

    console.log("Opciones: " + options);
    console.log("Fecha: " + date);
    console.log("Hora: " + time);
    console.log("Notas: " + text);

    if (!date || !time) {
        alert('Debes seleccionar una fecha y hora obligatoriamente');
    } 

    msg = options + ',' + date + ',' + time + ',' + text
    Message = new Paho.MQTT.Message(msg);
    Message.destinationName = topic;

    client.send(Message);
}



document.addEventListener("DOMContentLoaded", function () {
    startConnect();
});